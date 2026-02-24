import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// 初始化Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20'
})

// 价格映射（单位：分）
const PRICE_MAP: Record<string, number> = {
  basic: 29900,    // $299.00
  standard: 59900, // $599.00
  premium: 99900,  // $999.00
}

// 产品名称映射
const PRODUCT_NAME_MAP: Record<string, string> = {
  basic: 'Wedesign Basic Package',
  standard: 'Wedesign Standard Package',
  premium: 'Wedesign Premium Package'
}

// 产品描述映射
const PRODUCT_DESCRIPTION_MAP: Record<string, string> = {
  basic: 'Basic logo design service, includes 3 initial concepts and 2 revisions',
  standard: 'Complete logo design + brand elements, includes 5 initial concepts and 4 revisions',
  premium: 'Complete brand system design, includes 8 initial concepts and unlimited revisions'
}

export async function POST(request: NextRequest) {
  try {
    // 验证Stripe密钥
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing STRIPE_SECRET_KEY environment variable')
      return NextResponse.json(
        { error: 'Payment system configuration error' },
        { status: 500 }
      )
    }

    // 解析请求体
    const { plan, email } = await request.json()
    
    // 验证plan参数
    if (!plan || !PRICE_MAP[plan]) {
      return NextResponse.json(
        { error: 'Invalid plan selection. Choose from: basic, standard, premium' },
        { status: 400 }
      )
    }

    // 获取价格ID（从环境变量或使用动态价格）
    let priceId = process.env[`STRIPE_${plan.toUpperCase()}_PRICE_ID`]
    
    // 如果没有配置price_id，使用动态价格
    const priceData = !priceId ? {
      currency: 'usd',
      product_data: {
        name: PRODUCT_NAME_MAP[plan],
        description: PRODUCT_DESCRIPTION_MAP[plan]
      },
      unit_amount: PRICE_MAP[plan]
    } : undefined

    // 创建Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          price_data: priceData,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/`,
      customer_email: email || undefined,
      metadata: {
        plan,
        environment: process.env.NODE_ENV
      }
    })

    // 返回session URL
    return NextResponse.json({
      url: session.url,
      session_id: session.id,
      plan,
      amount: PRICE_MAP[plan],
      message: 'Checkout session created successfully'
    })

  } catch (error: any) {
    console.error('Checkout API error:', error)
    
    // 返回友好的错误信息
    let errorMessage = 'Failed to create checkout session'
    let statusCode = 500
    
    if (error.type === 'StripeInvalidRequestError') {
      errorMessage = 'Invalid Stripe configuration'
      statusCode = 400
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'Network error connecting to payment service'
    }

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: statusCode }
    )
  }
}

// 可选：GET方法用于测试
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Checkout API is running',
    available_plans: ['basic', 'standard', 'premium'],
    prices: PRICE_MAP,
    environment: process.env.NODE_ENV,
    stripe_configured: !!process.env.STRIPE_SECRET_KEY
  })
}