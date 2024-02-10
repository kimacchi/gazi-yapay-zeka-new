"use client";
import { Commitee } from "@/types/comitee";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import React, { useEffect } from "react";

import PocketBase from "pocketbase";


const CreateMemberPage = () => {

  // const host = headers().get("host") === "localhost:3000" ? "http://localhost:3000" : `https://${headers().get("host")}`
  const [image, setImage] = React.useState<File | null>(null);
  const [name, setName] = React.useState<string | null>(null);
  const [linkedin, setLinkedin] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState<string | null>(null);
  const [error, setError] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [comitee, setComitee] = React.useState<string | null>(null);

  const [commitees, setCommitees] = React.useState<Commitee[]>([]);

  useEffect(() => {
    const getCommitees = async () => {
      const res = await axios.get<any, AxiosResponse<Commitee[]>>(
        `/api/committees`
      );
      res.data && setCommitees(res.data);
      console.log(res.data);
    };
    getCommitees();
  }, []);

  useEffect(() => {
    console.log(image, name, linkedin, comitee);
    if (image && name && linkedin && comitee) {
      setError(false);
    } else {
      setError(true);
    }
  }, [image, name, linkedin, description, comitee]);

  const onCreate = async () => {
    const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");


    const pb_auth = Cookies.get("pb_auth");

    const data = new FormData();
    data.append("name", name!);
    data.append("linkedin", linkedin!);
    if(description)
      data.append("bio", description!);
    data.append("picture", image!);
    data.append("committee", comitee!);

    for (var [key, value] of data.entries()) { 
      console.log(key, value);
    }
    console.log(data)
    const res = await axios.post("/api/members", data, {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };
  return (
    <div className="flex flex-col gap-8 items-center py-12">
      <h1 className="text-4xl font-bold text-center">İK Üyesi Ekle</h1>
      <form className="sm:w-1/3 w-11/12 flex flex-col gap-4">
        <Input
          isRequired
          name="name"
          label="Ad Soyad"
          placeholder="Üyenin adını ve soyadını giriniz."
          onValueChange={setName}
        />

        <Input
          isRequired
          name="email"
          type="file"
          label="Fotoğraf"
          placeholder="Üyenin fotoğrafını ekleyiniz."
          accept="image/*"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              setImage(files[0]);
            }
          }}
        />

        <Input
          name="linkedin"
          label="LinkedIn"
          placeholder="Üyenin LinkedIn adresini giriniz."
          isRequired
          onValueChange={setLinkedin}
        />

        <Textarea
          label="Açıklama (opsiyonel)"
          placeholder="Üyenin özgeçmişini vb. giriniz."
          // className="max-w-xs"
          name="description"
          onValueChange={setDescription}
        />
        <Select
          label="Komite"
          placeholder="Üyenin atanacağı komite"
          selectedKeys={comitee ? [comitee] : []}
          onChange={(e) => {
            setComitee(e.target.value);
          }}
        >
          {commitees.map((commitee, index) => {
            return (
              <SelectItem key={commitee.id} value={commitee.id}>
                {commitee.committeeName}
              </SelectItem>
            );
          })}
        </Select>
        <button
          disabled={loading || error}
          className="disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2 w-full border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
          onClick={async () => {
            try {
              setLoading(true);
              await onCreate();
              setLoading(false);
            } catch (error) {
              alert("There was an error. Member is not created.");
              console.log(error);
            }
          }}
        >
          İdari Kurul Üyesi Ekle
        </button>
      </form>
    </div>
  );
};



export default CreateMemberPage;

