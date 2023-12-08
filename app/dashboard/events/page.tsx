import React from "react";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { Event } from "@/types/event";

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

const EventsPage = async () => {
  /**
   * * This page will be used to create events.
   * ? Title input
   * ? Markdown editor for description
   * ? Input for location
   * ? date picker for eventTime releaseTime and closeTime
   * ? max participant count
   * ? isOnline checkbox
   * ? exclusiveForActiveMembers checkbox
   * ? reqPhoneNo checkbox
   * ? reqSchoolNo checkbox
   * ? reqFaculty checkbox
   * ? reqGrade checkbox (which year of class)
   * ?
   * ?
   */
  let pb_auth = Cookies.get("pb_auth");
  if (!pb_auth) pb_auth = cookies().get("pb_auth")?.value;
  const res = await axios.get<any, AxiosResponse<Event[]>>(
    `http://localhost:3000/api/events/admin`,
    {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
      },
    }
  );

  const token = cookies().get("pb_auth")?.value;
  pb.authStore.loadFromCookie(token || "");

  return (
    <div className="flex flex-col py-24 items-center gap-4">
      <Link href="/dashboard/events/create-event" className="text-center disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2 sm:w-1/5 w-11/12 border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900">
        Etkinlik oluştur
      </Link>
      <h1 className="text-4xl font-bold mb-4 text-center">Tüm Etkinlikleri Yönet</h1>
      {res.data.map((item) => {
        return (
          <Link
            href={`/dashboard/events/${item.id}/edit`}
            key={item.id}
            className="sm:w-2/5 w-11/12 h-20 p-2 flex flex-col justify-between rounded-md bg-zinc-600/30 hover:bg-zinc-500/30"
          >
            <div className="flex justify-between">
              <h2>{item.name}</h2>
              <h2>{item.participants.length}/{item.maxParticipant}</h2>
            </div>
            <h2>{new Date(item.eventTime).toLocaleDateString()}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default EventsPage;
