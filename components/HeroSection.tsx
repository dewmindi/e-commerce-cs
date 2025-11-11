// import { motion } from 'framer-motion'
// import { Search } from 'lucide-react'
// import React, { useEffect, useState, useRef } from 'react'
// import NewServ from './NewServ'
// import { useInView } from 'react-intersection-observer'
// import { Input } from "@/components/ui/input"
// import SearchBar from './SearchBar'
// import { SvgNeuralNetworkBackground } from "@/components/SvgCircuitBackground"
// import Link from 'next/link'

// const HeroSection = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.playbackRate = 1; // 0.5x speed = slow motion
//     }
//   }, []);

//   const [isLoaded, setIsLoaded] = useState(false)

//   const searchServices = [
//     "Logo Design", "Web Development", "Business Profile", "Letter Head Deisgn", "Graphic Design"
//   ]

//   const [ref, inView] = useInView({
//     triggerOnce: false,
//     threshold: 0.4,
//   });

//   const [ref1, inView1] = useInView({
//     triggerOnce: false,
//     threshold: 0.2,
//   });


//   const variants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//   };
//   return (
//     <section
//       id="home"
//       className="py-10 px-4 sm:px-6 lg:px-8 over min-h-screen bg-animated-gradient -mt-4"
//     >
//       {/* <SvgNeuralNetworkBackground /> */}
//       {/* Removed max-w-4xl */}
//       {/* Removed max-w-4xl */}
//       <div className="max-w-7xl mx-auto text-center mt-10">
// <motion.h1
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: isLoaded ? 0 : 1, y: isLoaded ? 0 : 20 }}
//   transition={{ duration: 0.8, delay: 0.2 }}
//   className="text-4xl sm:text-5xl lg:text-6xl  text-white mb-4 leading-tight mt-44 "
// >
//   <span>One-Stop</span>{" "}
//   <span className="text-[#bb8d03fc]">Design Solutions</span>{" "}
//   <span>For</span>
// </motion.h1>
// <motion.h1
//   initial={{ y: -50, opacity: 0 }}
//   animate={{ y: 0, opacity: 1 }}
//   transition={{ duration: 0.6 }}
//   className="text-4xl sm:text-5xl lg:text-6xl  text-white mb-6 leading-tight"
// >
//   <span>All Your Business Branding Needs</span>
// </motion.h1>


//         {/* Search Section */}
//         {/* <SearchBar /> */}
//         {/* Services Section with Background Video */}
//         <div className='flex justify-center gap-14 text-2xl text-white'>
//           <div>
//             <Link href="/">
//               <button className='border px-5 py-2 rounded-full bg-black'>Get Started</button>
//             </Link>
//           </div>
//           <div className='border px-5 py-2 rounded-full'>View Service</div>
//         </div>

//         <section id='Hero-image' className='relative max-w-7xl py-6 px-4 sm:px-6 lg:px-6 overflow-hidden rounded-2xl mt-14 h-dvh z-10'
//           style={{
//             background:
//               "linear-gradient(180deg, rgba(255, 255, 255, 0.10) 3.25%, rgba(255, 255, 255, 0.04) 96.75%), rgba(255, 255, 255, 0.3)",
//           }}

//         >
//           <div className=' bg-white h-full rounded-2xl'>

//           </div>
//         </section>
//         {/* <section
//           id="services"
//           className="relative max-w-7xl py-10 px-4 sm:px-6 lg:px-8 mt-4 overflow-hidden rounded-2xl"
//         >

//           <video
//             ref={videoRef}
//             className="absolute inset-0 w-full h-full object-cover filter"
//             src="/cshero.mp4"
//             autoPlay
//             loop
//             muted
//             playsInline
//           />



//           <div className="absolute inset-0 bg-black/50"></div>



//           <div className="relative">
//             <NewServ />
//           </div>
//         </section> */}
//       </div>
//     </section>
//   )
// }

// export default HeroSection


import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react'
import NewServ from './NewServ'
import { useInView } from 'react-intersection-observer'
import { Input } from "@/components/ui/input"
import SearchBar from './SearchBar'
import { SvgNeuralNetworkBackground } from "@/components/SvgCircuitBackground"
import Link from 'next/link'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Header from "@/components/Header"


const GridSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="500"
    height="800"
    viewBox="0 0 500 800"
    fill="none"
    className="opacity-100"
  >
    <defs>
      <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#smallGrid)" />
  </svg>
);

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

  const [isLoaded, setIsLoaded] = useState(false);

  const serviceCategoriesData = [
    {
      category: "Brand Identity / Logo Deisgn",
      services: ["Logo Design", "Cooperate Profile Design", "Business Card Design", "Letter Head Design", "Email Signature"]
    },
    {
      category: "Web Development",
      services: ["E-commerce Website", "Portfolio Website", "Business Website", "Booking Website"]
    },
    {
      category: "Social Media Service",
      services: ["Social Media Design", "Social Media Managment"]
    },
    {
      category: "Packaging & Label Design",
      services: ["Packaging Design", "Label Design", "Sticker Design"]
    },
    {
      category: "Leaflet,Flyer & Poster Design",
      services: ["Leaflets Design", "Flyers Design", "Poster Design"]
    },
  ]

  const images = [
    "/web-ui-design3.jpeg",   // your 4-square logo mockup
    "/web-ui-design4.jpeg",
    "/web-ui-design5.jpeg",
    "/web-ui-design6.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4 seconds
    return () => clearInterval(interval);
  }, [images.length]);



  return (
    <section
      id="home"
      className="relative py-10 px-4 sm:px-6 lg:px-8 min-h-screen -mt-4 overflow-hidden bg-animated-gradient"
    >
      <Header />
      {/* ✅ Base Left Grid */}
      <div className="absolute left-0 top-0 h-full w-auto -translate-x-1/3 opacity-80 z-0">
        <GridSVG />
      </div>

      {/* ✅ Base Right Grid (Mirrored) */}
      <div className="absolute right-0 top-0 h-full w-auto translate-x-1/3 opacity-80 z-0 scale-x-[-1]">
        <GridSVG />
      </div>

      {/* ✅ Angled Left Grid */}
      {/* <div className="absolute left-0 top-0 h-full w-auto -translate-x-1/3 opacity-60 z-0  rotate-45">
        <GridSVG />
      </div> */}

      {/* ✅ Angled Right Grid (Mirrored) */}
      {/* <div className="absolute right-0 top-0 h-full w-auto translate-x-1/3 opacity-60 z-0 -rotate-45 scale-x-[-1]">
        <GridSVG />
      </div> */}




      <img
        src="/grid.svg"
        alt="Right Grid"
        className="absolute right-0 top-0 h-full w-auto translate-x-1/3 opacity-40 pointer-events-none select-none z-0"
      />

      {/* ✅ Content Container */}
      <div className="relative max-w-7xl mx-auto text-center mt-10 z-10 ">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 0 : 1, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl  text-white mb-4 leading-tight mt-20 "
        >
          <span>One-Stop</span>{" "}
          <span className="text-[#bb8d03fc] ">Design Solutions</span>{" "}
          <span>For</span>
        </motion.h1>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl  text-white mb-6 leading-tight"
        >
          <span>All Your Business Branding Needs</span>
        </motion.h1>

        <div className="flex justify-center gap-14 text-lg text-gray-800 font-poppins">
          <Link href="/">
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs  leading-6  text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1 px-4 ring-1 ring-white/10 ">
                <span>
                  Get Started
                </span>
                <svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M10.75 8.75L14.25 12L10.75 15.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </Link>
          <button className=" no-underline group cursor-pointer relative shadow-2xl rounded-full p-px text-xs  leading-6  text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-transparent py-1 px-4 ring-1 ring-white/10 ">
              <span>
                View Services
              </span>
              <svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg" >
                <path d="M10.75 8.75L14.25 12L10.75 15.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>
        </div>

        <div className='sm:flex-2 md:flex   justify-center mt-10 '>
          {serviceCategoriesData.map((tab,index) => (
            <HoverCard key={tab.category || index}>
              <HoverCardTrigger><button className='text-white px-2'>{tab.category}</button></HoverCardTrigger>
              <HoverCardContent className="bg-black/30 backdrop-blur-md text-white rounded-lg shadow-md p-4 w-56">
                <ul className="c list-inside space-y-1 text-start">
                  {tab.services.map((service) => (
                    <li
                      key={service}
                      className="transition-all duration-200 hover:underline hover:underline-offset-4 hover:text-[#bb8d03]"
                    >
                      + {service}
                    </li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>

        {/* ✅ Frosted Hero Image Section */}
        <section
          id="Hero-image"
          className="relative max-w-7xl py-6 px-4 sm:px-6 lg:px-6 overflow-hidden rounded-2xl mt-14 h-dvh backdrop-blur-2xl border border-white/40 shadow-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.020) 3.25%, rgba(255, 255, 255, 0.04) 96.75%), rgba(255, 255, 255, 0.25)",
          }}
        >
          {/* Example placeholder for image */}
          {/* <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-white/50 to-transparent border border-white/20"></div> */}
          <div className="absolute inset-4 rounded-2xl overflow-hidden">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Hero ${index}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );

};

export default HeroSection;
