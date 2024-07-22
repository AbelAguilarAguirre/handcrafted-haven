'use client';

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ImageUploader from "@/app/ui/profile/ImageUploader";
import { Product } from "@/app/lib/definitions";
import { addProduct } from "@/app/lib/actions";
import SelectCategories from "./select-categories";
import axios from "axios";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onSave,
}: AddProductModalProps) {
  const { data: session } = useSession();
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>();

  const handleFileSelect = (file: File): void => {
    setImageFile(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProduct) {
      const { name, value } = event.target;
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  const handleSave = async (formData: FormData) => {
    const categories = formData.get('categories');

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
                editedProduct?.price,
                editedProduct?.description,
                editedProduct?.name,
                imageUrl,
                categories as string
            );
            if (editedProduct && product) {
                onSave(product);
                onClose();
            }
        };
      } catch (error) {
        console.error("Error uploading image", error);
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
        <form action={handleSave}>
          <TextField
            label="Title"
            name="name"
            onChange={handleInputChange}
            className="w-full mb-4"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            onChange={handleInputChange}
            className="w-full mb-4"
          />
          <TextField
            label="Description"
            name="description"
            onChange={handleInputChange}
            multiline
            rows={4}
            className="w-full"
          />
          <SelectCategories productId="" />
          <ImageUploader onUpload={handleFileSelect} />
          <Button type="submit" variant="contained" className="mt-4">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
