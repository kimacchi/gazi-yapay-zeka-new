import EventForm from "@/components/EventForm";
import { Event } from "@/types/event";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { cookies } from "next/headers";
import React from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

const page = async ({ params }: { params: { pid: string } }) => {
  let pb_auth = Cookies.get("pb_auth");
  if (!pb_auth) pb_auth = cookies().get("pb_auth")?.value;
  const res = await axios.get<any, AxiosResponse<Event>>(
    "http://localhost:3000/api/events/" + params.pid,
    {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
      },
    }
  );

  const token = cookies().get("pb_auth")?.value;
  pb.authStore.loadFromCookie(token || "");

  let partOfEvent = false;
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

  if (pb.authStore.model) {
    if (res.data.participants?.includes(pb.authStore.model.id)) {
      partOfEvent = true;
    }
    faculty = pb.authStore.model.faculty;
    schoolNo = pb.authStore.model.schoolNo;
    phoneNo = pb.authStore.model.phoneNo;
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
  console.log(partOfEvent);
  // console.log(res.data)
  return (
    <div className="w-full py-12">
      <EventForm
        event={res.data}
        partOfEvent={partOfEvent}
        userFaculty={faculty}
        userGrade={grade}
        userPhoneNo={phoneNo}
        userSchoolNo={schoolNo}
      />
    </div>
  );
};

export default page;
