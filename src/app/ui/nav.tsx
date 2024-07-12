"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';

export default function Nav() {
    const { data: session } = useSession();

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
                        <Link className="hover:underline" href="/">
                            About Us
                        </Link>
                    </li>
                    <li className="mx-2">
                        <Link className="hover:underline" href="/">
                            Cart
                        </Link>
                    </li>
                    {(session) ? (
                        <>
                            <li className="mx-2">
                                <Link className="hover:underline" href={`/profile/${session?.user?.id}`} title="My Profile">
                                    {session?.user?.name}
                                </Link>
                            </li>
                            <li className="mx-2">
                                <button onClick={async () => signOut()}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <Link className="hover:underline" href="/login">
                            Log In
                        </Link>
                    )}
                </ul>
            </nav>
        </>
    );
}

