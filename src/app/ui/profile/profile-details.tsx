'use client';

import React, { useState } from "react";
import Image from "next/image";
import { User } from "@/app/lib/definitions";
import EditIcon from "@mui/icons-material/Edit";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";



export default function ProfileDetails({ user }: { user: User }) {
  const {data: session} = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user.image_url ?? "/images/default-avatar.jpeg"
  );
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio ?? `Edit your profile to add a ${user.image_url??"profile picture and a"} bio.`);

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result as string);
      console.log(reader.result as string);
      // Handle file upload to server here
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSave = () => {
    setIsEditing(false);
    // Handle save to server here
  };

  return (
    <div className="w-[80vw] flex p-4 mb-6 items-center bg-gray-100 shadow rounded-lg relative">
      {isEditing ? (
        <>
          <div className="w-auto h-auto flex-col">
            <div
              {...getRootProps({
                className:
                  "border-dashed border-2 border-gray-400 p-4 rounded-lg cursor-pointer",
              })}
            >
              <input {...getInputProps()} />
              {user.image_url ?? (
                <>
                  <Image
                    src={profileImage}
                    alt="Profile Picture"
                    width={96}
                    height={96}
                    className="rounded-full"
                  />
                  <p>Drag & drop an image here, or click to select one</p>
                </>
              )}
            </div>
            <TextField
              type="text"
              className="mt-2 p-2 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <TextField
            className="mt-[-7px] ml-2 p-2 border rounded-lg w-full"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            multiline
            rows={6}
          />
          <Button
            className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg absolute right-2 bottom-2"
            onClick={handleSave}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <div className="w-auto h-auto flex-col relative">
            <Image
              src={profileImage}
              alt="Profile Picture"
              width={96}
              height={96}
              className="rounded-full"
            />
            <h2 className="text-xl font-bold">{name}</h2>
            {session && (
              <button
                className="text-gray-500 hover:text-gray-700 absolute top-[65px] left-[85px]"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <EditIcon />
              </button>
            )}
          </div>

          <div className="ml-4 flex-1">
            <p className="mt-2 text-gray-600">{bio}</p>
          </div>
        </>
      )}
    </div>
  );
}
