"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User } from "@/app/lib/definitions";
import EditIcon from "@mui/icons-material/Edit";
import { useSession } from "next-auth/react";
import ImageUploader from "@/app/ui/profile/ImageUploader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { updateProfile } from "@/app/lib/actions";

export default function ProfileDetails({ user }: { user: User }) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user.image_url ?? "/images/default-avatar.jpeg"
  );
  const [profileName, setProfileName] = useState(user.name);
  const [profileBio, setProfileBio] = useState(user.bio);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileSelect = (file: File): void => {
    setImageFile(file);
  };

  const handleSave = async () => {
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("file", imageFile);

        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = async () => {
          const response = await axios.post("/api/upload", {
            file: reader.result,
          });

          const imageUrl = response.data.url;
          setProfileImage(imageUrl);
          await updateProfile(user.user_id, profileName, imageUrl, profileBio);
        };
      } catch (error) {
        console.error("Error uploading image", error);
      }
    } else {
      await updateProfile(user.user_id, profileName, profileImage, profileBio);
    }

    setIsEditing(false);
  };

  return (
    <div className="w-[80vw] p-4 mb-6 bg-gray-100 shadow rounded-lg">
      <div className="w-auto h-auto flex relative">
        {isEditing ? (
          <>
            <div>
              <ImageUploader onUpload={handleFileSelect} />
              <TextField
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="mt-4"
              />
            </div>
            <TextField
              value={profileBio}
              onChange={(e) => setProfileBio(e.target.value)}
              multiline
              rows={4}
              className="ml-2 w-full"
              placeholder="Add a bio"
            />
            <Button
              variant="contained"
              className="absolute bottom-0 right-0"
              onClick={handleSave}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <div className="flex-col">
              <Image
                src={profileImage}
                alt="Profile Picture"
                width={96}
                height={96}
                className="rounded-full"
              />
              <h2 className="text-xl font-bold">{profileName}</h2>
            </div>
            {session && (
              <button
                className="text-gray-500 hover:text-gray-700 absolute top-[65px] left-[85px]"
                onClick={() => setIsEditing(true)}
              >
                <EditIcon />
              </button>
            )}
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between"></div>
              <p className="m-2 text-gray-600">
                {profileBio ?? "Edit your profile to add a bio."}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
