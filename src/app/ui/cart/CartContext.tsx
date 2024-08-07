"use client";
import { UUID } from "crypto";
import { CartItem } from "@/app/lib/definitions";
import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  removeFromCart,
  removeOneFromCart,
  addToCart,
} from "@/app/lib/actions";

interface CartContextType {
  cartItems: CartItem[];
  cartItemCount: number;
  updateCartItemCount: (count: number) => void;
  setCartItems: (items: CartItem[]) => void;
  removeItem: (cartItemId: UUID, quantity: number) => void;
  increaseQuantity: (product_id: UUID, user_id: UUID) => void;
  decreaseQuantity: (cart_item_id: UUID) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const updateCartItemCount = (count: number) => {
    setCartItemCount(count);
  };

  const removeItem = async (cartItemId: UUID, quantity: number) => {
    const updatedItems = cartItems.filter(
      (item) => item.cart_item_id !== cartItemId
    );
    await removeFromCart(cartItemId);
    setCartItems(updatedItems);
  };

  const increaseQuantity = async (product_id: UUID, user_id: UUID) => {
    const updatedItems = cartItems.map((item) =>
      item.product_id === product_id
    ? { ...item, quantity: item.quantity + 1 }
    : item
  );
    await addToCart(product_id, user_id);
    setCartItems(updatedItems);
  };

  const decreaseQuantity = async (cart_item_id: UUID) => {
    const updatedItems = cartItems.map((item) =>
        item.cart_item_id === cart_item_id
      ? { ...item, quantity: item.quantity - 1 }
      : item
    );
    await removeOneFromCart(cart_item_id);
    setCartItems(updatedItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemCount,
        updateCartItemCount,
        setCartItems,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
