"use client"
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Event } from "@/types/event";
import Cookies from "js-cookie";

export default function Page({ params }: { params: { pid: string } }) {
  const pb_auth = Cookies.get("pb_auth")
  const [event, setEvent] = useState<Event | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      // get result
      const result = await axios.get<any, AxiosResponse<Event>>(`${params.pid}`,{
        headers: {
          cookie: `pb_auth=${pb_auth}`,
        },
      });
      setEvent(result.data);
    };
    fetchData();
  }, [])
  return (
    <div className="">
      
    </div>
  );
}
