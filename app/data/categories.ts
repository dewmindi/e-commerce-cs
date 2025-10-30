// Assuming this data structure is defined somewhere, e.g., in data/categories.ts
export const categoriesData = [
    {
        name: "Brand Identity",
        mainPagePath: "/brand-identity", // This might not be a separate page if it's just a grouping
        tags: [
            { name: "Logo Design", path: "/logo-design" },
            { name: "Business Card Design", path: "/business-card" },
            { name: "Brand Style Guides", path: "/brand-style-guides" },
            { name: "Stationery Design", path: "/stationery-design" },
        ]
    },
    {
        name: "Web Development",
        mainPagePath: "/web-development",
        tags: [
            { name: "E-commerce Sites", path: null }, // Path null or undefined means default to mainPagePath
            { name: "Portfolio Websites", path: null },
            { name: "Custom Web Apps", path: null },
            { name: "Landing Pages", path: null },
        ]
    },
    // ... other 5 categories
    {
        name: "Social Media Design",
        mainPagePath: "/social-media-design",
        tags: [
            { name: "Facebook Graphics", path: null },
            { name: "Instagram Posts", path: null },
            { name: "LinkedIn Banners", path: null },
            { name: "Social Media Kits", path: null },
        ]
    },
];