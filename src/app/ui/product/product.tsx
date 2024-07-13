'use client';

import Rating from "@mui/material/Rating";
import Image from "next/image";
import { Product } from "../../lib/definitions";
import { addToCart } from "../../lib/actions";
import { useSession } from "next-auth/react";
import { UUID } from "crypto";
import { useCart } from "@/app/CartContext";


export function ProductDetails({ product }: { product: Product }) {
  const { data: session } = useSession();
  let user_id: UUID;
  if (session) {
    user_id = session.user.id;
  }
  const { cartItemCount, updateCartItemCount } = useCart();
  return (
    <div className="flex flex-col md:flex-row md:space-x-8 p-8 items-center justify-center text-center md:text-left">
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <Image
          src={product.image_url}
          width={400}
          height={400}
          alt={product.name}
          className="rounded-md mx-auto"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold my-2">{product.name}</h1>
        <Rating
          size="medium"
          defaultValue={product.rating}
          precision={0.5}
          readOnly
        />
        <p className="text-xl my-2">${product.price}</p>
        <p className="my-2">{product.description}</p>

        <button
          onClick={() => {
            if (session) {
              addToCart(product.product_id, user_id);
              updateCartItemCount(Number(cartItemCount) + 1);
            }
            else {
              alert("Please login to add items to your cart");
            }
          }
          }
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >

          Add to Cart
        </button>
      </div>
    </div>
  );
}
