import type { Metadata } from 'next';
import CategoryPageTemplate, { type CategoryPageContent } from '@/components/CategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Book & Magazine Design Services Melbourne',
  description: 'Professional book cover and magazine layout design in Melbourne. High-quality print-ready designs for publishers, authors, and businesses.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/book-magazine-design` },
  openGraph: {
    title: 'Book & Magazine Design Services Melbourne',
    description: 'Professional book cover and magazine layout design in Melbourne.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/book-magazine-design`,
    type: 'website',
  },
};

// Define your specific data for the Business Card Design page
const bookMagazineContent: CategoryPageContent = {
    pageTitle: 'Book & Magazine Design',
    headerDescription: 'Laying out and designing books and magazines with attention to readability, structure, and visual appeal.',
    headerImage: '/ServiceImages/book.jpeg', // A relevant image for the header
    aboutDescription: "Bring your stories and ideas to life with our Book & Magazine Design services. We specialize in creating visually stunning layouts that balance aesthetics and readability, making every page engaging and easy to navigate. From eye-catching covers to thoughtfully arranged interiors, our designs reflect your brand identity and resonate with your audience. Whether it’s a captivating magazine, a professional corporate publication, or a beautifully crafted book, we ensure each project leaves a lasting impression, turning readers into loyal fans.",
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
            question: "How long does a Book & Magazine design take?",
            answer: "Typically 3-5 business days for initial concepts, with revisions adding to the timeline."
        },
        {
            question: "What files will I receive?",
            answer: "You'll receive print-ready files (PDF, AI, EPS) and digital versions (JPG, PNG) suitable for online use."
        }
    ],
    callToActionTitle: "Ready to Create Your Perfect Book or Magazine?",
    callToActionDescription: "Let's design a book or magazine that makes a lasting impression and helps you connect with confidence."
};

const page = () => {
    return <CategoryPageTemplate content={bookMagazineContent} />;
};

export default page;