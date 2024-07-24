'use client';

import { Review } from "@/app/lib/definitions";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { useSession } from "next-auth/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useReview } from "./ReviewContext";
import { useState } from "react";
import { UUID } from "crypto";



export default function ReviewCard( { review, userId }: {review: Review, userId: UUID | undefined}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState({
    title: review.title,
    review: review.review,
    rating: review.rating,
  });
  const { data: session } = useSession();
  const { removeReview, updateReviewDetails } = useReview();

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedReview({
        ...editedReview,
        [name]: value,
    });
};

  const handleSave = () => {
    updateReviewDetails(review.review_id, editedReview.title, editedReview.review, editedReview.rating);
    setIsEditing(false);
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded shadow-md">
      {isEditing ? (
        <div className="space-y-4">
          <TextField
            label="Title"
            name="title"
            value={editedReview.title}
            onChange={handleInputChange}
            fullWidth
          />
          <Rating
            size="medium"
            value={editedReview.rating}
            precision={1}
            onChange={(e, newValue) =>
              setEditedReview({ ...editedReview, rating: newValue || 5 })
            }
          />
          <TextField
            label="Review"
            name="review"
            value={editedReview.review}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <Image
              src={review.image_url || "/images/default-avatar.jpeg"}
              height={30}
              width={30}
              alt={review.name}
            />
            <p className="ml-2">{review.name}</p>
          </div>
          <div className="flex items-center">
            <h3 className="text-xl font-semibold">{editedReview.title}</h3>
            <Rating
              size="medium"
              defaultValue={editedReview.rating}
              precision={1}
              readOnly
              className="ml-2"
            />
          </div>
          <p className="mt-2 text-gray-600">{editedReview.review}</p>
          <div className="mt-4">
            {(session?.user?.id === review.user_id || userId === review.user_id) && (
              <>
                <IconButton onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => removeReview(review.review_id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}