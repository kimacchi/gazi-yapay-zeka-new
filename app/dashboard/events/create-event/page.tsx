"use client";

import { Checkbox, Input, Spinner } from "@nextui-org/react";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


const CreateEventPage = () => {

  const router = useRouter();

  const [description, setDescription] = React.useState<string | undefined>(
    `### **Etkinlik Açıklaması**

Burada etkinlik açıklamasını giriniz.
    
[KONUM](https://www.google.com/)
    
_Çeşitli stiller deneyebilirsiniz._`
  );
  const temp = new Date().toLocaleString("en-US", {timeZone: 'Asia/Almaty'});
  const [name, setName] = React.useState("");
  const [eventTime, setEventTime] = React.useState<Date | null>(new Date(temp));
  const [location, setLocation] = React.useState("");
  const [exclusiveForActiveMembers, setExclusiveForActiveMembers] =
    React.useState(false);
  const [activeMembersGetFirst, setActiveMembersGetFirst] =
    React.useState(false);
  const [isOnline, setIsOnline] = React.useState(false);
  const [maxParticipant, setMaxParticipant] = React.useState(100);
  const [releaseTime, setReleaseTime] = React.useState<Date | null>(new Date(temp));
  const [activeMemberReleaseTime, setActiveMemberReleaseTime] = React.useState<Date | null>(new Date(temp));
  const [closeTime, setCloseTime] = React.useState<Date | null>(new Date(temp));
  const [reqPhoneNo, setReqPhoneNo] = React.useState(false);
  const [reqFaculty, setReqFaculty] = React.useState(false);
  const [reqSchoolNo, setReqSchoolNo] = React.useState(false);
  const [reqGrade, setReqGrade] = React.useState(false);
  const [reqMajoring, setReqMajoring] = React.useState(false);
  const [exclusiveForBoard, setExclusiveForBoard] = React.useState(false);
  const [maxReserved, setMaxReserved] = React.useState(10);

  const [loading, setLoading] = React.useState(false);

  const createEvent = async () => {
    // TODO: Go back to admin events page after creation, keep while developing
    const pb_auth = Cookies.get("pb_auth")
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
      reqMajoring,
      reqGrade,
      isOnline,
      exclusiveForActiveMembers,
      activeMembersGetFirst,
      activeMemberReleaseTime,
      exclusiveForBoard,
      maxReserved
    };
    data.append("data", JSON.stringify(event));
    console.log(data.get("data"));
    const res = await axios.post("/api/events/", event, {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
      },
    });
    router.push("/dashboard/events");
    router.refresh()
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
          onChange={(e) => setEventTime(() => {
            let date = new Date(e.target.value)
            date.setHours(date.getHours() + 3)
            return date
          })}
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
            onChange={(e) => setReleaseTime(() => {
              let date = new Date(e.target.value)
              date.setHours(date.getHours() + 3)
              return date
            })}
            placeholder="Kayıt zamanını giriniz."
            labelPlacement="outside"
          />
          {
            activeMembersGetFirst &&
            <>
              <h2 className="text-rose-700">Aşağıdaki alanı değiştirmeyi unutmayın.</h2>
              <Input
                type="datetime-local"
                label="Aktif Üyeler İçin Kayıt Açılış Zamanı"
                value={activeMemberReleaseTime
                  ?.toISOString()
                  .slice(0, activeMemberReleaseTime?.toISOString().length - 8)}
                onChange={(e) => setActiveMemberReleaseTime(() => {
                  let date = new Date(e.target.value)
                  date.setHours(date.getHours() + 3)
                  return date
                })}
                placeholder="Kayıt zamanını giriniz."
                labelPlacement="outside"
              />
            </>
          }
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
        <div>
          <label>Yedek Katılımcı Sayısı</label>
          <Input
            type="number"
            min="0"
            max="1000"
            value={`${maxReserved}`}
            onChange={(e) => setMaxReserved(parseInt(e.target.value))}
            placeholder="Yedek Katılımcı sayısını giriniz."
          />
        </div>
        <Checkbox isSelected={isOnline} onValueChange={setIsOnline}>
          Online etkinlik
        </Checkbox>
        <div className="flex flex-wrap gap-4">
          <Checkbox
            isSelected={exclusiveForBoard}
            onValueChange={setExclusiveForBoard}
          >
            İdari kurula özel
          </Checkbox>
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
              await createEvent();
              setLoading(false);
            } catch (error) {
              console.log(error);
              setLoading(false);
            }
          }}
          className="disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2 w-full border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
        >
          {loading ? <Spinner /> : "Etkinlik Oluştur"}
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
