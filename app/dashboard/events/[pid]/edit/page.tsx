import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { Event } from "@/types/event";
import AdminEventForm from "@/components/AdminEventForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: "favicon.ico",
  title: "Etkinlik güncelle | Gazi Yapay Zeka",
  description: "Gazi Üniversitesi Yapay Zeka Topluluğu'nun Websitesi",
  keywords:
    "gazi üniversitesi,gazi üniversitesi mühendislik fakültesi,gazi üniversitesi topluluk,yapay zeka,yapay zeka topluluğu,gazi üniversitesi yapay zeka,gazi üniversitesi yapay zeka topluluğu,gazi yapay zeka,gazi yapay zeka topluluğu,gazi ai,gazi ai topluluğu,gazi artificial intelligence,gazi artificial intelligence topluluğu,gazi artificial intelligence society,yapay zekâ,gazi üniversitesi,gazi,gazi üni,topluluk,makine öğrenmesi,yapay zeka ve makine öğrenmesi,gazi yapay zeka yönetim sistemi,gazi yapay zeka login,yapay zeka login,yapay zeka haberleri,yapay zeka yönetim sistemi",
  robots: "index, follow",
};

export default async function Page({ params }: { params: { pid: string } }) {
    // ! This page is for admins only.
    const pb_auth = cookies().get("pb_auth")?.value;
    const res = await axios.get<any, AxiosResponse<Event>>(
      `http://localhost:3000/api/events/${params.pid}`,
      {
        headers: {
          cookie: `pb_auth=${pb_auth}`,
        },
      }
    );
    console.log(res.data);
    return (
      <div>
        <AdminEventForm event={res.data} />
      </div>
    );
  }
  