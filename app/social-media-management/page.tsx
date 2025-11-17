// // app/business-card/page.tsx
// "use client"
// import CategoryPageTemplate from '@/components/CategoryPageTemplate';

// // Define your specific data for the Business Card Design page
// const socialMediaGrowthContent = {
//   pageTitle: "Social Media Growth & Engagement Boost",
//   headerDescription:
//     "Grow your audience, increase trust, and elevate your online presence with real follower growth and high-quality post engagement across Facebook, TikTok, and Instagram.",

//   headerImage: "/social-media-growth-header.jpg",

//   aboutDescription:
//     "In today's competitive digital world, a strong social media presence is no longer optional but it's essential. Whether you're a business, influencer, or creator, your follower count and engagement rate play a major role in building credibility and attracting new opportunities. Our Social Media Growth & Engagement Boost service helps you rapidly expand your reach by increasing followers and adding high-quality reactions to your posts. With safe delivery, transparent plans, and fast results, this service is designed to elevate your brand visibility and online reputation.",

// benefits: [
//   "Increase followers rapidly from 5,000 up to 100,000",
//   "Boost post engagement with 50 to 20,000 reactions",
//   "Supports Facebook, TikTok, and Instagram",
//   "Safe, secure & no login access required",
//   "Build instant trust and social proof",
//   "Achieve higher visibility and organic reach",
//   "Perfect for businesses, influencers, and personal brands",
//   "Custom growth plans available for long-term needs"
// ],

//   pricingPlans: [
// {
//   title: "Starter Boost",
//   price: "$29",
//   features: [
//     { text: "5,000 Followers (Any Platform)", type: "feature" },
//     { text: "50-500 Post Reactions", type: "feature" },
//     { text: "Fast Delivery", type: "feature" },
//     { text: "Ideal for new creators & small pages", type: "feature" },
//   ]
// },
// {
//   title: "Growth Plus",
//   price: "$79",
//   features: [
//     { text: "20,000 Followers (Any Platform)", type: "feature" },
//     { text: "500-5,000 Reactions", type: "feature" },
//     { text: "Priority Delivery Speed", type: "feature" },
//     { text: "Custom engagement patterns", type: "feature" },
//     { text: "High-quality follower base", type: "feature" }
//   ]
// },
// {
//   title: "Pro Expansion",
//   price: "$149",
//   features: [
//     { text: "50,000-100,000 Followers", type: "feature" },
//     { text: "5,000-20,000 Reactions", type: "feature" },
//     { text: "Top-tier delivery & bulk discounts", type: "feature" },
//     { text: "Perfect for brands & influencers", type: "feature" },
//     { text: "Custom long-term growth support", type: "feature" },
//   ]
// }
//   ],

//   processDescription:
//     "Our Social Media Growth & Engagement Boost service follows a simple and secure process designed to give you fast, long-lasting results. First, you choose the platform (Facebook, Instagram, or TikTok) and select your preferred follower or reaction plan. Next, you provide the link to your profile or post, no password or account access is ever required. Our team then begins safe, staged delivery to ensure natural-looking growth and consistent engagement. Throughout the process, your account remains completely secure while your online presence grows rapidly. Whether you need followers, reactions, or both, our optimized delivery ensures you get maximum impact with zero risk.",

//   portfolioImages: [
//     {
//       image: "/portfolio-social1.jpg",
//       name: "Instagram Growth",
//       title: "25,000 Follower Boost"
//     },
//     {
//       image: "/portfolio-social2.jpg",
//       name: "TikTok Boost",
//       title: "10,000 Likes & Reactions"
//     },
//     {
//       image: "/portfolio-social3.jpg",
//       name: "Facebook Engagement",
//       title: "5,000 Post Reactions"
//     }
//   ],

