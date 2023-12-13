import SearchButton from "@/components/SearchButton";
import { UserContext_ } from "@/types/user";
import axios, { AxiosResponse } from "axios";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Üye Yönetimi | Gazi Yapay Zeka",
};

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams?.page || 1;
  const name = searchParams?.name || "";
  const pb_auth = cookies().get("pb_auth")?.value;
  const host = headers().get("host") === "localhost:3000" ? "http://localhost:3000" : `https://${headers().get("host")}`
  console.log(host)
  // TODO: a feature to search users
  const res = await axios.get<
    any,
    AxiosResponse<{
      items: UserContext_[];
      totalItems: number;
      totalPages: number;
    }>
  >(`${host}/api/users?page=${page}&name=${name}`, {
    headers: {
      cookie: `pb_auth=${pb_auth}`,
    },
  });

  const searchName = async (data: FormData) => {
    "use server";
    const name_ = data.get("name");
  };
  return (
    <div className="w-full flex flex-col items-center py-20 gap-4">
      <h1 className="text-4xl font-bold">
        Tüm üyeler {`(${res.data.totalItems})`}
      </h1>
      <SearchButton page={page} />
      <>
        {res.data.items?.map((user, index) => (
          <Link
            key={index}
            href={`/dashboard/users/${user.id}`}
            className="sm:w-1/3 w-11/12 text-left bg-cyan-900/20 p-2 rounded-md hover:bg-cyan-800/30"
          >
            {user.name}
          </Link>
        ))}
      </>
      <p>
        {page}/{res.data.totalPages}
      </p>
      <Link
        href={`/dashboard/users?page=${parseInt(page.toString()) + 1}&name=${name}`}
        className="border-white border p-2"
      >
        Sonraki sayfa
      </Link>
    </div>
  );
};

export default page;
