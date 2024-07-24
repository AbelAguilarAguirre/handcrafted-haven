"use client";

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ImageUploader from "@/app/ui/profile/ImageUploader";
import SelectCategories from "./select-categories";
import { Product } from "@/app/lib/definitions";
import { SelectChangeEvent } from "@mui/material/Select";
import { updateProduct } from "@/app/lib/actions";
import axios from "axios";
import { UUID } from "crypto";
import { z } from "zod";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSave: (product: Product) => void;
}

const productSchema = z.object({
  name: z.string().min(1, "Title is required"),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  categories: z
    .array(z.string())
    .min(1, "You must select at least one category"),
});

export default function EditProductModal({
  isOpen,
  onClose,
  products,
  onSave,
}: EditProductModalProps) {
  const [selectedProductId, setSelectedProductId] = useState<UUID | null>();
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>();
  const [productImage, setProductImage] = useState<string | null>();
  const [errors, setErrors] = useState<Partial<
    Record<keyof Product, string>
  > | null>(null);
  const [categoryErrors, setCategoryErrors] = useState<string | null>(null);

    useEffect(() => {
      setErrors(null);
    }, [selectedProductId]);

  const handleFileSelect = (file: File): void => {
    setImageFile(file);
  };

  const handleProductChange = (event: SelectChangeEvent<string>) => {
    const productId = event.target.value;
    const product = products.find((p) => p.product_id === productId || null);
    setSelectedProductId(product?.product_id);
    setEditedProduct(product || null);
    setProductImage(product?.image_url);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProduct) {
      const { name, value } = event.target;
      setEditedProduct({
        ...editedProduct,
        [name]: name === "price" ? parseFloat(value) : value,
      });
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const categories = formData.getAll("categories") as string[];


    const result = productSchema.safeParse({
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      description: formData.get("description") as string,
      categories,
    });

    if (!result.success) {
      const errorMap = result.error.format();
      setErrors({
        name: errorMap.name?._errors[0],
        price: errorMap.price?._errors[0],
        description: errorMap.description?._errors[0],
      });
      setCategoryErrors(errorMap.categories?._errors[0] || null);
      return;
    }

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
          setProductImage(imageUrl);
          if (selectedProductId) {
            const product = await updateProduct(
              selectedProductId,
              editedProduct?.price || 0,
              editedProduct?.description || "",
              editedProduct?.name || "",
              imageUrl,
              categories.join(", ")
            );
            if (product) {
              onSave(product);
              onClose();
            }
          }
        };
      } catch (error) {
        console.error("Error uploading image", error);
      }
    } else {
      if (selectedProductId) {
        const product = await updateProduct(
          selectedProductId,
          editedProduct?.price || 0,
          editedProduct?.description || "",
          editedProduct?.name || "",
          productImage || "",
          categories.join(", ")
        );
        if (product) {
          onSave(product);
          onClose();
        }
      }
    }
  };

  if (!isOpen) return null;

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 min-h-[290px] max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Edit Product</h2>
          <Button variant="outlined" color="error" onClick={onClose}>
            Close
          </Button>
        </div>
        <Select
          value={selectedProductId || ""}
          readOnly={products.length < 1 ? true : false}
          onChange={handleProductChange}
          className="w-full mb-4"
        >
          {products.map((product) => (
            <MenuItem key={product.product_id} value={product.product_id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
        {editedProduct && (
          <form onSubmit={handleSave}>
            <TextField
              label="Title"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              className="w-full mb-4"
              error={!!errors?.name}
              helperText={errors?.name}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={editedProduct.price}
              onChange={handleInputChange}
              className="w-full mb-4"
              error={!!errors?.price}
              helperText={errors?.price}
            />
            <TextField
              label="Description"
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              className="w-full"
              error={!!errors?.description}
              helperText={errors?.description}
            />
            <SelectCategories
              productId={editedProduct.product_id}
            />
            {categoryErrors && (
              <p className="text-red-500 text-sm">{categoryErrors}</p>
            )}
            <ImageUploader onUpload={handleFileSelect} />
            <p>{imageFile ? imageFile.name : "" }</p>
            <Button type="submit" variant="contained" className="mt-4">
              Save
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
