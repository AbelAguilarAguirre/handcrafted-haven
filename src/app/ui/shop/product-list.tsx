import React from 'react';
import ProductCard from '../product-cards';
import { fetchProducts } from '../../lib/data';

export default async function ProductList({ maxPrice }: { maxPrice: string }) {
  const products = await fetchProducts(maxPrice);
  return (
    <div className="grid grid-cols-1 gap-16 p-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
}

