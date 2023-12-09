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

  const part_of_event_res = await axios.get<any, AxiosResponse<{partOfEvent: boolean}>>("http://localhost:3000/api/events/part-of-event/" + params.pid + "?user_id=" + pb.authStore.model?.id, {
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
