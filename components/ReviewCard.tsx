// "use client";


// import React from "react";
// import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"; // Using react-icons for a cleaner look

// interface Review {
//   _id: string;
//   username: string;
//   user_image_url: string;
//   review_images?: string | string[];
//   stars: number;
//   time: string;
//   text: string;
//   user_url: string;
// }

// const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
// const renderStars = (rating: number) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;
//   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//   return (
//     <div className="flex text-yellow-500">
//       {Array.from({ length: fullStars }).map((_, i) => (
//         <FaStar key={`full-${i}`} className="w-4 h-4" />
//       ))}
//       {hasHalfStar && <FaStarHalfAlt className="w-4 h-4" />}
//       {Array.from({ length: emptyStars }).map((_, i) => (
//         <FaRegStar key={`empty-${i}`} className="w-4 h-4" />
//       ))}
//     </div>
//   );
// };

//   const reviewImages = Array.isArray(review.review_images)
//     ? review.review_images
//     : review.review_images
//       ? [review.review_images]
//       : [];

//   return (
//     <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2 h-full">

//       <div className="flex items-center gap-2">
//         <div className="flex items-center gap-2 flex-grow">
//           <img
//             src={`/api/user-image?url=${encodeURIComponent(review.user_image_url)}`}
//             alt={review.username}
//             className="w-10 h-10 rounded-full mr-3"
//             onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
//           />

//           <div className="flex flex-col">
//             <a
//               href={review.user_url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="font-medium text-gray-800 hover:underline"
//             >
//               {review.username}
//             </a>
// <div className="flex items-center gap-1 text-xs text-gray-500">
//   {renderStars(review.stars)}
//   <span>{review.time}</span>
// </div>
//           </div>
//         </div>
// <div className="flex justify-end">
//   <img
//     src={"https://www.ytviews.in/wp-content/uploads/2020/12/google.svg"}
//     alt="Google"
//     className=" w-8 h-8"
//   />
// </div>
//       </div>
//       <hr className="my-2" />

//       <p className="text-gray-700 text-sm leading-relaxed line-clamp-6 ">{review.text}</p>
//       {reviewImages.length > 0 && (
//         <div className="mt-2 grid grid-cols-1 gap-2">
//           {reviewImages.map((img, i) => (
//             <img
//               key={i}
//               src={`/api/user-image?url=${encodeURIComponent(img)}`}
//               alt={`Review image ${i + 1}`}
//               className="w-full h-auto rounded-lg object-cover"
//               onError={(e) => (e.currentTarget.style.display = "none")}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewCard;


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
    <div className="flex-shrink-0 w-80 h-96 bg-white rounded-lg border p-4 flex flex-col justify-between">
      <div className="flex items-center gap-3">
        <img
          src={review.user_image_url}
          alt={review.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">{review.username}</div>
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
      

      <p className="text-sm mt-2 line-clamp-6">
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
