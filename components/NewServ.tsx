// import React, { useState } from 'react';
    
// // Data for all service categories and their respective services
// const serviceCategoriesData = [
//   { id: '1', category: 'Brand Identity / Logo Deisgn', services: 'Logo Design, Business Card Design, Letter Head Design, Email Signature', icons: ['/Services/logoService.png', '/Services/BusinessCard.png', '/Services/letterhead.png', '/Services/esignature.png'] },
//   { id: '2', category: 'Web Development', services: 'E-commerce Website, Portfolio Website, Business Website, Booking Website', icons: ['/Services/webDesign.png', '/Services/webDevelopment.png', '/Services/seo.png', '/Services/webMaintenance.png'] }, // Example icons
//   { id: '3', category: 'Social Media', services: 'Facebook Design, Instagram Design, Google Advertising, Other Advertising', icons: ['/Services/facebook.png', '/Services/instagram.png', '/Services/googleAd.png', '/Services/otherAd.png'] }, // Example icons
//   { id: '4', category: 'Packaging & Label', services: 'Label Design, Packaging Design, Sticker Design, Other', icons: ['/Services/label.png', '/Services/packaging.png', '/Services/sticker.png', '/Services/other.png'] }, // Example icons
//   { id: '5', category: 'Flyer & Brochure Design', services: 'Leaflets Design, Flyers Design, Brochures Design, Other', icons: ['/Services/posters.png', '/Services/flyers.png', '/Services/brochures.png', '/Services/other.png'] }, // Example icons
//   { id: '6', category: 'Book & Magazine Design', services: 'Cooperate Profile Design, Book Design, Magazine Design, Other', icons: ['/Services/businessprofile.png', '/Services/book.png', '/Services/magazine.png', '/Services/other.png'] }, // Example icons
//   { id: '7', category: 'Banner, Poster & Cover design', services: 'Banner Design, Poster Design, Cover Design, Other', icons: ['/Services/banner.png', '/Services/poster.png', '/Services/cover.png', '/Services/other.png'] }, // Example icons
// ];


// // Main App component (renamed to NewServ as per your provided code snippet)
// const NewServ = () => {
//     // State to manage the active tab, initialized with the first category's name
//     const [activeTab, setActiveTab] = useState(serviceCategoriesData[0].category);

//     // Filter cards based on the active tab
//     const activeCategoryData = serviceCategoriesData.find(
//         (data) => data.category === activeTab
//     );

//     // Prepare the list of services and their corresponding icons for the active category
//     const currentServices = activeCategoryData
//         ? activeCategoryData.services.split(', ').map((service, index) => ({
//             title: service.trim(),
//             image: activeCategoryData.icons[index], // Fallback to Type icon if not enough icons provided
//         }))
//         : [];

//     return (
//         <div className="max-w-6xl mx-auto flex flex-col items-center justify-center font-sans antialiased">
//             {/* Navigation Tabs Section */}
//             <section className="lg:px-8 sticky top-0 z-20 mb-2">
//                 <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2">
//                     {serviceCategoriesData.map((tab) => (
                        // <button
                        //     key={tab.id} // Use unique id for key
                        //     className={`py-2 px-6 rounded-full text-sm font-medium transition-all duration-300 
                        //         ${activeTab === tab.category
                        //             ? 'bg-white text-[#fcb615] shadow-md' // Active tab style
                        //             : ' text-white  hover:bg-[#E0E0E0] hover:text-[#666666] bg-gradient-to-r from-[#fcb615] to-[#bf9e39fc]' // Inactive tab style
                        //         }`}
                        //     onClick={() => setActiveTab(tab.category)}
                        // >
                        //     {tab.category}
                        // </button>
//                     ))}
//                 </div>
//             </section>
//             <div className="rounded-2xl  md:p-8 w-full max-w-4xl ">
//                 {/* Content Cards Section */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 ">
                    // {currentServices.map((card, index) => (
                    //     <div
                    //         key={index}
                    //         className="bg-transparent/35 p-6 rounded-xl flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 hover:border-gray-400"
                    //         // style={{ backgroundColor: "rgba(190, 149, 17, 0.4)" }}
                    //     >
                            
                    //         <div className="mb-4 relative z-10">
                    //             {/* Use an <img> tag to display the PNG image */}
                    //             {card.image && ( // Check if image path exists
                    //                 <img
                    //                     src={card.image}
                    //                     alt={card.title} // Always add alt text for accessibility
                    //                     className="h-12 w-12 object-contain filter invert brightness-0"
                    //                     // Adjust height and width as needed
                    //                 />
                    //             )}
                    //         </div>
                    //         {/* Card Title */}
                    //         <h3 className="text-white    relative z-10">
                    //             {card.title}
                    //         </h3>
                    //     </div>
                    // ))}
//                 </div>
//                 <div className=' mt-10 text-lg font-symphonie'><span className='text-4xl sm:text-lg lg:text-6xl  text-white mb-6 leading-tigh '>We always deliver more than </span><span className='text-[#fcb615] text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tigh'>Expected</span></div>
//             </div>
//         </div>
//     );
// };

// export default NewServ;


import React, { useState } from 'react';

