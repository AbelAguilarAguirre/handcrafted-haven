import { sql } from "@vercel/postgres";
import { ProductTable } from "./definitions";
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
        const products = await sql<ProductTable>`
            SELECT
                products.id,
                products.name,
                products.rating,
                products.price,
                products.description,
                products.image,
                products.user_id,
                products.created_at,
                products.updated_at
            FROM products
            WHERE
                products.name ILIKE ${`%${query}%`} OR
                products.description ILIKE ${`%${query}%`} OR
                products.price::text ILIKE ${`%${query}%`} OR
                products.rating::text ILIKE ${`%${query}%`}
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
            FROM products
            WHERE
                products.name ILIKE ${`%${query}%`} OR
                products.description ILIKE ${`%${query}%`} OR
                products.price::text ILIKE ${`%${query}%`} OR
                products.rating::text ILIKE ${`%${query}%`}
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
        const products = await sql<ProductTable>`
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