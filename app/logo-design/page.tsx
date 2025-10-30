// app/business-card/page.tsx
"use client"
import React, { useState } from 'react';
import CategoryPageTemplate from '@/components/CategoryPageTemplate';

// Define your specific data for the Business Card Design page
const businessCardContent = {
    pageTitle: 'Logo Design',
    headerDescription: 'Crafting unique and memorable logos that capture your brand identity and make a lasting impression.',
    headerImage: '/logo-designs/logoDesign7.jpeg', // A relevant image for the header
    aboutDescription: "Your logo is the face of your brand, and our Logo Design services ensure it makes a memorable first impression. We craft unique, versatile, and timeless logos that capture the essence of your brand and resonate with your audience. Whether you’re a startup looking for a fresh identity or an established business seeking a modern refresh, our designs combine creativity, strategy, and simplicity to communicate your brand story effectively. A well-designed logo not only stands out visually but also builds trust, recognition, and loyalty with your customers.",
    processDescription: `We offer free color psychology research for our Standard, Premium, and Cooperative packages. For an example, if you provide us with a restaurant logo, we can suggest color palettes tailored to that industry. Certain colors evoke specific emotions—like orange, 
    which can stimulate thirst and even make your mouth water. This is why choosing the right colors for a logo is crucial. Beyond color, a logo should incorporate other important elements to make it effective.

    We provide top-notch technical support, and we'll also analyze your target audience at no extra cost. Based on the diversity of your audience, their preferences will vary, and we aim to design a logo that resonates with them.

    Additionally, the simpler and smarter the logo, the more likely customers are to remember it. The design should immediately draw attention to your brand name, as a logo that fails to make your brand memorable loses its effectiveness.

    There are many other key factors in creating a successful logo.`,
    benefits: [
        "Custom Design Concepts",
        "Print-Ready Files",
        "Double-Sided Options",
        "QR Code Integration"
    ],
    pricingPlans: [
        {
            title: 'Standard',
            price: '$75',
            features: [
                { text: '2 Super Amazing Logo Concepts', type: 'feature' },
                { text: 'Transparency File (PNG)', type: 'feature' },
                { text: 'Revisions - 6', type: 'feature' },
                { text: 'Raster Based File Sets', type: 'feature' },
                { text: 'Vector Based File Sets', type: 'feature' },
                { text: 'Mock Ups - 2', type: 'feature' },
                { text: 'Customised Mock-ups', type: 'disfeature' }, // Marked as disfeature
                { text: 'Source File', type: 'disfeature' }, // Marked as disfeature
            ],
        },
        {
            title: 'Standard',
            price: '$100',
            features: [
                { text: 'Transparency File (png)', type: 'feature' },
                { text: 'Printable File', type: 'feature' },
                { text: 'Revisions - Unlimited', type: 'feature' },
                { text: 'Raster Based File Sets', type: 'feature' },
                { text: 'Vector Based File Sets', type: 'feature' },
                { text: '3D Mock Ups - 2', type: 'feature' },
                { text: 'Source File', type: 'feature' },
            ],
        },
        {
            title: 'Cooperative',
            price: '$175',
            features: [
                { text: 'Transparency File (png)', type: 'feature' },
                { text: 'Printable File', type: 'feature' },
                { text: 'Revisions - Unlimited', type: 'feature' },
                { text: 'Raster Based File Sets', type: 'feature' },
                { text: 'Vector Based File Sets', type: 'feature' },
                { text: '3D Mock Ups - 2', type: 'feature' },
                { text: 'Other Mock Ups - 3', type: 'feature' },
                { text: 'Source File', type: 'feature' },
                { text: 'Letter Head Design', type: 'exfeature' }, // Marked as exfeature
                { text: 'Business Card Design', type: 'exfeature' }, // Marked as exfeature
                { text: 'Free Logo Intro Video', type: 'exfeature' }, // Marked as exfeature
            ],
        },
    ],
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
            question: "How long does a logo design take?",
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