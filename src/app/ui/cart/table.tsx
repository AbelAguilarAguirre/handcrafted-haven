"use client";

import { useEffect } from "react";
import { CartProductCard } from "../product-cards";
import { CartItem } from "@/app/lib/definitions";
import CartSummary from "./summary";
import { useCart } from "@/app/ui/cart/CartContext";
import { UUID } from "crypto";
import { getCartItemsByUserId } from "@/app/lib/data";

export default function CartTable({ id }: { id: UUID }) {
  const { cartItems: cartItemsCopy, setCartItems } = useCart();

  useEffect(() => {
    getCartItemsByUserId(id)
    .then((cartItems) => setCartItems(cartItems || []));
  }, []);

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
