import React from "react";
import Button from "@mui/material/Button";

interface ManageProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: () => void;
  onEditProduct: () => void;
  onDeleteProduct: () => void;
}

export default function ManageProductsModal({ 
    isOpen, 
    onClose, 
    onAddProduct, 
    onEditProduct, 
    onDeleteProduct }: ManageProductsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Manage Products</h2>
        <div className="flex flex-col space-y-4">
          <Button variant="contained" onClick={onAddProduct}>
            Add Product
          </Button>
          <Button variant="contained" onClick={onEditProduct}>
            Edit Product
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onDeleteProduct}
          >
            Delete Product
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

