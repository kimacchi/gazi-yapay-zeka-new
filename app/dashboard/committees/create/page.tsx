import CreateCommittee from '@/components/CreateCommittee'
import { headers } from 'next/headers'
import React from 'react'

const Page = () => {
    const host = headers().get("host") === "localhost:3000" ? "http://localhost:3000" : `https://${headers().get("host")}`

  return (
    <div className='w-full flex flex-col items-center mt-12 gap-8'>
      <h1 className='text-3xl font-bold text-center'>Komite Oluştur</h1>
      <CreateCommittee />
    </div>
  )
}

export default Page