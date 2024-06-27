import React from "react";
import Link from "next/link";

export default function Nav() {
    return (
        <>
            <nav className="">
                <ul className="flex gap-10">
                    <li>
                        <Link href="/">Shop</Link>
                    </li>
                    <li>
                        <Link href="#">About Us</Link>
                    </li>
                    <li>
                        <Link href="#">[My Profile]</Link>
                    </li>
                    <li>
                        <Link href="#">Cart</Link>
                    </li>
                    <li>
                        <button>Sign In/Sign out</button>
                    </li>
                </ul>
            </nav>
        </>
    );
}
