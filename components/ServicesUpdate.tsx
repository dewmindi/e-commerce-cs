import React, { useState } from 'react';
import { Type, CreditCard, User, FileText } from 'lucide-react'; // Importing icons from lucide-react

// Main App component
const ServicesUpdate = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('Brand Identity');

  // Data for the navigation tabs
  const tabs = [
    { name: 'Brand Identity', icon: null }, // No specific icon visible in the image for tabs
    { name: 'Website', icon: null },
    { name: 'Social Media', icon: null },
  ];

  // Data for the content cards
  const cards = [
    { icon: Type, title: 'Logo Design' },
    { icon: CreditCard, title: 'Business Card Design' },
    { icon: User, title: 'Business Profile' },
    { icon: FileText, title: 'Letter Head Design' }, // Assuming "Later Head Design" is "Letter Head Design"
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans antialiased">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-4xl">
        {/* Navigation Tabs Section */}
        <div className="flex justify-center mb-8 space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`py-2 px-6 rounded-full text-sm font-medium transition-all duration-300
                ${activeTab === tab.name
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-700 border border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 hover:border-gray-400"
            >
              {/* Card Icon */}
              <div className="mb-4 text-white">
                {/* Dynamically render the Lucide icon component */}
                {React.createElement(card.icon, { size: 48, strokeWidth: 1 })}
              </div>
              {/* Card Title */}
              <h3 className="text-white text-lg font-semibold">
                {card.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesUpdate;

