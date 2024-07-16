import { UUID } from "crypto";

export type Product = {
    product_id: UUID;
    name: string;
    rating: number;
    price: number;
    description: string;
    image_url: string;
    user_id: UUID;
    created_at: Date;
    updated_at: Date;
};

export type User = {
    user_id: UUID;
    name: string;
    email: string;
    password: string;
    image_url: string;
    bio: string;
    created_at: Date;
    updated_at: Date;
};

export type CartItem = {
    cart_item_id: UUID;
    cart_id: UUID;
    product_id: UUID;
    user_id: UUID;
    quantity: number;
    created_at: Date;
    updated_at: Date;
    name: string;
    price: number;
    description: string;
    image_url: string;
};

export type Review = {
    review_id: UUID;
    title: string;
    review: string;
    rating: number;
    user_id: UUID
    created_at: Date;
    name: string;
    image_url: string;
};
