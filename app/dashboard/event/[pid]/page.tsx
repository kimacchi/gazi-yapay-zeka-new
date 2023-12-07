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
  if(!pb_auth) pb_auth = cookies().get("pb_auth")?.value
  const res = await axios.get<any, AxiosResponse<Event>>(
    "http://localhost:3000/api/events/" + params.pid,
    {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
      },
    }
  );

  const token = cookies().get("pb_auth")?.value
  pb.authStore.loadFromCookie(token || "");

  let partOfEvent = false

  if(pb.authStore.model){
    if(res.data.participants.includes(pb.authStore.model.id)){
      partOfEvent = true
    }
  }
  console.log(partOfEvent)
  // console.log(res.data)
  return (
    <div className="w-full py-12">
      <EventForm event={res.data} partOfEvent={partOfEvent} />
    </div>
  );
};

export default page;
