import EventForm from "@/components/EventForm";
import { Event } from "@/types/event";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { cookies } from "next/headers";
import React from "react";
import PocketBase from "pocketbase";
import { Metadata } from "next";

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

export const metadata: Metadata = {
  icons: "favicon.ico",
  title: "Etkinliğe kaydol | Gazi Yapay Zeka",
  description: "Gazi Üniversitesi Yapay Zeka Topluluğu'nun Websitesi",
  keywords:
    "gazi üniversitesi,gazi üniversitesi mühendislik fakültesi,gazi üniversitesi topluluk,yapay zeka,yapay zeka topluluğu,gazi üniversitesi yapay zeka,gazi üniversitesi yapay zeka topluluğu,gazi yapay zeka,gazi yapay zeka topluluğu,gazi ai,gazi ai topluluğu,gazi artificial intelligence,gazi artificial intelligence topluluğu,gazi artificial intelligence society,yapay zekâ,gazi üniversitesi,gazi,gazi üni,topluluk,makine öğrenmesi,yapay zeka ve makine öğrenmesi,gazi yapay zeka yönetim sistemi,gazi yapay zeka login,yapay zeka login,yapay zeka haberleri,yapay zeka yönetim sistemi",
  robots: "index, follow",
};

const page = async ({ params }: { params: { pid: string } }) => {
  let pb_auth = Cookies.get("pb_auth");
  if (!pb_auth) pb_auth = cookies().get("pb_auth")?.value;
  const res = await axios.get<any, AxiosResponse<Event>>(
    "https://www.gaziyapayzeka.com/api/events/" + params.pid,
    {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
      },
    }
  );

  const token = cookies().get("pb_auth")?.value;
  pb.authStore.loadFromCookie(token || "");

  
  let faculty = "";
  let grade:
    | "Hazırlık"
    | "1. Sınıf"
    | "2. Sınıf"
    | "3. Sınıf"
    | "4. Sınıf"
    | "5. Sınıf"
    | "6. Sınıf"
    | "Yüksek Lisans"
    | "Doktora"
    | "" = "";
  let schoolNo = "";
  let phoneNo = "";
  let majoring = "";

  const part_of_event_res = await axios.get<any, AxiosResponse<{partOfEvent: boolean}>>("https://www.gaziyapayzeka.com/api/events/part-of-event/" + params.pid + "?user_id=" + pb.authStore.model?.id, {
    headers: {
      cookie: `pb_auth=${pb_auth}`,
    },
  })
  let partOfEvent = part_of_event_res.data.partOfEvent

  if (pb.authStore.model) {
    console.log(res.data.participants)
    
    faculty = pb.authStore.model.faculty;
    schoolNo = pb.authStore.model.schoolNo;
    phoneNo = pb.authStore.model.phoneNo;
    majoring = pb.authStore.model.majoring;
    grade = pb.authStore.model.grade as
      | "Hazırlık"
      | "1. Sınıf"
      | "2. Sınıf"
      | "3. Sınıf"
      | "4. Sınıf"
      | "5. Sınıf"
      | "6. Sınıf"
      | "Yüksek Lisans"
      | "Doktora"
      | "";
  }
  console.log(pb.authStore.model);
  // console.log(res.data)
  return (
    <div className="w-full py-12">
      <EventForm
        event={res.data}
        userMajoring={majoring}
        partOfEvent_={partOfEvent}
        userFaculty={faculty}
        userGrade={grade}
        userPhoneNo={phoneNo}
        userSchoolNo={schoolNo}
      />
    </div>
  );
};

export default page;
