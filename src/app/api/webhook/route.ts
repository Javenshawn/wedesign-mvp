import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrder } from '@/lib/supabase'

// 初始化Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20'
})

// 验证Webhook签名
async function verifyStripeWebhook(request: NextRequest): Promise<Stripe.Event | null> {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('Missing Stripe signature or webhook secret')
      return null
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    return event
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return null
  }
}

// 处理checkout.session.completed事件
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing completed checkout session:', session.id)

    // 提取订单信息
    const email = session.customer_email || session.customer_details?.email
    const plan = session.metadata?.plan || 'basic'
    const amount = session.amount_total || 0

    if (!email) {
      console.error('No email found in session:', session.id)
      return { success: false, error: 'Missing email' }
    }

    // 创建订单记录
    const orderData = {
      email,
      stripe_session_id: session.id,
      plan,
      amount,
      status: 'paid'
    }

    const order = await createOrder(orderData)
    console.log('Order created successfully:', order.id)

    return { success: true, order }
  } catch (error: any) {
    console.error('Failed to process checkout session:', error)
    return { success: false, error: error.message }
  }
}

export async function POST(request: NextRequest) {
  try {
    // 验证Webhook签名
    const event = await verifyStripeWebhook(request)
    
    if (!event) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      )
    }

    console.log('Webhook received:', event.type)

    // 处理不同的事件类型
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // 只处理已支付的session
        if (session.payment_status === 'paid') {
          const result = await handleCheckoutSessionCompleted(session)
          
          if (result.success) {
            return NextResponse.json({
              success: true,
              message: 'Order processed successfully',
              order: result.order
            })
          } else {
            return NextResponse.json(
              { error: 'Failed to process order', details: result.error },
              { status: 500 }
            )
          }
        } else {
          return NextResponse.json({
            success: true,
            message: 'Session completed but not paid, ignoring'
          })
        }
      }

      case 'checkout.session.expired':
        console.log('Checkout session expired:', event.data.object.id)
        return NextResponse.json({
          success: true,
          message: 'Session expired event received'
        })

      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object.id)
        return NextResponse.json({
          success: true,
          message: 'Payment succeeded event received'
        })

      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id)
        return NextResponse.json({
          success: true,
          message: 'Payment failed event received'
        })

      default:
        console.log(`Unhandled event type: ${event.type}`)
        return NextResponse.json({
          success: true,
          message: `Event ${event.type} received but not processed`
        })
    }

  } catch (error: any) {
    console.error('Webhook processing error:', error)
    
    return NextResponse.json(
      { 
        error: 'Webhook processing failed',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// GET方法用于测试Webhook端点
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Stripe Webhook endpoint is running',
    environment: process.env.NODE_ENV,
    webhook_configured: !!process.env.STRIPE_WEBHOOK_SECRET,
    stripe_configured: !!process.env.STRIPE_SECRET_KEY,
    supported_events: [
      'checkout.session.completed',
      'checkout.session.expired',
      'payment_intent.succeeded',
      'payment_intent.payment_failed'
    ]
  })
}