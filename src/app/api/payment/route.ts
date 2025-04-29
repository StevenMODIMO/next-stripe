import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const { amount, currency } = await req.json();
  const sh = amount * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: sh,
    currency,
  });
  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
