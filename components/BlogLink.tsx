"use client";
import { Blog } from "@/types/blog";
import { Sponsor } from "@/types/sponsor";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const placeholder = "https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg";

const LinkWithPicture = ({ item }: { item: Blog }) => {
    console.log(item)
  return (
    <Link
      href={`/dashboard/blogs/${item.id}`}
      key={item.id}
      className="text-left bg-cyan-900/20 p-2 rounded-md hover:bg-cyan-800/30 flex gap-6 items-center"
    >
      <Avatar
        alt={item.id}
        className="flex-shrink-0 w-24 h-24"
        size="lg"
        src={`https://gazi-yapay-zeka.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.thumbnail}`}
      />
      <div className="flex flex-col gap-2">
        <p className="text-xl">{item.title}</p>
        <p className="text-xs text-gray-400">{item.summary}</p>
      </div>
      <div className="self-end flex flex-grow justify-end items-center gap-1">
        <Avatar 
            src={
                item.expand?.author.picture ?
                `https://gazi-yapay-zeka.pockethost.io/api/files/${item.expand?.author.collectionId}/${item.expand?.author.id}/${item.expand?.author.picture}`
                :
                placeholder
            }
            className="w-6 h-6"
        />
        <p className="text-xs text-left max-w-[40px]">{item.expand?.author.name}</p>
      </div>
    </Link>
  );
};

export default LinkWithPicture;
