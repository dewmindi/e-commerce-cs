// // /app/api/contact/route.js
// import nodemailer from "nodemailer";

// export async function POST(req) {
//     try {
//         const data = await req.json();
//         const { name, email, phone, subject, message } = data;

//         // Basic validations
//         if (!name || !email || !message) {
//             return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
//         }

//         // Email validation (RFC 5322 basic)
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400 });
//         }

//         // Phone validation (optional)
//         const phoneRegex = /^[0-9+\-() ]{7,20}$/;
//         if (phone && !phoneRegex.test(phone)) {
//             return new Response(JSON.stringify({ error: "Invalid phone number" }), { status: 400 });
//         }
//         if (data.company) {
//             return new Response(JSON.stringify({ error: "Spam detected" }), { status: 400 });
//         }


//         const transporter = nodemailer.createTransport({
//             host: process.env.SMTP_HOST,
//             port: Number(process.env.SMTP_PORT),
//             auth: {
//                 user: process.env.SMTP_USER,
//                 pass: process.env.SMTP_PASS,
//             },
//         });

//         await transporter.sendMail({
//             from: `Cs Grapphic <${process.env.SMTP_USER}>`,
//             to: process.env.CONTACT_ADMIN_EMAIL,
//             subject: `New Contact Form from CS Graphic: ${name}`,
//             html: `
//   <p><strong>Name:</strong> ${name}</p>
//   <p><strong>Email:</strong> ${email}</p>
//   <p><strong>Phone:</strong> ${phone}</p>
//   <p><strong>Subject:</strong> ${subject}</p>
//   <p><strong>Message:</strong><br>${message}</p>
// `
//         });

//         if (data.email) {
//             try {
//                 await transporter.sendMail({
//                     from: `Cs Grapphic Meta <${process.env.SMTP_USER}>`,
//                     to: data.email,
//                     subject: `We received your email`,
//                     html: `
//                     <p>Hello ${name}</P>
//                     <p>Thank you for contacting CS Graphic Meta. We will get back to you soon!</p>
//                     `,
//                 });
//             } catch (err: any) {

//             }
//         }

//         return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), { status: 200 });
//     } catch (error) {
//         console.error("Email sending error:", error);
//         return new Response(
//             JSON.stringify({
//                 error: "Failed to send email",
//                 details: String(error),
//                 raw: JSON.stringify(error, Object.getOwnPropertyNames(error))
//             }),
//             { status: 500, headers: { "Content-Type": "application/json" } }
//         );
//     }



// }

// /app/api/contact/route.ts
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     const { name, email, phone, subject, message, company, token } = data;

//     // 1. Honeypot check (bots will often fill hidden "company" field)
//     if (company) {
//       return new Response(JSON.stringify({ error: "Spam detected" }), { status: 400 });
//     }

//     // 2. reCAPTCHA verification (server-side check)
//     if (!token) {
//       return new Response(JSON.stringify({ error: "Missing reCAPTCHA token" }), { status: 400 });
//     }

//     const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: `secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
//     });

//     const captchaData = await captchaRes.json();

//     if (!captchaData.success || (captchaData.score !== undefined && captchaData.score < 0.5)) {
//       return new Response(JSON.stringify({ error: "Failed reCAPTCHA verification" }), { status: 400 });
//     }

//     // 3. Basic validations
//     if (!name || !email || !message) {
//       return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400 });
//     }

//     const phoneRegex = /^[0-9+\-() ]{7,20}$/;
//     if (phone && !phoneRegex.test(phone)) {
//       return new Response(JSON.stringify({ error: "Invalid phone number" }), { status: 400 });
//     }

//     // 4. Setup nodemailer
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: Number(process.env.SMTP_PORT),
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     // 5. Send email to admin
//     await transporter.sendMail({
//       from: `Cs Grapphic <${process.env.SMTP_USER}>`,
//       to: process.env.CONTACT_ADMIN_EMAIL,
//       subject: `New Contact Form from CS Graphic: ${name}`,
//       html: `
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <p><strong>Subject:</strong> ${subject}</p>
//         <p><strong>Message:</strong><br>${message}</p>
//       `,
//     });

