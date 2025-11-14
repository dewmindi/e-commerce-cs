
// import { motion } from 'framer-motion'
// import React, { useEffect, useState, useRef } from 'react'
// import Link from 'next/link'
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card"
// import Header from "@/components/Header"


// const GridSVG = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="500"
//     height="800"
//     viewBox="0 0 500 800"
//     fill="none"
//     className="opacity-100"
//   >
//     <defs>
//       <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
//         <path
//           d="M 40 0 L 0 0 0 40"
//           fill="none"
//           stroke="rgba(255,255,255,0.15)"
//           strokeWidth="1"
//         />
//       </pattern>
//     </defs>
//     <rect width="100%" height="100%" fill="url(#smallGrid)" />
//   </svg>
// );

// const HeroSection = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.playbackRate = 1;
//     }
//   }, []);

//   const [isLoaded, setIsLoaded] = useState(false);

//   const serviceCategoriesData = [
//     {
//       category: "Brand Identity / Logo Deisgn",
//       services: ["Logo Design", "Cooperate Profile Design", "Business Card Design", "Letter Head Design", "Email Signature"]
//     },
//     {
//       category: "Web Development",
//       services: ["E-commerce Website", "Portfolio Website", "Business Website", "Booking Website"]
//     },
//     {
//       category: "Social Media Service",
//       services: ["Social Media Design", "Social Media Managment"]
//     },
//     {
//       category: "Packaging & Label Design",
//       services: ["Packaging Design", "Label Design", "Sticker Design"]
//     },
//     {
//       category: "Leaflet,Flyer & Poster Design",
//       services: ["Leaflets Design", "Flyers Design", "Poster Design"]
//     },
//   ]

//   const images = [
//     "/web-ui-design1.jpg",   // your 4-square logo mockup
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 4000); // change every 4 seconds
//     return () => clearInterval(interval);
//   }, [images.length]);



//   return (
//     <section
//       id="home"
//       className="relative py-10 px-4 sm:px-6 lg:px-8 min-h-screen -mt-4 overflow-hidden bg-animated-gradient"
//             style={{
//         backgroundImage: "url('/cs.png')",  // ✅ set cs.png as background
//       }}
//     >
//       <Header />
//       {/* ✅ Base Left Grid */}
//       <div className="absolute left-0 top-0 h-full w-auto -translate-x-1/3 opacity-80 z-0">
//         <GridSVG />
//       </div>

//       {/* ✅ Base Right Grid (Mirrored) */}
//       <div className="absolute right-0 top-0 h-full w-auto translate-x-1/3 opacity-80 z-0 scale-x-[-1]">
//         <GridSVG />
//       </div>

//       <img
//         src="/grid.svg"
//         alt="Right Grid"
//         className="absolute right-0 top-0 h-full w-auto translate-x-1/3 opacity-40 pointer-events-none select-none z-0"
//       />

//       {/* ✅ Content Container */}
//       <div className="relative max-w-7xl mx-auto text-center mt-10 z-10 ">
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: isLoaded ? 0 : 1, y: isLoaded ? 0 : 20 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="text-4xl sm:text-5xl lg:text-6xl  text-white mb-4 leading-tight mt-20 "
//         >
//           <span>One-Stop</span>{" "}
//           <span className="text-[#bb8d03fc] ">Design Solutions</span>{" "}
//           <span>For</span>
//         </motion.h1>
//         <motion.h1
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl sm:text-5xl lg:text-6xl  text-white mb-6 leading-tight"
//         >
//           <span>All Your Business Branding Needs</span>
//         </motion.h1>

//         <div className="flex justify-center gap-14 text-lg text-gray-800 font-poppins">
//           <Link href="/">
//             <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs  leading-6  text-white inline-block">
//               <span className="absolute inset-0 overflow-hidden rounded-full">
//                 <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//               </span>
//               <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1 px-4 ring-1 ring-white/10 ">
//                 <span>
//                   Get Started
//                 </span>
//                 <svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg" >
//                   <path d="M10.75 8.75L14.25 12L10.75 15.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
//                 </svg>
//               </div>
//               <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
//             </button>
//           </Link>
//           <button className=" no-underline group cursor-pointer relative shadow-2xl rounded-full p-px text-xs  leading-6  text-white inline-block">
//             <span className="absolute inset-0 overflow-hidden rounded-full">
//               <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//             </span>
//             <div className="relative flex space-x-2 items-center z-10 rounded-full bg-transparent py-1 px-4 ring-1 ring-white/10 ">
//               <span>
//                 View Services
//               </span>
//               <svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg" >
//                 <path d="M10.75 8.75L14.25 12L10.75 15.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
//               </svg>
//             </div>
//             <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
//           </button>
//         </div>

//         <div className='sm:flex-2 md:flex   justify-center mt-10 '>
//           {serviceCategoriesData.map((tab,index) => (
//             <HoverCard key={tab.category || index}>
//               <HoverCardTrigger><button className='text-white px-2'>{tab.category}</button></HoverCardTrigger>
//               <HoverCardContent className="bg-black/30 backdrop-blur-md text-white rounded-lg shadow-md p-4 w-56">
//                 <ul className="c list-inside space-y-1 text-start">
//                   {tab.services.map((service) => (
//                     <li
//                       key={service}
//                       className="transition-all duration-200 hover:underline hover:underline-offset-4 hover:text-[#bb8d03]"
//                     >
//                       + {service}
//                     </li>
//                   ))}
//                 </ul>
//               </HoverCardContent>
//             </HoverCard>
//           ))}
//         </div>

