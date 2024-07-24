import React from "react";
import Nav from "./nav";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { getUserId } from "../lib/data";
import { UUID } from "crypto";

export default async function Header() {
    const session = await getServerSession();
    let userId: UUID | undefined;
    if (session) {
      userId = await getUserId(session?.user?.email ?? "");
    }

    return (
      <header className="flex flex-wrap justify-around p-10 items-center">
        <Link href={"/"}>
          <h1 className="text-4xl font-bold text-gray-800">
            Handcrafted Haven
          </h1>
        </Link>
        <Nav id={userId}/>
      </header>
    );
}
