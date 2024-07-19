"use client";

import React, { useState, useEffect } from "react";
import ProductList from "../ui/shop/product-list";
import ProductPriceFilter from "../ui/shop/product-price-filter";
import ProductSearch from "../ui/shop/product-search";
import { fetchProducts } from "../lib/data";
import { useRouter } from "next/navigation";

export default function Page() {
  const PRODUCTS_PER_PAGE = 8;
  const [maxPrice, setMaxPrice] = useState(1000);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handlePriceChange = (price: number) => {
    setMaxPrice(price);
    router.push(`/shop?page=1&maxPrice=${price}`);
  };

  const handleSearch = (query: string) => {
    if (query !== "" || query !== searchQuery) {
      setSearchQuery(query);
      router.push(`/shop?page=1&maxPrice=${maxPrice}&search=${query}`);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts(maxPrice, searchQuery);
      const products = fetchedProducts ?? [];
      setTotalPages(Math.ceil((products.length ?? 1) / PRODUCTS_PER_PAGE));
    };
    getProducts();
  }, [maxPrice, searchQuery]);

  return (
    <>
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-center">Artisan Shop</h1>
      </div>
      <div className="m-4">
        <ProductSearch onSearch={handleSearch} />
        <ProductPriceFilter
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
        />
        <ProductList
          maxPrice={maxPrice}
          searchQuery={searchQuery}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
