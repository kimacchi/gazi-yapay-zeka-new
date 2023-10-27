"use client";

import { Input } from "@nextui-org/react";
import MDEditor from "@uiw/react-md-editor";
import React from "react";

const CreateEventPage = () => {
  const [description, setDescription] = React.useState<string | undefined>(
    `### **Etkinlik Açıklaması**

Burada etkinlik açıklamasını giriniz.
    
[KONUM](https://www.google.com/)
    
_Çeşitli stiller deneyebilirsiniz._`
  );
  const [name, setName] = React.useState("");
  const [eventTime, setEventTime] = React.useState(new Date());
  const [location, setLocation] = React.useState("");
  const [exclusiveForActiveMembers, setExclusiveForActiveMembers] =
    React.useState(false);
  const [notExclusiveForActiveMembers, setNotExclusiveForActiveMembers] =
    React.useState(false);
  const [isOnline, setIsOnline] = React.useState(false);
  const [maxParticipant, setMaxParticipant] = React.useState(100);
  const [releaseTime, setReleaseTime] = React.useState(new Date());
  const [closeTime, setCloseTime] = React.useState(new Date());
  const [reqPhoneNo, setReqPhoneNo] = React.useState(false);
  const [reqFaculty, setReqFaculty] = React.useState(false);
  const [reqSchoolNo, setReqSchoolNo] = React.useState(false);
  const [reqGrade, setReqGrade] = React.useState(false);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form className="w-1/3 flex flex-col gap-4">
        <Input
          type="text"
          label="name"
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
          label="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Konumu giriniz."
          labelPlacement="outside"
        />
        {/* NOT FORMATTING CORRECTLY */}
        <Input
          type="datetime-local"
          label="Etkinlik Zamanı"
          value={eventTime.toString()}
          onChange={(e) => setEventTime(new Date(e.target.value))}
          placeholder="Katılımcı sayısını giriniz."
          labelPlacement="outside"
        />
        
        {/*
            <input>maxParticipant</input> *
            <input>isOnline</input> *
            <input>eventTime</input> *
            <input>exclusiveFormActiveMembers</input> *
            <input>notExclusiveFormActiveMembers</input> *
            <input>closeTime</input> *
            <input>reqPhoneNo</input>
            <input>reqSchoolNo</input>
            <input>reqFaculty</input>
            <input>reqGrade</input> */}
      </form>
    </div>
  );
};

export default CreateEventPage;
