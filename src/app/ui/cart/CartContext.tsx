'use client';
import { UUID } from 'crypto';
import { CartItem } from '@/app/lib/definitions';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { removeFromCart, removeOneFromCart, addToCart } from '@/app/lib/actions';

interface CartContextType {
    cartItemsCopy: CartItem[];
    cartItemCount: number;
    updateCartItemCount: (count: number) => void;
    removeItem: (cartItemId: UUID, quantity: number) => void;
    increaseQuantity: (product_id: UUID, user_id: UUID) => void;
    decreaseQuantity: (cart_item_id: UUID) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {

    const [cartItemCount, setCartItemCount] = useState(0);

    const updateCartItemCount = (count: number) => {
        setCartItemCount(count);
    };
    
    const removeItem = async (cartItemId: UUID, quantity: number) => {
        await removeFromCart(cartItemId);
        setCartItemCount(cartItemCount - Number(quantity));
    }

    const increaseQuantity = async (product_id: UUID, user_id: UUID) => {
        await addToCart(product_id, user_id);
        setCartItemCount(Number(cartItemCount) + 1);
    }

    const decreaseQuantity = async (cart_item_id: UUID) => {
        await removeOneFromCart(cart_item_id);
        setCartItemCount(Number(cartItemCount) - 1);
    }

    const cartItemsCopy: CartItem[] = [];
    
    return (
        <CartContext.Provider value={{ cartItemCount, updateCartItemCount, removeItem, increaseQuantity, decreaseQuantity, cartItemsCopy }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

