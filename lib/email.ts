// import nodemailer from 'nodemailer';

// export function getTransporter() {
//   return nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT || 465),
//     secure: String(process.env.SMTP_SECURE || 'true') === 'true',
//     auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
//   });
// }


// import nodemailer from 'nodemailer';

// export function getTransporter() {
//   const port = Number(process.env.SMTP_PORT || 587);
//   const secure = port === 465; // SSL only for port 465

//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port,
//     secure,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   // Verify connection immediately
//   transporter.verify((err, success) => {
//     if (err) console.error('SMTP Transporter Error:', err);
//     else console.log('SMTP transporter ready to send messages');
//   });

//   return transporter;
// }


import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendCustomerEmail(order: any) {
  await transporter.sendMail({
    from: `"CS Graphic Meta" <${process.env.SMTP_USER}>`,
    to: order.email,
    cc: process.env.ADMIN_EMAIL,  // CC the admin email
    subject: `Order Confirmation - ${order.orderId}`,
    html: `
      <h2>Thank you for your purchase</h2>
      <p>Order ID: <b>${order.orderId}</b></p>
      <p>Amount Paid: ${(order.amount).toFixed(2)} ${order.currency.toUpperCase()}</p>
      ${order.projectNote ? `<p><b>Your Note:</b> ${order.projectNote}</p>` : ''}
      <p>We will contact you shortly.</p>
    `,
  });
}

export async function sendAdminEmail(order: any) {
  await transporter.sendMail({
    from: `"Website Orders" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    cc: process.env.CC_ADMIN_EMAIL,
    subject: `New Website Order - ${order.orderId}`,
    html: `
      <h3>New Order Received</h3>
      <p><b>Name:</b> ${order.customerName}</p>
      <p><b>Email:</b> ${order.email}</p>
      <p><b>Phone:</b> ${order.phone}</p>
      <p><b>Note:</b> ${order.projectNote}</p>
      <p><b>Amount:</b> ${(order.amount).toFixed(2)} ${order.currency.toUpperCase()}</p>
    `,
  });
}

export async function sendPaymentFailedEmail(email: string) {
  await transporter.sendMail({
    to: email,
    from: `"CS GRAPHIC META" <${process.env.SMTP_USER}>`,
    cc: process.env.CC_ADMIN_EMAIL,
    subject: "Payment failed",
    html: `
      <p>Your payment was unsuccessful.</p>
      <p>No money was taken from your account.</p>
      <p>Please try again or contact support.</p>
    `,
  });
}

export async function sendAdminPaymentFailedEmail(order: any) {
  await transporter.sendMail({
    from: `"Website Orders" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    cc: process.env.CC_ADMIN_EMAIL,
    subject: `Payment Failed - ${order.orderId}`,
    html: `
      <h3>Payment Failed</h3>
      <p><b>Order ID:</b> ${order.orderId}</p>
      <p><b>Email:</b> ${order.email}</p>
      <p><b>Amount:</b> ${(order.amount).toFixed(2)} ${order.currency.toUpperCase()}</p>
      <p><b>Reason:</b> ${order.failureReason}</p>
    `,
  });
}

export async function sendAdminSystemErrorEmail(errorType: string, errorMessage: string, data: any) {
  await transporter.sendMail({
    from: `"System Error" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `SYSTEM ERROR: ${errorType}`,
    html: `
      <h3>System Error Occurred</h3>
      <p><b>Type:</b> ${errorType}</p>
      <p><b>Message:</b> ${errorMessage}</p>
      <p><b>Data Context:</b></p>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `,
  });
}

