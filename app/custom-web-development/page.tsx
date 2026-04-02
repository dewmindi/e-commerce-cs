
import type { Metadata } from 'next';
import CategoryPageTemplate, { type CategoryPageContent } from '@/components/CategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Custom Web Application Development Melbourne',
  description: 'Bespoke web application development in Melbourne. We build scalable, secure, and high-performance custom web apps for businesses of all sizes.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/custom-web-development` },
  openGraph: {
    title: 'Custom Web Application Development Melbourne',
    description: 'Bespoke web application development in Melbourne. Scalable and high-performance custom web apps.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://csgraphicmeta.com.au'}/custom-web-development`,
    type: 'website',
  },
};

const customWebAppContent: CategoryPageContent = {
    pageTitle: 'Custom Web Applications',
    headerDescription: '⚡ Transform ideas into digital products.',
    headerImage: '/ServiceImages/web.jpeg', // A relevant image for the header
    aboutDescription: "Sometimes a simple website isn't enough, you need a custom web application that solves unique business challenges. From SaaS platforms to enterprise dashboards, we develop tailor-made solutions with scalability, speed, and user experience in mind. Perfect for startups launching new digital products, growing businesses, and enterprises needing advanced solutions.",
    benefits: [
        "Custom features built specifically for your business model",
        "Secure databases & user management systems",
        "API integrations with third-party services",
        "Scalable architecture to grow with your users",
        "Real-time dashboards, notifications, and reports"
    ],
    pricingPlans: [
        {
            title: 'Basic',
            price: '$1000',
            features: [
                { text: 'Core features development', type: 'feature' },
                { text: 'User authentication system', type: 'feature' },
                { text: 'Admin dashboard', type: 'feature' },
                { text: 'Database setup (MySQL/MongoDB)', type: 'feature' },
                { text: 'API integration', type: 'feature' },
                { text: 'Deployment on cloud (AWS/Heroku)', type: 'feature' },
            ],
        },
        {
            title: 'Standard',
            price: '$2000',
            features: [
                { text: 'Full-scale SaaS features', type: 'feature' },
                { text: 'Payment gateway integration', type: 'feature' },
                { text: 'Role-based access control', type: 'feature' },
                { text: 'Real-time notifications (WebSocket/Push)', type: 'feature' },
                { text: 'Performance optimization', type: 'feature' },
            ],
        },
        {
            title: 'Premium',
            price: '$3000',
            features: [
                { text: 'Advanced scalable architecture', type: 'feature' },
                { text: 'AI/ML integration if required', type: 'feature' },
                { text: 'Third-party system integrations (CRM/ERP)', type: 'feature' },
                { text: 'Custom APIs & mobile app integration', type: 'feature' },
                { text: 'Dedicated account manager', type: 'feature' },
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
            question: "What's the difference between a website and a web application?",
            answer: "A website mainly displays information, while a web application is interactive — it can manage users, process data, or provide real-time features."
        },
        {
            question: "Can you integrate third-party systems (like CRM, ERP, or APIs)",
            answer: "Yes. We specialize in API integrations with payment systems, CRMs, ERPs, analytics tools, and more."
        },
        {
            question: "Is content updating included in maintenance?",
            answer: "Yes, depending on your chosen plan, we can update your text, images, and blog posts regularly.."
        }        
    ],
    callToActionTitle: "Ready to Transform Your Idea into a Working Application",
    callToActionDescription: "",
    processDescription: '',
};

const page = () => {
    return <CategoryPageTemplate content={customWebAppContent} />;
};

export default page;