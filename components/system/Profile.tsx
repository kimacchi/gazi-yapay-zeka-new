"use client"

import { UserContext_ } from "@/types/user";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { RecordModel } from "pocketbase";
import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AuthModel_ extends RecordModel {
  id: string;
  username: string;
  email: string;
  name: string;
  admin: boolean;
  picture: any;
  activeMember: boolean;
  token: string;
  phoneNo: string;
  schoolNo: string;
  faculty: string;
  grade:
    | "Hazırlık"
    | "1. Sınıf"
    | "2. Sınıf"
    | "3. Sınıf"
    | "4. Sınıf"
    | "5. Sınıf"
    | "6. Sınıf"
    | "Yüksek Lisans"
    | "Doktora"
    | "";
}

const Profile = ({ user }: { user: AuthModel_ | null }) => {

    const router = useRouter();
    const logout = async () => {
        Cookies.remove("pb_auth");
        router.push("/");
    }

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <button>
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
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownSection title="Profilim">
            <DropdownItem key="profile" className="" onClick={() => {
              router.push("/dashboard/profile");
            }}>
              Profilim
            </DropdownItem>
            
          </DropdownSection>
          <DropdownSection title="Diğer işlemler">
            <DropdownItem key="main_menu" className="text-cyan-600" onClick={() => {
              router.push("/");
            }}>
              Ana Sayfaya Dön
            </DropdownItem>
            <DropdownItem key="logout" className="text-danger" color="danger" onClick={logout}>
              Çıkış Yap
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default Profile;
