import { UserContext_ } from '@/types/user';
import axios, { AxiosResponse } from 'axios';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'

export const metadata: Metadata = {
    title: "Üye Yönetimi | Gazi Yapay Zeka"
}

const page = async ({searchParams}: {
    searchParams?: { [key: string]: string | string[] | undefined; };
}) => {
    const page = searchParams?.page || 1;
    const pb_auth = cookies().get("pb_auth")?.value;
    // TODO: a feature to search users
    const res = await axios.get<any, AxiosResponse<{items:UserContext_[], totalItems: number, totalPages: number}>>(
        `https://www.gaziyapayzeka.com/api/users?page=${page}`,
        {
          headers: {
            cookie: `pb_auth=${pb_auth}`,
          },
        }
      );
      
  return (
    <div className='w-full flex flex-col items-center py-20 gap-4'>
        <h1 className='text-4xl font-bold'>Tüm üyeler {`(${res.data.totalItems})`}</h1>
        <>
            {
                res.data.items.map((user, index) => (
                    <Link key={index} href={`/dashboard/users/${user.id}`} className='sm:w-1/3 w-11/12 text-left '>
                        {user.name}
                    </Link>
                ))
            }
        </>
        <p>{page}/{res.data.totalPages}</p>
        <Link href={`/dashboard/users?page=${parseInt(page.toString()) + 1}`} className='border-white border p-2'>
            Sonraki sayfa
        </Link>
    </div>
  )
}

export default page