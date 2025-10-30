// app/business-card/page.tsx
"use client"
import CategoryPageTemplate from '@/components/CategoryPageTemplate';

// Define your specific data for the Business Card Design page
const businessCardContent = {
    pageTitle: 'Other Advertising Design',
    headerDescription: 'Designing engaging and branded visuals for social media platforms to help boost your online presence.',
    headerImage: '/sm/sm8.jpeg', // A relevant image for the header
    aboutDescription: "Social media is a visual space. We design custom social media graphics that enhance your brand's presence, increase engagement, and keep your profiles looking professional and cohesive.",
    benefits: [
        "Custom Design Concepts",
        "Print-Ready Files",
        "Double-Sided Options",
        "QR Code Integration"
    ],
    pricingPlans: [
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
    callToActionTitle: "Ready to Create Your Sales Boosting Soical Designs?",
    callToActionDescription: "Let's design that makes a lasting impression and helps you connect with confidence."
};

const page = () => {
    return <CategoryPageTemplate content={businessCardContent} />;
};

export default page;