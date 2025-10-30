import FooterNew from "@/components/FooterNew";
import Header from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { motion } from 'framer-motion';


// async function getReviews() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`, {
//     cache: "no-store", // always fetch fresh data
//   });
//   return res.json();
// }

// async function getReviews() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`, {
//     cache: "no-store",
//   });

//   const data = await res.json();
//   console.log(data); // add this to check what you are actually receiving
//   return data;
// }

// export default async function ReviewsPage() {
//   const reviews = await getReviews();

//   return (
//     <div className="max-w-3xl mx-auto py-10 space-y-4">
//       <h1 className="text-2xl font-bold mb-4">Customer Reviews</h1>
//       <div className="grid gap-4">
//         {reviews.map((review: any) => (
//           <ReviewCard key={review._id} review={review} />
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";
import ReviewsCarousel from "@/components/ReviewsCarousel";



export default async function ReviewsPage() {

    async function getReviews() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`, {
            cache: "no-store",
        });

        const data = await res.json();
        console.log("Review Page:",data); // add this to check what you are actually receiving
        return data;
    }
    const reviews = await getReviews();

    

    return (
        <div className="min-h-screen bg-white mx-auto ">
            <Header />
            <section className="bg-gradient-to-r from-[#bb8d03fc] to-[#211f0b] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-16">
                <div className="absolute inset-0 bg-pattern-dots opacity-10"></div> {/* Subtle background pattern */}
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <h1
                        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 drop-shadow-lg"
                    >
                        What Our Clients Say About Our Graphic Design & Web Development Service
                    </h1>
                    <p
                        className="text-lg sm:text-xl max-w-4xl mx-auto"
                    >
                        Discover how businesses across Australia trust us for creative graphic design, professional web development, and digital branding solutions that drive results.
                    </p>
                    <div
                        className="mt-8"
                    >

                        <Button className="bg-[#FFC107] hover:bg-[#FFA000] text-[#333333] px-10 py-4 rounded-lg font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105">
                            Let's Start Your Project
                        </Button>
                    </div>
                </div>
            </section>
            {/* <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-20 mb-6 p-4 sm:p-6 lg:p-8">What our customers say</h2> */}
            <h2 className="flex justify-center items-center text-3xl sm:text-2xl  text-[#333333] text-center mt-10 px-20 ">
                We pride ourselves on delivering stunning designs, user-friendly websites, and impactful digital experiences. Don't just take our word for it, read testimonials from clients who have partnered with us to grow their brand online
            </h2>
            {/* <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 lg:p-8 lg:px-20">
                {reviews.map((review: any) => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </section> */}
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 relative">

                <ReviewsCarousel reviews={reviews} />
            </div>

            {/* Call to Action */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#bb8d03fc] to-[#ada661]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Transform Your Vision?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Let's work together to create something extraordinary that represents your brand and drives your success.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/projects">
                            <Button className="bg-[#FFC107] hover:bg-[#FFA000] font-bold text-lg shadow-xl text-[#333333] px-8 py-3  hover:scale-105 rounded-lg transition-colors">
                                View Our Work
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <FooterNew />
        </div>
    );
};
