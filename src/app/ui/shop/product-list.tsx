"use client";

import React, { useEffect, useState, useRef } from "react";
import { ProductCard } from "../product-cards";
import { fetchProductsByFilter } from "../../lib/data";
import Pagination from "../profile/pagination";
import { useSearchParams } from "next/navigation";
import { Product } from "../../lib/definitions";

export default function ProductList() {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const PRODUCTS_PER_PAGE = 8;
  const searchParams = useSearchParams();
  
  const currentPage = Number(searchParams.get("page")) || 1;
  const query = searchParams.get('q') || undefined;
  const category = searchParams.get('category') || undefined;
  const min = Number(searchParams.get('min')) || undefined;
  const max = Number(searchParams.get('max')) || undefined;


  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProductsByFilter(query, category, min, max);
      setProducts(fetchedProducts);
      setTotalPages(
        Math.ceil((fetchedProducts?.length ?? 1) / PRODUCTS_PER_PAGE)
      );
      const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      setDisplayedProducts(fetchedProducts?.slice(startIndex, endIndex) ?? []);
    };

    getProducts();
  }, [searchParams]);

  return (
    <>
      <div className="p-4 flex flex-wrap justify-between gap-4 w-[80vw] mx-auto min-h-[50vh]">
        {(displayedProducts.length > 0) ? (displayedProducts?.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))) : (<p className='text-xl font-bold'>No Products Found!</p>)}
      </div>
      <div className="mt-7 mb-2 text-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
