'use client';

import Rating from "@mui/material/Rating";
import Image from "next/image";
import { Profile } from "../../lib/definitions";
import { useSession } from "next-auth/react";
import { UUID } from "crypto";

export function ProfileDetails({ profile }: { profile: Profile }) {
    const { data: session } = useSession();
    let user_id: UUID;
    if (session) {
        user_id = session.user.id;
    }
    return (
        <div className="flex flex-col md:flex-row md:space-x-8 p-8 items-center justify-center text-center md:text-left">
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <Image
          src={profile.image_url}
          width={400}
          height={400}
          alt="image of person smiling"
          className="rounded-md mx-auto"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold my-2">{profile.firstname} {profile.lastname}</h1>
        <Rating
          size="medium"
          defaultValue={profile.rating}
          precision={0.5}
          readOnly
        />
        <p className="my-2">{profile.description}</p>
      </div>
    </div>
    )
}