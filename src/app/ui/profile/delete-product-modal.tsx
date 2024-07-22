"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Product } from "@/app/lib/definitions";
import { SelectChangeEvent } from "@mui/material/Select";
import { deleteProductById } from "@/app/lib/actions";
import { UUID } from "crypto";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onDelete: (productId: UUID) => void;
}

export default function DeleteProductModal({
  isOpen,
  onClose,
  products,
  onDelete,
}: EditProductModalProps) {
  const [selectedProductId, setSelectedProductId] = useState<UUID | null>();

  const handleProductChange = (event: SelectChangeEvent<string>) => {
    const productId = event.target.value;
    const product = products.find((p) => p.product_id === productId || null);
    setSelectedProductId(product?.product_id);
  };


  const handleDelete = async () => {
      try {
        if (selectedProductId) {
            await deleteProductById(
                selectedProductId
            );
            onDelete(selectedProductId);
            onClose();
          }
          
      
      } catch (error) {
        console.error("Error deleting product", error);
      }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 min-h-[290px] max-h-[90vh] overflow-auto">
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
        <>
          <Button
            variant="contained"
            onClick={handleDelete}
            className="mt-4"
            color="error"
          >
            Delete
          </Button>
        </>
        <Button variant="outlined" onClick={onClose} className="mt-4 ml-2">
          Close
        </Button>
      </div>
    </div>
  );
}
