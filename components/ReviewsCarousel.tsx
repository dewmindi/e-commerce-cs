"use client";

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import ReviewCard from "@/components/ReviewCard";

export default function ReviewsCarousel({ reviews }: { reviews: any[] }) {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className="relative ">
            <div className="flex flex-col items-center mb-10 space-y-3">
                {/* Reviews count */}
                <span className="text-lg font-semibold text-gray-800">
                    Trusted by <span className="text-[#bb8d03]">{reviews.length}+</span> Clients
                </span>

                {/* Star Rating */}
                <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={`star-${i}`} className="w-5 h-5" />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-600">5.0 Rating</span>
                </div>
            </div>

            <div ref={carouselRef} className="flex overflow-x-hidden gap-6 scrollbar-hide ">
                {reviews.map((review) => (
                    <div key={review._id} className=" w-[300px] flex-shrink-0 ">
                        <ReviewCard review={review} />
                    </div>
                ))}
            </div>


            {/* Navigation */}
            <button
                onClick={scrollLeft}
                className="absolute top-1/2 left-0 transform -translate-y-1/2  sm:-ml-6 md:-ml-16 lg:-ml-10 p-2 bg-white rounded-full shadow-md z-10  md:flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
                <FaChevronLeft className="w-5 h-5" />
            </button>

            <button
                onClick={scrollRight}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 sm:-mr-6 md:-mr-16 lg:-mr-10  p-2 bg-white rounded-full shadow-md z-10  md:flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
                <FaChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
