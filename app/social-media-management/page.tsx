// app/business-card/page.tsx
"use client"
import CategoryPageTemplate from '@/components/CategoryPageTemplate';

// Define your specific data for the Business Card Design page
const socialMediaGrowthContent = {
  pageTitle: "Social Media Growth & Engagement Boost",
  headerDescription:
    "Grow your audience, increase trust, and elevate your online presence with real follower growth and high-quality post engagement across Facebook, TikTok, and Instagram.",

  headerImage: "/social-media-growth-header.jpg",

  aboutDescription:
    "In today's competitive digital world, a strong social media presence is no longer optional but it's essential. Whether you're a business, influencer, or creator, your follower count and engagement rate play a major role in building credibility and attracting new opportunities. Our Social Media Growth & Engagement Boost service helps you rapidly expand your reach by increasing followers and adding high-quality reactions to your posts. With safe delivery, transparent plans, and fast results, this service is designed to elevate your brand visibility and online reputation.",

  benefits: [
    "Increase followers rapidly from 5,000 up to 100,000",
    "Boost post engagement with 50 to 20,000 reactions",
    "Supports Facebook, TikTok, and Instagram",
    "Safe, secure & no login access required",
    "Build instant trust and social proof",
    "Achieve higher visibility and organic reach",
    "Perfect for businesses, influencers, and personal brands",
    "Custom growth plans available for long-term needs"
  ],

  pricingPlans: [
    {
      title: "Starter Boost",
      price: "$29",
      features: [
        { text: "5,000 Followers (Any Platform)", type: "feature" },
        { text: "50-500 Post Reactions", type: "feature" },
        { text: "Fast Delivery", type: "feature" },
        { text: "Ideal for new creators & small pages", type: "feature" },
      ]
    },
    {
      title: "Growth Plus",
      price: "$79",
      features: [
        { text: "20,000 Followers (Any Platform)", type: "feature" },
        { text: "500-5,000 Reactions", type: "feature" },
        { text: "Priority Delivery Speed", type: "feature" },
        { text: "Custom engagement patterns", type: "feature" },
        { text: "High-quality follower base", type: "feature" }
      ]
    },
    {
      title: "Pro Expansion",
      price: "$149",
      features: [
        { text: "50,000-100,000 Followers", type: "feature" },
        { text: "5,000-20,000 Reactions", type: "feature" },
        { text: "Top-tier delivery & bulk discounts", type: "feature" },
        { text: "Perfect for brands & influencers", type: "feature" },
        { text: "Custom long-term growth support", type: "feature" },
      ]
    }
  ],

  processDescription:
    "Our Social Media Growth & Engagement Boost service follows a simple and secure process designed to give you fast, long-lasting results. First, you choose the platform (Facebook, Instagram, or TikTok) and select your preferred follower or reaction plan. Next, you provide the link to your profile or post, no password or account access is ever required. Our team then begins safe, staged delivery to ensure natural-looking growth and consistent engagement. Throughout the process, your account remains completely secure while your online presence grows rapidly. Whether you need followers, reactions, or both, our optimized delivery ensures you get maximum impact with zero risk.",

  portfolioImages: [
    {
      image: "/portfolio-social1.jpg",
      name: "Instagram Growth",
      title: "25,000 Follower Boost"
    },
    {
      image: "/portfolio-social2.jpg",
      name: "TikTok Boost",
      title: "10,000 Likes & Reactions"
    },
    {
      image: "/portfolio-social3.jpg",
      name: "Facebook Engagement",
      title: "5,000 Post Reactions"
    }
  ],

  faqs: [
    {
      question: "Is my account safe?",
      answer:
        "Yes. We do not require your password or account access. You only provide the profile or post link."
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery depends on the plan, usually from a few hours to a few days. Larger orders are completed in controlled stages to ensure safety."
    },
    {
      question: "Are the followers real?",
      answer:
        "We provide high-quality followers suitable for social proof, branding, and page credibility. These followers help you boost visibility and trust."
    },
    {
      question: "Can I order multiple times?",
      answer:
        "Yes. Many clients purchase ongoing plans to maintain consistent growth and engagement."
    },
    {
      question: "Do reactions look natural?",
      answer:
        "Absolutely. Reactions are delivered in a natural-patterned flow, ensuring your posts receive balanced and realistic engagement."
    }
  ],

  callToActionTitle: "Ready to Boost Your Social Presence?",
  callToActionDescription:
    "Get more followers, higher engagement, and stronger visibility with a powerful growth plan that fits your goals. Start boosting your social media presence today!"
};

const page = () => {
    return <CategoryPageTemplate content={socialMediaGrowthContent} />;
};

export default page;