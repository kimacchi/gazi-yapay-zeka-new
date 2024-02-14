import { Commitee } from "@/types/comitee";
import axios, { AxiosResponse } from "axios";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import React from "react";
import Comittees from "@/components/Comittees";
import { redirect } from "next/navigation";

const page = async () => {
  const host =
    headers().get("host") === "localhost:3000"
      ? "http://localhost:3000"
      : `https://${headers().get("host")}`;
  const pb_auth = cookies().get("pb_auth")?.value;
  const res = await axios.get<any, AxiosResponse<Commitee[]>>(
    `${host}/api/committees`,
    {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
      },
    }
  );
  console.log(res.data)
  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <h1 className="text-4xl font-bold text-center">Komiteler</h1>
      <div className="flex flex-col gap-4 sm:w-1/3 w-11/12">
        <Link
          href="/dashboard/committees/create"
          className="text-center disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2  border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
        >
          Komite Oluştur
        </Link>
        <Comittees data={res.data} />
      </div>
    </div>
  );
};

export default page;
