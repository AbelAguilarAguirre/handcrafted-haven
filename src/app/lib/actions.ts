'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { signIn } from 'next-auth/react';

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

