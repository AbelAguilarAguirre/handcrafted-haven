'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { signIn } from 'next-auth/react';
import { UUID } from 'crypto';
import { unstable_noStore as noStore } from 'next/cache';
import { Review } from './definitions';

const RegistrationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string().min(8, { message: "Confirm Password must be at least 8 characters long" })
})
.refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
}
);

export type RegistrationState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    message?: string | null;
    }

export async function createUser(prevState: RegistrationState, formData: FormData): Promise<RegistrationState> {
    const validatedFields = RegistrationSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirm-password"),
    });

   if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    const { name, email, password } = validatedFields.data;


    const user = await sql`SELECT * FROM "user" WHERE email = ${email}`;
    if (user.rowCount && user.rowCount > 0) {
        return {
            message: "User already exists",
        };
    }
    const passwordHashed = await bcrypt.hash(password, 10);
    try {
        await sql`INSERT INTO "user" (name, email, password) VALUES (${name}, ${email}, ${passwordHashed})`;
    } catch (error) {
        return {
            message: "Database error. Failed to create user",
        };
    }
    redirect("/login");
}

export type AuthenticateState = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string | null;
}

const AuthenticationSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
});

export async function authenticate(prevState: AuthenticateState, formData: FormData): Promise<AuthenticateState> {
    'use client';
    const validatedFields = AuthenticationSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    });

   if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    const { email, password } = validatedFields.data;


    const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
    });

    console.log(response);

    if (!response?.error) {
        redirect('/');
    }

    return {
        message: "Database error. Failed to log in",
    };
}

export async function addToCart(product_id: UUID, user_id: UUID) {
    noStore();
    try {
        let cart_id = await sql `
        SELECT cart_id 
        FROM cart 
        WHERE user_id = ${user_id}`;
        if (cart_id.rowCount === 0) {
            cart_id = await sql `
            INSERT INTO cart (user_id) 
            VALUES (${user_id})
            RETURNING cart_id`;
        }
        const cartItem = await sql `
        INSERT INTO cart_item (cart_id, product_id, quantity)
        VALUES (${cart_id.rows[0].cart_id}, ${product_id}, 1)
        ON CONFLICT (cart_id, product_id)
        DO UPDATE SET quantity = cart_item.quantity + 1
        RETURNING cart_item_id`;

        return cartItem.rows[0].cart_item_id;

    } catch (error) {
        console.error("Database error:", error);
    }
}

export async function removeFromCart(cartItemId: UUID) {
    try {
        await sql `
        DELETE FROM cart_item
        WHERE cart_item_id = ${cartItemId}`;
    } catch (error) {
        console.error("Database error:", error);
    }
}

export async function removeOneFromCart(cart_item_id: UUID) {
    try {
        await sql `
        UPDATE cart_item
        SET quantity = quantity - 1
        WHERE cart_item_id = ${cart_item_id}
        `;
    } catch (error) {
        console.error("Database error:", error);
    }
}

export async function addReview(title: string, review: string, rating: number, product_id: UUID, user_id: UUID) {
    try {
        const review_id = await sql `
        INSERT INTO review (title, review, rating, product_id, user_id)
        VALUES (${title}, ${review}, ${rating}, ${product_id}, ${user_id})
        RETURNING review_id`;

        const reviewReturn = await sql<Review> `
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
        JOIN "user" ON review.user_id = "user".user_id
        WHERE review_id = ${review_id.rows[0].review_id}`;
        
        return reviewReturn.rows[0];

    } catch (error) {
        console.error("Database error:", error);
    }
}

export async function deleteReviewById(review_id: UUID) {
    try {
        await sql `
        DELETE FROM review
        WHERE review_id = ${review_id}`;
    } catch (error) {
        console.error("Database error:", error);
    }
}

export async function updateReview(review_id: UUID, title: string, review: string, rating: number) {
    try {
        await sql `
        UPDATE review
        SET title = ${title}, review = ${review}, rating = ${rating}, updated_at = NOW()
        WHERE review_id = ${review_id}`;
    } catch (error) {
        console.error("Database error:", error);
    }
}

export async function updateProfile(user_id: UUID, name: string, image_url: string, bio: string) {
    try {
        await sql `
        UPDATE "user"
        SET name = ${name}, image_url = ${image_url}, bio = ${bio}
        WHERE user_id = ${user_id}`;
    } catch (error) {
        console.error("Database error:", error);
    }
}

export async function updateProduct(product_id: UUID, price: number, description: string, name: string, image_url: string) {
    try {
        await sql `
        UPDATE product
        SET price = ${price}, description = ${description}, name = ${name}, image_url = ${image_url}
        WHERE product_id = ${product_id}`;
    } catch (error) {
        console.error("Database error:", error);
    }
}