"use client"
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Event } from "@/types/event";

export default function Page({ params }: { params: { pid: string } }) {
  const [event, setEvent] = useState<Event | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      // get result
      const result = await axios.get<any, AxiosResponse<Event>>(`${params.pid}`);
      setEvent(result.data);
    };
    fetchData();
  }, [])
  return (
    <div className="">
      
    </div>
  );
}
