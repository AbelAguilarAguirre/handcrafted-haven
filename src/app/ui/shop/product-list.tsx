"use client";

import React, { useEffect, useState, useRef } from "react";
import { ProductCard } from "../product-cards";
import { fetchProducts } from "../../lib/data";
import Pagination from "../profile/pagination";
import { useSearchParams } from "next/navigation";
import { Product } from "../../lib/definitions";

interface ProductListProps {
  maxPrice: number;
  searchQuery: string;
  totalPages: number;
}

export default function ProductList({
  maxPrice,
  searchQuery,
}: ProductListProps) {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const PRODUCTS_PER_PAGE = 8;
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts(maxPrice, searchQuery);
      setProducts(fetchedProducts);
      setTotalPages(
        Math.ceil((fetchedProducts?.length ?? 1) / PRODUCTS_PER_PAGE)
      );
      const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      setDisplayedProducts(fetchedProducts?.slice(startIndex, endIndex) ?? []);
    };

    getProducts();
  }, [maxPrice, searchQuery, currentPage]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {displayedProducts?.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
      <div className="mt-7 mb-2 text-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
