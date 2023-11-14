import Image from "next/image";
import { Inter } from "next/font/google";
import { Test } from "@/components/test";
import pb from "@/controllers/pocketbase";
import axios from "axios";
import SocialsCard from "@/components/SocialsCard";
import { Metadata } from "next";
import { Pagination } from "@nextui-org/react";
import { Events } from "@/components/system/Events";


export const metadata: Metadata = {
  icons: "favicon.ico",
  title: "Gazi Yapay Zeka",
  description: "Gazi Üniversitesi Yapay Zeka Topluluğu'nun Websitesi",
  keywords:
    "gazi üniversitesi,gazi üniversitesi mühendislik fakültesi,gazi üniversitesi topluluk,yapay zeka,yapay zeka topluluğu,gazi üniversitesi yapay zeka,gazi üniversitesi yapay zeka topluluğu,gazi yapay zeka,gazi yapay zeka topluluğu,gazi ai,gazi ai topluluğu,gazi artificial intelligence,gazi artificial intelligence topluluğu,gazi artificial intelligence society,yapay zekâ,gazi üniversitesi,gazi,gazi üni,topluluk,makine öğrenmesi,yapay zeka ve makine öğrenmesi,gazi yapay zeka yönetim sistemi,gazi yapay zeka login,yapay zeka login,yapay zeka haberleri,yapay zeka yönetim sistemi",
  robots: "index, follow",
};

export default async function Home() {

  const res = await axios.get("http://localhost:3000/api/events?page=1&per_page=20");
  console.log(res.data);
  return (
    <main className="text-neutral-200 w-full flex flex-col items-center mt-16">
        <Events events={res.data.items}/>
    </main>
  );
}
