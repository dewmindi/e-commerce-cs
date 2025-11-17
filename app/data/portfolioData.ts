// This assumes you have access to the categoriesData structure when creating your project data
export const projectsData = [
    {
        id: 'p1',
        category: 'Brand Identity / Logo Design', // This is the main category for the project
        title: '',
        description: '',
        image: '/ServiceImages/logo.jpeg?height=400&width=600',
        tags: [
            // Each tag needs to be an object with the properties expected by handleTagClick
            // You'll need to link these tags back to your categoriesData for the paths
            { name: "Logo Design", parentCategoryName: "Brand Identity", path: "/logo-design", mainPagePath: "/projects" },
            { name: "Cooperate Profile Design", parentCategoryName: "Brand Identity", path: "/cooperate-profile-design", mainPagePath: "/projects" },
            { name: "Business Card Design", parentCategoryName: "Brand Identity", path: "/business-card", mainPagePath: "/projects" }, // If 'Minimalist' doesn't have its own page
            { name: "Letter Head Design", parentCategoryName: "Brand Identity", path: "/letter-head-design", mainPagePath: "/projects" },
            { name: "Email Signature Design", parentCategoryName: "Brand Identity", path: "/email-signature-design", mainPagePath: "/projects" },
        ]
    },
    {
        id: 'p2',
        category: 'Web Development',
        title: '',
        description: '',
        image: '/ServiceImages/web.jpeg?height=400&width=600',
        tags: [
            { name: "Business Websites", parentCategoryName: "Web Development", path: null, mainPagePath: "/web-development" },
            { name: "E-Commerce Development", parentCategoryName: "Web Development", path: null, mainPagePath: "/e-commerce-websites" },
            { name: "Custom Web Applications", parentCategoryName: "Web Development", path: null, mainPagePath: "/custom-web-development" },
        ]
    },
    {
        id: 'p3',
        category: 'Social Media Service',
        title: '',
        description: '',
        image: '/ServiceImages/social.jpeg',
        tags: [
            { name: "Social Media Design", parentCategoryName: "Social Media Design", path: null, mainPagePath: "/social-media" },
            { name: "Social Media Management", parentCategoryName: "Social Media Design", path: null, mainPagePath: "/social-media-management" },
            { name: "Social Media Growth", parentCategoryName: "Social Media Design", path: null, mainPagePath: "/social-media-growth" },
        ]
    },
    {
        id: 'p4',
        category: 'Packaging & Label Design',
        title: '',
        description: '',
        image: '/ServiceImages/packaging.jpeg',
        tags: [
            { name: "Label Design", parentCategoryName: "Packaging & Label Design", path: null, mainPagePath: "/label-design" },
            { name: "Packaging Design", parentCategoryName: "Packaging & Label Design", path: null, mainPagePath: "/label-design" },
            { name: "Sticker Advertising", parentCategoryName: "Packaging & Label Design", path: null, mainPagePath: "/label-design" },
            { name: "Other", parentCategoryName: "Packaging & Label Design", path: null, mainPagePath: "/label-design" },
        ]
    },
    {
        id: 'p5',
        category: 'Leaflet, Flyer & Poster Design',
        title: '',
        description: '',
        image: '/ServiceImages/leaflet.jpeg',
        tags: [
            { name: "Leaflet Design", parentCategoryName: "Leaflet, Flyer & Brochure Design", path: null, mainPagePath: "/leaflet-design" },
            { name: "Flyer Design", parentCategoryName: "Leaflet, Flyer & Brochure Design", path: null, mainPagePath: "/leaflet-design" },
            { name: "Poster Design", parentCategoryName: "Banner, Poster & Cover Design", path: null, mainPagePath: "/banner-poster-design" },
            { name: "Other", parentCategoryName: "Leaflet, Flyer & Brochure Design", path: null, mainPagePath: "/leaflet-design" },
        ]
    },
    // {
    //     id: 'p6',
    //     category: 'Book & Magazine Design',
    //     title: '',
    //     description: '',
    //     image: '/ServiceImages/book.jpeg',
    //     tags: [
    //         { name: "Cooperate Profile Design", parentCategoryName: "Book & Magazine Design", path: null, mainPagePath: "/book-magazine-design" },
    //         { name: "Book Design", parentCategoryName: "Book & Magazine Design", path: null, mainPagePath: "/book-magazine-design" },
    //         { name: "Magazine Design", parentCategoryName: "Book & Magazine Design", path: null, mainPagePath: "/book-magazine-design" },
    //         { name: "Other", parentCategoryName: "Book & Magazine Design", path: null, mainPagePath: "/book-magazine-design" },
    //     ]
    // },
    {
        id: 'p7',
        category: 'Banner, Poster & Poster Design',
        title: '',
        description: '',
        image: '/ServiceImages/banner.jpeg',
        tags: [
            { name: "Banner Design", parentCategoryName: "Banner, Poster & Cover Design", path: null, mainPagePath: "/banner-poster-design" },
            { name: "Poster Design", parentCategoryName: "Banner, Poster & Cover Design", path: null, mainPagePath: "/banner-poster-design" },
            { name: "Cover Design", parentCategoryName: "Banner, Poster & Cover Design", path: null, mainPagePath: "/banner-poster-design" },
            { name: "Other", parentCategoryName: "Banner, Poster & Cover Design", path: null, mainPagePath: "/banner-poster-design" },
        ]
    },                
];
