// app/components/ReviewCard.tsx
"use client";

import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface ReviewCardProps {
  review: any; // adjust your type
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-500">
        {Array.from({ length: fullStars }).map((_, i) => (
          <FaStar key={`full-${i}`} className="w-4 h-4" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="w-4 h-4" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="w-4 h-4" />
        ))}
      </div>
    );
  };

  return (
    <div className="flex-shrink-0 w-80 h-96 bg-black rounded-lg border p-4 flex flex-col justify-between">
      <div className="flex items-center gap-3">
        <img
          src={review.user_image_url}
          alt={review.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-white">{review.username}</div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            {renderStars(review.stars)}
            <span>{review.time}</span>
          </div>
        </div>
                <div className="flex justify-end">
          <img
            src={"https://www.ytviews.in/wp-content/uploads/2020/12/google.svg"}
            alt="Google"
            className=" w-8 h-8"
          />
        </div>
      </div>
      

      <p className="text-sm text-white mt-2 line-clamp-6">
        {review.text}
      </p>

      {review.review_images && (
        <img
          src={review.review_images}
          alt="review image"
          className="w-full h-32 object-cover mt-2 rounded"
        />
      )}

      <div className="mt-2 text-yellow-500 font-semibold"></div>
    </div>
  );
};

export default ReviewCard;
