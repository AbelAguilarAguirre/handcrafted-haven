"use client";
import React from "react";
import Link from "next/link";
import Cart from "./cart";
import { signOut, useSession } from 'next-auth/react';
import { useCart } from "@/app/CartContext";
import { useEffect } from "react";
import { getCartItemCount } from "@/app/lib/data";


export default function Nav() {
  const { data: session } = useSession();
    const { cartItemCount, updateCartItemCount } = useCart();
      useEffect(() => {
        // This function could be async if getCartItemCount is an async operation
        const updateCount = async () => {
          if (session) {
            // Assuming getCartItemCount returns a Promise, await its result
            const count = await getCartItemCount(session.user.id);
            updateCartItemCount(count);
          } else {
            // Reset cart item count if there's no session
            updateCartItemCount(0);
          }
        };

        updateCount();
      }, [session, updateCartItemCount]);
  return (
    <>
      <nav className="">
        <ul className="flex flex-wrap justify-around items-center ">
          <li className="mx-2">
            <Link className="hover:underline" href="/">
              Shop
            </Link>
          </li>
          <li className="mx-2">
            <Link className="hover:underline" href="/about">
              About Us
            </Link>
          </li>
          {session ? (
            <>
              <li className="mx-2">
                <Link
                  className="hover:underline"
                  href={`/profile/${session?.user?.id}`}
                  title="My Profile"
                >
                  {session?.user?.name}
                </Link>
              </li>
              <li className="mx-2">
                <button onClick={async () => signOut()}>Logout</button>
              </li>
            </>
          ) : (
            <Link className="hover:underline mx-2" href="/login">
              Log In
            </Link>
          )}
          {session ? (
            <li>
              <Link
                href={`/cart/${session?.user?.id}`}
              >
                <Cart itemCount={cartItemCount} />
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </>
  );
}