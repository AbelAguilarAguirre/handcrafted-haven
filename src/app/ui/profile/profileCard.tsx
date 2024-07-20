'use client';

import React from "react";
import Image from "next/image";
import { User } from "../../lib/definitions";
import { useSession } from "next-auth/react";
import { UUID } from "crypto";

interface ProfileCardProps {
  profile: User;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    const { data: session } = useSession();
    let user_id: UUID;
    if (session) {
        user_id = session.user.id;
    }
    return (
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-center p-4">
        <Image
          src={profile.image_url}
          alt={`${profile.name}'s picture`}
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <div className="text-center p-6">
        <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
        <p className="text-sm text-gray-500 mt-2">{profile.bio}</p>
      </div>
    </div>
  );
};