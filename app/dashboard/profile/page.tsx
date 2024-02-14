import { UserContext_ } from "@/types/user";
import axios, { AxiosResponse } from "axios";
import { Metadata } from "next";
import { cookies } from "next/headers";
import PocketBase from "pocketbase";
import ProfilePage from "@/components/ProfilePage";

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

export const metadata: Metadata = {
  icons: "favicon.ico",
  title: "Profilim | Gazi Yapay Zeka",
  description: "Gazi Üniversitesi Yapay Zeka Topluluğu'nun Websitesi",
  keywords:
    "gazi üniversitesi,gazi üniversitesi mühendislik fakültesi,gazi üniversitesi topluluk,yapay zeka,yapay zeka topluluğu,gazi üniversitesi yapay zeka,gazi üniversitesi yapay zeka topluluğu,gazi yapay zeka,gazi yapay zeka topluluğu,gazi ai,gazi ai topluluğu,gazi artificial intelligence,gazi artificial intelligence topluluğu,gazi artificial intelligence society,yapay zekâ,gazi üniversitesi,gazi,gazi üni,topluluk,makine öğrenmesi,yapay zeka ve makine öğrenmesi,gazi yapay zeka yönetim sistemi,gazi yapay zeka login,yapay zeka login,yapay zeka haberleri,yapay zeka yönetim sistemi",
  robots: "index, follow",
};

export default async function Home() {
  const pb_auth = cookies().get("pb_auth")?.value;
  // const res = await axios.get<any, AxiosResponse<Event[]>>(
  //   `/api/events/admin`,
  //   {
  //     headers: {
  //       cookie: `pb_auth=${pb_auth}`,
  //     },
  //   }
  // );
  pb.authStore.loadFromCookie(pb_auth || "");
  const user_ = pb.authStore.model as unknown;
  const user = user_ as UserContext_;
  console.log(user, "sdafasdf")
  return (
    <>
        <ProfilePage user={user} />
    </>
  )
}
