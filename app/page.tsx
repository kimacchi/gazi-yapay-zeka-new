import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Test } from '@/components/test'
import pb from "@/controllers/pocketbase"
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // TODO: add autoRefresh to every page on initial load to revalidate user data
  return (
    <main className="">
      <Test />
    </main>
  )
}
