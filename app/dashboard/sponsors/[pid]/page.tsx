"use client";
import { Sponsor } from "@/types/sponsor";
import { Input, Select, SelectItem } from "@nextui-org/react";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { pid: string } }) => {
  const router = useRouter();

  console.log(params.pid);

  const [data, setData] = useState<Sponsor | null>(null);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [picture, setPicture] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const pb_auth = Cookies.get("pb_auth");
      const res = await axios.get<any, AxiosResponse<Sponsor>>(
        `/api/sponsors/${params.pid}`,
        {
          headers: {
            cookie: `pb_auth=${pb_auth}`,
          },
        }
      );
      setData(res.data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCategory(data.category);
      // setPicture(data.picture);
    }
  }, [data]);


  const onSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    if (picture) {
      formData.append("picture", picture);
    }
    const res = axios.patch("/api/sponsors/"+ params.pid, formData, {
      headers:{
        cookie: `pb_auth=${Cookies.get("pb_auth")}`,
        "Content-Type": "application/form-data"
      }
    })
    router.push("/dashboard/sponsors");
    router.refresh()
  }
  const onDelete = async () => {
    const res = axios.delete("/api/sponsors/"+ params.pid, {
      headers:{
        cookie: `pb_auth=${Cookies.get("pb_auth")}`,
        "Content-Type": "application/form-data"
      }
    })
    router.push("/dashboard/sponsors");
    router.refresh()
  }

  return (
    <>
      {data && (
        <div className="w-full flex flex-col items-center py-12 ">
          <div className="flex flex-col gap-6 sm:w-1/3 w-11/12">
            <h1 className="text-3xl text-center">
              {data.name} Sponsorunu Güncelle
            </h1>
            <Input
              label="Sponsor Adı"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <Select
              label="Kategori"
              placeholder={category}
              selectedKeys={category ? [category] : []}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <SelectItem key="emerald" value="emerald">
                <p className="text-emerald-300">Emerald</p>
              </SelectItem>
              <SelectItem key="diamond" value="diamond">
                <p className="text-cyan-400">Diamond</p>
              </SelectItem>
              <SelectItem key="platinum" value="platinum">
                <p className="text-gray-200">Platinum</p>
              </SelectItem>
              <SelectItem key="gold" value="gold">
                <p className="text-yellow-400">Gold</p>
              </SelectItem>
              <SelectItem key="silver" value="silver">
                <p className="text-zinc-500">Silver</p>
              </SelectItem>
              <SelectItem key="bronze" value="bronze">
                <p className="text-amber-800">Bronze</p>
              </SelectItem>
            </Select>
            <Input
              type="file"
              label="Fotoğraf"
              accept="image/*"
              placeholder="Üyenin fotoğrafını ekleyiniz."
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setPicture(files[files.length - 1]);
                }
              }}
            />
            <button
              disabled={loading}
              className="disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2 w-full border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
              onClick={async () => {
                try {
                  setLoading(true);
                  await onSubmit();
                  setLoading(false);
                } catch (error) {
                  alert("There was an error. Sponsor is not created.");
                  console.log(error);
                }
              }}
            >
              Sponsoru Değiştir
            </button>

            <button
              disabled={loading}
              className="disabled:cursor-not-allowed disabled:border-red-800/50 disabled:text-red-800/50 disabled:hover:bg-red-800/50 disabled:hover:text-neutral-900 text-xl mt-2 w-full border-4 font-extrabold p-4 tracking-widest rounded-md border-rose-800 transition-all hover:bg-rose-800 hover:text-neutral-900 text-rose-500"
              onClick={async () => {
                try {
                  setLoading(true);
                  await onDelete();
                  setLoading(false);
                } catch (error) {
                  alert("There was an error. Sponsor is not created.");
                  console.log(error);
                }
              }}
            >
              Sponsoru Sil
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
