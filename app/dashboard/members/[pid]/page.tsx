"use client";
import { Commitee } from "@/types/comitee";
import { Member } from "@/types/member";
import { Input, Select, SelectItem, Skeleton, Textarea } from "@nextui-org/react";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = ({ params }: { params: { pid: string } }) => {
  const [member, setMember] = React.useState<Member | null>(null);
  const [commitees, setCommitees] = React.useState<Commitee[]>([]);

  const [image, setImage] = React.useState<File | null>(null);
  const [name, setName] = React.useState<string | null>(null);
  const [linkedin, setLinkedin] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState<string | null>(null);
  const [error, setError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [comitee, setComitee] = React.useState<string | null>(null);

  useEffect(() => {
    const router = useRouter();
    const getCommitees = async () => {
      const res = await axios.get<any, AxiosResponse<Commitee[]>>(
        `/api/committees`
      );
      res.data && setCommitees(res.data);
      console.log(res.data);
    };
    const getMember = async () => {
      const res = await axios.get<any, AxiosResponse<Member>>(
        `/api/members/${params.pid}`
      );
      console.log(res.data);
      res.data && setMember(res.data);
      setName(res.data.name);
      setLinkedin(res.data.linkedin);
      setDescription(res.data.bio);
      console.log(res.data);
      router.push("/dashboard/members");
      router.refresh();
    };
    getCommitees();
    getMember();
  }, []);

  const onUpdate = async () => {
    const pb_auth = Cookies.get("pb_auth");

    const data = new FormData();
    if (name) data.append("name", name!);
    if (linkedin) data.append("linkedin", linkedin!);
    if (description) data.append("bio", description!);
    if (image) data.append("picture", image!);
    if (comitee) data.append("committee", comitee!);

    console.log(data);
    const res = await axios.patch("/api/members/" + params.pid, data, {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };
  return (
    <>
      {
        member ? (
          <div className="flex flex-col gap-8 items-center py-12">
            <h1 className="text-4xl font-bold text-center">
              {member?.name}
              {" Kişisini Güncelle"}
            </h1>
            <form className="sm:w-1/3 w-11/12 flex flex-col gap-4">
              <Input
                
                name="name"
                label="Ad Soyad"
                placeholder="Üyenin adını ve soyadını giriniz."
                value={name!}
                onValueChange={setName}
              />

              <Input
                
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
                value={linkedin!}
                placeholder="Üyenin LinkedIn adresini giriniz."
                
                onValueChange={setLinkedin}
              />

              <Textarea
                label="Açıklama (opsiyonel)"
                placeholder="Üyenin özgeçmişini vb. giriniz."
                value={description!}
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
                    await onUpdate();
                    setLoading(false);
                  } catch (error) {
                    alert("There was an error. Member is not updated.");
                    console.log(error);
                  }
                }}
              >
                İdari Kurul Üyesini Güncelle
              </button>
            </form>
          </div>
        )
        :
        (
          <div className="flex flex-col gap-8 items-center py-12">
            <Skeleton className="sm:w-1/3 w-11/12 h-8 rounded-md">
            </Skeleton>
            <div className="sm:w-1/3 w-11/12 flex flex-col gap-4">
              <Skeleton className="rounded-md h-14" />
              <Skeleton className="rounded-md h-14"/>
              <Skeleton className="rounded-md h-14"/>
              <Skeleton className="rounded-md h-14"/>
              <Skeleton className="rounded-md h-24"/>
              <Skeleton className="rounded-md h-14"/>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Page;
