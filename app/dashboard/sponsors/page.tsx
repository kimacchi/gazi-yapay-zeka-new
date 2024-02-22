import { Member } from "@/types/member";
import axios, { AxiosResponse } from "axios";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import React from "react";

const Page = async () => {
  console.log(headers().get("host"))
  const host =
    headers().get("host") === "localhost:3000"
      ? "http://localhost:3000"
      : `https://${headers().get("host")}`;
  const pb_auth = cookies().get("pb_auth")?.value;
  // const res = await axios.get<any, AxiosResponse<Member[]>>(
  //   `${host}/api/members`,
  //   {
  //     headers: {
  //       cookie: `pb_auth=${pb_auth}`,
  //     },
  //   }
  // );
  return (
    <div>
      <Link href="/dashboard/sponsors/create">Create Sponsor</Link>
    </div>
  );
};

export default Page;
