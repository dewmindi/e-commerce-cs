import type { Metadata } from 'next';
import CategoryPageTemplate, { type CategoryPageContent } from '@/components/CategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Email Signature Design Services Melbourne',
  description: 'Custom professional email signature design in Melbourne. Strengthen your brand in every email you send. Affordable, fast, and unlimited revisions.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/email-signature-design` },
  openGraph: {
    title: 'Email Signature Design Services Melbourne',
    description: 'Custom professional email signature design in Melbourne.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/email-signature-design`,
    type: 'website',
  },
};

const emailSignDesugnContent: CategoryPageContent = {
    pageTitle: 'Email Signature Design',
    headerDescription: 'Developing clean and consistent email signatures to strengthen your brand in every email you send.',
    headerImage: '/letter-head/lh15.jpeg', // A relevant image for the header
    aboutDescription: "Enhance your digital correspondence with our Email Signature Design services. We create professional, visually appealing email signatures that reflect your brand identity and leave a lasting impression with every message. Each signature is designed for clarity, consistency, and functionality, including key details like your name, position, contact information, and social media links. A well-crafted email signature not only adds credibility and professionalism but also strengthens brand recognition in every interaction.",
    benefits: [
        "Custom Design Concepts",
        "Print-Ready Files",
        "Double-Sided Options",
        "QR Code Integration"
    ],
    pricingPlans: [
        {
            title: 'Basic',
            price: '$40',
            features: [
                { text: 'Concept - 1', type: 'feature' },
                { text: 'Revisions - 2', type: 'feature' },
                { text: 'For One Employee', type: 'feature' },
                { text: 'Deliver - 72 Hours', type: 'feature' },
            ],
        },
        {
            title: 'Standard',
            price: '$60',
            features: [
                { text: 'Up to 2 Concepts', type: 'feature' },
                { text: 'Revisions - 2', type: 'feature' },
                { text: 'For 2 Employee', type: 'feature' },
                { text: 'Deliver - 48 Hours', type: 'feature' },
            ],
        },
        {
            title: 'Premium',
            price: '$85',
            features: [
                { text: 'Up to 2 Concepts', type: 'feature' },
                { text: 'Revisions - 2', type: 'feature' },
                { text: 'For 3 Employee', type: 'feature' },
                { text: 'Deliver - 48 Hours', type: 'feature' },
            ],
        },
    ],
    portfolioImages: [
        { image: "/letter-head/lh8.jpeg", name: "", title: "" },
        { image: "/letter-head/lh2.jpeg", name: "", title: "" },
        { image: "/letter-head/lh3.jpeg", name: "", title: "" },
        { image: "/letter-head/lh4.jpeg", name: "", title: "" },
        { image: "/letter-head/lh5.jpeg", name: "", title: "" },
        { image: "/letter-head/lh6.jpeg", name: "", title: "" },
    ],
    faqs: [
        {
            question: "How long does an Email Signature Design take?",
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
    return <CategoryPageTemplate content={emailSignDesugnContent} />;
};

export default page;