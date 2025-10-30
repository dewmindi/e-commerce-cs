// import React, { useState } from 'react';
// import { motion } from "framer-motion"
// import { useInView } from 'react-intersection-observer';
// import { AsteriskIcon } from 'lucide-react';

// const ContactUs = () => {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//     });

//     const [submitted, setSubmitted] = useState(false);

//     function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
//         setForm((f) => ({ ...f, [key]: value }));
//     }

//     async function onSubmit(e:React.FormEvent) {
//         e.preventDefault();
        
//         try {
//            const res = await fetch("api/contact",{
//             method: "POST",
//             headers: {"Content-type": "application/json"},
//             body: JSON.stringify(form)
//            }); 

//            const data = await res.json();

//            if (data.success) {
//             setSubmitted(true);
//             setForm({
//                 name: "",
//                 email: "",
//                 phone: "",
//                 subject: "",
//                 message: "",                
//             })
//            }else{
//             alert("Failed to send email:" + data.error);
//            }
//         } catch (err: any) {
//             alert("Sending email error:" + err.message);
//         }
//     }

//     const [ref, inView] = useInView({
//         triggerOnce: false,
//         threshold: 0.4,
//     });

//     const [ref1, inView1] = useInView({
//         triggerOnce: false,
//         threshold: 0.2,
//     });


//     const variants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: { opacity: 1, y: 0 },
//     };

//     return (
//         <div id='contact' className="bg-white text-white flex items-center justify-center p-4 sm:p-8 font-inter">
//             <motion.div
//                 ref={ref}
//                 initial="hidden"
//                 animate={inView ? "visible" : "hidden"}
//                 variants={variants}
//                 transition={{ duration: 0.8 }}
//                 className="max-w-7xl bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-3xl">
//                 {/* Left Section - Image & Overlay */}
//                 <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[600px] flex items-center justify-center">
//                     <img
//                         src="/contactUs.jpeg"
//                         alt="Contact Us Background"
//                         className="absolute inset-0 w-full h-full object-cover animate-fade-in"
//                         onError={(e) => { e.target.onerror = null; e.target.src = "/contactUs.jpeg"; }}
//                     />
//                     <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
//                     <div className="relative z-10 p-6 text-center">
//                         <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4 animate-slide-in-up">
//                             Facing Digital <br /> Challenges?
//                         </h2>
//                         <p className="text-lg sm:text-xl text-gray-300 animate-slide-in-up delay-100">
//                             We're Here To Solve Your Marketing Headaches.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Right Section - Contact Form */}
//                 <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-[#bcbbbb]">
//                     <h1 className="flex text-3xl sm:text-4xl font-bold mb-6 text-black animate-fade-in-right">
//                         <AsteriskIcon />Contact Us
//                     </h1>
//                     <p className=" text-lg mb-8 animate-fade-in-right delay-100">
//                         Reach out to us, and let's discuss how we can help.
//                     </p>

//                     <form onSubmit={onSubmit} className="space-y-6">
//                         <div>
//                             <label htmlFor="name" className="sr-only">Name</label>
//                             <input
//                                 required
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 placeholder="Name"
//                                 value={form.name}
//                                 onChange={(e) =>update("name", e.target.value)}
//                                 className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-200"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="email" className="sr-only">Email</label>
//                             <input
//                                 required
//                                 type="phone"
//                                 id="phone"
//                                 name="phone"
//                                 placeholder="Phone"
//                                 value={form.phone}
//                                 onChange={(e)=>update("phone", e.target.value)}
//                                 className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-300"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="email" className="sr-only">Email</label>
//                             <input
//                                 required
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 value={form.email}
//                                 onChange={(e)=>update("email", e.target.value)}
//                                 className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-300"
//                             />
//                         </div>                        
//                         <div>
//                             <label htmlFor="email" className="sr-only">Email</label>
//                             <input
//                                 required
//                                 type="subject"
//                                 id="subject"
//                                 name="subject"
//                                 placeholder="Subject"
//                                 value={form.subject}
//                                 onChange={(e)=> update("subject", e.target.value)}
//                                 className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-300"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="message" className="sr-only">Message</label>
//                             <textarea
//                                 required
//                                 id="message"
//                                 name="message"
//                                 rows={5}
//                                 placeholder="Message"
//                                 value={form.message}
//                                 onChange={(e)=>update("message", e.target.value)}
//                                 className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black resize-y transition-all duration-300 animate-fade-in-right delay-400"
//                             ></textarea>
//                         </div>
//                         <button
//                             type="submit"
//                             className="w-full bg-[#bb8d03fc] hover:bg-[#876e25fc] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg animate-fade-in-right delay-500"
//                         >
//                             Contact Us
//                         </button>
//                     </form>
//                 </div>
//             </motion.div>

