"use client";

import Header from "@/components/Header";
import FooterNew from "@/components/FooterNew";
import ContactUs from "@/components/ContactUs";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

const contactDetails = [
  {
    icon: <MapPin className="w-6 h-6 text-[#bb8d03fc]" />,
    label: "Our Location",
    value: "Hallam, Melbourne VIC, Australia",
  },
  {
    icon: <Phone className="w-6 h-6 text-[#bb8d03fc]" />,
    label: "Phone",
    value: "+61 450 883 822",
    href: "tel:+61450883822",
  },
  {
    icon: <Mail className="w-6 h-6 text-[#bb8d03fc]" />,
    label: "Email",
    value: "info@csgraphicmeta.com.au",
    href: "mailto:info@csgraphicmeta.com.au",
  },
  // {
  //   icon: <Clock className="w-6 h-6 text-[#bb8d03fc]" />,
  //   label: "Business Hours",
  //   value: "Mon – Fri: 9:00 AM – 6:00 PM AEST",
  // },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/csgraphicmeta",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/csgraphicmeta",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/csgraphicmeta",
    icon: <Linkedin className="w-5 h-5" />,
  },
  // {
  //   label: "X",
  //   href: "https://x.com/csgraphicmeta",
  //   icon: (
  //     <svg
  //       viewBox="0 0 24 24"
  //       fill="currentColor"
  //       className="w-5 h-5"
  //       aria-hidden="true"
  //     >
  //       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.977l4.256 5.628zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  //     </svg>
  //   ),
  // },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-foreground text-white">
      {/* <Header /> */}

      {/* Hero */}
      <section className="py-16 pt-28 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f] border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#bb8d03fc] uppercase tracking-widest text-sm font-semibold mb-3">
            Get In Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Need a quote? Or just want to say hello?
            We&apos;d love to hear from you. Our team is ready to help.
          </p>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#111111]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {contactDetails.map((item) => (
            <div
              key={item.label}
              className="bg-[#181818] border border-gray-800 rounded-2xl p-6 flex flex-col gap-3 hover:border-[#bb8d03fc] transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#222] flex items-center justify-center">
                {item.icon}
              </div>
              <p className="text-sm text-gray-500 font-medium">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-white font-semibold hover:text-[#bb8d03fc] transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-white font-semibold">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-[#0f0f0f]">
        <ContactUs />
      </section>

      {/* Social Links */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#111111] border-t border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Follow Us</h2>
          <p className="text-gray-400 mb-8">
            Stay connected for design tips, project showcases, and special offers.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {socialLinks.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#181818] border border-gray-700 text-gray-300 hover:text-[#bb8d03fc] hover:border-[#bb8d03fc] transition-all duration-300 text-sm font-medium"
              >
                {s.icon}
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterNew />
    </div>
  );
}
