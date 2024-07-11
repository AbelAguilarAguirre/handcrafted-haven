'use client';

import { useFormState } from "react-dom";
import { signIn } from 'next-auth/react';
import Link from "next/link";
import { z } from 'zod';
import { redirect } from 'next/navigation';

export default function LoginForm() {
  type AuthenticateState = {
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

  async function authenticate(prevState: AuthenticateState, formData: FormData): Promise<AuthenticateState> {
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

    if (!response?.error) {
      redirect('/');
    }

    if (response?.error === "CredentialsSignin") {
      return {
        message: "Invalid email or password."
      }
    }

    return {
      message: "Database error. Failed to log in.",
    };
  }

  const initialState = {
    message: null,
    errors: {},
  };
  const [state, dispatch] = useFormState(authenticate, initialState);

  return (
    <div className="flex items-center justify-center border-2 rounded-md pb-4 px-2 sm:px-6 lg:px-8 sm:mx-10">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back!
          </h2>
          <h3>Your Home for Unique, Handcrafted Items</h3>
        </div>
        <form action={dispatch} className="mt-8 space-y-6">
          <div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              Sign in
            </button>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors && Object.entries(state.errors).map(([field, error]) => (
              <p className="mt-2 text-sm text-red-500" key={field}>
                {error}
              </p>
            ))}
          </div>
          <div id="form-error" aria-live="polite" aria-atomic="true">
            {state.message && (
              <p className="mt-2 text-sm text-red-500" key={state.message}>
                {state.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between mt-6">
            <span className="border-b border-gray-300 flex-1"></span>
            <span className="px-4 text-sm text-gray-500">or</span>
            <span className="border-b border-gray-300 flex-1"></span>
          </div>
          <div></div>
          <div className="text-sm text-center mt-4">
            <span className="text-gray-400 p-1">Are you new?</span>
            <Link className="font-medium text-indigo-600 hover:text-indigo-500"
              href={"/register"}>
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