//             {/* Custom CSS for animations and font */}
//             <style>{` {/* Removed the 'jsx' prop from the style tag */}
//             @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');

//             .font-inter {
//             font-family: 'Inter', sans-serif;
//             }

//             @keyframes fadeIn {
//             from { opacity: 0; }
//             to { opacity: 1; }
//             }

//             @keyframes slideInUp {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//             }

//             @keyframes fadeInRight {
//             from { opacity: 0; transform: translateX(-20px); }
//             to { opacity: 1; transform: translateX(0); }
//             }

//             .animate-fade-in {
//             animation: fadeIn 0.8s ease-out forwards;
//             }

//             .animate-slide-in-up {
//             animation: slideInUp 0.7s ease-out forwards;
//             }

//             .animate-slide-in-up.delay-100 {
//             animation-delay: 0.1s;
//             }

//             .animate-fade-in-right {
//             animation: fadeInRight 0.7s ease-out forwards;
//             }

//             .animate-fade-in-right.delay-100 { animation-delay: 0.1s; }
//             .animate-fade-in-right.delay-200 { animation-delay: 0.2s; }
//             .animate-fade-in-right.delay-300 { animation-delay: 0.3s; }
//             .animate-fade-in-right.delay-400 { animation-delay: 0.4s; }
//             .animate-fade-in-right.delay-500 { animation-delay: 0.5s; }
//         `}</style>
//         </div>
//     );
// };

// export default ContactUs;


// "use client";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { AsteriskIcon } from "lucide-react";

// const ContactUs = () => {
//   const [token, setToken] = useState("");
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//     company: "", // honeypot
//   });

//   const [submitted, setSubmitted] = useState(false);

//   function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
//     setForm((f) => ({ ...f, [key]: value }));
//   }

//   // ✅ Load reCAPTCHA token
//   useEffect(() => {
//     const loadRecaptcha = () => {
//       if (typeof grecaptcha !== "undefined") {
//         grecaptcha.ready(() => {
//           grecaptcha
//             .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action: "submit" })
//             .then((t: string) => setToken(t));
//         });
//       }
//     };

//     // Wait until script is loaded
//     if (typeof window !== "undefined") {
//       if (!document.querySelector("#recaptcha-script")) {
//         const script = document.createElement("script");
//         script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
//         script.id = "recaptcha-script";
//         script.async = true;
//         script.defer = true;
//         script.onload = loadRecaptcha;
//         document.body.appendChild(script);
//       } else {
//         loadRecaptcha();
//       }
//     }
//   }, []);

//   // ✅ Submit handler
//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...form, token }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         setSubmitted(true);
//         setForm({
//           name: "",
//           email: "",
//           phone: "",
//           subject: "",
//           message: "",
//           company: "",
//         });
//       } else {
//         alert("Failed to send email: " + data.error);
//       }
//     } catch (err: any) {
//       alert("Sending email error: " + err.message);
//     }
//   }

//   const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.4 });
//   const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

