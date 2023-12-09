import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { Event } from "@/types/event";
import AdminEventForm from "@/components/AdminEventForm";

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
  