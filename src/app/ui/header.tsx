import React from "react";
import Nav from "./nav";

export default function Header() {
    return (
        <header className="flex flex-wrap justify-around p-10 items-center">
            <h1 className="text-4xl font-bold text-gray-800">
                Handcrafted Haven
            </h1>
            <Nav />
        </header>
    );
}
