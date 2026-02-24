import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20'
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('Missing Stripe signature or webhook secret')
      return NextResponse.json(
        { error: 'Webhook configuration error' },
        { status: 400 }
      )
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      
      const { error } = await supabase
        .from('orders')
        .insert({
          email: session.customer_email || session.metadata?.email || 'unknown',
          amount_total: session.amount_total || 0,
          currency: session.currency || 'usd',
          stripe_session_id: session.id,
          payment_status: session.payment_status,
          created_at: new Date().toISOString()
        })

      if (error) {
        console.error('Supabase insert error:', error)
        return NextResponse.json(
          { error: 'Database error' },
          { status: 500 }
        )
      }

      console.log('Order saved:', session.id)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 400 }
    )
  }
}