'use client';

import React, { useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ImageUploader from "@/app/ui/profile/ImageUploader";
import { Product } from "@/app/lib/definitions";
import { SelectChangeEvent } from "@mui/material/Select";
import { updateProduct } from "@/app/lib/actions";
import axios from "axios";
import { UUID } from "crypto";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSave: (product: Product) => void;
}

export default function EditProductModal({
  isOpen,
  onClose,
  products,
  onSave,}: EditProductModalProps) {
    
  const [selectedProductId, setSelectedProductId] = useState<UUID | null>();
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>();
  const [productImage, setProductImage] = useState<string | null>();

  const handleFileSelect = (file: File): void => {
    setImageFile(file);
  }
  
  const handleProductChange = (
    event: SelectChangeEvent<string>
  ) => {
    const productId = event.target.value;
    const product = products.find((p) => p.product_id === productId || null);
    setSelectedProductId(product?.product_id);
    setEditedProduct(product || null);
    setProductImage(product?.image_url);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProduct) {
      const { name, value } = event.target;
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  const handleSave = async () => {
    if (imageFile) {
      try {
        const formData = new FormData();
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
            await updateProduct(selectedProductId, editedProduct?.price || 0, editedProduct?.description || "", editedProduct?.name || "", imageUrl);
          }
        };
      } catch (error) {
        console.error("Error uploading image", error);
      }
    } else {
        if (selectedProductId) {
            await updateProduct(
              selectedProductId,
              editedProduct?.price || 0,
              editedProduct?.description || "",
              editedProduct?.name || "",
              productImage || ""
            );
        }
    }
    if (editedProduct) {
      onSave(editedProduct);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Edit Product</h2>
        <Select
          value={selectedProductId || ""}
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
          <>
            <TextField
              label="Title"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              className="w-full mb-4"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={editedProduct.price}
              onChange={handleInputChange}
              className="w-full mb-4"
            />
            <TextField
              label="Description"
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              className="w-full mb-4"
            />
            <ImageUploader onUpload={handleFileSelect} />
            <Button variant="contained" onClick={handleSave} className="mt-4">
              Save
            </Button>
          </>
        )}
        <Button variant="outlined" onClick={onClose} className="mt-4 ml-2">
          Close
        </Button>
      </div>
    </div>
  );
};