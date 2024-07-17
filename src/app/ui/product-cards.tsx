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
import { Product } from "../lib/definitions";
import { CartItem } from "../lib/definitions";
import { useCart } from "@/app/ui/cart/CartContext";
import { useState } from "react";
import { useSession } from "next-auth/react";


export function ProfileProductCard({ product }: { product: Product}) {
    return (
        <div className="border-2 p-4 w-[212px] h-[300px] md:h-[400px] rounded-md overflow-hidden">
            <Image
                src={product.image_url}
                width={80}
                height={40}
                alt={product.name}
                className=" m-auto w-auto h-auto rounded-md md:w-40 md:h-40"
            />
            <div className="mt-2 flex justify-between">
                <Rating
                    size="small"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                />
                <p>${product.price}</p>
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
    );
}


export function CartProductCard({ cartItem }: { cartItem: CartItem }) {
    const [isVisible, setIsVisible] = useState(true);
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const { data: session } = useSession();

    const handleRemove = () => {
        setIsVisible(false);
    };
  const { decreaseQuantity, increaseQuantity, removeItem, cartItemsCopy } = useCart();
  return (
    isVisible && (
      <div className="w-full p-4 flex my-2 justify-center flex-grow gap-2 md:gap-4 border-y-2">
        <Image
          src={`${cartItem.image_url}`}
          width={180}
          height={160}
          alt={`${cartItem.name}`}
        />
        <div className="flex flex-col items-stretch justify-between h-full min-h-[180px]">
          <div className="flex items-center justify-between">
            <Link href={`/product/${cartItem.product_id}`}>
              <p className="font-bold md:text-xl">{cartItem.name}</p>
            </Link>
            <p className="font-bold md:text-2xl">{cartItem.price}</p>
          </div>
          <p className="text-sm md:text-md line-clamp-2 max-w-[550px]">
            {cartItem.description}
          </p>
          <div className="flex justify-between items-center mt-4">
            <IconButton className="md:hidden" color="error" aria-label="remove">
              <DeleteIcon
                onClick={() => {
                  removeItem(cartItem.cart_item_id, cartItem.quantity)
                  handleRemove();
                  cartItemsCopy.filter((item) => item.cart_item_id !== cartItem.cart_item_id)
                    }
                }
              />
            </IconButton>
            <Button
              className="hidden md:inline-flex"
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => {
                removeItem(cartItem.cart_item_id, cartItem.quantity);
                handleRemove();
              }}
            >
              Remove from Cart
            </Button>
            <ButtonGroup size="small" aria-label="Small button group">
              <Button
                aria-label="decrease"
                onClick={() => {
                    if (quantity > 1) {
                        decreaseQuantity(cartItem.cart_item_id);
                        setQuantity(quantity - 1);
                        cartItemsCopy.map((item) => {
                            if (item.cart_item_id === cartItem.cart_item_id) {
                                item.quantity = quantity - 1;
                            }
                        });
                    }
                }}
              >
                <ChevronLeftIcon />
              </Button>
              <Button className="font-bold text-black cursor-default pointer-events-none">
                {quantity}
              </Button>
              <Button
                aria-label="increase"
                onClick={() => {
                  increaseQuantity(cartItem.product_id, session?.user?.id);
                  setQuantity(quantity + 1);
                  cartItemsCopy.map((item) => {
                            if (item.cart_item_id === cartItem.cart_item_id) {
                                item.quantity = quantity + 1;
                            }
                        }
                    );
                }}
              >
                <ChevronRightIcon />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    )
  );
}
