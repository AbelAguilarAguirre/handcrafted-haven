"use client";

import { useEffect, useState } from "react";
import ReviewCard from "./review-card";
import { UUID } from "crypto";
import { getReviewsById } from "@/app/lib/data";
import { Review } from "@/app/lib/definitions";
import ReviewForm from "./review-form";
import { useReview } from "./ReviewContext";

export default function ReviewsTable({ product_id }: { product_id: UUID }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAll, setShowAll] = useState(false);
  const { reviewCount } = useReview();

  useEffect(() => {
    async function fetchReviews() {
      const fetchedReviews = await getReviewsById(product_id);
      setReviews(fetchedReviews);
    }

    fetchReviews();
  }, [product_id, reviewCount]);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

  return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <ReviewForm product_id={product_id}/>
          <div>
            {displayedReviews.map((review) => (
              <ReviewCard key={review.review_id} review={review} />
            ))}
          </div>
          {reviews.length > 5 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {showAll ? "Show Less" : "See More"}
              </button>
            </div>
          )}
        </div>
      </div>
  );
}
