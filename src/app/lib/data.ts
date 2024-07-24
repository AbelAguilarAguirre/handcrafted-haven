'use server';

import { sql} from "@vercel/postgres";
import { Product, CartItem, Review, User, Category } from "./definitions";

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
            ORDER BY product.price DESC
        `;
        return products.rows;
    }
    catch (error) {
        console.error("Database error:", error);
        throw new Error("An error occurred while fetching products");
    }
}

export async function fetchProducts(maxPrice: number = 1000, searchQuery: string = "") {
    noStore();
  
    try {
      const products = await sql<Product>`
        SELECT DISTINCT ON (product.product_id)
            product.product_id, 
            product.name, 
            product.description, 
            product.price, 
            product.image_url, 
            product.rating, 
            product.user_id, 
            product.created_at, 
            product.updated_at
        FROM product
        JOIN product_category ON product.product_id = product_category.product_id
        JOIN category ON product_category.category_id = category.category_id
        WHERE product.price <= ${maxPrice} AND 
            (product.name ILIKE ${`%${searchQuery}%`} OR 
            product.description ILIKE ${`%${searchQuery}%`} OR
            category.name ILIKE ${`%${searchQuery}%`})
        ORDER BY product.product_id, product.price DESC;
      `;
  
        return products.rows;
    } catch (error) {
      console.error('Database Error:', error);
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

export async function getReviewsById(product_id: UUID) {
    noStore();
    try {
        const reviews = await sql<Review>`
            SELECT
                review.review_id,
                review.title,
                review.review,
                review.rating,
                review.user_id,
                review.created_at,
                "user".name,
                "user".image_url
            FROM review
            LEFT JOIN "user"
            ON review.user_id = "user".user_id
            WHERE review.product_id = ${product_id}
            ORDER BY review.created_at DESC
        `;
        return reviews.rows;
    }
    catch (error) {
        console.error("Database error:", error);
        throw new Error("An error occurred while fetching reviews");
    }
}

export async function fetchUserById(userId: UUID) {
    noStore();
    try {
        const user = await sql<User>`
            SELECT
                user_id,
                name,
                email,
                image_url,
                bio
            FROM "user"
            WHERE user_id = ${userId}
        `;
        return user.rows[0];
    }
    catch (error) {
        console.error("Database error:", error);
        throw new Error("An error occurred while fetching user");
    }
}

export async function fetchCategories(): Promise<Category[] | undefined> {
    try {
        const category = await sql<Category>`
            SELECT * FROM "category"
        `;

        return category.rows;
    } catch (error) {
        console.error('Database error: ', error);
    }
}

export async function fetchCategoriesByProductId(productId: string): Promise<Category[] | undefined> {
    try {
        const category = await sql<Category>`
            SELECT c.name
            FROM "category" AS c
            INNER JOIN 
                "product_category" AS pc ON c.category_id = pc.category_id
            WHERE
                pc.product_id = ${productId} 
        `;

        return category.rows;
    } catch (error) {
        console.error('Database error: ', error);
    }
}

export async function getUserId(email: string): Promise<UUID | undefined> {
    try {
        const user = await sql<User>`
            SELECT user_id FROM "user" WHERE email = ${email}
        `;

        return user.rows[0].user_id;
    } catch (error) {
        console.error('Database error: ', error);
    }
}