// // /app/api/quotation/route.ts
// import nodemailer from "nodemailer";

// export async function POST(req) {
//     try {
//         const data = await req.json();
//         const { project, name, email, phone, message, file } = data;

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
//             subject: `Requirements Form: ${name}`,
//             html: `
//                 <p><strong>Name:</strong> ${name}</p>
//                 <p><strong>Email:</strong> ${email}</p>
//                 <p><strong>Contact Number:</strong> ${phone}</p>
//                 <p><strong>Order Requirements for:</strong> ${project}</p>
//                 <p><strong>Message:</strong><br>${message}</p>
//                 <p><strong>Message:</strong><br>${file}</p>
//             `,
//         });

//         if (data.email) {
//             try {
//                 await transporter.sendMail({
//                     from: `Cs Grapphic Meta <${process.env.SMTP_USER}>`,
//                     to: data.email,
//                     subject: `We received your Requirements`,
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


import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const project = formData.get("project") as string;
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const message = formData.get("message") as string;
        const file = formData.get("file") as File | null;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // change to true if using port 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // ---- ADMIN EMAIL ----
        const mailOptions: any = {
            from: `Cs Graphic <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_ADMIN_EMAIL,
            replyTo: email,
            subject: `Requirements Form: ${name}`,
            text: `New quotation from ${name}\n
  Phone: ${phone}\n
  Email: ${email}\n
  Project: ${project}\n
  Message: ${message}`,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact Number:</strong> ${phone}</p>
        <p><strong>Order Requirements for:</strong> ${project}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
            attachments: [],
        };

        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            console.log("Attaching file:", file.name, buffer.length);

            mailOptions.attachments.push({
                filename: file.name,
                content: buffer,
            });
        } else {
            console.log("⚠️ No file uploaded");
        }

        const adminResult = await transporter.sendMail(mailOptions);
        console.log("✅ Admin email sent:", adminResult.messageId);

        // ---- CUSTOMER EMAIL ----
        if (email) {
            const customerResult = await transporter.sendMail({
                from: `Cs Graphic Meta <${process.env.SMTP_USER}>`,
                to: email,
                subject: `We received your Requirements`,
                html: `
          <p>Hello ${name},</p>
          <p>Thank you for contacting CS Graphic Meta. We will get back to you soon!</p>
        `,
            });

            console.log("✅ Customer email sent:", customerResult.messageId);
        }

        return new Response(
            JSON.stringify({ success: true, message: "Email sent successfully" }),
            { status: 200 }
        );
    } catch (error: any) {
        console.error("❌ Email sending error:", error);
        return new Response(
            JSON.stringify({
                error: "Failed to send email",
                details: String(error),
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
