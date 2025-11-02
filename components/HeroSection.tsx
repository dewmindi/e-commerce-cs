import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react'
import NewServ from './NewServ'
import { useInView } from 'react-intersection-observer'
import { Input } from "@/components/ui/input"
import SearchBar from './SearchBar'
import { SvgNeuralNetworkBackground } from "@/components/SvgCircuitBackground"

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1; // 0.5x speed = slow motion
    }
  }, []);

  const [isLoaded, setIsLoaded] = useState(false)

  const searchServices = [
    "Logo Design", "Web Development", "Business Profile", "Letter Head Deisgn", "Graphic Design"
  ]

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.4,
  });

  const [ref1, inView1] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });


  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <section
      id="home"
      className="py-10 px-4 sm:px-6 lg:px-8 over"
    >
      <SvgNeuralNetworkBackground />
      {/* Removed max-w-4xl */}
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 0 : 1, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#333333] mb-4 leading-tight"
        >
          <span>One-Stop</span>{" "}
          <span className="text-[#bb8d03fc]">Design Solutions</span>{" "}
          <span>For</span>
        </motion.h1>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight"
        >
          <span>All Your Business Branding Needs</span>
        </motion.h1>

        {/* Search Section */}
        <SearchBar />
        {/* Services Section with Background Video */}
        <section
          id="services"
          className="relative max-w-7xl py-10 px-4 sm:px-6 lg:px-8 mt-4 overflow-hidden rounded-2xl"
        >
          
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover filter"
            src="/cshero.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          
          <div className="absolute inset-0 bg-black/50"></div>

        
          <div className="relative">
            <NewServ />
          </div>
        </section>



      </div>
    </section>
  )
}

export default HeroSection
