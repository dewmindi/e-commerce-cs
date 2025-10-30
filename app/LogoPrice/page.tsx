'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Dummy Project Data (Expanded for demonstration) ---
const allProjectsData = [
  // Logo Designs
  { id: 'l1', category: 'Logo Design', title: 'Modern Tech Logo', imageUrl: '/logo-designs/logoDesign1.jpeg' },
  { id: 'l2', category: 'Logo Design', title: 'Abstract Brand Mark', imageUrl: '/images/logo-placeholder-2.jpeg' },
  { id: 'l3', category: 'Logo Design', title: 'Minimalist Monogram', imageUrl: '/images/logo-placeholder-3.jpeg' },
  { id: 'l4', category: 'Logo Design', title: 'Dynamic Company Emblem', imageUrl: '/images/logo-placeholder-4.jpeg' },
  // Business Card Designs
  { id: 'b1', category: 'Business Card Design', title: 'Sleek Corporate Card', imageUrl: '/images/business-card-placeholder-1.jpeg' },
  { id: 'b2', category: 'Business Card Design', title: 'Creative Contact Card', imageUrl: '/images/business-card-placeholder-2.jpeg' },
  { id: 'b3', category: 'Business Card Design', title: 'Luxury Business Card', imageUrl: '/images/business-card-placeholder-3.jpeg' },
  // Letter Head Designs
  { id: 'lh1', category: 'Letter Head Design', title: 'Professional Letterhead', imageUrl: '/images/letterhead-placeholder-1.jpeg' },
  { id: 'lh2', category: 'Letter Head Design', title: 'Branded Company Header', imageUrl: '/images/letterhead-placeholder-2.jpeg' },
  // Email Signature Designs
  { id: 'e1', category: 'Email Signature', title: 'Interactive Email Signature', imageUrl: '/images/email-signature-placeholder-1.jpeg' },
  { id: 'e2', category: 'Email Signature', title: 'Clean Email Footer', imageUrl: '/images/email-signature-placeholder-2.jpeg' },
  // Add more dummy data as needed for other categories if you re-introduce them
];

// Dummy Pricing Data
const pricingData = {
  'Logo Design': [
    { title: 'Basic Logo Package', price: '$199', features: ['2 Concepts', '2 Revisions', 'JPG, PNG Files'] },
    { title: 'Standard Logo Package', price: '$399', features: ['5 Concepts', 'Unlimited Revisions', 'Vector, JPG, PNG, PDF Files', 'Brand Guide'] },
    { title: 'Premium Logo Package', price: '$799', features: ['10 Concepts', 'Unlimited Revisions', 'All File Formats', 'Comprehensive Brand Guide', 'Social Media Kit'] },
  ],
  'Business Card Design': [
    { title: 'Single-Sided Card', price: '$75', features: ['1 Concept', '2 Revisions', 'Print-Ready PDF'] },
    { title: 'Double-Sided Card', price: '$120', features: ['2 Concepts', 'Unlimited Revisions', 'Print-Ready PDF, Source File'] },
    { title: 'Premium Business Card', price: '$250', features: ['3 Concepts', 'Unlimited Revisions', 'Print-Ready PDF, Source File', 'Die-Cut Mockup'] },
  ],
  'Letter Head Design': [
    { title: 'Basic Letterhead', price: '$80', features: ['1 Concept', '2 Revisions', 'Print-Ready PDF'] },
    { title: 'Standard Letterhead', price: '$150', features: ['2 Concepts', 'Unlimited Revisions', 'Print-Ready PDF, Word Doc Template'] },
    { title: 'Premium Stationery', price: '$280', features: ['3 Concepts', 'Unlimited Revisions', 'Print-Ready PDF, Word Doc, Branded Envelope'] },
  ],
  'Email Signature': [
    { title: 'Basic Email Signature', price: '$50', features: ['1 Concept', '2 Revisions', 'HTML & Image Signature'] },
    { title: 'Interactive Email Signature', price: '$90', features: ['2 Concepts', 'Unlimited Revisions', 'HTML, Clickable Links, Social Icons'] },
    { title: 'Company Email Signature Pack', price: '$180', features: ['3 Concepts', 'Unlimited Revisions', 'HTML, Clickable Links, Social Icons', 'Installation Guide for Team'] },
  ],
};

