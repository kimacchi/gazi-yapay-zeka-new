import { Event } from "@/types/event";
import React from "react";
import Markdown from "react-markdown";

const EventForm = ({ event }: { event: Event }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">{event.name}</h1>
        <Markdown className="text-left">{event.description}</Markdown>
        <h2>
          <span className="font-semibold">Etkinlik zamanı: </span>
          {new Date(event.eventTime).toLocaleDateString("tr-TR")}
        </h2>
        <h2>
          <span className="font-semibold">Etkinlik Yeri: </span>
          {event.location}
        </h2>
        {
          event.isOnline && (
            <h2>
              <span className="font-semibold text-rose-700">NOT: </span>
              Bu etkinlik online olarak gerçekleşecektir.
            </h2>
          )
        }
        {
          (event.reqFaculty || event.reqGrade || event.reqPhoneNo || event.reqSchoolNo || true) && (
            <div>
              <hr className="w-full"></hr>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default EventForm;
