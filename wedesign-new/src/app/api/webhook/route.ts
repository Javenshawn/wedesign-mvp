import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  console.log("WEBHOOK ROUTE HIT")
  const body = await req.text()
  console.log("Body length:", body.length)
  const sig = req.headers.get("stripe-signature")!
  console.log("Signature present:", !!sig)
  console.log("Webhook secret configured:", !!process.env.STRIPE_WEBHOOK_SECRET)
  
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    console.log("Event constructed successfully:", event.type)
  } catch (err: any) {
    console.log("Webhook verification error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const order_id = session.metadata?.order_id
    const email = session.customer_email
    const amount = session.amount_total

    await supabase.from("orders").insert({
      email,
      stripe_session_id: session.id,
      plan: "design",
      amount,
      status: "paid",
    })
  }
  return NextResponse.json({ received: true })
}