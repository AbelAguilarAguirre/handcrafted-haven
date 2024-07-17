'use server';

import { sql} from "@vercel/postgres";
import { Product, CartItem, User, Profile } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { UUID } from "crypto";

const CARDS_PER_PAGE = 8;
export async function fetchFilteredProducts(
    query: string,
    currentPage: number
) {
    noStore();
    const offset = (currentPage - 1) * CARDS_PER_PAGE;

    try {
        const products = await sql<Product>`
            SELECT
                product.product_id,
                product.name,
                product.rating,
                product.price,
                product.description,
                product.image_url,
                product.user_id,
                product.created_at,
                product.updated_at
            FROM product
            WHERE
                product.name ILIKE ${`%${query}%`} OR
                product.description ILIKE ${`%${query}%`} OR
                product.price::text ILIKE ${`%${query}%`} OR
                product.rating::text ILIKE ${`%${query}%`}
            ORDER BY products.created_at DESC
            LIMIT ${CARDS_PER_PAGE} OFFSET ${offset}
        `;
        return products.rows;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("An error occurred while fetching products");
    }
}

export async function fetchProductsPages(query: string) {
    noStore();
    try {
        const count = await sql`SELECT COUNT(*) 
            FROM product
            WHERE
                product.name ILIKE ${`%${query}%`} OR
                product.description ILIKE ${`%${query}%`} OR
                product.price::text ILIKE ${`%${query}%`} OR
                product.rating::text ILIKE ${`%${query}%`} OR
                product.user_id = ${query}
        `;
        const totalPages = Math.ceil(Number(count.rows[0].count) / CARDS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("An error occurred while fetching products");
    }
}

export async function fetchProductsByUserId(userId: UUID) {
    noStore();
    try {
        const products = await sql<Product>`
            SELECT
                product.product_id,
                product.name,
                product.rating,
                product.price,
                product.description,
                product.image_url,
                product.user_id,
                product.created_at,
                product.updated_at
            FROM product
            WHERE product.user_id = ${userId}
            ORDER BY product.created_at DESC
        `;
        return products.rows;
    }
    catch (error) {
        console.error("Database error:", error);
        throw new Error("An error occurred while fetching products");
    }
}

export async function fetchProductByProductId(productId: UUID) {
    noStore();
    try {
        const product = await sql<Product>`
            SELECT
                product.product_id,
                product.name,
                product.rating,
                product.price,
                product.description,
                product.image_url,
                product.user_id,
                product.created_at,
                product.updated_at
            FROM product
            WHERE product.product_id = ${productId}
        `;
        return product.rows[0];
    }
    catch (error) {
        console.error("Database error:", error);
        throw new Error("An error occurred while fetching products");
    }
}

export async function getCartItemCount(userId: UUID): Promise<number> {
    noStore();
    try {
        const result = await sql`
        SELECT SUM(cart_item.quantity) AS count
        FROM cart_item
        JOIN cart ON cart_item.cart_id = cart.cart_id
        WHERE cart.user_id = ${userId}
        `;
        return result.rows[0].count || 0;
    }
    catch (error) {
        console.error("Database error:", error);
        throw new Error("An error occurred while fetching the cart item count");
    }
}

export async function getCartItemsByUserId(userId: UUID) {
    noStore();
    try {
        const cartItems = await sql<CartItem>`
            SELECT
                cart_item.cart_item_id,
                cart_item.cart_id,
                cart_item.product_id,
                cart_item.quantity,
                cart_item.created_at,
                cart_item.updated_at,
                product.name,
                product.price,
                product.description,
                product.image_url
            FROM cart_item
            JOIN cart ON cart_item.cart_id = cart.cart_id
            JOIN product ON cart_item.product_id = product.product_id
            WHERE cart.user_id = ${userId}
        `;
        return cartItems.rows;
    }
    catch (error) {
        console.error("Database error:", error);
        throw new Error("An error occurred while fetching cart items");
    }
}

export async function fetchProfileByUserId(userId: UUID) {
    noStore();
    try {
        const profile = await sql<Profile>`
            SELECT
                profile.user_id,
                profile.product_id,
                profile.firstname,
                profile.lastname,
                profile.description,
                profile.rating,
                profile.join_date,
                profile.email,
                profile.image_url
            FROM profile
            WHERE profile.user_id = ${userId}
            ORDER BY profile.join_date
        `;
        return profile.rows;
    }
    catch (error) {
        console.error("Database error:", error);
        throw new Error("An error occurred while fetching Profile");
    }
}
