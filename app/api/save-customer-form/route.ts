import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import OrderModel from '@/models/Order';
import { getTransporter } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { orderId, sessionId, formData } = await req.json();

    if (!orderId || !sessionId || !formData) {
      return NextResponse.json({ error: 'Missing orderId, sessionId, or formData' }, { status: 400 });
    }

    await connectDB();

    const order = await OrderModel.findOne({ orderId, sessionId }).lean();

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const updatedOrder = await OrderModel.findOneAndUpdate(
      { orderId, sessionId },
      { $set: { requirements: formData.requirements, phone: formData.phone } },
      { new: true } // returns updated document
    );

    console.log("Updated order:", updatedOrder);

    const transporter = getTransporter();

    // Send email to admin
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM!,
        to: process.env.CONTACT_ADMIN_EMAIL!,
        subject: `[Order Form] ${orderId}`,
        html: `<h3>Post-payment form for ${orderId}</h3><pre>${JSON.stringify(formData, null, 2)}</pre>`,
      });
    } catch (err: any) {
      console.error('Admin email failed:', err);
    }

    // Send email to customer
    if (order.customerEmail) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM!,
          to: order.customerEmail,
          subject: `We received your requirements for Order ${orderId}`,
          html: `
            <h2>Thank you for submitting your requirements!</h2>
            <p>We have received your details for order <b>${orderId}</b>.</p>
            <p><b>Your Requirements:</b> ${formData.requirements || 'N/A'}</p>
            <p>We will contact you shortly if needed.</p>
            <p>Download your payment slip: <a href="${formData.base}/api/payment-slip?orderId=${encodeURIComponent(formData.orderId)}" target="_blank">Payment Slip (PDF)</a></p>
          `,
        });
      } catch (err: any) {
        console.error('Customer email failed:', err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('save-customer-form error:', err);
    return NextResponse.json(
      { error: err.message, stack: err.stack },
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import OrderModel from '@/models/Order';
// import { getTransporter } from '@/lib/email'; 

// export const runtime = 'nodejs';
// export const dynamic = 'force-dynamic';

// export async function POST(req: Request) {
//   try {
//     const { orderId, sessionId, formData } = await req.json();
//     console.log("Received orderId:", orderId, "sessionId:", sessionId);
//     console.log("Form data:", formData);

//     if (!orderId || !sessionId || !formData) {
//       return NextResponse.json({ error: 'Missing orderId, sessionId, or formData' }, { status: 400 });
//     }

//     await connectDB();

//     const order = await OrderModel.findOne({ orderId, sessionId });
//     console.log("Order found in DB:", order);

//     if (!order) {
//       return NextResponse.json({ error: 'Order not found' }, { status: 404 });
//     }

// const updatedOrder = await OrderModel.findOneAndUpdate(
//   { orderId, sessionId },
//   { $set: { requirements: formData.requirements, phone: formData.phone } },
//   { new: true } // returns updated document
// );

// console.log("Updated order:", updatedOrder);


//     return NextResponse.json({ success: true });
//   } catch (err: any) {
//     console.error('save-customer-form error:', err);
//     return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
//   }
// }

