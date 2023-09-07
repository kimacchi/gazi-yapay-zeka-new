import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Test } from '@/components/test'
import pb from "@/controllers/pocketbase"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  console.log("asdfasdf   ",pb.authStore.token)

  // TODO: add autoRefresh to every page on initial load to revalidate user data
  return (
    <main className="">
    </main>
  )
}
