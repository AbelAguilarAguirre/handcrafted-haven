"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ImageUploader from "@/app/ui/profile/ImageUploader";
import { Product } from "@/app/lib/definitions";
import { addProduct } from "@/app/lib/actions";
import SelectCategories from "./select-categories";
import axios from "axios";
import { z } from "zod";
import { UUID } from "crypto";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  id: UUID | undefined;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onSave,
  id,
}: AddProductModalProps) {
  const { data: session } = useSession();
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    price?: string;
    description?: string;
  }>({});

  const productSchema = z.object({
    name: z.string().min(1, "Title is required"),
    price: z.number().min(0.01, "Price must be greater than 0"),
    description: z.string().min(1, "Description is required"),
  });

  const handleFileSelect = (file: File): void => {
    setImageFile(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedProduct({
      ...editedProduct,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = productSchema.safeParse(editedProduct);

    if (!result.success) {
      const errorMessages: {
        name?: string;
        price?: string;
        description?: string;
      } = {};
      result.error.errors.forEach((error) => {
        if (error.path.includes("name")) {
          errorMessages.name = error.message;
        }
        if (error.path.includes("price")) {
          errorMessages.price = error.message;
        }
        if (error.path.includes("description")) {
          errorMessages.description = error.message;
        }
      });
      setErrors(errorMessages);
      return;
    }

    const formData = new FormData();
    formData.append("name", editedProduct.name);
    formData.append("price", editedProduct.price.toString());
    formData.append("description", editedProduct.description);
    formData.append(
      "categories",
      (document.querySelector('input[name="categories"]') as HTMLInputElement)
        .value
    );

    if (imageFile) {
      try {
        formData.append("file", imageFile);

        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = async () => {
          const response = await axios.post("/api/upload", {
            file: reader.result,
          });

          const imageUrl = response.data.url;
          const product = await addProduct(
            session?.user?.id,
            editedProduct.price,
            editedProduct.description,
            editedProduct.name,
            imageUrl,
            formData.get("categories") as string
          );
          if (product) {
            onSave(product);
            onClose();
          }

        };
      } catch (error) {
        console.error("Error uploading image", error);
      }
    } else {
      const product = await addProduct(
        session?.user?.id,
        editedProduct.price,
        editedProduct.description,
        editedProduct.name,
        "",
        formData.get("categories") as string
      );
      if (product) {
        onSave(product);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 min-h-[290px] max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Add Product</h2>
          <Button variant="outlined" color="error" onClick={onClose}>
            Close
          </Button>
        </div>
        <form onSubmit={handleSave}>
          <TextField
            label="Title"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
            className="w-full mb-4"
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={editedProduct.price}
            onChange={handleInputChange}
            className="w-full mb-4"
            required
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            label="Description"
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            className="w-full"
            required
            error={!!errors.description}
            helperText={errors.description}
          />
          <SelectCategories productId="" />
          <ImageUploader onUpload={handleFileSelect} />
          <p>{imageFile ? imageFile.name : ""}</p>
          <Button type="submit" variant="contained" className="mt-4">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
