"use client"

import SignupForm from "@/components/SignupForm";
import React from "react";
import axios from "axios";
import { Metadata } from "next";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Kayıt Ol - Gazi Yapay Zeka",
  description: "Gazi Üniversitesi Yapay Zeka Topluluğu Kayıt Sayfası",
  keywords:
    "gazi üniversitesi,gazi üniversitesi mühendislik fakültesi,gazi üniversitesi topluluk,yapay zeka,yapay zeka topluluğu,gazi üniversitesi yapay zeka,gazi üniversitesi yapay zeka topluluğu,gazi yapay zeka,gazi yapay zeka topluluğu,gazi ai,gazi ai topluluğu,gazi artificial intelligence,gazi artificial intelligence topluluğu,gazi artificial intelligence society,yapay zekâ,gazi üniversitesi,gazi,gazi üni,topluluk,makine öğrenmesi,yapay zeka ve makine öğrenmesi,gazi yapay zeka yönetim sistemi,gazi yapay zeka login,yapay zeka login,yapay zeka haberleri,yapay zeka yönetim sistemi, Kayıt ol, Gazi Yapay Zeka Kayıt Sayfası, Yapay Zeka Kayıt Sayfası, Yapay Zeka Kayıt, Gazi Yapay Zeka Kayıt, Gazi Yapay Zeka Kayıt Sayfası, Gazi Yapay Zeka Kayıt Ol, Gazi Yapay Zeka Kayıt",
  robots: "index, follow",
};

const Signup = () => {
  const route = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <button className="hover:scale-110 transition-all" onClick={() => {
        route.push("/")
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          className="bi bi-arrow-left-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
        </svg>
      </button>
      <h1 className="text-3xl font-bold">Gazi Yapay Zeka</h1>
      <SignupForm  />
    </div>
  );
};

export default Signup;
