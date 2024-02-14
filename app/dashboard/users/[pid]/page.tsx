import AdminUser from "@/components/AdminUser";
import { UserContext_ } from "@/types/user";
import { Input } from "@nextui-org/react";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ params }: { params: { pid: string } }) => {
  const pb_auth = cookies().get("pb_auth")?.value;
  const res = await axios.get<any, AxiosResponse<UserContext_>>(
    `https://www.gaziyapayzeka.com/api/users/${params.pid}`,
    {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
      },
    }
  );
  console.log(res.data);

  const sendData = async (formData: FormData) => {
    "use server";
    let admin_ = formData.get("admin");
    let activeMember_ = formData.get("activeMember");
    if(admin_) var admin = true;
    else var admin = false;
    if(activeMember_) var activeMember = true;
    else var activeMember = false;

    console.log(admin, activeMember)

    const res = await axios.patch<any, AxiosResponse<UserContext_>>(
      `https://www.gaziyapayzeka.com/api/users/${params.pid}`,
      {
        admin: admin,
        activeMember: activeMember,
      },
      {
        headers: {
          cookie: `pb_auth=${pb_auth}`,
        },
      }
    );
  };

  return (
    <div className="w-full flex flex-col items-center py-20">
      <AdminUser 
        admin={res.data.admin}
        activeMember={res.data.activeMember}
        name={res.data.name}
        username={res.data.username}
        sendData={sendData}
      />
    </div>
  );
};

export default page;
