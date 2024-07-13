'use client';

import { ProfileProductCard } from "../product-cards";
import { UUID } from 'crypto';
import { useSession } from 'next-auth/react';
import Button from '@mui/material/Button';
import Pagination from '@/app/ui/profile/pagination';

export default function ProductsTable({ products, params, totalPages }: { products: any[], params: { id: UUID }, totalPages: number }) {
  const id = params.id;
  const { data: session } = useSession();

    return (
      <>
        <div className="flex align-center justify-between mb-4 px-4 w-[60vw]">
          <h2 className="text-4xl font-bold">Products</h2>
          {(session?.user.id === id) && (<Button variant='contained' href='#'>Manage Products</Button>)}
        </div>
        <div className="flex justify-between gap-4">
          {products?.map((product) => (
              <ProfileProductCard key={product.product_id} product={product} />
          ))}
          {products.length === 0 && (<p className="w-fit mx-auto text-xl my-8">User has not added any products yet.</p>)}
        </div>
        <div className="mt-7 mb-2 text-center">
          <Pagination totalPages={totalPages} />
        </div>
      </> 
    );
}
