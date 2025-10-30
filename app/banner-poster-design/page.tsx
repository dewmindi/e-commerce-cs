// app/business-card/page.tsx
"use client"
import CategoryPageTemplate from '@/components/CategoryPageTemplate';

// Define your specific data for the Business Card Design page
const businessCardContent = {
    pageTitle: 'Banner, Poster & Cover Design',
    headerDescription: 'Producing bold and attention-grabbing designs for banners, posters, and covers that communicate your message clearly.',
    headerImage: '/ServiceImages/banner.jpeg', // A relevant image for the header
    aboutDescription: "Make a bold statement with our Banner, Poster & Cover Design services. We create visually striking designs that capture attention, communicate your message clearly, and reflect your brand identity. Whether it’s a large-format banner, a promotional poster, or an engaging book or social media cover, our designs combine creativity, impact, and readability. Each project is crafted to leave a lasting impression, inspire action, and help your brand stand out in both digital and print spaces.",
    benefits: [
        "Custom Design Concepts",
        "Print-Ready Files",
        "Double-Sided Options",
        "QR Code Integration"
    ],
    pricingPlans: [],
    portfolioImages: [
        { image: "/logo-designs/logoDesign1.jpeg", name: "", title: "" },
        { image: "/logo-designs/logoDesign2.jpeg", name: "", title: "" },
        { image: "/logo-designs/logoDesign3.jpeg", name: "", title: "" },
        { image: "/logo-designs/logoDesign8.jpeg", name: "", title: "" },
        { image: "/logo-designs/logoDesign5.jpeg", name: "", title: "" },
        { image: "/logo-designs/logoDesign6.jpeg", name: "", title: "" },
    ],
    faqs: [
        {
            question: "How long does a Banner, Poster or Cover Design take?",
            answer: "Typically 3-5 business days for initial concepts, with revisions adding to the timeline."
        },
        {
            question: "What files will I receive?",
            answer: "You'll receive print-ready files (PDF, AI, EPS) and digital versions (JPG, PNG) suitable for online use."
        }
    ],
    callToActionTitle: "Ready to Create Your Perfect Banner, Poster or Cover Design?",
    callToActionDescription: "Let's design your sales boosting Banner, Poster or Cover Design ."
};

const page = () => {
    return <CategoryPageTemplate content={businessCardContent} />;
};

export default page;