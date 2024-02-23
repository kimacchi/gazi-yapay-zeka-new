"use client";
import { Sponsor } from "@/types/sponsor";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const LinkWithPicture = ({ item }: { item: Sponsor }) => {
  return (
    <Link
      href={`/dashboard/sponsors/${item.id}`}
      key={item.id}
      className="text-left bg-cyan-900/20 p-2 rounded-md hover:bg-cyan-800/30 flex gap-6 items-center"
    >
      <Avatar
        alt={item.id}
        className="flex-shrink-0 w-24 h-24"
        size="lg"
        src={`https://gazi-yapay-zeka.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.picture}?token=`}
      />
      <p className="text-xl">{item.name}</p>
    </Link>
  );
};

export default LinkWithPicture;
