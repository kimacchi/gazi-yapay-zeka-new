"use client";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Checkbox, Input } from "@nextui-org/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import axios from "axios";

const CreateEventPage = () => {
  const [description, setDescription] = React.useState<string | undefined>(
    `### **Etkinlik Açıklaması**

Burada etkinlik açıklamasını giriniz.
    
[KONUM](https://www.google.com/)
    
_Çeşitli stiller deneyebilirsiniz._`
  );
  const [name, setName] = React.useState("");
  const [eventTime, setEventTime] = React.useState<Date | null>(new Date());
  const [location, setLocation] = React.useState("");
  const [exclusiveForActiveMembers, setExclusiveForActiveMembers] =
    React.useState(false);
  const [notExclusiveForActiveMembers, setNotExclusiveForActiveMembers] =
    React.useState(false);
  const [isOnline, setIsOnline] = React.useState(false);
  const [maxParticipant, setMaxParticipant] = React.useState(100);
  const [releaseTime, setReleaseTime] = React.useState<Date | null>(new Date());
  const [closeTime, setCloseTime] = React.useState<Date | null>(new Date());
  const [reqPhoneNo, setReqPhoneNo] = React.useState(false);
  const [reqFaculty, setReqFaculty] = React.useState(false);
  const [reqSchoolNo, setReqSchoolNo] = React.useState(false);
  const [reqGrade, setReqGrade] = React.useState(false);

  const [loading, setLoading] = React.useState(false);


  const createEvent = async () => {
    const data = new FormData();
    const event = {
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
      notExclusiveForActiveMembers,
    };
    data.append("data", JSON.stringify(event));
    console.log(data.get("data"));
    const res = await axios.post("/api/events/", event);
    console.log(res.data);
  };

  return (
    <div className="w-full flex justify-center items-center ">
      <form className="sm:w-1/3 w-3/4 flex flex-col gap-4 my-12">
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
        <Checkbox>Online etkinlik</Checkbox>
        <div className="flex flex-wrap gap-4">
          <Checkbox>Aktif üyelere özel</Checkbox>
          <Checkbox>Aktif üyelere erken erişim</Checkbox>
        </div>
        <div className="flex flex-wrap gap-4">
          <Checkbox>Telefon no gerekli</Checkbox>
          <Checkbox>Okul no gerekli</Checkbox>
          <Checkbox>Fakülte gerekli</Checkbox>
          <Checkbox>Sınıf gerekli</Checkbox>
        </div>
        <button
          type="submit"
          // disabled={loading}
          onClick={async (e) => {
            e.preventDefault();
            setLoading(true);
            await createEvent();
            setLoading(false);
          }}
          className="text-xl mt-2 w-full border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
        >
          Etkinlik Oluştur
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
