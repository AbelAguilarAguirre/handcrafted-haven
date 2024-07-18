'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { ProductCard } from "../product-cards";
import { UUID } from 'crypto';
import { useSession } from 'next-auth/react';
import Button from '@mui/material/Button';
import Pagination from '@/app/ui/profile/pagination';
import { Product } from "@/app/lib/definitions";
import { useSearchParams } from "next/navigation";



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

  const PRODUCTS_PER_PAGE = 8;

  useEffect(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    setDisplayedProducts(products.slice(startIndex, endIndex));
  }, [currentPage, products]);

  return (
    <>
      <div className="flex justify-between mb-4 w-full">
        <h2 className="text-4xl font-bold mx-2">Products</h2>
        {session?.user.id === id && (
          <Button variant="contained" href="#" className="mx-2">
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
    </>
  );
}
