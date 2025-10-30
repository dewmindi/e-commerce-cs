// app/services/page.tsx (or within your existing page component)
'use client'; // This component uses client-side hooks

import React, { useState } from 'react';
// Assuming Palette, Monitor, Zap icons are from lucide-react or similar
import { Palette, Monitor, Zap, BriefcaseBusiness, WholeWordIcon, Instagram, Facebook, Youtube, Globe } from 'lucide-react'; // Make sure to import your icons

// Your services data array
const serviceCategoriesData = [
  { id: '1', category: 'Brand Identity', services: 'Logo Design, Business Card Design, Letter Head Design, Email Signature' },
  { id: '2', category: 'Website', services: 'Web Design, Web Development, SEO, Website Maintenance', },
  { id: '3', category: 'Social Media', services: 'Facebook Design, Instagram Design, Google Advertising, Other Advertising' },
  { id: '4', category: 'Packaging & labels', services: 'Label Design, Packaging Design, Sticker Design, Other'},
  { id: '5', category: 'Flyers & Brochures Design', services: 'Leaflets Design, Flyers Design, Brochures Design, Other' },
  { id: '6', category: 'Book & Magazine Design', services: 'Cooperate Profile Design, Book Design, Magazine Design, Other' },
  { id: '7', category: 'Banner, Poster & Cover design', services: 'Banner Design, Poster Design, Cover Design, Other' },  
];

// Helper function to map category names to icons
const getCategoryIcon = (categoryName: string) => {
  switch (categoryName) {
    case 'Brand Identity':
      return <Palette className="w-6 h-6 text-[#bb8d03fc] mr-3" />;
    case 'Website':
      return <Monitor className="w-6 h-6 text-[#bb8d03fc] mr-3" />;
    case 'Social Media':
      return <Globe className="w-6 h-6 text-[#bb8d03fc] mr-3" />;
    default:
      return <Palette className="w-6 h-6 text-[#bb8d03fc] mr-3" />; // Default icon
  }
};

const TrendingServices = () => {
  // State to keep track of the currently active category/tab
  // Initialize with the first category's ID or a default like 'all' if you had one
  const [activeCategoryId, setActiveCategoryId] = useState(serviceCategoriesData[0].id);

  // Find the currently selected category data
  const activeCategory = serviceCategoriesData.find(
    (category) => category.id === activeCategoryId
  );

  // Parse the services string into an array of individual services
  const servicesList = activeCategory
    ? activeCategory.services.split(', ').map((service) => service.trim())
    : [];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Services Categories Tabs */}
      <section className="  lg:px-8  sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
          {serviceCategoriesData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategoryId(category.id)}
              className={`
                px-4 py-1 rounded-full text-lg font-medium transition-all duration-200
                ${activeCategoryId === category.id
                  ? 'bg-[#696868] text-white shadow-md' // Active tab style
                  : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#E0E0E0] hover:text-[#333333]' // Inactive tab style
                }
              `}
            >
              {category.category}
            </button>
          ))}
        </div>
      </section>

      {/* Display Services based on active category */}
      <section className=" px-4 sm:px-6 lg:px-8 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto">
          {activeCategory && (
            // Outer container for the category title/icon and then the list of service divs
            <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100 animate-fade-in-up">
              {/* Category Title and Icon (remains the same) */}

              {/* Individual Service Divs Container - NOW USING GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto"> {/* Changed to grid */}
                {servicesList.map((service, index) => (
                  <div
                    key={index}
                    // Added `h-full` to ensure equal height in grid rows if content varies vertically
                    className="flex items-center bg-[#F5F5F5] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full"
                  >
                    <div className="flex items-center ">
                      {getCategoryIcon(activeCategory.category)}
                    </div>
                    {/* Bullet point */}
                    <div className=" bg-[#bb8d03fc]">{ }</div>
                    {/* Service Name */}
                    <span className="text-[#333333] text-lg font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TrendingServices;


{/*  */ }