//   return (
//     <div id="contact" className="bg-white text-white flex items-center justify-center p-4 sm:p-8 font-inter">
//       <motion.div
//         ref={ref}
//         initial="hidden"
//         animate={inView ? "visible" : "hidden"}
//         variants={variants}
//         transition={{ duration: 0.8 }}
//         className="max-w-7xl bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-3xl"
//       >
//         {/* Left Section */}
//         <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[600px] flex items-center justify-center">
//           <img
//             src="/contactUs.jpeg"
//             alt="Contact Us Background"
//             className="absolute inset-0 w-full h-full object-cover animate-fade-in"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src = "/contactUs.jpeg";
//             }}
//           />
//           <div className="absolute inset-0 bg-black opacity-50"></div>
//           <div className="relative z-10 p-6 text-center">
//             <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4 animate-slide-in-up">
//               Facing Digital <br /> Challenges?
//             </h2>
//             <p className="text-lg sm:text-xl text-gray-300 animate-slide-in-up delay-100">
//               We're Here To Solve Your Marketing Headaches.
//             </p>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-[#bcbbbb]">
//           <h1 className="flex text-3xl sm:text-4xl font-bold mb-6 text-black animate-fade-in-right">
//             <AsteriskIcon />
//             Contact Us
//           </h1>
//           <p className="text-lg mb-8 animate-fade-in-right delay-100">
//             Reach out to us, and let's discuss how we can help.
//           </p>

//           <form onSubmit={onSubmit} className="space-y-6">
//             {/* Honeypot (hidden field) */}
//             <input
//               type="text"
//               name="company"
//               style={{ display: "none" }}
//               value={form.company}
//               onChange={(e) => update("company", e.target.value)}
//             />

//             <div>
//               <input
//                 required
//                 type="text"
//                 id="name"
//                 name="name"
//                 placeholder="Name"
//                 value={form.name}
//                 onChange={(e) => update("name", e.target.value)}
//                 className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-200"
//               />
//             </div>

//             <div>
//               <input
//                 required
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 placeholder="Phone"
//                 value={form.phone}
//                 onChange={(e) => update("phone", e.target.value)}
//                 className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-300"
//               />
//             </div>

//             <div>
//               <input
//                 required
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={(e) => update("email", e.target.value)}
//                 className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-300"
//               />
//             </div>

//             <div>
//               <input
//                 required
//                 type="text"
//                 id="subject"
//                 name="subject"
//                 placeholder="Subject"
//                 value={form.subject}
//                 onChange={(e) => update("subject", e.target.value)}
//                 className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-300"
//               />
//             </div>

//             <div>
//               <textarea
//                 required
//                 id="message"
//                 name="message"
//                 rows={5}
//                 placeholder="Message"
//                 value={form.message}
//                 onChange={(e) => update("message", e.target.value)}
//                 className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black resize-y transition-all duration-300 animate-fade-in-right delay-400"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={!token} // ✅ disable until token ready
//               className="w-full bg-[#bb8d03fc] hover:bg-[#876e25fc] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg animate-fade-in-right delay-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {token ? "Contact Us" : "Loading..."}
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ContactUs;


"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AsteriskIcon } from "lucide-react";

