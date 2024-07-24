"use client";

import { UUID } from "crypto";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { deleteReviewById, addReview, updateReview } from "@/app/lib/actions";

interface ReviewContextType {
  reviewCount: number;
  removeReview: (review_id: UUID) => void;
  addNewReview: (title: string, review: string, rating: number, product_id: UUID, user_id: UUID) => void;
  updateReviewDetails: (review_id: UUID, title: string, review: string, rating: number) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {

  const [reviewCount, setReviewCount] = useState(0);

  const removeReview = async (review_id: UUID) => {
    await deleteReviewById(review_id);
    setReviewCount(Number(reviewCount) - 1);
  };

  const addNewReview = async (title: string, review: string, rating: number, product_id: UUID, user_id: UUID) => {
    const reviewReturn = await addReview(title, review, rating, product_id, user_id);
    if (reviewReturn) {
      setReviewCount(Number(reviewCount) + 1);
    }
  };

  const updateReviewDetails = async (review_id: UUID, title: string, review: string, rating: number) => {
    await updateReview(review_id, title, review, rating);
    setReviewCount(Number(reviewCount) + 1);
    setReviewCount(Number(reviewCount) - 1);
  }

  return (
    <ReviewContext.Provider
      value={{
        reviewCount,
        removeReview,
        addNewReview,
        updateReviewDetails,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error("useReview must be used within a ReviewProvider");
  }
  return context;
}