//         <div 
//         // className="relative overflow-hidden bg-white max-w-4xl mx-auto h-auto p-4 rounded-3xl mt-10 backdrop-blur-2xl"
//         className="relative max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-16 overflow-hidden rounded-[30px] mt-14 h-dvh backdrop-blur-xl border border-white/40 shadow-lg"
//                   style={{
//             background:
//               "linear-gradient(180deg, rgba(255, 255, 255, 0.020) 3.25%, rgba(255, 255, 255, 0.04) 96.75%), rgba(255, 255, 255, 0.25)",
//           }}
//         >
//           <div className='absolute inset-6 rounded-[26px] overflow-hidden border border-white/40 shadow-lg'>
//                         {images.map((src, index) => (
//               <img
//                 key={index}
//                 src={src}
//                 alt={`Hero ${index}`}
//                 className={` inset-0 w-full h-full  "
//                   }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );

// };

// export default HeroSection;


import { motion } from 'framer-motion'
import React, { useEffect, useState, useRef } from 'react'
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
    className="opacity-50"
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
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1;
  }, []);

  const serviceCategoriesData = [
    {
      category: "Brand Identity / Logo Design",
      services: ["Logo Design", "Corporate Profile Design", "Business Card Design", "Letter Head Design", "Email Signature"]
    },
    {
      category: "Web Development",
      services: ["E-commerce Website", "Portfolio Website", "Business Website", "Booking Website"]
    },
    {
      category: "Social Media Service",
      services: ["Social Media Design", "Social Media Management"]
    },
    {
      category: "Packaging & Label Design",
      services: ["Packaging Design", "Label Design", "Sticker Design"]
    },
    {
      category: "Leaflet, Flyer & Poster Design",
      services: ["Leaflets Design", "Flyers Design", "Poster Design"]
    },
  ];

  const images = ["/web-ui-design1.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);


  return (
    <section
      id="home"
      className="relative py-10 px-4 sm:px-6 lg:px-8 min-h-screen -mt-4 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/cs.png')",
      }}
    >
      {/* ✅ Black overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black/100 z-0"></div>

      {/* ✅ Left Grid */}
      <div className="absolute left-0 top-0 h-full w-auto -translate-x-1/3 opacity-80 z-0">
        <GridSVG />
      </div>

      {/* ✅ Right Grid (mirrored) */}
      <div className="absolute right-0 top-0 h-full w-auto translate-x-1/3 opacity-80 z-0 scale-x-[-1]">
        <GridSVG />
      </div>

      <Header/>

      {/* ✅ Content */}
      <div className="relative max-w-7xl mx-auto text-center mt-10 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 0 : 1, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight mt-20"
        >
          <span>One-Stop</span>{" "}
          <span className="text-[#bb8d03fc]">Design Solutions</span>{" "}
          <span>For</span>
        </motion.h1>

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight"
        >
          <span>All Your Business Branding Needs</span>
        </motion.h1>

        {/* ✅ Buttons */}
        <div className="flex justify-center gap-14 text-lg text-gray-800 font-poppins">
          <Link href="#packages">
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

          <Link href="#services">
            <button className="group relative shadow-2xl rounded-full p-px text-xs leading-6 text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-transparent py-1 px-4 ring-1 ring-white/10">
                <span>View Services</span>
                <svg fill="none" height="16" viewBox="0 0 24 24" width="16">
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </button>
          </Link>
        </div>

        {/* ✅ Hover cards */}
        <div className="sm:flex-2 md:flex justify-center mt-10">
          {serviceCategoriesData.map((tab, index) => (
            <HoverCard key={tab.category || index}>
              <HoverCardTrigger>
                <button className="text-white px-2">{tab.category}</button>
              </HoverCardTrigger>
              <HoverCardContent className="bg-black/30 backdrop-blur-md text-white rounded-lg shadow-md p-4 w-56">
                <ul className="list-inside space-y-1 text-start">
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

        <div
          className="relative max-w-4xl mx-auto mt-14 rounded-[30px] h-[80vh] overflow-hidden shadow-xl"
        >
          {/* Outer frosted-glass container */}
          <div
            className="absolute inset-0 rounded-[30px] backdrop-blur-2xl border border-white/20"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)",
            }}
          ></div>

          {/* 💡 Reflection highlight at the top */}
          <div
            className="absolute inset-x-0 top-0 h-24 rounded-t-[30px] pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.30), rgba(255,255,255,0.05), transparent)",
              filter: "blur(12px)",
            }}
          ></div>

          {/* ✨ Diagonal glass reflection */}
          <div
            className="absolute  pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
              mixBlendMode: "overlay",
            }}
          ></div>

          {/* Inner frosted glass padding frame */}


          {/* Inner image area */}
          <div className="absolute inset-4 rounded-[20px] overflow-hidden border border-white/10 shadow-lg">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Hero ${index}`}
                className="w-full h-full object-fill md:object-cover"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