// Data for all service categories and their respective services
const serviceCategoriesData = [
  { id: '1', category: 'Brand Identity / Logo Deisgn', services: 'Logo Design, Business Card Design, Letter Head Design, Email Signature', icons: ['/Services/logoService.png', '/Services/BusinessCard.png', '/Services/letterhead.png', '/Services/esignature.png'] },
  { id: '2', category: 'Web Development', services: 'E-commerce Website, Portfolio Website, Business Website, Booking Website', icons: ['/Services/webDesign.png', '/Services/webDevelopment.png', '/Services/seo.png', '/Services/webMaintenance.png'] }, // Example icons
  { id: '3', category: 'Social Media', services: 'Facebook Design, Instagram Design, Google Advertising, Other Advertising', icons: ['/Services/facebook.png', '/Services/instagram.png', '/Services/googleAd.png', '/Services/otherAd.png'] }, // Example icons
  { id: '4', category: 'Packaging & Label', services: 'Label Design, Packaging Design, Sticker Design, Other', icons: ['/Services/label.png', '/Services/packaging.png', '/Services/sticker.png', '/Services/other.png'] }, // Example icons
  { id: '5', category: 'Flyer & Brochure Design', services: 'Leaflets Design, Flyers Design, Brochures Design, Other', icons: ['/Services/posters.png', '/Services/flyers.png', '/Services/brochures.png', '/Services/other.png'] }, // Example icons
  { id: '6', category: 'Book & Magazine Design', services: 'Cooperate Profile Design, Book Design, Magazine Design, Other', icons: ['/Services/businessprofile.png', '/Services/book.png', '/Services/magazine.png', '/Services/other.png'] }, // Example icons
  { id: '7', category: 'Banner, Poster & Cover design', services: 'Banner Design, Poster Design, Cover Design, Other', icons: ['/Services/banner.png', '/Services/poster.png', '/Services/cover.png', '/Services/other.png'] }, // Example icons
];

// Main App component
const NewServ = () => {
    // State to manage the active tab, initialized with the first category's name
    const [activeTab, setActiveTab] = useState(serviceCategoriesData[0].category);

    // Filter cards based on the active tab
    const activeCategoryData = serviceCategoriesData.find(
        (data) => data.category === activeTab
    );

    // Prepare the list of services and their corresponding icons for the active category
    const currentServices = activeCategoryData
        ? activeCategoryData.services.split(', ').map((service, index) => ({
            title: service.trim(),
            // Using placeholder images since the original PNG URLs are unavailable.
            // In your environment, use the actual image paths like '/Services/logoService.png'
            image: activeCategoryData.icons[index], 
        }))
        : [];

    return (
        // Added dark mode for better contrast and a more modern look
        <div className=" text-white font-sans antialiased">
            <div className="max-w-7xl mx-auto flex flex-col items-center pt-2 pb-12 px-4">
                
                {/* Navigation Tabs Section: Horizontal Scroll Carousel */}
                <section className="sticky top-0 z-20 w-full mb-8">
                    <div 
                        className="flex overflow-x-auto whitespace-nowrap py-3 sm:justify-center md:flex-wrap md:overflow-x-hidden md:py-4"
                        // Custom scrollbar hidden on major browsers for cleaner look
                        style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
                    >
                        {serviceCategoriesData.map((tab) => (
                                                    <button
                            key={tab.id} // Use unique id for key
                            className={`py-2 m-1 px-6 rounded-full text-sm font-medium transition-all duration-300 
                                ${activeTab === tab.category
                                    ? 'bg-white text-[#fcb615] shadow-md' // Active tab style
                                    : ' text-white  hover:bg-[#E0E0E0] hover:text-[#666666] bg-gradient-to-r from-[#fcb615] to-[#bf9e39fc]' // Inactive tab style
                                }`}
                            onClick={() => setActiveTab(tab.category)}
                        >
                            {tab.category}
                        </button>
                        ))}
                    </div>
                </section>
                
                {/* Category Title and Content Cards Section */}
                <div className="w-full max-w-6xl px-2">
                    {/* <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-[#fcb615] tracking-tight">
                        {activeTab} Services
                    </h2> */}
                    
                    {/* Content Cards Grid: Responsive Columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                            {currentServices.map((card, index) => (
                        <div
                            key={index}
                            className="bg-transparent/35 p-6 rounded-xl flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 hover:border-gray-400"
                            // style={{ backgroundColor: "rgba(190, 149, 17, 0.4)" }}
                        >
                            
                            <div className="mb-4 relative z-10">
                                {/* Use an <img> tag to display the PNG image */}
                                {card.image && ( // Check if image path exists
                                    <img
                                        src={card.image}
                                        alt={card.title} // Always add alt text for accessibility
                                        className="h-12 w-12 object-contain filter invert brightness-0"
                                        // Adjust height and width as needed
                                    />
                                )}
                            </div>
                            {/* Card Title */}
                            <h3 className="text-white    relative z-10">
                                {card.title}
                            </h3>
                        </div>
                    ))} 
                    </div>
                    
                    {/* Footer Slogan - Enhanced Responsiveness and Styling */}
                    <div className='mt-8 text-lg font-symphonie'><span className='text-4xl sm:text-lg lg:text-6xl  text-white mb-6 leading-tigh '>We always deliver more than </span><span className='text-[#fcb615] text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tigh'>Expected</span></div>
                </div>
            </div>
        </div>
    );
};

export default NewServ;
