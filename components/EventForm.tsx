"use client";

import { Event } from "@/types/event";
import { Input, Spinner } from "@nextui-org/react";
import React, { useEffect } from "react";
import Markdown from "react-markdown";
import { Select, SelectItem } from "@nextui-org/react";
import axios, { AxiosResponse } from "axios";
import { useUserContext } from "@/app/UserContext";
import Cookies from "js-cookie";
import PocketBase from "pocketbase";
import { User, UserContext_ } from "@/types/user";
import { useRouter } from "next/navigation";

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

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

const all_majors = {
  "Diş Hekimliği Fakültesi": [
    "Klinik Bilimler",
    "Temel Bilimler",
    "Diğer Diş Hekimliği Bölümleri",
  ],
  "Eczacılık Fakültesi": [
    "Temel Eczacılık Bilimleri",
    "Eczacılık Meslek Bilimleri",
    "Eczacılık Teknolojisi",
    "Diğer Eczacılık Bölümleri",
  ],
  "Fen Fakültesi": [
    "Biyoloji",
    "Fizik",
    "Kimya",
    "Matematik",
    "İstatistik",
    "Diğer Fen Bölümleri",
  ],
  "Gazi Eğitim Fakültesi": [
    "Bilgisayar ve Öğretim Teknolojileri Eğitimi",
    "Eğitim Bilimleri",
    "Güzel Sanatlar Eğitimi",
    "Matematik ve Fen Bilimleri Eğitimi",
    "Özel Eğitim",
    "Temel Eğitim",
    "Türkçe ve Sosyal Bilimler Eğitimi",
    "Yabancı Diller Eğitimi",
    "Diğer Eğitim Bölümü",
  ],
  "Hemşirelik Fakültesi": [
    "Cerrahi Hastalıkları Hemşireliği Ana Bilim Dalı",
    "Çocuk Sağlığı ve Hastalıkları Hemşireliği Ana Bilim Dalı",
    "Doğum, Kadın Sağlığı ve Hastalıkları Hemşireliği Ana Bilim Dalı",
    "Halk Sağlığı Hemşireliği Ana Bilim Dalı",
    "Hemşirelik Esasları Ana Bilim Dalı",
    "Hemşirelikte Yönetim Ana Bilim Dalı",
    "İç Hastalıkları Hemşireliği Ana Bilim Dalı",
    "Ruh Sağlığı ve Hastalıkları Hemşireliği Ana Bilim Dalı",
    "Diğer Hemşirelik Bölümü",
  ],
  "Mühendislik Fakültesi": [
    "Bilgisayar Mühendisliği",
    "Elektrik-Elektronik Mühendisliği",
    "Endüstri Mühendisliği",
    "İnşaat Mühendisliği",
    "Makine Mühendisliği",
    "Kimya Mühendisliği",
    "Diğer Mühendislik Bölümü",
  ],
  "Mimarlık Fakültesi": [
    "Endüstriyel Tasarım",
    "Mimarlık",
    "Şehir ve Bölge Planlama",
    "Diğer Mimarlık Bölümü",
  ],
  "Sağlık Bilimleri Fakültesi": [
    "Beslenme ve Diyetetik",
    "Fizyoterapi ve Rehabilitasyon",
    "Hemşirelik (Hemşirelik Fakültesi)",
    "Odyoloji",
    "Dil ve Konuşma Terapisi",
    "Sosyal Hizmet",
    "Diğer Sağlık Bilimleri Bölümü",
  ],
  "Spor Bilimleri Fakültesi": [
    "Antrenörlük Eğitimi",
    "Beden Eğitimi ve Spor Öğretmenliği",
    "Rekreasyon",
    "Spor Yöneticiliği",
    "Diğer Spor Bilimleri Bölümü",
  ],
  "Teknoloji Fakültesi": [
    "Ağaçişleri Endüstri Mühendisliği",
    "Bilgisayar Mühendisliği",
    "Elektrik-Elektronik Mühendisliği",
    "Endüstriyel Tasarım Mühendisliği",
    "Enerji Sistemleri Mühendisliği",
    "İnşaat Mühendisliği",
    "İmalat Mühendisliği",
    "Metalurji ve Malzeme Mühendisliği",
    "Otomotiv Mühendisliği",
    "Diğer Teknoloji Bölümü",
  ],
  "Tıp Fakültesi": [
    "Temel Tıp Bilimleri",
    "Dahili Tıp Bilimleri",
    "Cerrahi Tıp Bilimleri",
    "Diğer Tıp Bölümü",
  ],
  "Uygulamalı Bilimler Fakültesi": [
    "Fotonik",
    "Yönetim Bilişim Sistemleri",
    "Diğer Uygulamalı Bilimler Bölümü",
  ],
} as any;

