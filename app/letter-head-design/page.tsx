import type { Metadata } from 'next';
import CategoryPageTemplate, { type CategoryPageContent } from '@/components/CategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Letterhead Design Services Melbourne',
  description: 'Professional branded letterhead design in Melbourne. Add a polished, professional look to your official correspondence. Fast turnaround, unlimited revisions.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/letter-head-design` },
  openGraph: {
    title: 'Letterhead Design Services Melbourne',
    description: 'Professional branded letterhead design in Melbourne.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/letter-head-design`,
    type: 'website',
  },
};

const letterHeadContent: CategoryPageContent = {
    pageTitle: 'Letter Head Design',
    headerDescription: 'Designing branded letterheads that add a polished, professional touch to your official correspondence.',
    headerImage: '/letter-head/lh1.jpeg', // A relevant image for the header
    aboutDescription: "Elevate your business communications with our Letterhead Design services. We create professional, branded letterheads that convey credibility, consistency, and attention to detail. Each design is crafted to reflect your company’s identity while maintaining clarity and elegance, ensuring that every document you send leaves a lasting impression. Whether for formal correspondence, proposals, or internal communications, a well-designed letterhead strengthens your brand image and reinforces professionalism in every message.",
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
                { text: 'Printable File', type: 'feature' },
                { text: 'Revisions - 2', type: 'feature' },
                { text: 'Mock Up 1', type: 'feature' },
                { text: 'For One Employee', type: 'feature' },
                { text: 'Word File', type: 'disfeature' },
                { text: 'Source File', type: 'disfeature' }, 
                { text: 'Deliver - 72 Hours', type: 'feature' },  
            ],
        },
        {
            title: 'Standard',
            price: '$60',
            features: [
                { text: 'Up to  2 Concepts', type: 'feature' },
                { text: 'Printable File', type: 'feature' },
                { text: 'Revisions - 3', type: 'feature' },
                { text: 'Mock Up 4', type: 'feature' },
                { text: 'For 2 Employee', type: 'feature' },
                { text: 'Word File', type: 'feature' },
                { text: 'Source File', type: 'feature' }, 
                { text: 'Deliver - 48 Hours', type: 'feature' }, 
            ],
        },
        {
            title: 'Premium',
            price: '$85',
            features: [
                { text: 'Up to  2 Concepts', type: 'feature' },
                { text: 'Printable File', type: 'feature' },
                { text: 'Revisions - 6', type: 'feature' },
                { text: 'Mock Up 1', type: 'feature' },
                { text: 'For 3 Employee', type: 'feature' },
                { text: 'Word File', type: 'feature' },
                { text: 'Source File', type: 'feature' }, 
                { text: 'Deliver - 48 Hours', type: 'feature' }, 
                // { text: 'Letter Head Design', type: 'exfeature' }, // Marked as exfeature
                // { text: 'Business Card Design', type: 'exfeature' }, // Marked as exfeature
                // { text: 'Free Logo Intro Video', type: 'exfeature' }, // Marked as exfeature
            ],
        },
    ],
    portfolioImages: [
        { image: "/letter-head/lh8.jpeg", name: "", title: "" },
        { image: "/letter-head/lh2.jpeg", name: "", title: "" },
        { image: "/letter-head/lh3.jpeg", name: "", title: "" },
        { image: "/letter-head/lh8.jpeg", name: "", title: "" },
        { image: "/letter-head/lh5.jpeg", name: "", title: "" },
        { image: "/letter-head/lh6.jpeg", name: "", title: "" },
    ],
    faqs: [
        {
            question: "How long does a Letter Head Design take?",
            answer: "Typically 2-3 business days for initial concepts, with revisions adding to the timeline."
        },
        {
            question: "What files will I receive?",
            answer: "You'll receive print-ready files (PDF, AI, EPS) and digital versions (JPG, PNG) suitable for online use."
        }
    ],
    callToActionTitle: "Ready to Create Your Perfect Letter Head?",
    callToActionDescription: "Let's design a letter head that makes a lasting impression and helps you connect with confidence."
};

const page = () => {
    return <CategoryPageTemplate content={letterHeadContent} />;
};

export default page;