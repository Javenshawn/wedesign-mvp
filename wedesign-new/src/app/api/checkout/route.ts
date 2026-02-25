console.log("CHECKOUT ROUTE LOADED")

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20'
})

export async function POST(req: NextRequest) {
  console.log("POST HIT")
  console.log("ENV:", { STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? "OK" : "MISSING", NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ? "OK" : "MISSING" })
  try {
    const { order_id, amount } = await req.json()

    if (!order_id || !amount) {
      return NextResponse.json(
        { error: 'Missing order_id or amount' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Design Service Order'
            },
            unit_amount: amount
          },
          quantity: 1
        }
      ],
      metadata: {
        order_id
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?order_id=${order_id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}