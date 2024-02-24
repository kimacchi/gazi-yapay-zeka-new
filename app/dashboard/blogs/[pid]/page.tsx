import UpdateBlog from '@/components/UpdateBlog';
import { Blog } from '@/types/blog';
import axios, { AxiosResponse } from 'axios';
import { cookies, headers } from 'next/headers';
import React from 'react'

const Page = async ({ params }: { params: { pid: string } }) => {
  console.log(headers().get("host"));
    const host = "http://localhost:3000";

//   const host =
//     headers().get("host") === "localhost:3000" ||
//     headers().get("host") !== "gaziyapayzeka.com"
//       ? "http://localhost:3000"
//       : `https://${headers().get("host")}`;

  const pb_auth = cookies().get("pb_auth")?.value;
  const res = await axios.get<any, AxiosResponse<Blog>>(
    `${host}/api/blogs/${params.pid}`,
    {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
      },
    }
  );
  return (
    <UpdateBlog item={res.data} />
    )
}

export default Page