const EventForm = ({
  event,
  partOfEvent_,
  userFaculty,
  userGrade,
  userSchoolNo,
  userPhoneNo,
  userMajoring,
}: {
  event: Event;
  partOfEvent_: boolean;
  userPhoneNo: string;
  userFaculty: string;
  userSchoolNo: string;
  userMajoring: string;
  userGrade:
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
}) => {
  // TODO: Make button disabled if required fields are not filled or event is full
  // TODO: Make button remove the participant if participant is already a part of the event
  // const { user } = useUserContext();
  // ? Maybe send the user id with the request and check if the user is already a part of the event
  // ? I could also use that to verify other sorts of things
  let pb_auth = Cookies.get("pb_auth");

  const [partOfEvent, setPartOfEvent] = React.useState(false);

  useEffect(() => {
    const x = async () => {
      const part_of_event_res = await axios.get<
        any,
        AxiosResponse<{ partOfEvent: boolean }>
      >("/api/events/part-of-event/" + event.id, {
        headers: {
          cookie: `pb_auth=${pb_auth}`,
        },
      });
      setPartOfEvent(part_of_event_res.data.partOfEvent);
    };
    x();
  }, []);

  const [phoneNo, setPhoneNo] = React.useState(userPhoneNo || "");
  const [majoring, setMajoring] = React.useState(userMajoring || "");
  const [faculty, setFaculty] = React.useState(userFaculty || "");
  const [schoolNo, setSchoolNo] = React.useState(userSchoolNo || "");
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
    | ""
  >(userGrade || "");
  const [loading, setLoading] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(true);

  const [join, setJoin] = React.useState(true);

  useEffect(() => {
    // TODO: if person wants to leave, they should be even if the event is full

    // ! If part of event, leave should be available, currently not.
    if (event.reqFaculty && faculty == "") setDisabled(true);
    else if (event.reqGrade && grade == "") setDisabled(true);
    else if (event.reqPhoneNo && phoneNo == "") setDisabled(true);
    else if (event.reqSchoolNo && schoolNo == "") setDisabled(true);
    else setDisabled(false);
    // console.log(event)
  });
  const router = useRouter();

  const joinEvent = async () => {
    try {
      const res = await axios.post(
        "/api/events/add-participant/" + event.id,
        {
          phoneNo: phoneNo ? phoneNo : null,
          faculty: faculty ? faculty : null,
          schoolNo: schoolNo ? schoolNo : null,
          grade: grade ? grade : null,
          majoring: majoring ? majoring : null,
        },
        {
          headers: {
            cookie: `pb_auth=${pb_auth}`,
          },
        }
      );
      router.push("/dashboard/");
    } catch (error) {
      console.log(error);
    }
  };

  const leaveEvent = async () => {
    try {
      const res = await axios.delete(
        "/api/events/add-participant/" + event.id,
        {
          headers: {
            cookie: `pb_auth=${pb_auth}`,
          },
        }
      );
      router.push("/dashboard/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dark w-full flex flex-col items-center sm:px-0 px-4">
      <div className="flex flex-col w-full gap-6">
        <h1 className="text-3xl font-bold text-center">{event.name}</h1>
        <div className="bg-zinc-600/30 p-4 rounded-md">
          <Markdown className="text-left break-words">{event.description}</Markdown>
        </div>
        <h2 className="bg-zinc-600/30 p-4 rounded-md">
          <span className="font-semibold">Etkinlik Tarihi: </span>
          {new Date(event.eventTime).toLocaleDateString("tr-TR", {
            timeZone: "GMT+0",
          })}
        </h2>
        <h2 className="bg-zinc-600/30 p-4 rounded-md">
          <span className="font-semibold">Etkinlik saati: </span>
          {new Date(event.eventTime).toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "GMT+0",
          })}
        </h2>
        <h2 className="bg-zinc-600/30 p-4 rounded-md">
          <span className="font-semibold">Etkinlik Yeri: </span>
          {event.location}
        </h2>
        {event.isOnline && (
          <h2 className="bg-rose-800/30 p-4 rounded-md">
            <span className="font-semibold text-rose-700">NOT: </span>
            Bu etkinlik online olarak gerçekleşecektir.
          </h2>
        )}
        {partOfEvent && (
          <h2 className="bg-emerald-700/30 p-4 rounded-md flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-check-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
            </svg>
            Bu etkinliğe üyesiniz. Dilerseniz etkinlikten ayrılabilirsiniz.
          </h2>
        )}
        {!partOfEvent &&
          event.participants.length >= event.maxParticipant &&
          event.reserved.length < event.maxReserved && (
            <h2 className="bg-rose-800/30 p-4 rounded-md">
              <span className="font-semibold text-rose-700">UYARI: </span>
              Bu etkinlik dolmuştur. Ancak rezervasyon yaptırabilirsiniz.
              <br />
              <span className="text-blue-300">Sıradaki kişi sayısı: {event.reserved.length}</span>
            </h2>
          )}
        {(event.reqFaculty ||
          event.reqGrade ||
          event.reqPhoneNo ||
          event.reqSchoolNo ||
          event.reqMajoring) &&
          (!partOfEvent ||
            event.participants.length + event.reserved.length >=
              event.maxParticipant + event.maxReserved) && (
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
                  selectedKeys={faculty ? [faculty] : []}
                  onChange={(e) => setFaculty(e.target.value)}
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
              {event.reqMajoring && (
                <Select
                  label="Bölümünüz"
                  labelPlacement="outside"
                  placeholder="Bölümünüz"
                  selectedKeys={majoring ? [majoring] : []}
                  onChange={(e) => setMajoring(e.target.value)}
                >
                  {all_majors[faculty]?.map((major: any) => {
                    return (
                      <SelectItem
                        value={major}
                        key={major}
                        onClick={() => {
                          setMajoring(major);
                        }}
                      >
                        {major}
                      </SelectItem>
                    );
                  })}
                </Select>
              )}
              {event.reqGrade && (
                <Select
                  label="Sınıfınız"
                  labelPlacement="outside"
                  placeholder={"Sınıfınız"}
                  selectedKeys={grade ? [grade] : []}
                  onChange={(e) =>
                    setGrade(
                      e.target.value as
                        | "Hazırlık"
                        | "1. Sınıf"
                        | "2. Sınıf"
                        | "3. Sınıf"
                        | "4. Sınıf"
                        | "5. Sınıf"
                        | "6. Sınıf"
                        | "Yüksek Lisans"
                        | "Doktora"
                        | ""
                    )
                  }
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
        {partOfEvent && (
          <button
            type="submit"
            disabled={loading}
            onClick={async (e) => {
              e.preventDefault();
              try {
                setLoading(true);
                await leaveEvent();
                setLoading(false);
              } catch (error) {
                console.log(error);
                setLoading(false);
              }
            }}
            className="disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2 w-full border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
          >
            {loading ? <Spinner /> : "Etkinlikten Ayrıl"}
          </button>
        )}
        {!partOfEvent &&
          event.participants.length + event.reserved.length <
            event.maxParticipant + event.maxReserved && (
            <button
              type="submit"
              disabled={loading || isDisabled}
              onClick={async (e) => {
                e.preventDefault();
                try {
                  setLoading(true);
                  if (!partOfEvent) {
                    await joinEvent();
                  }
                  setLoading(false);
                } catch (error) {
                  console.log(error);
                  setLoading(false);
                }
              }}
              className="disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2 w-full border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
            >
              {loading ? <Spinner /> : `Etkinliğe Katıl`}
            </button>
          )}
        {event.participants.length + event.reserved.length >=
          event.maxParticipant + event.maxReserved && (
          <h2 className="bg-rose-800/30 p-4 rounded-md">
            <span className="font-semibold text-rose-700">UYARI: </span>
            Bu etkinlik dolmuştur.
          </h2>
        )}
      </div>
    </div>
  );
};

export default EventForm;