const ProjectsPage = () => {
  // `activeCategory` will now correspond to the image clicked.
  // Initially, no category is active, so we show the category selection images.
  const [activeCategory, setActiveCategory] = useState(null);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8; // Fewer projects per page to emphasize pricing below

  // Define the categories for the initial image grid
  const initialCategories = [
    { name: 'Logo Design', slug: 'Logo Design', imageUrl: '/logo-designs/logoDesign2.jpeg' },
    { name: 'Business Card Design', slug: 'Business Card Design', imageUrl: '/business-cards/bc1.jpeg' },
    { name: 'Letter Head Design', slug: 'Letter Head Design', imageUrl: '/letter-head/lh1.jpeg' },
    { name: 'Email Signature', slug: 'Email Signature', imageUrl: '/certificates/cert1.jpeg' },
  ];

  useEffect(() => {
    if (activeCategory) {
      const filtered = allProjectsData.filter(project => project.category === activeCategory);
      setDisplayedProjects(filtered);
    } else {
      setDisplayedProjects([]); // No projects displayed when no category is selected
    }
    setCurrentPage(1); // Reset to first page on category change
  }, [activeCategory]);

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = displayedProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(displayedProjects.length / projectsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeIn" } }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#333333]">
        <Header />
      
      
      {/* Initial Category Selection / Hero Section */}
      {!activeCategory ? (
        <motion.section
          className="bg-gradient-to-r from-[#bb8d03fc] to-[#211f0b] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 drop-shadow-lg"
            >
              Choose a design category to explore our projects and services.
            </motion.h1>
            {/* Image-based Category Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {initialCategories.map((category) => (
                <motion.div
                  key={category.slug}
                  className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer group relative"
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setActiveCategory(category.slug)}
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                      <h3 className="text-xl sm:text-2xl font-bold">{category.name}</h3>
                      <p className="text-sm opacity-90">View Projects & Pricing</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      ) : (
        // When a category is active, display its projects and pricing
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory} // Key change ensures re-animation when category changes
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
            className="pt-16" // Add padding top to push content below header
          >
            {/* Category Title and Back Button */}
            <section className="bg-white py-8 px-4 sm:px-6 lg:px-8 shadow-sm">
              <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Button
                  onClick={() => setActiveCategory(null)}
                  className="bg-[#bb8d03fc] hover:bg-[#a07a02] text-white px-6 py-2 rounded-lg font-bold text-md shadow transition-all duration-300"
                >
                  &larr; Back to Categories
                </Button>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#333333]">
                  {activeCategory} Projects
                </h2>
                <div>{/* Placeholder for alignment */}</div>
              </div>
            </section>

            {/* Projects Grid for Active Category */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                {displayedProjects.length === 0 ? (
                  <div className="text-center text-[#666666] text-xl py-20">
                    No projects found for {activeCategory}.
                  </div>
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
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-xl font-bold mb-2 text-center px-4">{project.title}</h3>
                            <p className="text-sm italic">{project.category}</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-[#333333]">{project.title}</h3>
                          <p className="text-sm text-[#666666]">{project.category}</p>
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                    </Button>
                  </div>
                )}
              </div>
            </section>

            {/* Pricing Section for Active Category */}
            {activeCategory && pricingData[activeCategory] && (
              <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mt-12 shadow-inner">
                <div className="max-w-6xl mx-auto text-center">
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mb-12">
                    {activeCategory} Pricing Plans
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingData[activeCategory].map((plan, index) => (
                      <motion.div
                        key={index}
                        className="bg-[#F5F5F5] rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#bb8d03fc]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                      >
                        <h3 className="text-2xl font-bold text-[#333333] mb-4">{plan.title}</h3>
                        <p className="text-5xl font-extrabold text-[#bb8d03fc] mb-6">{plan.price}</p>
                        <ul className="text-left text-[#666666] mb-8 space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bb8d03fc] mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button className="bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-8 py-3 rounded-lg font-bold text-lg shadow-md transition-all duration-300 hover:scale-105">
                          Select Plan
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Call to Action Section (Remains the same) */}
      <section className="bg-gradient-to-r from-[#bb8d03fc] to-[#ada661] py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 ">Ready to Transform Your Vision?</h2>
          <p className="text-lg mb-8 opacity-90 leading-tight">
            Let's discuss your next project and bring your ideas to life with stunning designs.
          </p>
          <Button className="bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-10 py-4 rounded-lg font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105">
            Get a Free Quote Now
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProjectsPage;