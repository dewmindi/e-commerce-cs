import { HoverEffect } from "./ui/card-hover-effect";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";


export function TrustedPartners() {
  return (
    <div className="max-w-5xl mx-auto px-8 mt-20">
      <HoverEffect items={projects} />
      <div className="mt-10">
        <h1 className="text-2xl text-white tracking-wider text-center">We help businesses in all around the world</h1>
        <section className=''>
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
