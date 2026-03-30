"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AsteriskIcon } from "lucide-react";
import contactImg from "../public/contactUs.jpeg"
import Image from "next/image";

const ContactUs = () => {
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

  // ✅ Submit handler with fresh token generation
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
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
  // Show success message
  if (submitted) {
    return (
      <div id="contact" className="bg-black text-white flex items-center justify-center p-4 sm:p-8 font-inter">
        <div
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
        </div>
      </div>
    );
  }

  return (
    <div id="contact" className=" text-white flex items-center justify-center p-4 sm:p-8 font-inter mt-10 mb-10">
      <div
        className="max-w-7xl bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-3xl"
      >
        {/* Left Section */}
        <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[600px] flex items-center justify-center">
          <Image
            src={contactImg}
            alt="Contact Us Iage"
            fill 
            className="object-cover "
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
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-[#181818] text-primarytext">
          <h2 className="flex text-3xl sm:text-4xl  mb-6  animate-fade-in-right">
            <AsteriskIcon />
            Contact Us
          </h2>
          <p className="text-lg mb-8 animate-fade-in-right delay-100">
            Reach out to us, and let's discuss how we can help.
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
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
                className="w-full px-5 py-3 bg-[#111111] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-200 disabled:opacity-50"
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
                className="w-full px-5 py-3 bg-[#111111] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-300 disabled:opacity-50"
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
                className="w-full px-5 py-3 bg-[#111111] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-300 disabled:opacity-50"
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
                className="w-full px-5 py-3 bg-[#111111] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black transition-all duration-300 animate-fade-in-right delay-300 disabled:opacity-50"
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
                className="w-full px-5 py-3 bg-[#111111] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 text-black resize-y transition-all duration-300 animate-fade-in-right delay-400 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#bb8d03fc] hover:bg-[#876e25fc] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg animate-fade-in-right delay-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting 
                ? "Sending..." 
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
      </div>
    </div>
  );
};

export default ContactUs;