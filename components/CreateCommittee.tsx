"use client";
import { Checkbox, Input } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useRouter } from "next/navigation";

const CreateCommittee = () => {
  const router = useRouter();
  const [name, setName] = React.useState<string | null>(null);
  const [onMainPage, setOnMainPage] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onCreate = async () => {
    const res = await axios.post(
      "/api/committees",
      {
        committeeName: name,
        onFrontPage: onMainPage,
      },
      {
        headers: { cookie: `pb_auth=${Cookies.get("pb_auth")}` },
      }
    );
      console.log(res)
    // if (res.status === 200) {
      router.push("/dashboard/committees");
      router.refresh();
      setLoading(false);
  };
  return (
    <div className="flex flex-col gap-4 sm:w-1/3 w-11/12">
      <Input
        isRequired
        name="name"
        label="Komite Adı"
        placeholder="Komitenin adını giriniz."
        onValueChange={setName}
      />
      <Checkbox isSelected={onMainPage} onValueChange={setOnMainPage}>
        Ana sayfada görüntülensin.
      </Checkbox>
      <button
        disabled={loading}
        className="disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2 w-full border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
        onClick={async () => {
          try {
            setLoading(true);
            await onCreate();
            
          } catch (error) {
            alert("There was an error. Committee is not created.");
            console.log(error);
          }
        }}
      >
        Komite Oluştur
      </button>
    </div>
  );
};

export default CreateCommittee;
