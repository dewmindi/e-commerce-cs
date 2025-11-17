import React from 'react';
import { Check} from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { FaUserFriends } from 'react-icons/fa'; // Ensure this is imported

const pricingPlans = [
  {
    name: "Standard (Logo)",
    price: "75",
    period: "",
    overview: "Up to 2 Super Amazing Logo Concepts",
    featureGroups: [
      {
        title: "Key Deliverables",
        items: [
          { text: "Transparency File (PNG)", highlight: false },
          { text: "Printable File (PDF)", highlight: false },
          { text: "Revisions - 6 Rounds", highlight: false },
          { text: "Raster Based File Sets (JPG, PNG)", highlight: false },
          { text: "Vector Based File Sets (AI, EPS)", highlight: false },
          { text: "Mock-ups - 2", highlight: false },
        ]
      }
    ],
    popular: false,
  },
  {
    name: "Premium (Logo)",
    price: "100",
    period: "",
    overview: "Up to 3 top-notch quality Concepts With Unlimited Revisions",
    featureGroups: [
      {
        title: "Key Deliverables",
        items: [
          { text: "Transparency File (PNG)", highlight: false },
          { text: "Printable File", highlight: false },
          { text: "Unlimited Revisions", highlight: true },
          { text: "Raster Based File Sets", highlight: false },
          { text: "Vector Based File Sets", highlight: false },
          { text: "3D Mock Ups - 2", highlight: false },
          { text: "Source File", highlight: false },
        ]
      },
    ],
    popular: false,
  },
  {
    name: "Cooperative",
    price: "175",
    period: "",
    overview: "Up to 3 top-notch quality Logo Concepts",
    featureGroups: [
      {
        title: "Core Deliverables",
        items: [
          { text: "Transparency File (PNG)", highlight: false },
          { text: "Printable File", highlight: false },
          { text: "Unlimited Revisions ", highlight: false },
          { text: "Raster Based File Sets", highlight: false },
          { text: "Vector Based File Sets", highlight: false },
          { text: "3D Mock Ups - 2", highlight: false },
          { text: "Source File", highlight: false },
        ]
      },
      {
        title: "Special Inclusions",
        items: [
          { text: "Premium Logo", highlight: true },
          { text: "A Business Card Design", highlight: true },
          { text: "A Letterhead Design", highlight: true },
          { text: "Free Logo Intro Video", highlight: true },
        ]
      }
    ],
    popular: true,
  },
  {
    name: "Web Starter",
    price: "490",
    period: "",
    overview: "Comprehensive web solution for a powerful online footprint.",
    featureGroups: [
      {
        title: "Web Features",
        items: [
          { text: "1 Year Free Hosting", highlight: false },
          { text: "5 Custom Web Pages", highlight: false },
          { text: "Full Ownership Rights", highlight: false },
          { text: "SEO Friendly", highlight: false },
          { text: "Responsive Design", highlight: false },
          { text: "CMS Integration (Basic)", highlight: false },
        ]
      },
      {
        title: "Guarantees & Support",
        items: [
          { text: "100% Satisfaction Guarantee", highlight: false },
          { text: "Zero Hidden Fees", highlight: false },
          { text: "Basic Maintenance (1 month)", highlight: false },
        ]
      }
    ],
    popular: false,
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};


const PricingPlan = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (plan: typeof pricingPlans[0]) => {
    addToCart({
      id: plan.name,
      title: plan.name,
      price: plan.price,
      quantity: 1,
      image: '/cs-logo.png', // Consider adding specific images for each service if possible
      category: 'Service Package',
      currency: "AUD",
    });
  };

  return (
    // <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-[#333333] text-white"></section>
    <section id="packages" className="py-10 px-4 sm:px-6 lg:px-8  text-white mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl bg-gradient-to-r from-black via-[#bb8d03fc] to-white text-transparent bg-clip-text"
          >
            Pricing
          </h1>
          {/* <h2 className="text-4xl sm:text-5xl font-extrabold text-[#bb8d03fc] mb-4 leading-tight">
            Pricing
          </h2> */}
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Select the perfect plan that fits your needs and budget. Each package is designed to deliver exceptional value and results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-xl shadow-lg flex flex-col justify-between
                        transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl
                        ${plan.popular ? "bg-black text-white border-2 border-[#bb8d03fc]" : "bg-black border border-gray-700 text-white"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#bb8d03fc] text-white px-5 py-2 rounded-full text-sm tracking-wide shadow-md">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className={`text-3xl mb-3 ${plan.popular ? "text-[#bb8d03fc]" : "text-white"}`}>
                  {plan.name}
                </h3>
                <div className={`text-5xl font-extrabold mb-2 ${plan.popular ? "text-white" : "text-[#e2c363fc]"}`}>
                  A{formatCurrency(plan.price)}
                  <span className={`text-lg  ${plan.popular ? "text-gray-600" : "text-gray-400"}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-base mt-2 ${plan.popular ? "text-gray-300" : "text-gray-300"}`}>{plan.overview}</p>
              </div>

              {/* Feature Groups */}
              <div className="flex-grow space-y-6 mb-8">
                {plan.featureGroups.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <h4 className={`text-sm  uppercase tracking-wider mb-3 pb-2 border-b ${plan.popular ? "text-gray-400 border-gray-200" : "text-gray-400 border-gray-600"}`}>
                      {group.title}
                    </h4>
                    <ul className="space-y-3">
                      {group.items.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className={`flex items-start text-sm ${feature.highlight
                            ? `font-semibold ${plan.popular ? "text-[#bb8d03fc]" : "text-[#e2c363fc]"}`
                            : `${plan.popular ? "text-gray-300" : "text-gray-300"}`
                            }`}
                        >
                          <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.popular ? "text-[#bb8d03fc]" : "text-[#e2c363fc]"}`} />
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className='flex justify-between items-center gap-4 mt-auto'>
                <Button
                  onClick={() => handleAddToCart(plan)}
                  className={`flex-1 py-3 rounded-full  text-lg transition-all duration-300
                             shadow-md hover:shadow-lg hover:scale-105 active:scale-95
                             ${plan.popular
                      ? " text-white bg-black border border-white"
                      : "bg-black border border-white text-white "
                    }`}
                >
                  Get Started
                </Button>
                {/* <button
                  onClick={() => handleAddToCart(plan)}
                  className={`p-3 rounded-full transition-all duration-300
                             shadow-md hover:shadow-lg hover:scale-110 active:scale-90
                             ${plan.popular ? "bg-[#bb8d03fc] text-white" : "bg-gray-700 text-[#bb8d03fc] border border-[#bb8d03fc]"}
                             `}
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="w-6 h-6" />
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Benefits */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-center">
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <FaUserFriends className="text-4xl text-[#bb8d03fc] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Friendly Communication</h3>
            <p className="text-gray-400 text-sm">We believe in clear, open, and friendly discussions throughout our process.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <BadgeDollarSign className="text-4xl text-[#bb8d03fc] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Hidden Fees</h3>
            <p className="text-gray-400 text-sm">Transparency is key. What you see is what you pay, with no surprises.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <PercentDiamondIcon className="text-4xl text-[#bb8d03fc] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">100% Satisfaction</h3>
            <p className="text-gray-400 text-sm">We're committed to your complete satisfaction with our work and service.</p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default PricingPlan;