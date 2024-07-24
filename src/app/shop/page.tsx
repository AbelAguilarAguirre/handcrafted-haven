"use client";

import ProductList from "../ui/shop/product-list";
import ProductSearch from "../ui/shop/product-search";

export default function Page() {

  return (
    <>
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-center">Artisan Shop</h1>
      </div>
      <div className="m-4">
        <ProductSearch />
        <ProductList />
      </div>
    </>
  );
}
