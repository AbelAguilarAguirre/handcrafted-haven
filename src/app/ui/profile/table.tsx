'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProductCard } from "../product-cards";
import { UUID } from "crypto";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import Pagination from "@/app/ui/profile/pagination";
import { Product } from "@/app/lib/definitions";
import { useSearchParams } from "next/navigation";
import ManageProductsModal from "./manage-products-modal";
import EditProductModal from "./edit-product-modal";

export default function ProductsTable({
  products,
  params,
  totalPages,
}: {
  products: Product[];
  params: { id: UUID };
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const id = params.id;
  const { data: session } = useSession();
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [manageModalOpen, setManageModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productsList, setProductsList] = useState(products);

  const PRODUCTS_PER_PAGE = 8;

  useEffect(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    setDisplayedProducts(productsList.slice(startIndex, endIndex));
  }, [currentPage, productsList]);

  const openManageModal = () => setManageModalOpen(true);
  const closeManageModal = () => setManageModalOpen(false);

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const saveEditedProduct = (updatedProduct: Product) => {
    setProductsList((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === updatedProduct.product_id
          ? updatedProduct
          : product
      )
    );
  };

  return (
    <>
      <div className="flex justify-between mb-4 w-full">
        <h2 className="text-4xl font-bold mx-2">Products</h2>
        {session?.user.id === id && (
          <Button
            variant="contained"
            className="mx-2"
            onClick={openManageModal}
          >
            Manage Products
          </Button>
        )}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {displayedProducts.map((product) => (
          <Link
            key={product.product_id}
            href={`/product/${product.product_id}`}
            className="inline-block"
          >
            <ProductCard key={product.product_id} product={product} />
          </Link>
        ))}
        {displayedProducts.length === 0 && (
          <p className="w-fit mx-auto text-xl my-8">
            User has not added any products yet.
          </p>
        )}
      </div>
      <div className="mt-7 mb-2 text-center">
        <Pagination totalPages={totalPages} />
      </div>
      <ManageProductsModal
        isOpen={manageModalOpen}
        onClose={closeManageModal}
        onAddProduct={openAddModal}
        onEditProduct={openEditModal}
        onDeleteProduct={openDeleteModal}
      />
      <EditProductModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        products={productsList}
        onSave={saveEditedProduct}
      />
    </>
  );
}
