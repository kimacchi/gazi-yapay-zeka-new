"use client";

import { Checkbox, Input, Spinner } from "@nextui-org/react";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Event } from "@/types/event";

const CreateEventPage = ({ event }: { event: Event }) => {
  const [description, setDescription] = React.useState<string | undefined>(
    event.description
  );
  const [name, setName] = React.useState(event.name);
  const [eventTime, setEventTime] = React.useState<Date | null>(
    new Date(event.eventTime)
  );
  const [location, setLocation] = React.useState(event.location);
  const [exclusiveForActiveMembers, setExclusiveForActiveMembers] =
    React.useState(event.exclusiveForActiveMembers);
  const [activeMembersGetFirst, setActiveMembersGetFirst] = React.useState(
    event.activeMembersGetFirst
  );
  const [isOnline, setIsOnline] = React.useState(event.isOnline);
  const [maxParticipant, setMaxParticipant] = React.useState(
    event.maxParticipant
  );
  const [releaseTime, setReleaseTime] = React.useState<Date | null>(
    new Date(event.releaseTime)
  );
  const [closeTime, setCloseTime] = React.useState<Date | null>(
    new Date(event.closeTime)
  );
  const [reqPhoneNo, setReqPhoneNo] = React.useState(event.reqPhoneNo);
  const [reqFaculty, setReqFaculty] = React.useState(event.reqFaculty);
  const [reqSchoolNo, setReqSchoolNo] = React.useState(event.reqSchoolNo);
  const [reqMajoring, setReqMajoring] = React.useState(event.reqMajoring);
  const [reqGrade, setReqGrade] = React.useState(event.reqGrade);
  const [participants, setParticipants] = React.useState(
    event.expand?.participants || []
  );

  const [loading, setLoading] = React.useState(false);

  const updateStates = () => {
    setDescription(event.description);
    setName(event.name);
    setEventTime(new Date(event.eventTime));
    setLocation(event.location);
    setExclusiveForActiveMembers(event.exclusiveForActiveMembers);
    setActiveMembersGetFirst(event.activeMembersGetFirst);
    setIsOnline(event.isOnline);
    setMaxParticipant(event.maxParticipant);
    setReleaseTime(new Date(event.releaseTime));
    setCloseTime(new Date(event.closeTime));
    setReqPhoneNo(event.reqPhoneNo);
    setReqFaculty(event.reqFaculty);
    setReqSchoolNo(event.reqSchoolNo);
    setReqGrade(event.reqGrade);
    setParticipants(event.expand?.participants || []);
  };

  const updateEvent = async () => {
    // TODO: Go back to admin events page after creation, keep while developing
    const pb_auth = Cookies.get("pb_auth");
    const data = new FormData();
    const patch_data = {
      name,
      description,
      location,
      eventTime,
      releaseTime,
      closeTime,
      maxParticipant,
      reqPhoneNo,
      reqFaculty,
      reqSchoolNo,
      reqGrade,
      isOnline,
      exclusiveForActiveMembers,
      activeMembersGetFirst,
      reqMajoring
    };
    data.append("data", JSON.stringify(event));
    console.log(data.get("data"));
    const res = await axios.patch("/api/events/" + event.id, patch_data, {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
      },
    });
    event = res.data;
    updateStates();
  };
  const removeUser = async (id: string) => {
    const pb_auth = Cookies.get("pb_auth");
    const res = await axios.delete(
      "/api/events/remove-participant/" + event.id + "?user_id=" + id,
      {
        headers: {
          cookie: `pb_auth=${pb_auth}`,
        },
      }
    );
    event = res.data;
    updateStates();
  };

  return (
    <div className="w-full flex sm:flex-row flex-col sm:justify-around justify-center sm:items-start items-center ">
      <form className="sm:w-1/3 w-11/12 flex flex-col gap-4 my-12">
        <Input
          type="text"
          label="Etkinlik Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Etkinlik adını giriniz."
          labelPlacement="outside"
        />
        <div>
          <label>Açıklama</label>
          <MDEditor
            value={description}
            onChange={(e) => {
              setDescription(e);
              console.log(e);
            }}
          />
        </div>

        <Input
          type="text"
          label="Etkinlik Lokasyonu"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Konumu giriniz."
          labelPlacement="outside"
        />

        {/* <DateTimePicker
          label="Kayıt Kapanış Zamanı"
          value={eventTime}
          onChange={(e) => setEventTime(e)}
        /> */}
        {/* 
            This could perhaps pose some issue ?
            what we do here is slice the string to remove the last character,
            since the last character is a Z, which is not accepted by the input.
        */}
        <Input
          type="datetime-local"
          label="Etkinlik Zamanı"
          value={eventTime
            ?.toISOString()
            .slice(0, eventTime?.toISOString().length - 8)}
          onChange={(e) => setEventTime(new Date(e.target.value))}
          placeholder="Etkinlik zamanını giriniz."
          labelPlacement="outside"
        />
        <hr className="w-full my-4" />
        <div className="w-full flex gap-4 flex-wrap">
          <Input
            type="datetime-local"
            label="Kayıt Açılış Zamanı"
            value={releaseTime
              ?.toISOString()
              .slice(0, releaseTime?.toISOString().length - 8)}
            onChange={(e) => setReleaseTime(new Date(e.target.value))}
            placeholder="Kayıt zamanını giriniz."
            labelPlacement="outside"
          />
          <Input
            type="datetime-local"
            label="Kayıt Kapanış Zamanı"
            value={closeTime
              ?.toISOString()
              .slice(0, closeTime?.toISOString().length - 8)}
            onChange={(e) => setCloseTime(new Date(e.target.value))}
            placeholder="Kayıt kapanış zamanını giriniz."
            labelPlacement="outside"
          />

          {/* <DateTimePicker
            label="Kayıt Açılış Zamanı"
            value={releaseTime}
            onChange={(e) => setReleaseTime(e)}
          />
          <DateTimePicker
            label="Kayıt Kapanış Zamanı"
            value={closeTime}
            onChange={(e) => setCloseTime(e)}
          /> */}
        </div>
        <div>
          <label>Katılımcı Sayısı</label>
          <Input
            type="number"
            min="1"
            max="1000"
            value={`${maxParticipant}`}
            onChange={(e) => setMaxParticipant(parseInt(e.target.value))}
            placeholder="Katılımcı sayısını giriniz."
          />
        </div>
        <Checkbox isSelected={isOnline} onValueChange={setIsOnline}>
          Online etkinlik
        </Checkbox>
        <div className="flex flex-wrap gap-4">
          <Checkbox
            isSelected={exclusiveForActiveMembers}
            onValueChange={setExclusiveForActiveMembers}
          >
            Aktif üyelere özel
          </Checkbox>
          <Checkbox
            isSelected={activeMembersGetFirst}
            onValueChange={setActiveMembersGetFirst}
          >
            Aktif üyelere erken erişim
          </Checkbox>
        </div>
        <div className="flex flex-wrap gap-4">
          <Checkbox isSelected={reqPhoneNo} onValueChange={setReqPhoneNo}>
            Telefon no gerekli
          </Checkbox>
          <Checkbox isSelected={reqSchoolNo} onValueChange={setReqSchoolNo}>
            Okul no gerekli
          </Checkbox>
          <Checkbox isSelected={reqFaculty} onValueChange={setReqFaculty}>
            Fakülte gerekli
          </Checkbox>
          <Checkbox isSelected={reqMajoring} onValueChange={setReqMajoring}>
            Bölüm Gerekli
          </Checkbox>
          <Checkbox isSelected={reqGrade} onValueChange={setReqGrade}>
            Sınıf gerekli
          </Checkbox>
        </div>
        <button
          type="submit"
          disabled={loading}
          onClick={async (e) => {
            e.preventDefault();
            try {
              setLoading(true);
              await updateEvent();
              setLoading(false);
            } catch (error) {
              console.log(error);
              setLoading(false);
            }
          }}
          className="disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2 w-full border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
        >
          {loading ? <Spinner /> : "Etkinlik Güncelle"}
        </button>
      </form>
      <div className="flex flex-col overflow-y-auto items-center gap-4 p-4 min-h-screen sm:w-1/3 w-11/12 my-12 bg-zinc-600/30 rounded-md">
        <h2 className="text-2xl">
          Katılımcılar {participants.length}/{event.maxParticipant}
        </h2>
        {participants.map((item) => {
          return (
            <button
              key={item.id}
              className="w-full flex flex-col group p-2 bg-zinc-500/20 hover:bg-rose-600/30 rounded-md"
              onClick={() => {
                removeUser(item.id);
              }}
            >
              <div className="flex w-full justify-between items-center">
                <p>{item.name}</p>
                <span className="invisible group-hover:visible">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
                </span>
              </div>
              <div className="text-sm text-zinc-400 text-left">
                <p>{item.phoneNo}</p>
                <p>{item.schoolNo}</p>
                <p>{item.faculty}</p>
                <p>{item.grade}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CreateEventPage;
