// /pages/projects.jsx (Example)
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // For optimized images
import { motion } from 'framer-motion'; // For smooth animations/transitions
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '../context/CartContext';
import { pricingData } from '../data/pricing';
import { PlusIcon } from 'lucide-react';
import FooterNew from '@/components/FooterNew';
import { count } from 'console';
import Link from 'next/link';

// Dummy Project Data (Replace with your actual data fetching)
const allProjectsData = [
  // Logo Designs (59)
  { id: 'l1', category: 'Logo Designs', title: 'Modern Logo Design', imageUrl: '/logo-designs/logoDesign1.jpeg', price: 20 },
  { id: 'l2', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign2.jpeg', price: 20 },
  { id: 'l3', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign3.jpeg', price: 20 },
  { id: 'l4', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign4.jpeg', price: 20 },
  { id: 'l5', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign5.jpeg', price: 20 },
  { id: 'l6', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign6.jpeg', price: 20 },
  { id: 'l7', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign7.jpeg', price: 20 },
  { id: 'l8', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign8.jpeg', price: 20 },
  { id: 'l9', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign9.jpeg', price: 20 },
  { id: 'l10', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign10.jpeg', price: 20 },
  { id: 'l11', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign11.jpeg', price: 20 },
  { id: 'l12', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign12.jpeg', price: 20 },
  { id: 'l13', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign13.jpeg', price: 20 },
  { id: 'l14', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign14.jpeg', price: 20 },
  { id: 'l15', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign15.jpeg', price: 20 },
  { id: 'l16', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign16.jpeg', price: 20 },
  { id: 'l17', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign17.jpeg', price: 20 },
  { id: 'l18', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign18.jpeg', price: 20 },
  { id: 'l19', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign19.jpeg', price: 20 },
  { id: 'l20', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign20.jpeg', price: 20 },


  // Letter Head Designs (15)
  { id: 'lh1', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh1.jpeg', price: "$20" },
  { id: 'lh2', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh2.jpeg', price: "$20" },
  { id: 'lh3', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh3.jpeg', price: "$20" },
  { id: 'lh4', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh4.jpeg', price: "$20" },
  { id: 'lh5', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh5.jpeg', price: "$20" },
  { id: 'lh6', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh6.jpeg', price: "$20" },
  { id: 'lh7', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh7.jpeg', price: "$20" },
  { id: 'lh8', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh8.jpeg', price: "$20" },
  { id: 'lh9', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh9.jpeg', price: "$20" },
  { id: 'lh10', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh10.jpeg', price: "$20" },
  { id: 'lh11', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh11.jpeg', price: "$20" },
  { id: 'lh12', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh12.jpeg', price: "$20" },
  { id: 'lh13', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh13.jpeg', price: "$20" },
  { id: 'lh14', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh14.jpeg', price: "$20" },
  { id: 'lh15', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh15.jpeg', price: "$20" },

  // Business Card Designs (13)
  { id: 'bc1', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc1.jpeg', price: "$20" },
  { id: 'bc2', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc2.jpeg', price: "$20" },
  { id: 'bc3', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc3.jpeg', price: "$20" },
  { id: 'bc4', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc4.jpeg', price: "$20" },
  { id: 'bc5', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc5.jpeg', price: "$20" },
  { id: 'bc6', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc6.jpeg', price: "$20" },
  { id: 'bc7', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc7.jpeg', price: "$20" },
  { id: 'bc8', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc8.jpeg', price: "$20" },
  { id: 'bc9', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc9.jpeg', price: "$20" },
  { id: 'bc10', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc10.jpeg', price: "$20" },
  { id: 'bc11', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc11.jpeg', price: "$20" },
  { id: 'bc12', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc12.jpeg', price: "$20" },          
  { id: 'bc13', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc13.jpeg', price: "$20" },
  
  // Cooperate Profile / Company Profile (9)
  { id: 'cp1', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp1.jpeg', price: "$20" },
  { id: 'cp2', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp2.jpeg' },
  { id: 'cp3', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp3.jpeg', price: "$20" },
  { id: 'cp4', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp4.jpeg' },
  { id: 'cp5', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp5.jpeg', price: "$20" },
  { id: 'cp6', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp6.jpeg' },
  { id: 'cp7', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp7.jpeg', price: "$20" },
  { id: 'cp8', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp8.jpeg' },
  { id: 'cp9', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp9.jpeg', price: "$20" },   

  // Social Media Posters (13), price:"$20"
  { id: 'sm1', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm1.jpeg', price: "$20" },
  { id: 'sm2', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm2.jpeg', price: "$20" },
  { id: 'sm3', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm3.jpeg', price: "$20" },
  { id: 'sm4', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm4.jpeg', price: "$20" },
  { id: 'sm5', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm5.jpeg', price: "$20" },
  { id: 'sm6', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm6.jpeg', price: "$20" },
  { id: 'sm7', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm7.jpeg', price: "$20" },
  { id: 'sm8', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm8.jpeg', price: "$20" },
  { id: 'sm9', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm9.jpeg', price: "$20" },
  { id: 'sm10', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm10.jpeg', price: "$20" },
  { id: 'sm11', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm11.jpeg', price: "$20" },
  { id: 'sm12', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm12.jpeg', price: "$20" },          
  // ... 12 more social media posters

  // Certificate (8)
  { id: 'cert1', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert1.jpeg', price: "$20" },
  { id: 'cert2', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert2.jpeg', price: "$20" },
  { id: 'cert3', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert3.jpeg', price: "$20" },
  { id: 'cert4', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert4.jpeg', price: "$20" },
  { id: 'cert5', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert5.jpeg', price: "$20" },
  { id: 'cert6', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert6.jpeg', price: "$20" },
  { id: 'cert7', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert7.jpeg', price: "$20" },
  { id: 'cert8', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert8.jpeg', price: "$20" },
  // ... 7 more certificates

  {id : 'pack1', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack1.jpeg'},
  {id : 'pack2', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack2.jpeg'},
  {id : 'pack4', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack4.jpeg'},
  {id : 'pack6', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack6.jpeg'},
  {id : 'pack7', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack7.jpeg'},
  {id : 'pack8', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack8.jpeg'},
  {id : 'pack9', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack9.jpeg'},
  {id : 'pack10', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack10.jpeg'},
  {id : 'pack11', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack11.jpeg'},
  {id : 'pack12', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack12.jpeg'},
  {id : 'pack13', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack13.jpeg'},
  {id : 'pack14', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack14.jpeg'},
  {id : 'pack15', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack15.jpeg'},
  {id : 'pack16', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack16.jpeg'},
  {id : 'pack17', category: 'Packaging & Label Design', title: 'Packaging & Label Design', imageUrl: '/packaging/pack17.jpeg'},
];

type CartItemSource = {
  title: string; // Plan title (e.g., "Basic Logo Package")
  price: string; // Plan price (e.g., "$150")
  categoryName: string; // The category it belongs to (e.g., "Logo Designs")
  // Optionally add an ID if each plan needs a unique ID for the cart
  // id: string; // You might generate a unique ID here if needed
};


// Helper to get category counts
const categories = [
  { name: 'All Projects', count: allProjectsData.length, slug: 'all' },
  { name: 'Logo Designs', count: 59, slug: 'logo-designs' },
  { name: 'Letter Head Designs', count: 15, slug: 'letter-head-designs' },
  { name: 'Business Card Designs', count: 13, slug: 'business-card-designs' },
  { name: 'Company Profiles', count: 9, slug: 'company-profiles' }, // Adjusted from 'Cooperate Profile / Company Profile' for slug
  { name: 'Social Media Posters', count: 13, slug: 'social-media-posters' },
  { name: 'Certificates', count: 8, slug: 'certificates' },
  { name: 'Packaging & Label Design', count:17, slug: 'packaging-label-design'}
];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12; // Adjust as needed, common for galleries
  const { addToCart } = useCart()

  useEffect(() => {
    let filtered = allProjectsData;
    if (activeCategory !== 'all') {
      filtered = allProjectsData.filter(project =>
        categories.find(cat => cat.slug === activeCategory && cat.name === project.category)
      );
    }
    setDisplayedProjects(filtered);
    setCurrentPage(1); // Reset to first page on category change
  }, [activeCategory]);

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = displayedProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(displayedProjects.length / projectsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Stagger animation for each project card
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  // const handleAdd = (project: any) => {
  //   addToCart({
  //     id: project.title.toLowerCase().replace(/\s+/g, "-"),
  //     title: project.title,
  //     category: project.category,
  //     price: project.price,
  //     image: project.imageUrl,
  //     quantity: 1,
  //   })
  // }

  // --- MODIFIED handleAdd function to accept different types of items ---
  const handleAdd = (item: CartItemSource) => {
        let numericPrice: number;

        if (typeof item.price === 'string') {
            // Remove "$" and parse as float, handle potential commas if any
            numericPrice = parseFloat(item.price.replace(/[$,]/g, ''));
        } else {
            numericPrice = item.price;
        }

        // Ensure numericPrice is a valid number before adding to cart
        if (isNaN(numericPrice)) {
            console.error("Attempted to add item with invalid price to cart:", item);
            alert("Could not add item to cart due to invalid price. Please try again.");
            return; // Exit if price is not a number
        }

    if (item.type === 'pricingPlan') {
      const currentCategoryName = categories.find(cat => cat.slug === activeCategory)?.name || 'Unknown Category';
      addToCart({
        // Generate a unique ID for the plan in the cart, e.g., "logo-designs-basic-package"
        id: `${activeCategory}-${item.title.toLowerCase().replace(/\s+/g, '-')}`,
        title: item.title, // e.g., "Basic Logo Package"
        category: currentCategoryName, // e.g., "Logo Designs"
        price: numericPrice, // e.g., "$150"
        image: `/logo-designs/logoDesign1.jpeg`, // You might want a generic icon for plans, or map it.
        quantity: 1,
      });
    }
    console.log("Added to cart:", item); // For debugging
  };

  const currentPricingPlans = pricingData[activeCategory];
  const currentCategoryNameForTitle = categories.find(cat => cat.slug === activeCategory)?.name;

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#333333]">
      <Header />

      {/* Hero Section - Eye-catching Banner */}
      <section className="bg-gradient-to-r from-[#bb8d03fc] to-[#211f0b] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-10"></div> {/* Subtle background pattern */}
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg"
          >
            Our Creative Portfolio
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto"
          >
            Showcasing 120+ projects, from impactful logos to engaging social media campaigns.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8"
          >
            <Link href="/#contact">
              <Button className="bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-10 py-4 rounded-lg font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105">
              Let's Start Your Project
            </Button>
            </Link>

          </motion.div>
        </div>
      </section>

      {/* Categories / Filters sticky top-0 z-20 */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-sm ">
        <div className="max-w-6xl mx-auto flex flex-wrap  justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              className={`
                  px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200
                  ${activeCategory === category.slug
                  ? 'bg-[#bb8d03fc] text-white shadow-md'
                  : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#E0E0E0] hover:text-[#333333]'
                }
                `}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {displayedProjects.length === 0 ? (
            <div className="text-center text-[#666666] text-xl py-20">No projects found for this category.</div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer relative"
                  variants={itemVariants}
                >
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-opacity-70 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-xl font-bold mb-2 text-center px-4">{project.title}</h3>
                      <p className="text-sm italic">{project.category}</p>
                      {/* Optional: View Details Button */}
                      {/* <Button className="mt-4 bg-[#FFC107] text-[#333333] hover:bg-[#FFA000]">View Details</Button> */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12">
              <Button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-transparent hover:bg-[#666666] text-[#666666] hover:text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Replace with Lucide-React ChevronLeft if available */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`
                      w-10 h-10 rounded-full font-medium
                      ${currentPage === i + 1
                      ? 'bg-[#666666] text-white shadow-md'
                      : 'bg-white text-[#666666] hover:bg-[#E0E0E0]'
                    }
                    `}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-transparent hover:bg-[#666666] text-[#666666] hover:text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Replace with Lucide-React ChevronRight if available */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* --- NEW: Pricing Section --- */}
      {currentPricingPlans && currentPricingPlans.length > 0 && activeCategory !== 'all' && ( // Only show if plans exist and it's not "All Projects"
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mb-12">
              {categories.find(cat => cat.slug === activeCategory)?.name} Pricing Plans
            </h2>
            <div className=" justify-center grid grid-cols-3 flex-wrap gap-8">
              {currentPricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  className="bg-[#F5F5F5] rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#bb8d03fc] w-full "
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-2xl font-bold text-[#333333] mb-4">{plan.title}</h3>
                  <p className="text-5xl font-extrabold text-[#bb8d03fc] mb-6">{plan.price}</p>
                  <ul className="text-left text-[#666666] mb-8 space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-start ${feature.type === 'disfeature' ? 'text-gray-500 line-through' : ''}`}>
                        {feature.type === 'feature' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bb8d03fc] mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        {feature.type === 'disfeature' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#7f7e7dfc] mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        {feature.type === 'exfeature' && (
                          <PlusIcon className='text-[#bb8d03fc] mr-2 flex-shrink-0' size={20} />
                        )}
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                  {/* --- ADD TO CART BUTTON FOR PRICING PLANS --- */}
                  <Button
                    onClick={() => handleAdd({
                      type: 'pricingPlan',
                      title: plan.title,
                      price: plan.price,
                      categoryName: currentCategoryNameForTitle || '', // Pass the display name of the category
                    })}
                    className="bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-8 py-3 rounded-lg font-bold text-lg shadow-md transition-all duration-300 hover:scale-105"
                  >
                    Add to Cart
                  </Button>
                  {/* <Button className="bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-8 py-3 rounded-lg font-bold text-lg shadow-md transition-all duration-300 hover:scale-105">
                    Select Plan
                  </Button> */}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section (Optional, but good for conversion) */}
      <section className="bg-gradient-to-r from-[#bb8d03fc] to-[#ada661] py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 ">Ready to Transform Your Vision?</h2>
          <p className="text-lg mb-8 opacity-90 leading-tight">
            Let's discuss your next project and bring your ideas to life with stunning designs.
          </p>
          <Link href="/#contact">
                    <Button className="bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-10 py-4 rounded-lg font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105">
            Get a Free Quote Now
          </Button>
          </Link>
        </div>
      </section>
      <FooterNew />
    </div>
  );
};

export default ProjectsPage;