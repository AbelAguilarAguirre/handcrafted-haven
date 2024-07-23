"use client";

import { useEffect } from "react";
import { CartProductCard } from "../product-cards";
import { CartItem } from "@/app/lib/definitions";
import CartSummary from "./summary";
import { useCart } from "@/app/ui/cart/CartContext";
import { UUID } from "crypto";

export default function CartTable({ cartItems, id }: { cartItems: CartItem[], id: UUID }) {
  const { cartItems: cartItemsCopy, setCartItems } = useCart();

  useEffect(() => {
    setCartItems(cartItems);
  }, [cartItems]);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center">Cart</h1>
      {cartItemsCopy.map((cartItem) => (
        <CartProductCard key={cartItem.cart_item_id} cartItem={cartItem} id={id}/>
      ))}
      <CartSummary />
    </div>
  );
}
