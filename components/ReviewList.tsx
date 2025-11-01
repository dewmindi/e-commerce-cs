import React, { useEffect, useState, useRef } from "react";
import ReviewCard from "./ReviewCard";

interface Review {
  _id: string;
  username: string;
  user_image_url: string;
  review_images: string;
  stars: number;
  time: string;
  text: string;
  user_url: string;
}

interface ReviewListProps {
  limit?: number;
  direction?: "left" | "right";
  speed?: number; // pixels per second
}

const ReviewList: React.FC<ReviewListProps> = ({
  limit,
  direction = "left",
  speed = 50,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews", { cache: "no-store" });
        let data: Review[] = await res.json();
        data = data.sort((a, b) => (a._id < b._id ? -1 : 1));
        if (limit) data = data.slice(0, limit);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [limit]);

  // Calculate animation duration dynamically based on container width
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.scrollWidth;
      setAnimationDuration(width / speed); // duration in seconds
    }
  }, [reviews, speed]);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={containerRef}
        className="flex gap-6"
        style={{
          display: "inline-flex",
          animation: `${
            direction === "left" ? "scrollLeft" : "scrollRight"
          } ${animationDuration}s linear infinite`,
        }}
      >
        {[...reviews, ...reviews].map((review, idx) => (
          <ReviewCard key={`${review._id}-${idx}`} review={review} />
        ))}
      </div>

      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewList;
