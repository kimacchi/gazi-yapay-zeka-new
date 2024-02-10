import Committee from "@/components/Committee";
import { Commitee } from "@/types/comitee";
import { Member } from "@/types/member";
import axios, { AxiosResponse } from "axios";
import { cookies, headers } from "next/headers";
import React from "react";

const page = async ({ params }: { params: { pid: string } }) => {
  const host =
    headers().get("host") === "localhost:3000"
      ? "http://localhost:3000"
      : `https://${headers().get("host")}`;


      const pb_auth = cookies().get("pb_auth")?.value;
      const res = await axios.get<any, AxiosResponse<Commitee>>(
        `${host}/api/committees/${params.pid}`,
        {
          headers: {
            cookie: `pb_auth=${pb_auth}`,
          },
        }
      );
      const resMembers = await axios.get<any, AxiosResponse<Member[]>>(
        `${host}/api/members/`,
        {
          headers: {
            cookie: `pb_auth=${pb_auth}`,
          },
        }
      );
      console.log(resMembers.data)
  return (
    <div className="flex flex-col items-center">
      <Committee data={res.data} members={resMembers.data}/>
    </div>
  )
};

export default page;
