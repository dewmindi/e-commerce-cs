import type { Metadata } from 'next';
import CategoryPageTemplate, { type CategoryPageContent } from '@/components/CategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Packaging, Label & Sticker Design Melbourne',
  description: 'Professional packaging, label, and sticker design in Melbourne. Stand out on shelves with eye-catching designs. Unlimited revisions, print-ready files included.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/label-design` },
  openGraph: {
    title: 'Packaging, Label & Sticker Design Melbourne',
    description: 'Professional packaging, label, and sticker design in Melbourne. Stand out on shelves.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/label-design`,
    type: 'website',
  },
};

const businessCardContent: CategoryPageContent = {
    pageTitle: 'Packaging, Label & Sticker Design',
    headerDescription: 'Creating attractive and functional packaging and labels that stand out on shelves and speak to your audience.',
    headerImage: '/packaging/pack5.jpeg', // A relevant image for the header
    aboutDescription: "Your product deserves packaging that not only protects but also captivates. Our Packaging & Label Design services combine creativity, strategy, and functionality to craft designs that stand out on the shelf and resonate with your target audience. From bold, eye-catching labels to innovative, sustainable packaging solutions, we ensure every element reflects your brand identity while enhancing the customer experience. Whether it’s a luxury product, everyday essential, or niche item, our designs communicate quality, inspire trust, and make your brand unforgettable.",
    benefits: [
        "Custom Design Concepts",
        "Print-Ready Files",
        "Double-Sided Options",
        "QR Code Integration"
    ],
    pricingPlans: [],
    portfolioImages: [
        { image: "/packaging/pack8.jpeg", name: "", title: "" },
        { image: "/packaging/pack7.jpeg", name: "", title: "" },
        { image: "/packaging/pack8.jpeg", name: "", title: "" },
        { image: "/packaging/pack15.jpeg", name: "", title: "" },
    ],
    faqs: [
        {
            question: "How long does a Packaging & Label Design take?",
            answer: "Typically 3-5 business days for initial concepts, with revisions adding to the timeline."
        },
        {
            question: "What files will I receive?",
            answer: "You'll receive print-ready files (PDF, AI, EPS) and digital versions (JPG, PNG) suitable for online use."
        }
    ],
    callToActionTitle: "Ready to Create Your Perfect Packaging & Label Design?",
    callToActionDescription: "Let's design a Packaging & Label Design that makes a lasting impression ."
};

const page = () => {
    return <CategoryPageTemplate content={businessCardContent} />;
};

export default page;