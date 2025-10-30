// app/business-card/page.tsx
"use client"
import CategoryPageTemplate from '@/components/CategoryPageTemplate';

// Define your specific data for the Business Card Design page
const businessCardContent = {
    pageTitle: 'Social Media Design',
    headerDescription: 'Designing engaging and branded visuals for social media platforms to help boost your online presence.',
    headerImage: '/sm/sm8.jpeg', // A relevant image for the header
    aboutDescription: "In the fast-paced world of social media, your visuals are your voice. Our Social Media Design services create striking, on-brand graphics that capture attention, drive engagement, and tell your story across all platforms. From Instagram posts and Facebook banners to LinkedIn creatives and YouTube thumbnails, we craft designs that are visually cohesive, audience-focused, and optimized for every screen. By combining creativity with strategic thinking, we help your brand stand out, connect with your followers, and leave a lasting impression in the digital landscape.",
    benefits: [
        "Custom Design Concepts",
        "Print-Ready Files",
        "Double-Sided Options",
        "QR Code Integration"
    ],
    pricingPlans: [
        {
            title: 'Basic',
            price: '$50',
            features: [
                { text: 'Concept - 1', type: 'feature' },
                { text: 'Revisions - 2', type: 'feature' },
                { text: 'Mock Up 1', type: 'feature' },
                { text: 'Source File', type: 'disfeature' },
                { text: 'Deliver - 72 Hours', type: 'feature' },
            ],
        },
        {
            title: 'Standard',
            price: '$70',
            features: [
                { text: 'Concept - 1', type: 'feature' },
                { text: 'Revisions - 5', type: 'feature' },
                { text: 'Mock Up 1', type: 'feature' },
                { text: 'Source File', type: 'disfeature' },
                { text: 'Deliver - 48 Hours', type: 'feature' },
            ],
        },
        {
            title: 'Premium',
            price: '$90',
            features: [
                { text: 'Concept - 1', type: 'feature' },
                { text: 'Revisions - 5', type: 'feature' },
                { text: 'Mock Up 1', type: 'feature' },
                { text: 'Source File', type: 'feature' },
                { text: 'Deliver - 48 Hours', type: 'feature' },
            ],
        },
    ],
    portfolioImages: [
        { image: "/sm/sm1.jpeg", name: "", title: "" },
        { image: "/sm/sm2.jpeg", name: "", title: "" },
        { image: "/sm/sm3.jpeg", name: "", title: "" },
        { image: "/sm/sm8.jpeg", name: "", title: "" },
        { image: "/sm/sm5.jpeg", name: "", title: "" },
        { image: "/sm/sm6.jpeg", name: "", title: "" },
    ],
    faqs: [
        {
            question: "How long does a Social Media Design take?",
            answer: "Typically 2-3 business days for initial concepts, with revisions adding to the timeline."
        },
        {
            question: "What files will I receive?",
            answer: "You'll receive print-ready files (PDF, AI, EPS) and digital versions (JPG, PNG) suitable for online use."
        }
    ],
    callToActionTitle: "Ready to Create Your Perfect Business Card?",
    callToActionDescription: "Let's design a business card that makes a lasting impression and helps you connect with confidence."
};

const page = () => {
    return <CategoryPageTemplate content={businessCardContent} />;
};

export default page;