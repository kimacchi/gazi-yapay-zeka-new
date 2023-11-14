"use client";

import { Event } from "@/types/event";
import { Input, Spinner } from "@nextui-org/react";
import React from "react";
import Markdown from "react-markdown";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";

const faculties = [
  "Diş Hekimliği Fakültesi",
  "Eczacılık Fakültesi",
  "Fen Fakültesi",
  "Gazi Eğitim Fakültesi",
  "Hemşirelik Fakültesi",
  "Mühendislik Fakültesi",
  "Mimarlık Fakültesi",
  "Sağlık Bilimleri Fakültesi",
  "Spor Bilimleri Fakültesi",
  "Teknoloji Fakültesi",
  "Tıp Fakültesi",
  "Uygulamalı Bilimler Fakültesi",
];

const EventForm = ({ event }: { event: Event }) => {
  // TODO: Make button disabled if required fields are not filled or event is full
  // TODO: Make button remove the participant if participant is already a part of the event


  const [phoneNo, setPhoneNo] = React.useState("");
  const [faculty, setFaculty] = React.useState("");
  const [schoolNo, setSchoolNo] = React.useState("");
  const [grade, setGrade] = React.useState<
    | "Hazırlık"
    | "1. Sınıf"
    | "2. Sınıf"
    | "3. Sınıf"
    | "4. Sınıf"
    | "5. Sınıf"
    | "6. Sınıf"
    | "Yüksek Lisans"
    | "Doktora"
    | null
  >(null);
  const [loading, setLoading] = React.useState(false);

  const joinEvent = async () => {
    try {
      const res = await axios.post("/api/events/add-participant/" + event.id, {
        phoneNo: phoneNo ? phoneNo : null,
        faculty: faculty ? faculty : null,
        schoolNo: schoolNo ? schoolNo : null,
        grade: grade ? grade : null,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dark w-full flex flex-col items-center sm:px-0 px-4">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center">{event.name}</h1>
        <Markdown className="text-left">{event.description}</Markdown>
        <h2>
          <span className="font-semibold">Etkinlik Tarihi: </span>
          {new Date(event.eventTime).toLocaleDateString("tr-TR", {
            timeZone: "GMT+0",
          })}
        </h2>
        <h2>
          <span className="font-semibold">Etkinlik saati: </span>
          {new Date(event.eventTime).toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "GMT+0",
          })}
        </h2>
        <h2>
          <span className="font-semibold">Etkinlik Yeri: </span>
          {event.location}
        </h2>
        {event.isOnline && (
          <h2>
            <span className="font-semibold text-rose-700">NOT: </span>
            Bu etkinlik online olarak gerçekleşecektir.
          </h2>
        )}
        {(event.reqFaculty ||
          event.reqGrade ||
          event.reqPhoneNo ||
          event.reqSchoolNo) && (
          <div className="flex flex-col gap-6">
            <hr className="w-full"></hr>
            <h1 className="text-lg font-semibold">
              Etkinliğe katılmak için aşağıdaki formu doldurunuz.
            </h1>
            {event.reqFaculty && (
              <Select
                label="Fakülteniz"
                labelPlacement="outside"
                placeholder="Fakülteniz"
              >
                {faculties.map((faculty) => {
                  return (
                    <SelectItem
                      value={faculty}
                      key={faculty}
                      onClick={() => {
                        setFaculty(faculty);
                      }}
                    >
                      {faculty}
                    </SelectItem>
                  );
                })}
              </Select>
            )}
            {event.reqGrade && (
              <Select
                label="Sınıfınız"
                labelPlacement="outside"
                placeholder="Sınıfınız"
              >
                <SelectItem
                  value="Hazırlık"
                  key="Hazırlık"
                  onClick={() => {
                    setGrade("Hazırlık");
                  }}
                >
                  Hazırlık
                </SelectItem>
                <SelectItem
                  value="1. Sınıf"
                  key="1. Sınıf"
                  onClick={() => {
                    setGrade("1. Sınıf");
                  }}
                >
                  1. Sınıf
                </SelectItem>
                <SelectItem
                  value="2. Sınıf"
                  key="2. Sınıf"
                  onClick={() => {
                    setGrade("2. Sınıf");
                  }}
                >
                  2. Sınıf
                </SelectItem>
                <SelectItem
                  value="3. Sınıf"
                  key="3. Sınıf"
                  onClick={() => {
                    setGrade("3. Sınıf");
                  }}
                >
                  3. Sınıf
                </SelectItem>
                <SelectItem
                  value="4. Sınıf"
                  key="4. Sınıf"
                  onClick={() => {
                    setGrade("4. Sınıf");
                  }}
                >
                  4. Sınıf
                </SelectItem>
                <SelectItem
                  value="5. Sınıf"
                  key="5. Sınıf"
                  onClick={() => {
                    setGrade("5. Sınıf");
                  }}
                >
                  5. Sınıf
                </SelectItem>
                <SelectItem
                  value="6. Sınıf"
                  key="6. Sınıf"
                  onClick={() => {
                    setGrade("6. Sınıf");
                  }}
                >
                  6. Sınıf
                </SelectItem>
                <SelectItem
                  value="Yüksek Lisans"
                  key="Yüksek Lisans"
                  onClick={() => {
                    setGrade("Yüksek Lisans");
                  }}
                >
                  Yüksek Lisans
                </SelectItem>
                <SelectItem
                  value="Doktora"
                  key="Doktora"
                  onClick={() => {
                    setGrade("Doktora");
                  }}
                >
                  Doktora
                </SelectItem>
              </Select>
            )}
            {event.reqPhoneNo && (
              <Input
                type="text"
                label="Telefon numaranız"
                value={phoneNo}
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                  console.log(phoneNo);
                }}
                placeholder="+90 555 555 55 55"
                labelPlacement="outside"
              />
            )}
            {event.reqSchoolNo && (
              <Input
                type="text"
                label="Okul numaranız"
                value={schoolNo}
                onChange={(e) => setSchoolNo(e.target.value)}
                placeholder="Okul numaranızı giriniz."
                labelPlacement="outside"
              />
            )}
          </div>
        )}
        <button
          type="submit"
          disabled={loading || false}
          onClick={async (e) => {
            e.preventDefault();
            try {
              setLoading(true);
              await joinEvent();
              setLoading(false);
            } catch (error) {
              console.log(error);
              setLoading(false);
            }
          }}
          className="disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2 w-full border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
        >
          {loading ? <Spinner /> : "Etkinliğe Katıl"}
        </button>
      </div>
    </div>
  );
};

export default EventForm;
