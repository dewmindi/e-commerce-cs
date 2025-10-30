// /pages/projects.jsx (Example)
'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head'; // For page title
import Image from 'next/image'; // For optimized images
import { motion } from 'framer-motion'; // For smooth animations/transitions
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// You'll need these if not already globally available or from a component library
// import { Button } from '@/components/ui/button'; // Your Button component
// import { ChevronLeft, ChevronRight } from 'lucide-react'; // Example icons

// Dummy Project Data (Replace with your actual data fetching)
const allProjectsData = [
  // Logo Designs (59)
  { id: 'l1', category: 'Logo Designs', title: 'Modern Logo Design', imageUrl: '/logo-designs/logoDesign1.jpeg' },
  { id: 'l2', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign2.jpeg' },
  { id: 'l3', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign3.jpeg' },
  { id: 'l4', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign4.jpeg' },
  { id: 'l5', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign5.jpeg' },
  { id: 'l6', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign6.jpeg' },
  { id: 'l7', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign7.jpeg' },
  { id: 'l8', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign8.jpeg' },
  { id: 'l9', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign9.jpeg' },
  { id: 'l10', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign10.jpeg' },
  { id: 'l11', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign11.jpeg' },
  { id: 'l12', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign12.jpeg' },
  { id: 'l13', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign13.jpeg' },
  { id: 'l14', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign14.jpeg' },
  { id: 'l15', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign15.jpeg' },
  { id: 'l16', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign16.jpeg' },
  { id: 'l17', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign17.jpeg' },
  { id: 'l18', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign18.jpeg' },
  { id: 'l19', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign19.jpeg' },
  { id: 'l20', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign20.jpeg' },
  { id: 'l21', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign21.jpeg' },
  { id: 'l22', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign22.jpeg' },
  { id: 'l23', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign23.jpeg' },
  { id: 'l24', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign24.jpeg' },
  { id: 'l25', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign25.jpeg' },
  { id: 'l26', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign26.jpeg' },
  { id: 'l27', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign27.jpeg' },
  { id: 'l28', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign28.jpeg' },

  { id: 'l29', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign29.jpeg' },
  { id: 'l30', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign30.jpeg' },
  { id: 'l31', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign31.jpeg' },
  { id: 'l32', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign32.jpeg' },
  { id: 'l33', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign33.jpeg' },
  { id: 'l34', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign34.jpeg' },
  { id: 'l35', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign35.jpeg' },
  { id: 'l36', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign36.jpeg' },
  { id: 'l37', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign37.jpeg' },
  { id: 'l38', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign38.jpeg' },
  { id: 'l39', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign39.jpeg' },
  { id: 'l40', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign40.jpeg' },
  { id: 'l41', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign41.jpeg' },

  { id: 'l42', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign42.jpeg' },
  { id: 'l43', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign43.jpeg' },
  { id: 'l44', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign44.jpeg' },
  { id: 'l45', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign45.jpeg' },
  { id: 'l46', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign46.jpeg' },
  { id: 'l47', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign47.jpeg' },
  { id: 'l48', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign48.jpeg' },
  { id: 'l49', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign49.jpeg' },
  { id: 'l50', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign50.jpeg' },
  { id: 'l51', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign51.jpeg' },
  { id: 'l52', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign52.jpeg' },

  { id: 'l53', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign53.jpeg' },
  { id: 'l54', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign54.jpeg' },
  { id: 'l55', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign55.jpeg' },
  { id: 'l56', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign56.jpeg' },
  { id: 'l57', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign57.jpeg' },
  { id: 'l58', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign58.jpeg' },
  { id: 'l59', category: 'Logo Designs', title: 'Tech Startup Logo', imageUrl: '/logo-designs/logoDesign59.jpeg' },


  // Letter Head Designs (15)
  { id: 'lh1', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh1.jpeg' },
  { id: 'lh2', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh2.jpeg' },
  { id: 'lh3', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh3.jpeg' },
  { id: 'lh4', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh4.jpeg' },
  { id: 'lh5', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh5.jpeg' },
  { id: 'lh6', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh6.jpeg' },
  { id: 'lh7', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh7.jpeg' },
  { id: 'lh8', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh8.jpeg' },
  { id: 'lh9', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh9.jpeg' },
  { id: 'lh10', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh10.jpeg' },
  { id: 'lh11', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh11.jpeg' },
  { id: 'lh12', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh12.jpeg' },
  { id: 'lh13', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh13.jpeg' },
  { id: 'lh14', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh14.jpeg' },
  { id: 'lh15', category: 'Letter Head Designs', title: 'Corporate Letterhead', imageUrl: '/letter-head/lh15.jpeg' },


  // Business Card Designs (13)
  { id: 'bc1', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc1.jpeg' },
  { id: 'bc2', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc2.jpeg' },
  { id: 'bc3', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc3.jpeg' },
  { id: 'bc4', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc4.jpeg' },
  { id: 'bc5', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc5.jpeg' },
  { id: 'bc6', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc6.jpeg' },
  { id: 'bc7', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc7.jpeg' },
  { id: 'bc8', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc8.jpeg' },
  { id: 'bc9', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc9.jpeg' },
  { id: 'bc10', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc10.jpeg' },
  { id: 'bc11', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc11.jpeg' },
  { id: 'bc12', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc12.jpeg' },
  { id: 'bc13', category: 'Business Card Designs', title: 'Minimal Business Card', imageUrl: '/business-cards/bc13.jpeg' },


  // Cooperate Profile / Company Profile (9)
  { id: 'cp1', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp1.jpeg' },
  { id: 'cp2', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp2.jpeg' },
  { id: 'cp3', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp3.jpeg' },
  { id: 'cp4', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp4.jpeg' },
  { id: 'cp5', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp5.jpeg' },
  { id: 'cp6', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp6.jpeg' },
  { id: 'cp7', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp7.jpeg' },
  { id: 'cp8', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp8.jpeg' },
  { id: 'cp9', category: 'Company Profiles', title: 'Company Profile 2024', imageUrl: '/cp/cp9.jpeg' },
  // ... 8 more company profiles

  // Social Media Posters (13)
  { id: 'sm1', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm1.jpeg' },
  { id: 'smp', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm2.jpeg' },
  { id: 'sm3', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm3.jpeg' },
  { id: 'sm4', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm4.jpeg' },
  { id: 'sm5', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm5.jpeg' },
  { id: 'sm6', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm6.jpeg' },
  { id: 'sm7', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm7.jpeg' },
  { id: 'sm8', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm8.jpeg' },
  { id: 'sm9', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm9.jpeg' },
  { id: 'sm10', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm10.jpeg' },
  { id: 'sm11', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm11.jpeg' },
  { id: 'sm12', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm12.jpeg' },
  { id: 'sm13', category: 'Social Media Posters', title: 'Summer Sale Poster', imageUrl: '/sm/sm13.jpeg' },
  // ... 12 more social media posters

  // Certificate (8)
  { id: 'cert1', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert1.jpeg' },
  { id: 'cert2', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert2.jpeg' },
  { id: 'cert3', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert3.jpeg' },
  { id: 'cert4', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert4.jpeg' },
  { id: 'cert5', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert5.jpeg' },
  { id: 'cert6', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert6.jpeg' },
  { id: 'cert7', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert7.jpeg' },
  { id: 'cert8', category: 'Certificates', title: 'Achievement Certificate', imageUrl: '/certificates/cert8.jpeg' },
  // ... 7 more certificates
];

// Helper to get category counts
const categories = [
  { name: 'All Projects', count: allProjectsData.length, slug: 'all' },
  { name: 'Logo Designs', count: 59, slug: 'logo-designs' },
  { name: 'Letter Head Designs', count: 15, slug: 'letter-head-designs' },
  { name: 'Business Card Designs', count: 13, slug: 'business-card-designs' },
  { name: 'Company Profiles', count: 9, slug: 'company-profiles' }, // Adjusted from 'Cooperate Profile / Company Profile' for slug
  { name: 'Social Media Posters', count: 13, slug: 'social-media-posters' },
  { name: 'Certificates', count: 8, slug: 'certificates' },
];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12; // Adjust as needed, common for galleries

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Animation variants for Framer Motion
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

            <Button className="bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-10 py-4 rounded-lg font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105">
              Let's Start Your Project
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories / Filters */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">
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

      {/* Call to Action Section (Optional, but good for conversion) */}
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

      {/* Footer (Optional, if you have a consistent site footer) */}
      {/* <Footer /> */}
      <Footer />
    </div>
  );
};

export default ProjectsPage;