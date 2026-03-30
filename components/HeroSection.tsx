"use client"
import { motion } from 'framer-motion'
import React, { useEffect, useState, useRef } from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ChevronDown } from "lucide-react";
import { AnimatedTooltip } from './ui/animated-tooltip'
import { FaStar } from "react-icons/fa"

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
    if (videoRef.current) videoRef.current.playbackRate = 1;
  }, []);

  const serviceCategoriesData = [
    {
      category: "Brand Identity / Logo Design",
      services: ["Logo Design", "Corporate Profile Design", "Business Card Design", "Letter Head Design", "Email Signature"],
      link: "services"
    },
    {
      category: "Web Development",
      services: ["Business Website", "E-commerce Website", "Custom Website"],
      link: "services"
    },
    {
      category: "Social Media Service",
      services: ["Social Media Design", "Social Media Management", "Social Media Growth"],
      link: "services"
    },
    {
      category: "Packaging & Label Design",
      services: ["Packaging Design", "Label Design", "Sticker Design"],
      link: "services"
    },
    {
      category: "Leaflet, Flyer & Poster Design",
      services: ["Leaflets Design", "Flyers Design", "Poster Design"],
      link: "services"
    },
  ];

  const scrollToSection = (sectionId: string, href?: string) => {

    if (pathname === "/") {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push(`#${sectionId}`)
    }
  }

  const tooltipItems = [
    { id: 1, name: "Robert", designation: "Cleaning Service Owner", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 2, name: "Jenkingz", designation: "AutoMobile Mechanic", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 3, name: "Patricia", designation: "Real Estate Agent", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 4, name: "Kayle", designation: "Chiropractor", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 5, name: "Durden", designation: "Cleaning Service Owner", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" },
  ];


  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col items-center"
      style={{
        backgroundImage: "url('/HeroBgImg.webp')",
      }}
    >
      {/* 3D Depth Particles/Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#bb8d03fc]/10 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            x: [0, -10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#bb8d03fc]/5 blur-[120px] rounded-full"
        />
      </div>

      {/* Navigation removed and moved to GlobalNavbar.tsx */}

      {/* ✅ Main Content Area */}
      <div className="relative flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto text-center z-10 py-12 font-nexa">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-5xl sm:text-xl lg:text-6xl text-white  leading-[1.1] tracking-tight">
              <span className='font-semibold'>One Stop</span> <br />
              <span className="text-[#bb8d03fc] font-semibold">Graphic , Web & Marketing</span> <span className=" font-semibold">Solutions</span>
              <br />
              <span className="text-white/90 text-4xl sm:text-lg lg:text-3xl mt-4 block font-semibold">We Provide Everything Your Brand Needs to Grow</span>
            </h2>  
            <h1 className="text-white/90 sm:text-sm lg:text-lg mt-4 block font-light ">  
              We are a Top - Rated Design & Web Development Agency in <span className='font-semibold'>Australia</span>
            </h1>
          </motion.div>
          
          <div className="flex flex-col items-center gap-12 mt-16">
            <div className="flex gap-8">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("services")}
                className="bg-[#18bd39]/40 text-white px-12 py-2 rounded-full  text-xl shadow-2xl shadow-emerald-500/20 transition-all border border-emerald-400/20"
              >
                Services
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/20 backdrop-blur-md px-12 py-2 rounded-full  text-xl transition-all shadow-2xl"
              >
                Contact
              </motion.button>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-yellow-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <div className="h-4 w-[1px] bg-white/20 mx-1" />
                <img
                  src="https://www.ytviews.in/wp-content/uploads/2020/12/google.svg"
                  alt="Google"
                  className="w-6 h-6"
                />
              </div>
              <div className="flex items-center shadow-xl cursor-pointer">
                <AnimatedTooltip items={tooltipItems}/>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Glass Sidebar Content (Optional/Simplified from old version) */}
      <div className="absolute bottom-8 left-0 right-0  flex-wrap justify-center px-4 gap-3 z-20 pb-4 hidden md:flex">
        {serviceCategoriesData.map((tab, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(tab.link)}
            className="whitespace-nowrap bg-white/5 backdrop-blur-md border border-white/10 text-white/70 px-4 py-2 rounded-full text-xs hover:bg-white/20 hover:text-white transition-all flex items-center gap-2 group"
          >
            {tab.category}
            <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
