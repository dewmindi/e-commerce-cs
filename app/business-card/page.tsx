// app/business-card/page.tsx
"use client"
import CategoryPageTemplate from '@/components/CategoryPageTemplate';

// Define your specific data for the Business Card Design page
const businessCardContent = {
    pageTitle: 'Business Card Design',
    headerDescription: 'Creating professional and eye-catching business cards that represent your brand in every handshake.',
    headerImage: '/business-cards/bc2.jpeg', // A relevant image for the header
    aboutDescription: "Make every first impression count with our Business Card Design services. We create professional, memorable, and visually appealing cards that reflect your brand identity and leave a lasting impact. Whether you prefer sleek and minimalistic designs or bold and creative layouts, each card is crafted to convey professionalism, credibility, and style. A well-designed business card not only shares your contact information but also tells your brand story at a glance, helping you stand out in any networking opportunity.",
    benefits: [
        "Custom Design Concepts",
        "Print-Ready Files",
        "Double-Sided Options",
        "QR Code Integration"
    ],
    pricingPlans: [
        {
            title: 'Basic',
            price: '$35',
            features: [
                { text: 'Double Side Design', type: 'feature' },
                { text: 'Concept - 1', type: 'feature' },
                { text: 'Printable File', type: 'feature' },
                { text: 'Revisions - 2', type: 'feature' },
                { text: 'For One Employee', type: 'feature' },
                { text: 'Mock Up - 1', type: 'feature' },
                { text: 'Deliver - 72 Hours', type: 'feature' }, 
                { text: 'Source File', type: 'disfeature' }, 
            ],
        },
        {
            title: 'Standard',
            price: '$60',
            features: [
                { text: 'Double Side Design', type: 'feature' },
                { text: 'Up to  2 Concepts', type: 'feature' },
                { text: 'Printable File', type: 'feature' },
                { text: 'Revisions - 4', type: 'feature' },
                { text: 'For 2 Employee', type: 'feature' },
                { text: 'Mock Up - 1', type: 'feature' },
                { text: 'Deliver - 48 Hours', type: 'feature' }, // Marked as disfeature
                { text: 'Source File', type: 'feature' },
            ],
        },
        {
            title: 'Premium',
            price: '$85',
            features: [
                { text: 'Double Side Design', type: 'feature' },
                { text: 'Up to 3 Concepts', type: 'feature' },
                { text: 'Printable File', type: 'feature' },
                { text: 'Revisions - 6', type: 'feature' },
                { text: 'For 2 Employee', type: 'feature' },
                { text: 'Mock Up - 1', type: 'feature' },
                { text: 'Deliver - 48 Hours', type: 'feature' },
                { text: 'Source File', type: 'feature' },
            ],
        },
    ],
    portfolioImages: [
        { image: "/business-cards/bc1.jpeg", name: "", title: "" },
        { image: "/business-cards/bc2.jpeg", name: "", title: "" },
        { image: "/business-cards/bc3.jpeg", name: "", title: "" },
        { image: "/business-cards/bc8.jpeg", name: "", title: "" },
        { image: "/business-cards/bc5.jpeg", name: "", title: "" },
        { image: "/business-cards/bc6.jpeg", name: "", title: "" },
    ],
    faqs: [
        {
            question: "How long does business card design take?",
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