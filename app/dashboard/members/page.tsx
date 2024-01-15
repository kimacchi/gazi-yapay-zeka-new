import { Member } from "@/types/member";
import axios, { AxiosResponse } from "axios";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import React from "react";

const page = async () => {
  const host =
    headers().get("host") === "localhost:3000"
      ? "http://localhost:3000"
      : `https://${headers().get("host")}`;
  const pb_auth = cookies().get("pb_auth")?.value;
  const res = await axios.get<any, AxiosResponse<Member[]>>(
    `${host}/api/members`,
    {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
      },
    }
  );
  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <h1 className="text-4xl font-bold text-center">İdari Kurul Üyeleri</h1>
      <div className="flex flex-col gap-4 sm:w-1/3 w-11/12">
        <Link
          href="/dashboard/members/create"
          className="text-center disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2  border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
        >
          İK Üyesi Ekle
        </Link>
        {res.data.map((item) => {
          return (
            <Link
              href={`/dashboard/members/${item.id}`}
              key={item.id}
              className="text-left bg-cyan-900/20 p-2 rounded-md hover:bg-cyan-800/30"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default page;