//   faqs: [
//     {
//       question: "Is my account safe?",
//       answer:
//         "Yes. We do not require your password or account access. You only provide the profile or post link."
//     },
//     {
//       question: "How long does delivery take?",
//       answer:
//         "Delivery depends on the plan, usually from a few hours to a few days. Larger orders are completed in controlled stages to ensure safety."
//     },
//     {
//       question: "Are the followers real?",
//       answer:
//         "We provide high-quality followers suitable for social proof, branding, and page credibility. These followers help you boost visibility and trust."
//     },
//     {
//       question: "Can I order multiple times?",
//       answer:
//         "Yes. Many clients purchase ongoing plans to maintain consistent growth and engagement."
//     },
//     {
//       question: "Do reactions look natural?",
//       answer:
//         "Absolutely. Reactions are delivered in a natural-patterned flow, ensuring your posts receive balanced and realistic engagement."
//     }
//   ],

//   callToActionTitle: "Ready to Boost Your Social Presence?",
//   callToActionDescription:
//     "Get more followers, higher engagement, and stronger visibility with a powerful growth plan that fits your goals. Start boosting your social media presence today!"
// };

// const page = () => {
//     return <CategoryPageTemplate content={socialMediaGrowthContent} />;
// };

// export default page;




"use client"
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useState } from 'react';
import { PlusIcon, Check } from 'lucide-react';
import Header from '@/components/Header';
import { AnimatePresence, motion } from 'framer-motion';
import { useInViewAnimation } from '@/utils/inviewAnimation';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"

import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import FooterNew from '@/components/FooterNew';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';

// Define the types for your data structures to ensure type safety
interface Benefit {
  text: string;
}

interface PricingPlanFeature {
  text: string;
  type: 'feature' | 'disfeature' | 'exfeature'; // To differentiate between included, excluded, and extra
}

interface PricingPlan {
  title: string;
  price: string;
  features: PricingPlanFeature[];
}

interface FAQ {
  question: string;
  answer: string;
}

interface ProjectImage {
  image: string;
  name: string;
  title: string;
}

interface CategoryPageContent {
  pageTitle: string;
  headerDescription: string;
  headerImage: string;
  aboutDescription: string;
  benefits: string[]; // Simple array of strings for now
  pricingPlans?: PricingPlan[];
  portfolioImages: ProjectImage[];
  faqs: FAQ[];
  callToActionTitle: string;
  callToActionDescription: string;
  processDescription: string;
}

interface CategoryPageTemplateProps {
  content: CategoryPageContent;
}

