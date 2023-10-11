
import SignupForm from "@/components/SignupForm";
import React from "react";
import axios from "axios";
import { Metadata } from "next";
import ReturnMainPage from "@/components/ReturnMainPage";

export const metadata: Metadata = {
  title: "Kayıt Ol - Gazi Yapay Zeka",
  description: "Gazi Üniversitesi Yapay Zeka Topluluğu Kayıt Sayfası",
  keywords:
    "gazi üniversitesi,gazi üniversitesi mühendislik fakültesi,gazi üniversitesi topluluk,yapay zeka,yapay zeka topluluğu,gazi üniversitesi yapay zeka,gazi üniversitesi yapay zeka topluluğu,gazi yapay zeka,gazi yapay zeka topluluğu,gazi ai,gazi ai topluluğu,gazi artificial intelligence,gazi artificial intelligence topluluğu,gazi artificial intelligence society,yapay zekâ,gazi üniversitesi,gazi,gazi üni,topluluk,makine öğrenmesi,yapay zeka ve makine öğrenmesi,gazi yapay zeka yönetim sistemi,gazi yapay zeka login,yapay zeka login,yapay zeka haberleri,yapay zeka yönetim sistemi, Kayıt ol, Gazi Yapay Zeka Kayıt Sayfası, Yapay Zeka Kayıt Sayfası, Yapay Zeka Kayıt, Gazi Yapay Zeka Kayıt, Gazi Yapay Zeka Kayıt Sayfası, Gazi Yapay Zeka Kayıt Ol, Gazi Yapay Zeka Kayıt",
  robots: "index, follow",
};

const Signup = () => {

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <ReturnMainPage />
      <h1 className="text-3xl font-bold">Gazi Yapay Zeka</h1>
      <SignupForm  />
    </div>
  );
};

export default Signup;
