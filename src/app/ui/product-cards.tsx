'use client';

import Rating from "@mui/material/Rating";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CartItem } from "../lib/definitions";
import { useCart } from "@/app/ui/cart/CartContext";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Product } from "@/app/lib/definitions";
import { UUID } from "crypto";




export function ProductCard({ product }: { product: Product}) {
    return (
      <Link 
      href={`/product/${product.product_id}`}
      >
        <div className="border-2 p-4 w-[70vw] h-auto sm:w-[212px] sm:h-[320px] md:h-[400px] rounded-md overflow-hidden">
            <Image
                src={product.image_url}
                width={80}
                height={40}
                alt={product.name}
                className=" m-auto w-40 h-40 sm:w-32 sm:h-32 rounded-md md:w-40 md:h-40"
            />
            <div className="mt-2 flex justify-between">
                <Rating
                    size="small"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                    className="m-2"
                />
                <p className="self-center">${Number(product.price).toFixed(2)}</p>
            </div>
            <p className="my-2 font-bold text-xl text-center">
                {product.name}
            </p>
            <div className="relative flex flex-col items-center group">
                <p className="text-md line-clamp-2 md:line-clamp-4">
                    {product.description}
                </p>
                <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-md">
                        {product.description}
                    </span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                </div>
            </div>
            
        </div>
      </Link>
    );
}


export function CartProductCard({ cartItem, id }: { cartItem: CartItem, id: UUID }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const { data: session } = useSession();
  const { decreaseQuantity, increaseQuantity, removeItem } = useCart();

  const handleRemove = () => {
    removeItem(cartItem.cart_item_id, cartItem.quantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      decreaseQuantity(cartItem.cart_item_id);
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = async () => {
    if (session?.user?.id || id) {
      await increaseQuantity(cartItem.product_id, session?.user.id || id);
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-4 flex md:w-[80vw] my-2 gap-2 md:gap-4 border-2">
        <Image
          src={cartItem.image_url}
          width={180}
          height={160}
          alt={cartItem.name}
        />
        <div className="flex flex-col items-stretch justify-between h-full w-full min-h-[180px]">
          <div className="flex items-center justify-between">
            <Link href={`/product/${cartItem.product_id}`}>
              <p className="font-bold md:text-xl">{cartItem.name}</p>
            </Link>
            <p className="font-bold md:text-2xl ml-4">${cartItem.price}</p>
          </div>
          <p className="text-sm md:text-md line-clamp-2 max-w-[550px]">
            {cartItem.description}
          </p>
          <div className="flex justify-between items-center mt-4">
            <IconButton
              color="error"
              aria-label="remove"
              onClick={handleRemove}
            >
              <DeleteIcon />
            </IconButton>
            <ButtonGroup size="small" aria-label="Small button group">
              <Button aria-label="decrease" onClick={handleDecrease}>
                <ChevronLeftIcon />
              </Button>
              <Button className="font-bold text-black cursor-default pointer-events-none">
                {quantity}
              </Button>
              <Button aria-label="increase" onClick={handleIncrease}>
                <ChevronRightIcon />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
