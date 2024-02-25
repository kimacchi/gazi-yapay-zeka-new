import BlogLink from '@/components/BlogLink';
import { Blog } from '@/types/blog';
import { Sponsor } from '@/types/sponsor';
import axios, { AxiosResponse } from 'axios';
import { cookies, headers } from 'next/headers';
import Link from 'next/link'
import React from 'react'

const page = async () => {
    console.log(headers().get("host"));
    // const host = "http://localhost:3000";
  const host =
    headers().get("host") === "localhost:3000" ||
    headers().get("host") !== "gaziyapayzeka.com"
      ? "http://localhost:3000"
      : `https://${headers().get("host")}`;
  const pb_auth = cookies().get("pb_auth")?.value;
  const res = await axios.get<any, AxiosResponse<Blog[]>>(
    `${host}/api/blogs`,
    {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
      },
    }
  );
  console.log(res.data)
  return (
    <div className="flex flex-col items-center gap-8 py-12">
    <h1 className="text-4xl font-bold text-center">Bloglar</h1>
    <div className="flex flex-col gap-4 sm:w-1/3 w-11/12">
      <Link
        href="/dashboard/blogs/create"
        className="text-center disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2  border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
      >
        Blog Ekle
      </Link>
      {res.data.map((item) => {
        return (
          <BlogLink item={item} key={item.id} />
        );
      })}
    </div>
  </div>
  )
}

export default page