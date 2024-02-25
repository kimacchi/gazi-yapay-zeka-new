import LinkWithPicture from "@/components/LinkWithPicture";
import { Member } from "@/types/member";
import { Sponsor } from "@/types/sponsor";
import { Avatar } from "@nextui-org/react";
import axios, { AxiosResponse } from "axios";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import React from "react";

const Page = async () => {
  console.log(headers().get("host"));
  const host =
    headers().get("host") === "localhost:3000" ||
    headers().get("host") === "[::1]:55043"
      ? "http://localhost:3000"
      : `https://${headers().get("host")}`;
  const pb_auth = cookies().get("pb_auth")?.value;
  // ! this code should be uncommented in production
  const res = await axios.get<any, AxiosResponse<Sponsor[]>>(
    `${host}/api/sponsors`,
    {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
      },
    }
  );
  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <h1 className="text-4xl font-bold text-center">Sponsorlar</h1>
      <div className="flex flex-col gap-4 sm:w-1/3 w-11/12">
        <Link
          href="/dashboard/sponsors/create"
          className="text-center disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2  border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
        >
          Sponsor Ekle
        </Link>
        {res.data.map((item) => {
          return (
            <LinkWithPicture item={item} key={item.id} />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
