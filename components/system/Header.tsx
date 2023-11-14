import React from "react";
import Link from "next/link";
import { useUserContext } from "@/app/UserContext";
import pb from "@/controllers/pocketbase";
import { UserContext_ } from "@/types/user";
import { AuthModel, RecordModel } from "pocketbase";

const isAdmin = true;

const Header = () => {
  // TODO: check the store instead of pb (if it couses problems in production)

  console.log(pb.authStore.model, "sadfasdf");

  const getLinks = (): Array<{ url: string; title: string }> => {
    interface AuthModel_ extends RecordModel {
      admin: boolean;
    }
    const model = pb.authStore.model as AuthModel_ | null;

    if (pb.authStore.model) {
      // ! NOT CHECKING IF THE USER IS ADMIN
      if (model) {
        return [
          { url: "/dashboard/events", title: "Etkinlik Yönetimi" },
          { url: "/dashboard/users", title: "Üye Yönetimi" },
          { url: "/dashboard/committees", title: "Komiteler" },
          { url: "/dashboard/members", title: "İdari Kurul Yönetimi" },
          { url: "/dashboard/sponsors", title: "Sponsor Yönetimi" },
          { url: "/dashboard/blogs", title: "Bloglar" },
        ];
      }
    }
    return [
      { url: "/dashboard/events", title: "Etkinlik Yönetimi" },
      { url: "/dashboard/users", title: "Üye Yönetimi" },
      { url: "/dashboard/committees", title: "Komiteler" },
      { url: "/dashboard/members", title: "İdari Kurul Yönetimi" },
      { url: "/dashboard/sponsors", title: "Sponsor Yönetimi" },
      { url: "/dashboard/blogs", title: "Bloglar" },
    ];
  };

  return (
    <div className="w-full flex items-center justify-between p-4">
      <Link className="w-8 h-8 bg-slate-300 rounded-full" href="/dashboard"></Link>
      <div className="hidden sm:gap-6 sm:flex ">
        {getLinks().map((link) => (
          <Link href={link.url} key={link.url}>
            {link.title}
          </Link>
        ))}
      </div>
      <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
    </div>
  );
};

export default Header;
