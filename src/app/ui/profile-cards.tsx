'use client';

import Rating from "@mui/material/Rating";
import Link from "next/link";
import { User } from "../lib/definitions";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

export function ProfileCard ({ user }: { user: User }) {
    return (
        <div className="border-2 p-4 w-[212px] h-[300px] md:h-[400px] rounded-md overflow-hidden">
            <Image
                src={user.image_url}
                width={40}
                height={80}
                alt="picture of person smiling"
                className=" m-auto w-auto h-auto rounded-md md:w-40 md:h-40"
            />
            <p className="my-2 font-bold text-xl text-center">
                {user.name}
            </p>
            <div className="relative flex flex-col items-center group">
                <p className="text-md line-clamp-2 md:line-clamp-4">
                    {user.bio}
                </p>
            </div>
            <div className="mt-2 flex justify-center">
                <Link
                  href="mailto:User<user@email.com"
                  className="btn btn-link text-gray-600 hover:font-bold hover:text-gray-800"
                >
                  Contact Me
                </Link>
            </div>
        </div>
    )
}