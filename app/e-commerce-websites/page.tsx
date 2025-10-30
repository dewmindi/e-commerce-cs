// app/business-card/page.tsx
"use client"
import CategoryPageTemplate from '@/components/CategoryPageTemplate';

// Define your specific data for the Business Card Design page
const ecomWebDevContent = {
    pageTitle: 'E-Commerce Development',
    headerDescription: '🛒 Turn clicks into customers.',
    headerImage: '/ServiceImages/web.jpeg', // A relevant image for the header
    aboutDescription: "An e-commerce website is more than just an online store. It's a complete shopping experience for your customers. From browsing products to secure checkout, we build smooth and engaging e-commerce platforms that help businesses sell effortlessly online.",
    benefits: [
        "Fully functional online store with product catalog",
        "Secure payment gateway integration",
        "Shopping cart and checkout system",
        "Customer accounts and order management",
        "Mobile-first design for shoppers on the go"
    ],
    pricingPlans: [
        {
            title: 'Basic',
            price: '$750',
            features: [
                { text: 'Up to 10 products', type: 'feature' },
                { text: 'Shopping cart & checkout', type: 'feature' },
                { text: 'Payment gateway integration', type: 'feature' },
                { text: 'Basic product filter & search', type: 'feature' },
                { text: 'Mobile-friendly design', type: 'feature' },
            ],
        },
        {
            title: 'Standard',
            price: '$990',
            features: [
                { text: 'Up to 30 products', type: 'feature' },
                { text: 'Shopping cart & checkout', type: 'feature' },
                { text: 'Payment gateway integration', type: 'feature' },
                { text: 'Basic product filter & search', type: 'feature' },
                { text: 'Mobile-friendly design', type: 'feature' },
                { text: 'Advanced product filters & search', type: 'feature' },
                { text: 'Discount codes & coupons', type: 'feature' },
                { text: 'Customer account creation', type: 'feature' },
                { text: 'Email marketing integration', type: 'feature' },
                { text: 'Multi-currency support', type: 'feature' },
            ],
        },
        {
            title: 'Premium',
            price: '$1300',
            features: [
                { text: 'Up to 60 products', type: 'feature' },
                { text: 'Shopping cart & checkout', type: 'feature' },
                { text: 'Payment gateway integration', type: 'feature' },
                { text: 'Basic product filter & search', type: 'feature' },
                { text: 'Mobile-friendly design', type: 'feature' },
                { text: 'Advanced product filters & search', type: 'feature' },
                { text: 'Discount codes & coupons', type: 'feature' },
                { text: 'Customer account creation', type: 'feature' },
                { text: 'Email marketing integration', type: 'feature' },
                { text: 'Multi-currency support', type: 'feature' },
                { text: 'Multi-vendor / Marketplace support', type: 'feature' },
                { text: 'AI-based product recommendations', type: 'feature' },
                { text: 'Subscription model integration', type: 'feature' },
                { text: 'Advanced analytics & reporting', type: 'feature' },    
                { text: 'High-level security setup', type: 'feature' },             
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
            question: "How many products can I add?",
            answer: "This depends on your chosen plan. You can start with 30-100 products and scale to unlimited products as your business grows."
        },
        {
            question: "Can I manage my store without technical skills?",
            answer: "Yes, you'll have a store dashboard to manage products, inventory, orders, and customers without coding."
        },
        {
            question: "Will the e-commerce site be secure?",
            answer: "Security is a top priority. We implement SSL certificates, secure payment gateways, and regular security updates."
        },
        {
            question: "Do you provide training on how to use the system?",
            answer: "Yes! We offer training sessions and documentation so you and your team can confidently manage the store"
        }        
    ],
    callToActionTitle: "Ready to Boost Your Online Store?",
    callToActionDescription: "",
    processDescription: '',
};

const page = () => {
    return <CategoryPageTemplate content={ecomWebDevContent} />;
};

export default page;