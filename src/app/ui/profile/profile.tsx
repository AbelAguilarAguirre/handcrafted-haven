'use client';

import Image from "next/image";
import { User } from "../../lib/definitions";
import { useSession } from "next-auth/react";
import { UUID } from "crypto";

export function ProfileDetails({ user }: { user: User }) {
    const { data: session } = useSession();
    let user_id: UUID;
    if (session) {
        user_id = session.user.id;
    }
    return (
        <div className="flex flex-col md:flex-row md:space-x-8 p-8 items-center justify-center text-center md:text-left">
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <Image
          src={user.image_url}
          width={300}
          height={400}
          alt={user.name}
          className="rounded-md mx-auto"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold my-2">{user.name}</h1>
        <p className="my-2">{user.bio}</p>
      </div>
      <button
      className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"

    >
      See My Products
    </button>
    </div>
    )
}