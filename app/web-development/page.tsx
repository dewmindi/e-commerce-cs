import type { Metadata } from 'next';
import CategoryPageTemplate, { type CategoryPageContent } from '@/components/CategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Web Development Services Melbourne | Custom Websites',
  description: 'Professional web development services in Melbourne. We build fast, responsive, SEO-friendly websites and web apps tailored to your business needs. Get a free quote!',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/web-development` },
  openGraph: {
    title: 'Web Development Services Melbourne | Custom Websites',
    description: 'Professional web development services in Melbourne. Fast, responsive, SEO-friendly websites.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/web-development`,
    type: 'website',
  },
};

// Define your specific data for the Business Card Design page
const webDevelopmentContent : CategoryPageContent = {
    pageTitle: 'Business Website Development',
    headerDescription: '✨ Your online presence starts here.',
    headerImage: '/ServiceImages/web.jpeg', // A relevant image for the header
    aboutDescription: "A website is the digital storefront of your business which is simple, professional, and built to make a strong first impression. Whether you're a small business owner, a freelancer, or a personal brand, this package gives you a clean, mobile-friendly website that communicates your story without unnecessary complexity. Perfect for startups, local businesses, and individuals who want to establish credibility online.",
    benefits: [
        "Modern, responsive design that works on all devices",
        "Pages like Home, About, Services, and Contact",
        "Easy navigation for your visitors",
        "SEO-friendly structure to appear on Google",
        "A foundation you can grow later into a larger site"
    ],
    pricingPlans: [
        {
            title: 'Basic',
            price: '$550',
            features: [
                { text: 'Up to 4 pages', type: 'feature' },
                { text: 'Responsive design (mobile-friendly)', type: 'feature' },
                { text: 'Chat & call buttons Integration', type: 'feature' },
                { text: 'Basic SEO setup (meta tags, sitemap)', type: 'feature' },
                { text: 'Contact form integration - 1', type: 'feature' },
                { text: 'Delivery depends on the requirements', type: 'feature' },
            ],
        },
        {
            title: 'Standard',
            price: '$650',
            features: [
                { text: 'Up to 7 pages', type: 'feature' },
                { text: 'Responsive design (mobile-friendly)', type: 'feature' },
                { text: 'Chat & call buttons Integration', type: 'feature' },
                { text: 'Basic SEO setup (meta tags, sitemap)', type: 'feature' },
                { text: 'Contact form integration - 1', type: 'feature' },
                { text: 'Social media integration', type: 'feature' },
                { text: 'Delivery depends on the requirements', type: 'feature' },
            ],
        },
        {
            title: 'Premium',
            price: '$890',
            features: [
                { text: 'Up to 12 pages', type: 'feature' },
                { text: 'Responsive design (mobile-friendly)', type: 'feature' },
                { text: 'Chat & call buttons Integration', type: 'feature' },
                { text: 'Basic SEO setup (meta tags, sitemap)', type: 'feature' },
                { text: 'Contact form integration - 2', type: 'feature' },
                { text: 'Advanced animations & custom UI', type: 'feature' },
                { text: 'Delivery depends on the requirements', type: 'feature' },
            ],
        },
    ],
    portfolioImages: [
        { image: "/web-dev/web_dev1.jpg", name: "", title: "" },
        { image: "/web-dev/web_dev2.jpg", name: "", title: "" },
        { image: "/web-dev/web_dev3.jpg", name: "", title: "" },
        { image: "/web-dev/web_dev4.jpg", name: "", title: "" },
        { image: "/web-dev/web_dev5.jpg", name: "", title: "" },
    ],
    faqs: [
        {
            question: "How long does it take to build a basic website?",
            answer: "A basic site usually takes 1 - 3 weeks, depending on the number of pages and design complexity."
        },
        {
            question: "Can I update the content on my website myself?",
            answer: "Yes! We build websites with a user friendly CMS (like WordPress or custom admin panels) so you can easily update text, images, or blogs."
        },
        {
            question: "Can I expand the website later?",
            answer: "Yes, we design your website to be scalable  you can always add more pages, features, or even convert it into an e-commerce site later."
        }        
    ],
    callToActionTitle: "Ready to elevate your business with a perfect website?",
    callToActionDescription: ""
};

const page = () => {
    return <CategoryPageTemplate content={webDevelopmentContent} />;
};

export default page;