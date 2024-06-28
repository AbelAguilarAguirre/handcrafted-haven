import React from "react";
import Link from "next/link";

export default function Nav() {
    return (
        <>
            <nav className="">
                <ul className="flex justify-around flex-wrap gap-10 items-center">
                    <li>
                        <Link className="border-black border rounded p-3" href="/">Shop</Link>
                    </li>
                    <li>
                        <Link className="border-black border rounded p-3" href="#">About Us</Link>
                    </li>
                    <li>
                        <Link className="border-black border rounded p-3" href="#">[My Profile]</Link>
                    </li>
                    <li>
                        <Link className="border-black border rounded p-3" href="#">Cart</Link>
                    </li>
                    <li>
                        <button><p className="border-black border rounded p-3">Sign In/Sign out</p></button>
                    </li>
                </ul>
            </nav>
        </>
    );
}
