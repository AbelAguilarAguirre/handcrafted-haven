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

export type ProductTable = {
    id: UUID;
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
}