import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectDB } from '@/lib/db';
import OrderModel from '@/models/Order';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

  const secret = process.env.STRIPE_WEBHOOK_SECRET!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    console.error('Webhook signature verification failed', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const paymentIntentId =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id || null;

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const items = (lineItems.data || []).map((li) => ({
        name: li.description || 'Item',
        price: (li.price?.unit_amount || 0) / 100,
        quantity: li.quantity || 1,
      }));

      await connectDB();
      await OrderModel.updateOne(
        { sessionId: session.id },
        {
          $set: {
            orderId: session.client_reference_id || session.id,
            sessionId: session.id,
            customerEmail: session.customer_details?.email || '',
            customerName: session.customer_details?.name || '',
            items,
            amountSubtotal: (session.amount_subtotal || 0) / 100,
            amountTotal: (session.amount_total || 0) / 100,
            currency: session.currency,
            paymentStatus: session.payment_status,
            paymentIntentId,
            updatedAt: new Date(),
          },
          $setOnInsert: { createdAt: new Date() },
        },
        { upsert: true }
      );
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('webhook handler error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
