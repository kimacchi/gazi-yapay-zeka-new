import React from "react";
import Link from "next/link";
import { useUserContext } from "@/app/UserContext";
import { UserContext_ } from "@/types/user";
import PocketBase, { AuthModel, RecordModel } from "pocketbase";
import { cookies } from "next/headers";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import HeaderLinks from "./HeaderLinks";

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

const isAdmin = true;

const Header = () => {
  // TODO: check the store instead of pb (if it couses problems in production)
  const token = cookies().get("pb_auth")?.value;
  pb.authStore.loadFromCookie(token || "");

  // console.log(pb.authStore.model, "sadfasdf");

  const getLinks = (): Array<{ url: string; title: string }> => {
    interface AuthModel_ extends RecordModel {
      admin: boolean;
    }
    const model = pb.authStore.model as AuthModel_ | null;

    // console.log(model, pb.authStore.model)
    if (pb.authStore.model) {
      // ! NOT CHECKING IF THE USER IS ADMIN
      if (model?.admin) {
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
    return [];
  };

  return (
    <div className="w-full flex items-center justify-between p-4">
      <Link className="w-8 h-8 rounded-full" href="/dashboard">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-house-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
          <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
        </svg>
      </Link>
      <div className="hidden sm:gap-6 md:flex">
        {getLinks().map((link) => (
          <Link href={link.url} key={link.url}>
            {link.title}
          </Link>
        ))}
      </div>
      <div className="md:hidden block">
        <HeaderLinks data={getLinks()} />
      </div>
      <div className="w-8 h-8 rounded-full hover:cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
      </div>
    </div>
  );
};

export default Header;