// Global grecaptcha type declaration
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const ContactUs = () => {
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    company: "", // honeypot
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // ✅ Load reCAPTCHA script and initialize
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    
    if (!siteKey) {
      console.error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined");
      return;
    }

    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && window.grecaptcha) {
        window.grecaptcha.ready(() => {
          console.log("reCAPTCHA is ready");
          setRecaptchaReady(true);
        });
      }
    };

    // Check if script is already loaded
    if (document.querySelector("#recaptcha-script")) {
      loadRecaptcha();
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.id = "recaptcha-script";
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log("reCAPTCHA script loaded");
      loadRecaptcha();
    };
    
    script.onerror = () => {
      console.error("Failed to load reCAPTCHA script");
      setError("Failed to load reCAPTCHA. Please refresh the page.");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup function
      const existingScript = document.querySelector("#recaptcha-script");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // ✅ Generate fresh token just before submission
  const generateRecaptchaToken = async (): Promise<string | null> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    
    if (!siteKey) {
      console.error("Site key not found");
      return null;
    }

    if (!window.grecaptcha || !recaptchaReady) {
      console.error("reCAPTCHA not ready");
      return null;
    }

    try {
      console.log("Generating reCAPTCHA token...");
      const token = await window.grecaptcha.execute(siteKey, { action: "contact_form" });
      console.log("reCAPTCHA token generated successfully:", token ? "✓" : "✗");
      return token;
    } catch (error) {
      console.error("Error generating reCAPTCHA token:", error);
      return null;
    }
  };

  // ✅ Submit handler with fresh token generation
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Generate fresh token right before submission
      const token = await generateRecaptchaToken();
      
      if (!token) {
        throw new Error("Failed to generate reCAPTCHA token. Please try again.");
      }

      console.log("Submitting form with token...");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token }),
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (data.success) {
        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          company: "",
        });
        console.log("Form submitted successfully!");
        console.log("reCAPTCHA Details:", data.recaptcha);
      } else {
        
        throw new Error(data.error || "Failed to send email");
      }
    } catch (err: any) {
      console.error("Form submission error:", err);
      setError(err.message || "An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.4 });
  const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

  // Show success message
  if (submitted) {
    return (
      <div id="contact" className="bg-white text-white flex items-center justify-center p-4 sm:p-8 font-inter">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.8 }}
          className="max-w-2xl bg-green-600 bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-lg mb-6">Your message has been sent successfully. We'll get back to you soon!</p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="contact" className="bg-white text-white flex items-center justify-center p-4 sm:p-8 font-inter">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.8 }}
        className="max-w-7xl bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-3xl"
      >
        {/* Left Section */}
        <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[600px] flex items-center justify-center">
          <img
            src="/contactUs.jpeg"
            alt="Contact Us Background"
            className="absolute inset-0 w-full h-full object-cover animate-fade-in"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/contactUs.jpeg";
            }}
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 p-6 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4 animate-slide-in-up">
              Facing Digital <br /> Challenges?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 animate-slide-in-up delay-100">
              We're Here To Solve Your Marketing Headaches.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-[#bcbbbb]">
          <h1 className="flex text-3xl sm:text-4xl font-bold mb-6 text-black animate-fade-in-right">
            <AsteriskIcon />
            Contact Us
          </h1>
          <p className="text-lg mb-8 animate-fade-in-right delay-100 text-gray-700">
            Reach out to us, and let's discuss how we can help.
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* reCAPTCHA Status */}
          {!recaptchaReady && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg text-sm">
              Loading security verification...
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Honeypot (hidden field) */}
            <input
              type="text"
              name="company"
              style={{ display: "none" }}
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <input
                required
                type="text"
                id="name"
                name="name"
                placeholder="Name *"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-200 disabled:opacity-50"
              />
            </div>

            <div>
              <input
                required
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone *"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-300 disabled:opacity-50"
              />
            </div>

            <div>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Email *"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-300 disabled:opacity-50"
              />
            </div>

            <div>
              <input
                required
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject *"
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-300 disabled:opacity-50"
              />
            </div>

            <div>
              <textarea
                required
                id="message"
                name="message"
                rows={5}
                placeholder="Message *"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-5 py-3 bg-[#bcbbbb] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black resize-y transition-all duration-300 animate-fade-in-right delay-400 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={!recaptchaReady || isSubmitting}
              className="w-full bg-[#bb8d03fc] hover:bg-[#876e25fc] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg animate-fade-in-right delay-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting 
                ? "Sending..." 
                : !recaptchaReady 
                  ? "Loading Security..." 
                  : "Contact Us"
              }
            </button>
          </form>

          <p className="text-xs text-gray-600 mt-4 text-center">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="https://policies.google.com/terms" className="underline" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;