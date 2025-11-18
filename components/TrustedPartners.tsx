import { HoverEffect } from "./ui/card-hover-effect";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";


export function TrustedPartners() {
  return (
    <div className="max-w-5xl mx-auto px-8 -mt-60 md:mt-0 ">
      <HoverEffect items={projects} />
      <div className="mt-10">
        <h1 className="text-2xl text-white text-center ">We help businesses in all around the world</h1>
        
      </div>
    </div>
  );
}
export const projects = [
  {
    title: "Friendly Communication",
    description:
      "We believe in clear, open, and friendly discussions throughout our process.",
    link: "",
  },
  {
    title: "No Hidden Fees",
    description:
      "Transparency is key. What you see is what you pay, with no surprises.",
    link: "",
  },
  {
    title: "100% Satisfaction",
    description:
      "We're committed to your complete satisfaction with our work and service.",
    link: "",
  }
];
