import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAuth } from 'firebase/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


export async function POST(request: NextRequest) {
  console.log("RUNNING CHECKOUT POST")
  try {
    // const uid = getAuth().currentUser?.uid
    // console.log("UID", uid)

    // if (!uid) {
    //   return;
    // }

    const data = await request.json();
    const priceId = data.priceId;

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        metadata: {
          userId: 'nullID', //uid,
          priceId
        }
      });

    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server', { status: 500 });
  }
}