const socialMediaGrowthContent = () => {
  const router = useRouter();
  const { ref, sectionVariants, variants } = useInViewAnimation();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string, href?: string) => {

    if (pathname === "/") {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push(`#${sectionId}`)
    }
  }
  // Correctly initialize useCart
  const { addToCart } = useCart();

  // The function you wrote, adjusted to match the `plan` object structure
  const handleAddToCart = (plan: PricingPlan) => {
    // You'll need to clean the price string, e.g., remove '$'
    const price = parseFloat(plan.price.replace(/[^0-9.]/g, ''));

    addToCart({
      id: plan.title, // Use title as a unique ID
      title: plan.title + "-" + content.pageTitle,
      price: price,
      quantity: 1,
      image: '/cs-logo.png', // Or a better image URL if available
      category: content.pageTitle, // Use the current page title as the category
    });
  };

  const [form, setForm] = useState({
    project: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (file) {
        formData.append("file", file);
      }
      const res = await fetch("api/quotation", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        setSubmitted(true);
        setForm({
          project: content.pageTitle,
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setFile(null);
      } else {
        alert("Failed to send email:" + data.error);
      }
    } catch (err: any) {
      alert("Sending email error:" + err.message);
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const features = [
    "Increase followers rapidly from 5,000 up to 100,000",
    "Boost post engagement with 50 to 20,000 reactions",
    "Supports Facebook, TikTok, and Instagram",
    "Safe, secure & no login access required",
    "Build instant trust and social proof",
    "High-quality follower base",
    "Achieve higher visibility and organic reach",
    "Perfect for businesses, influencers, and personal brands",
    "Custom growth plans available for long-term needs",
    "Top-tier delivery & bulk discounts",
    "Custom long-term growth support",
  ]

  const pricingPlans = [
    {
      title: "Starter",
      price: "400",
      features: [
        { text: "Increase followers rapidly from 5,000 up to 100,000", type: "feature" },
        { text: "Boost post engagement with 50 to 20,000 reactions", type: "feature" },
        { text: "Supports Facebook, TikTok, and Instagram", type: "feature" },
        { text: "Safe, secure & no login access required", type: "feature" },
        { text: "Build instant trust and social proof", type: "feature" },
        { text: "High-quality follower base", type: "feature" },
        { text: "Achieve higher visibility and organic reach", type: "feature" },
        { text: "Perfect for businesses, influencers, and personal brands", type: "feature" },
        { text: "Custom growth plans available for long-term needs", type: "feature" },
        { text: "Top-tier delivery & bulk discounts", type: "feature" },
        { text: "Custom long-term growth support", type: "feature" },
      ]
    },
  ]

  const benefits = ["Builds brand credibility and professionalism", "Strengthens your brand identity", "Works as a long-term marketing asset", "Shows organization, clarity, and business maturity"]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="py-6 inset-0 bg-pattern-dots opacity-10"></div>
      <AnimatePresence mode="wait">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sectionVariants}
          className=""
        >
          {/* --- Header Section --- */}
          <section className="bg-gradient-to-r from-[#bb8d03fc] to-[#211f0b] text-white py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
              {/* <Image
                                src={content.headerImage}
                                alt={`${content.pageTitle} Background`}
                                layout="fill"
                                objectFit="cover"
                                className="scale-105"
                            /> */}
            </div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-4xl sm:text-4xl font-extrabold mb-2 drop-shadow-md">
                Social Media Growth
              </h2>
              <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-90 drop-shadow-sm">
                Grow your audience, increase trust, and elevate your online presence with real follower growth and high-quality post engagement across Facebook, TikTok, and Instagram.
              </p>
              <Button
                onClick={() => router.push('/projects')}
                className="mt-3 bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-8 py-3 rounded-lg font-bold text-lg shadow-md transition-all duration-300 hover:scale-105"
              >
                &larr; View All Categories
              </Button>
            </div>
          </section>
          <section className="bg-black py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto ">
            <div className=" text-center">

              <h2 className="text-2xl md:text-4xl bg-gradient-to-r text-white text-transparent bg-clip-text mb-12">
                Added Features
              </h2>

              {/* Use grid layout with equal-height columns */}
              <div className="grid grid-cols-1 w-[400px] gap-8 items-stretch mx-auto">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={index}
                    className="bg-black border border-zinc-700 text-white rounded-xl p-8  hover:shadow-xl transition-shadow duration-300  h-full flex flex-col justify-between"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">{plan.title}</h3>
                      <p className="text-5xl font-extrabold text-[#e2c363fc] mb-6">A{formatCurrency(plan.price)}</p>
                      <ul className="text-left text-gray-300 mb-8 space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className={`flex items-center ${feature.type === 'disfeature' ? 'text-gray-500 line-through' : ''}`}
                          >
                            {feature.type === 'feature' && (
                              <Check className="w-5 h-5 mr-3 flex-shrink-0 text-[#e2c363fc]" />
                            )}
                            {feature.type === 'disfeature' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#7f7e7dfc] mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                            {feature.type === 'exfeature' && (
                              <PlusIcon className="text-[#bb8d03fc] mr-2" size={20} />
                            )}
                            {feature.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      // ADDED onClick handler here
                      onClick={() => scrollToSection("quote")}
                      className="bg-black border border-[#FFC107] text-background hover:bg-[#FFC107] hover:text-black px-8 py-3 rounded-lg  text-lg shadow-md transition-all duration-300 hover:scale-105 mt-auto">
                      Get a quote
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className='flex flex-col bg-black py-16 px-4 sm:px-6 lg:px-8 items-center '>
            <h2 className="text-3xl sm:text-4xl text-background  mb-4 ">
              Get a Quote
            </h2>
            <p className="text-lg text-[#666666] mb-8 max-w-4xl text-justify">
              Our pricing is tailored to your project needs. Since design requirements can vary,
              the final cost will depend on your specific goals and preferences.
              Please share your basic details and a short note about your requirements.
              One of our team members will reach out to discuss further and provide a personalized estimate.
            </p>
            <form id='quote' onSubmit={onSubmit} className="border p-8 rounded-lg shadow-md space-y-6 text-left w-[500px]" encType="multipart/form-data ">
              <Input
                type="text"
                id='name'
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full px-3 py-2  bg-[#111111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent text-sm"
              />
              <Input
                required
                id='email'
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full px-3 py-2 bg-[#111111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent text-sm"
              />
              <Input
                required
                id='phone'
                type="phone"
                placeholder="Contact Number"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full px-3 py-2 bg-[#111111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent text-sm"
              />
              <Textarea
                required
                id='message'
                rows={4}
                placeholder={`Project Note(Please briefly describe your requirements. We'll connect with you soon for details.)`}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full px-3 py-2 bg-[#111111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#bb8d03fc] focus:border-transparent resize-none text-sm"
              />
              {/* ADDED FILE UPLOAD INPUT */}
              <div>
                {/* <label className="block text-sm font-medium text-[#333333]">Attach Files</label> */}
                <input
                  id='file'
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="mt-1 block w-full text-sm text-[#333333]
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-sm file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-[#bb8d03fc] file:text-white
                                                    hover:file:bg-[#e2c363fc]"
                />
              </div>
              <Button type="submit" className="bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-8 py-3 rounded-lg font-bold text-lg shadow-md transition-all duration-300 hover:scale-105">
                Submit Request
              </Button>
            </form>
          </section>


          {/* --- NEW: Optional "Process" Section (with Read More) --- */}

          <section className="bg-black py-16 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl  text-white mb-8">
                The Process We Follow
              </h2>
              <p className="text-lg text-[#666666] leading-relaxed mb-4 text-justify">
                Our Social Media Growth & Engagement Boost service follows a simple and secure process designed to give you fast, long-lasting results.
                First, you choose the platform (Facebook, Instagram, or TikTok) and select your preferred follower or reaction plan. Next, you provide
                the link to your profile or post, no password or account access is ever required. Our team then begins safe, staged delivery to ensure
                natural-looking growth and consistent engagement. Throughout the process, your account remains completely secure while your online presence
                grows rapidly. Whether you need followers, reactions, or both, our optimized delivery ensures you get maximum impact with zero risk.
              </p>
              {/* <h2 className="text-3xl sm:text-4xl font-bold text-white mt-8 mb-8">What we Offer</h2>
                            <ul className='grid justify-center text-start md:grid-cols-4 sm:grid-cols-1 text-[#666666] gap-2'>
                                {content.benefits.map((text, id) => (
                                    <li key={id}>✅ {text}</li>
                                ))}
                            </ul> */}
            </div>
          </section>


        </motion.div>
      </AnimatePresence>

      {/* --- Call to Action Section --- */}
      <section className="bg-gradient-to-r from-[#bb8d03fc] to-[#ada661] py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 ">Ready to Boost Your Social Presence?</h2>
          <p className="text-lg mb-8 opacity-90 leading-tight">
            Get more followers, higher engagement, and stronger visibility with a powerful growth plan that fits your goals. Start boosting your social media presence today!
          </p>
          <Link href="/#contact">
            <Button className="bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-10 py-4 rounded-lg font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105">
              Get a Free Quote Now
            </Button>
          </Link>
        </div>
      </section>
      <FooterNew />
    </div>
  );
};

export default socialMediaGrowthContent;