//     // 6. Send confirmation to user
//     try {
//       await transporter.sendMail({
//         from: `Cs Grapphic Meta <${process.env.SMTP_USER}>`,
//         to: email,
//         subject: "We received your email",
//         html: `
//           <p>Hello ${name},</p>
//           <p>Thank you for contacting CS Graphic Meta. We will get back to you soon!</p>
//         `,
//       });
//     } catch (err) {
//       console.warn("Failed to send confirmation email:", err);
//     }

//     return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), { status: 200 });
//   } catch (error: any) {
//     console.error("Email sending error:", error);
//     return new Response(
//       JSON.stringify({
//         error: "Failed to send email",
//         details: String(error),
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }


import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, subject, message, company, token } = data;

    // 1. Honeypot check (bots will often fill hidden "company" field)
    if (company) {
      return new Response(JSON.stringify({ error: "Spam detected" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. reCAPTCHA verification (server-side check)
    if (!token) {
      return new Response(JSON.stringify({ error: "Missing reCAPTCHA token" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Enhanced reCAPTCHA verification with better error handling
    const recaptchaSecret = process.env.RECAPTCHA_SECRET;
    if (!recaptchaSecret) {
      console.error("RECAPTCHA_SECRET environment variable is not set");
      return new Response(JSON.stringify({ error: "Server configuration error" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    console.log("Verifying reCAPTCHA token..."); // Debug log

    const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${encodeURIComponent(recaptchaSecret)}&response=${encodeURIComponent(token)}`,
    });

    if (!captchaRes.ok) {
      console.error("reCAPTCHA API request failed:", captchaRes.status, captchaRes.statusText);
      return new Response(JSON.stringify({ error: "reCAPTCHA verification failed" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const captchaData = await captchaRes.json();
    console.log("reCAPTCHA response:", JSON.stringify(captchaData, null, 2)); // Debug log

    // More detailed reCAPTCHA validation
    if (!captchaData.success) {
      console.error("reCAPTCHA verification failed:", captchaData["error-codes"]);
      return new Response(JSON.stringify({ 
        error: "reCAPTCHA verification failed", 
        details: captchaData["error-codes"] 
      }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // For v3, check score; for v2, success is enough
    if (captchaData.score !== undefined && captchaData.score < 0.5) {
      console.warn("reCAPTCHA score too low:", captchaData.score);
      return new Response(JSON.stringify({ 
        error: "Failed reCAPTCHA verification - low score",
        score: captchaData.score 
      }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    console.log("reCAPTCHA verification successful!"); // Debug log

    // 3. Basic validations
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const phoneRegex = /^[0-9+\-() ]{7,20}$/;
    if (phone && !phoneRegex.test(phone)) {
      return new Response(JSON.stringify({ error: "Invalid phone number" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 4. Setup nodemailer with better error handling
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log("SMTP transporter verified successfully");
    } catch (error) {
      console.error("SMTP transporter verification failed:", error);
      return new Response(JSON.stringify({ error: "Email service configuration error" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 5. Send email to admin
    await transporter.sendMail({
      from: `CS Graphic <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_ADMIN_EMAIL,
      subject: `New Contact Form from CS Graphic: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #007cba;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p><small>Sent via CS Graphic contact form</small></p>
        </div>
      `,
    });

    // 6. Send confirmation to user
    try {
      await transporter.sendMail({
        from: `CS Graphic Meta <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Thank you for contacting CS Graphic",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Thank you for your message!</h2>
            <p>Hello ${name},</p>
            <p>Thank you for contacting CS Graphic. We have received your message and will get back to you as soon as possible.</p>
            <p>Here's a copy of what you sent:</p>
            <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #007cba;">
              <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
              <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p>Best regards,<br>CS Graphic Team</p>
          </div>
        `,
      });
      console.log("Confirmation email sent successfully");
    } catch (err) {
      console.warn("Failed to send confirmation email:", err);
      // Don't fail the entire request if confirmation email fails
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Email sent successfully" 
    }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Email sending error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send email",
        details: process.env.NODE_ENV === 'development' ? String(error) : 'Internal server error',
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}