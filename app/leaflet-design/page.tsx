"use client"
import CategoryPageTemplate from '@/components/CategoryPageTemplate';

// Define your specific data for the Business Card Design page
const businessCardContent = {
    pageTitle: 'Leaflet, Flyer & Brochure Design',
    headerDescription: 'Designing informative and visually appealing print materials to effectively promote your business or events.',
    headerImage: '/ServiceImages/leaflet.jpeg', // A relevant image for the header
    aboutDescription: "Make every page count with our Leaflet, Flyer & Brochure Design services. We craft visually compelling and strategically designed print materials that communicate your brand message clearly and effectively. Whether you need a bold flyer to promote an event, an informative leaflet for your products, or a detailed brochure to showcase your services, our designs combine creativity, readability, and brand consistency. Each piece is designed to grab attention, engage your audience, and leave a lasting impression, helping you connect with customers both on paper and in their minds.",
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
            question: "How long does a Leaflet, Flyer & Brochure Design take?",
            answer: "Typically 3-5 business days for initial concepts, with revisions adding to the timeline."
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