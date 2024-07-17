'use client';

import { useReview } from "./ReviewContext";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { UUID } from "crypto";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function ReviewForm({ product_id }: { product_id: UUID }) {
  const [showForm, setShowForm] = useState(false);
  const { data: session } = useSession();
  const user_id = session?.user?.id;
  const { addNewReview} = useReview();
  const [newReview, setNewReview] = useState({
    title: "",
    review: "",
    rating: 1,
  });

  const handleSave = () => {
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
        {session ? (<button
          onClick={() => setShowForm(!showForm)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showForm ? "Close Form" : "Add New Review"}
        </button>) : (
          <>
            <span className="mr-4 font-bold">You must be logged in to add a review!</span>
            <button
              onClick={() => window.open('/login')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Log In
            </button>
            <span className=" font-bold mx-4">or</span>
            <button
              onClick={() => window.open('/register')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create an Account
            </button>
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