"use client";
import { Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";

const Page = () => {
  const pb_auth = Cookies.get("pb_auth");

  const [image, setImage] = React.useState<File | null>(null);
  const [name, setName] = React.useState<string | null>(null);
  const [category, setCategory] = React.useState<
    "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond" | "Emerald" | null
  >(null);

  const onCreate = async () => {
    const data = new FormData();
    data.append("name", name!);
    data.append("picture", image!);
    data.append("category", category!.toLowerCase());

    const res = await axios.post("/api/sponsors", data, {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div className="w-full flex items-center flex-col">
      <div className="sm:w-1/3 w-11/12 flex flex-col items-center gap-4 mt-12">
        <h1 className="text-4xl font-bold text-center">Sponsor Ekle</h1>
        <Input
          isRequired
          name="name"
          label="Sponsor Adı"
          placeholder="Sponsor firmanın adını girin."
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
              setImage(files[files.length - 1]);
            }
          }}
        />
        <Select
          label="Komite"
          placeholder="Üyenin atanacağı komite"
          selectedKeys={category ? [category] : []}
          onChange={(e) => {
            setCategory(e.target.value as "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond" | "Emerald");
          }}
        >
          <SelectItem key="Emerald" value="Emerald" >
            <p className="text-emerald-300">Emerald</p>
          </SelectItem>
          <SelectItem key="Diamond" value="Diamond" >
            <p className="text-cyan-400">Diamond</p>
          </SelectItem>
          <SelectItem key="Platinum" value="Platinum" >
            <p className="text-gray-200">Platinum</p>
          </SelectItem>
          <SelectItem key="Gold" value="Gold" >
            <p className="text-yellow-400">Gold</p>
          </SelectItem>
          <SelectItem key="Silver" value="Silver" >
            <p className="text-zinc-500">Silver</p>
          </SelectItem>
          <SelectItem key="Bronze" value="Bronze" >
            <p className="text-amber-800">Bronze</p>
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};

export default Page;
