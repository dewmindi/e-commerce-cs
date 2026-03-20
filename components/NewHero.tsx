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
  backgroundImageUrl = "/bg-cs-hero1.jpeg",
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
      <div className="absolute inset-0 bg-black/60" />

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

      <div className="absolute bottom-0 right-0 w-full h-40 bg-gradient-to-t from-[#0a0a09] via-transparent"></div>
     </div>
          
    </section>
  );
};

export default NewHero;





 