// import nodemailer from 'nodemailer';

// export function getTransporter() {
//   return nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT || 465),
//     secure: String(process.env.SMTP_SECURE || 'true') === 'true',
//     auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
//   });
// }


import nodemailer from 'nodemailer';

export function getTransporter() {
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = port === 465; // SSL only for port 465

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Verify connection immediately
  transporter.verify((err, success) => {
    if (err) console.error('SMTP Transporter Error:', err);
    else console.log('SMTP transporter ready to send messages');
  });

  return transporter;
}
