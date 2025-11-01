"use client";

import { FC } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

type HeroProps = {
  title?: string;
  title1?: string;
  subtitle?: string;
  subtitle1?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImageUrl?: string;
};

const NewHero: FC<HeroProps> = ({
  title = "One-Stop  ",
  title1 = "  Design Solutions",
  subtitle = "For All Your Business Branding Needs",
  subtitle1 = "We always deliver more than expected",
  ctaText = "Get Started",
  ctaHref = "/contact",
  backgroundImageUrl = "/hero-bg.jpg",
}) => {
  const { scrollY } = useScroll();

  // Subtle parallax motion
  const yImage1 = useTransform(scrollY, [0, 500], [0, 60]);
  const yImage2 = useTransform(scrollY, [0, 500], [0, -40]);

  return (
    <section
      className=" relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-[#0a0a09] text-white overflow-hidden -mt-4"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
     <div className="absolute inset-0 flex flex-col justify-center items-center px-4 py-24 z-10">
       {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black/60" /> */}

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl px-4 py-24">
        {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-fadeInUp">
          {title}
        </h1> */}
        <span className="text-4xl sm:text-5xl lg:text-5xl font-bold">{title}</span>{" "}
        <span className="text-[#fcb615] text-4xl sm:text-5xl lg:text-5xl font-bold">Design Solutions</span>{" "}

        <p className="text-4xl sm:text-5xl lg:text-5xl font-bold mb-8 opacity-0 animate-fadeInUp delay-200">
          {subtitle}
        </p>
<p className=" text-lg md:text-xl mb-8 opacity-0 animate-fadeInUp delay-200 ">
  {subtitle1}
</p>

<button
  onClick={() => {
    const section = document.getElementById("pricing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
  className="inline-block px-8 py-4 border border-[#fcb615] text-white font-medium rounded hover:bg-[#fcb615] hover:text-black transform transition-transform duration-300 ease-out opacity-0 animate-fadeInUp delay-400"
>
  {ctaText}
</button>

      </div>

      {/* Left decorative image */}
      <div className="hidden lg:block absolute left-0 top-0 h-full w-[45vw] overflow-hidden">
        <motion.img
          src="/shape1.jpeg"
          alt="decor shape 1"
          style={{ y: yImage1 }}
          className="h-full w-full object-cover object-left opacity-80 mix-blend-lighten"
        />
        {/* Right-edge gradient fade */}
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#0a0a09] to-transparent pointer-events-none" />
      </div>

      {/* Right decorative image */}
      <div className="hidden lg:block absolute right-0 top-0 h-full w-[45vw] overflow-hidden">
        <motion.img
          src="/shape2.jpeg"
          alt="decor shape 2"
          style={{ y: yImage2 }}
          className="h-full w-full object-cover object-right opacity-80 mix-blend-lighten"
        />
        {/* Left-edge gradient fade */}
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#0a0a09]/100 to-transparent pointer-events-none" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 right-0 w-full h-40 bg-gradient-to-t from-[#0a0a09] via-transparent"></div>
     </div>
          <section className='mt-auto w-full py-4 bg-[#0a0a09]'>
        <InfiniteMovingCards items={[
          {
            image: "/BrandImages/Dark/dark1.png",
            name: "",
            title: ""
          },
          {
            image: "/BrandImages/Dark/dark2.png",
            name: "",
            title: ""
          },
          {
            image: "/BrandImages/Dark/dark3.png",
            name: "",
            title: ""
          },
          {
            image: "/BrandImages/Dark/dark4.png",
            name: "",
            title: ""
          },
          {
            image: "/BrandImages/Dark/dark5.png",
            name: "",
            title: ""
          },
          {
            image: "/BrandImages/Dark/dark6.png",
            name: "",
            title: ""
          },
          {
            image: "/BrandImages/Dark/dark7.png",
            name: "",
            title: ""
          },
        ]} />
      </section> 
    </section>
  );
};

export default NewHero;


// "use client";

// import { FC } from "react";
// import Link from "next/link";
// import { motion, useScroll, useTransform } from "framer-motion";

// type HeroProps = {
//   title?: string;
//   subtitle?: string;
//   ctaText?: string;
//   ctaHref?: string;
//   backgroundImageUrl?: string;
// };

// const NewHero: FC<HeroProps> = ({
//   title = "We Craft Beautiful Digital Experiences",
//   subtitle = "Graphic & Web Design Agency — Let's elevate your brand.",
//   ctaText = "Get Started",
//   ctaHref = "/contact",
//   backgroundImageUrl = "/hero-bg.jpg",
// }) => {
//   const { scrollY } = useScroll();

//   // Subtle parallax motion
//   const yImage1 = useTransform(scrollY, [0, 500], [0, 60]);
//   const yImage2 = useTransform(scrollY, [0, 500], [0, -40]);

//   return (
//     <section
//       className="relative w-full min-h-screen flex items-center justify-center text-center bg-[#0a0a09] text-white overflow-hidden -mt-4"
//       style={{
//         backgroundImage: `url(${backgroundImageUrl})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Hero Content */}
//       <div className="relative z-10 max-w-2xl px-4 py-24">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-fadeInUp">
//           {title}
//         </h1>
//         <p className="text-lg md:text-xl mb-8 opacity-0 animate-fadeInUp delay-200">
//           {subtitle}
//         </p>
//         <Link href={ctaHref}>
//           <button className="inline-block px-8 py-4 bg-white text-gray-900 font-medium rounded hover:bg-gray-100 transform transition-transform duration-300 ease-out opacity-0 animate-fadeInUp delay-400">
//             {ctaText}
//           </button>
//         </Link>
//       </div>

//       {/* Left decorative image */}
//       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[50vw] sm:w-[40vw] md:w-[35vw] lg:w-[45vw] overflow-visible">
//         <motion.img
//           src="/shape1.jpeg"
//           alt="decor shape 1"
//           style={{ y: yImage1 }}
//           className="w-full h-auto object-cover opacity-80 mix-blend-lighten"
//         />
//         {/* Right-edge gradient fade for desktop */}
//         <div className="hidden lg:block absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#0a0a09] to-transparent pointer-events-none" />
//       </div>

//       {/* Right decorative image */}
//       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] sm:w-[40vw] md:w-[35vw] lg:w-[45vw] overflow-visible">
//         <motion.img
//           src="/shape2.jpeg"
//           alt="decor shape 2"
//           style={{ y: yImage2 }}
//           className="w-full h-auto object-cover opacity-80 mix-blend-lighten"
//         />
//         {/* Left-edge gradient fade for desktop */}
//         <div className="hidden lg:block absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#0a0a09]/100 to-transparent pointer-events-none" />
//       </div>

//       {/* Bottom gradient fade */}
//       <div className="absolute bottom-0 right-0 w-full h-40 bg-gradient-to-t from-[#0a0a09] via-transparent"></div>
//     </section>
//   );
// };

// export default NewHero;


 