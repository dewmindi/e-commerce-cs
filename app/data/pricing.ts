// data/pricing.ts

interface Feature {
    text: string;
    type: 'feature' | 'disfeature' | 'exfeature';
}

interface PricingPlan {
    title: string;
    price: string;
    features: Feature[];
}

export type PricingData = {
    [key: string]: PricingPlan[]; // Keys will be category slugs (e.g., "logo-designs", "business-card-designs")
};

export const pricingData: PricingData = {
    "logo-designs": [
        {
            title: 'Standard',
            price: '$75',
            features: [
                { text: "2 Super Amazing Logo Concepts", type: 'feature' },
                { text: "Transparency File (PNG)", type: 'feature' },
                { text: "Printable File (PDF)", type: 'feature' },
                { text: "Revisions - 6 Rounds", type: 'feature' },
                { text: "Raster Based File Sets (JPG, PNG)", type: 'feature' },
                { text: "Vector Based File Sets (AI, EPS)", type: 'disfeature' },
                { text: "Mock-ups - 2", type: 'disfeature' },

            ],
        },
        {
            title: 'Premium',
            price: '$100',
            features: [
                { text: "Transparency File (PNG)", type: 'feature' }, // Clarified from "All Inside Standard"
                { text: "Printable File", type: 'feature' },
                { text: "Unlimited Revisions", type: 'feature' }, // Highlight this specific item
                { text: "Raster Based File Sets", type: 'feature' },
                { text: "Vector Based File Sets", type: 'feature' },
                { text: "3D Mock Ups - 2", type: 'feature' },
                { text: "Source File", type: 'feature' },
            ],
        },
        {
            title: 'Cooperative',
            price: '$200',
            features: [
                { text: "Transparency File (PNG)", type: 'feature' }, // Clarified from "All Inside Standard"
                { text: "Printable File", type: 'feature' },
                { text: "Unlimited Revisions ", type: 'feature' },
                { text: "Raster Based File Sets", type: 'feature' }, // Highlight this specific item
                { text: "Vector Based File Sets", type: 'feature' },
                { text: "3D Mock Ups - 2", type: 'feature' },
                { text: "Source File", type: 'feature' },
                { text: "A Business Card Design", type: 'exfeature' },
                { text: "A Letterhead Design", type: 'exfeature' },
                { text: "Free Logo Intro Video", type: 'exfeature' },
            ],
        },
    ],
    "business-card-designs": [
        {
            title: 'Basic Card Design',
            price: '$75',
            features: [
                { text: 'Single-Sided Design', type: 'feature' },
                { text: 'Print-Ready PDF', type: 'feature' },
                { text: 'Revisions - 2', type: 'feature' },
                { text: 'Source File', type: 'disfeature' },
            ],
        },
        {
            title: 'Standard Card Design',
            price: '$120',
            features: [
                { text: 'Double-Sided Design', type: 'feature' },
                { text: 'Print-Ready PDF & AI', type: 'feature' },
                { text: 'Unlimited Revisions', type: 'feature' },
                { text: 'QR Code Integration', type: 'feature' },
                { text: 'Source File (AI)', type: 'feature' },
            ],
        },
    ],
    "letter-head-designs": [
        {
            title: 'Basic Letterhead',
            price: '$60',
            features: [
                { text: 'MS Word Template', type: 'feature' },
                { text: 'Print-Ready PDF', type: 'feature' },
                { text: 'Revisions - 2', type: 'feature' },
            ],
        },
        {
            title: 'Pro Letterhead',
            price: '$100',
            features: [
                { text: 'Custom Design', type: 'feature' },
                { text: 'MS Word & Adobe InDesign Files', type: 'feature' },
                { text: 'Unlimited Revisions', type: 'feature' },
            ],
        },
    ],
    "company-profiles": [
        {
            title: 'Basic Profile',
            price: '$200',
            features: [
                { text: 'Up to 5 Pages', type: 'feature' },
                { text: 'PDF Format', type: 'feature' },
                { text: 'Standard Layout', type: 'feature' },
            ],
        },
        {
            title: 'Premium Profile',
            price: '$350',
            features: [
                { text: 'Custom Layout', type: 'feature' },
                { text: 'Interactive PDF', type: 'feature' },
                { text: 'Source Files', type: 'feature' },
                { text: 'Print-Ready Files', type: 'feature' },
            ],
        },
    ],
    "social-media-posters": [
        {
            title: 'Single Post Design',
            price: '$30',
            features: [
                { text: '1 Concept', type: 'feature' },
                { text: 'JPEG/PNG Delivery', type: 'feature' },
                { text: '1 Revision', type: 'feature' },
            ],
        },
        {
            title: '3-Pack Post Designs',
            price: '$80',
            features: [
                { text: '3 Concepts', type: 'feature' },
                { text: 'JPEG/PNG Delivery', type: 'feature' },
                { text: 'Unlimited Revisions', type: 'feature' },
            ],
        },
    ],
    "certificates": [
        {
            title: 'Basic Certificate',
            price: '$50',
            features: [
                { text: 'Standard Template', type: 'feature' },
                { text: 'Print-Ready PDF', type: 'feature' },
                { text: '1 Revision', type: 'feature' },
            ],
        },
        {
            title: 'Custom Certificate',
            price: '$90',
            features: [
                { text: 'Unique Design', type: 'feature' },
                { text: 'Print-Ready PDF/AI', type: 'feature' },
                { text: 'Unlimited Revisions', type: 'feature' },
            ],
        },
    ],
    // You can also add pricing for "All Projects" if you want a general message
    // "all": [
    //     {
    //         title: 'General Service Inquiry',
    //         price: 'Custom Quote',
    //         features: [
    //             { text: 'Discuss your project needs', type: 'feature' },
    //             { text: 'Receive a personalized offer', type: 'feature' },
    //         ],
    //     },
    // ],
};

