"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        // Perform logout logic here
        setIsLoggedIn(false);
    };

    const handleLogin = () => {
        // Perform login logic here
        setIsLoggedIn(true);
    };

    return (
        <>
            <nav className="">
                <ul className="flex flex-wrap justify-around items-center ">
                    <li className="mx-2">
                        <Link className="hover:underline" href="/shop">
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
                    {isLoggedIn ? (
                        <>
                            <li className="mx-2">
                                <Link className="hover:underline" href="/">
                                    My Profile
                                </Link>
                            </li>
                            <li className="mx-2">
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <li className="mx-2">
                            <Link href="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    );
}

