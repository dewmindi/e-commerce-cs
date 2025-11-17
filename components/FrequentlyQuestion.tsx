"use client";
import { Input } from "@/components/ui/input"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FrequentlyQuestion = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("api/faq", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          message: "",
        })
      } else {
        alert("Failed to send email:" + data.error);
      }
    } catch (err: any) {
      alert("Sending email error:" + err.message);
    }
  }

  const faqs = [
  {
    question: "What branding and logo design services do you offer?",
    answer:
      "We provide complete brand identity solutions including custom logo design, brand guidelines, business card design, stationery design, social media branding, and full rebranding packages. Our design process ensures your brand stands out in the Australian market with a strong and memorable identity.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on scope. Smaller tasks may take a few days, while full branding, web development projects require more time.",
  },
  {
    question: "Do you offer revisions?",
    answer:
      "Yes! Revisions are offered depends on the project type to ensure your final design meets your vision and expectations.",
  },
  {
    question: "Do you offer website development services for small businesses?",
    answer:
      "Yes! We specialise in custom, responsive websites for Australian and world-wide small businesses, startups, and growing companies. Whether you need an e-commerce store, service-based website, or landing page, we provide modern, fast, and SEO-friendly web development solutions.",
  },
  {
    question: "How much does a logo or website design cost?",
    answer:
      "Our pricing varies based on your requirements.Logo design packages start from budget-friendly options to premium branding bundles.Web development packages depend on the number of pages, features, and integrations.We offer transparent pricing with no hidden fees. Contact us for a custom quote based on your exact needs.",
  },
  {
    question: "Can you redesign my existing logo or website?",
    answer:
      "Absolutely. We offer professional logo redesign and website revamp services for brands that need a modern look or improved functionality. We preserve your brand identity while enhancing clarity, aesthetic appeal, and user experience.",
  },
  {
    question: "Do you provide ongoing support after completion?",
    answer:
      "Yes, we provide continuous support including maintenance, website updates, content changes, security monitoring, and design upgrades. You can choose from flexible monthly plans or one-time support options.",
  },
  {
    question: "How do I get started with my project?",
    answer:
      "Simply contact us with your requirements. We'll send you a brief form to understand your vision, provide a custom quote, and start the design or development process. Our team makes it easy and hassle-free to bring your brand to life.",
  }   
];

  return (
    <section id='faq' className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch px-4 sm:px-6 lg:px-0'>
      <Accordion
        type="single"
        collapsible
        className="max-w-7xl mx-auto text-white"
        defaultValue="item-1"
      >
        <div>
          <h2 className="text-xl md:text-4xl bg-gradient-to-r from-black via-[#bb8d03fc] to-white text-transparent bg-clip-text text-center">
            FAQ
          </h2>

        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl  text-[#757474] text-center">
            Answers To Your Most Common Questions
          </h2>
        </div>
        {faqs.map((faq, index)=>(
          <AccordionItem key={index} value={`item-${index+1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-4 text-justify'>
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="w-full md:col-span-1">
        <div
          className="border border-[#666666]  p-6 rounded-xl  h-full flex flex-col justify-between py-10"
        >
          <div className=''>
            <div><h3 className="text-2xl sm:text-3xl  text-white text-center mb-2">
              Got a Specific<span className="text-[#bb8d03fc]"> Question?</span>
            </h3></div>
            <div>
              <p className="text-[#666666] md:-mb-20 text-center text">
                Can't find your answer in our FAQs? Drop us a line!
              </p>
            </div>
          </div>

          <div className="md:mt-20">
          </div>

          <form onSubmit={onSubmit} className="flex-grow flex flex-col justify-center space-y-4">
            <Textarea
              required
              id='message'
              rows={4}
              placeholder="Type your custom question here..."
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent resize-none "
            />
            <Input
              type="text"
              id='name'
              placeholder="Your Name (Optional)"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent text-sm"
            />
            <Input
              required
              id='email'
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent text-sm"
            />
            <div className="flex justify-center mt-4">
              <Button className="w-full bg-[#bb8d03fc] hover:bg-[#b69941fc] text-white py-2 rounded-lg font-medium transition-all text-sm">
                Send Question
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>

  )
}

export default FrequentlyQuestion
