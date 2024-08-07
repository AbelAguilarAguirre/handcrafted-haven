"use client";

import { useReview } from "./ReviewContext";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { UUID } from "crypto";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Link from "next/link";
import { z } from "zod";

export default function ReviewForm({ product_id, userId }: { product_id: UUID, userId: UUID | undefined }) {
  const [showForm, setShowForm] = useState(false);
  const { data: session } = useSession();

  const user_id = session?.user?.id || userId;
  const { addNewReview} = useReview();
  const [newReview, setNewReview] = useState({
    title: "",
    review: "",
    rating: 1,
  });
  const [errors, setErrors] = useState<{ title?: string; review?: string }>({});

  // Define the zod schema for validation
  const reviewSchema = z.object({
    title: z.string().min(1, "Title is required"),
    review: z.string().min(1, "Review is required"),
    rating: z.number().min(1).max(5),
  });

  const handleSave = () => {
    // Validate the form data
    const result = reviewSchema.safeParse(newReview);

    if (!result.success) {
      // Extract error messages and set the errors state
      const errorMessages: { title?: string; review?: string } = {};
      result.error.errors.forEach((error) => {
        if (error.path.includes("title")) {
          errorMessages.title = error.message;
        }
        if (error.path.includes("review")) {
          errorMessages.review = error.message;
        }
      });
      setErrors(errorMessages);
      return;
    }

    // If validation passes, proceed with saving the review
    addNewReview(
      newReview.title,
      newReview.review,
      newReview.rating,
      product_id,
      user_id
    );
    setNewReview({
      title: "",
      review: "",
      rating: 1,
    });
    setShowForm(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  return (
    <>
      <div id="reviews" className="text-center mb-12">
        <h2 className="text-3xl font-bold">Customer Reviews</h2>
        {session ? (
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {showForm ? "Close Form" : "Add New Review"}
          </button>
        ) : (
          <>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-lg mb-4 font-semibold">
                You must be logged in to add a review!
              </p>
              <div className="flex justify-center items-center space-x-4">
                <Link
                  href={"/login"}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Log In
                </Link>
                <span className="font-bold">or</span>
                <Link
                  href={"/register"}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300 ease-in-out"
                >
                  Create an Account
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      {showForm && (
        <div className="mb-6 p-4 bg-gray-100 rounded shadow-md space-y-4">
          <TextField
            label="Title"
            name="title"
            value={newReview.title}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.title}
            helperText={errors.title}
          />
          <Rating
            size="medium"
            value={newReview.rating}
            precision={1}
            onChange={(e, newValue) =>
              setNewReview({ ...newReview, rating: newValue || 5 })
            }
          />
          <TextField
            label="Review"
            name="review"
            value={newReview.review}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            required
            error={!!errors.review}
            helperText={errors.review}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Submit Review
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
