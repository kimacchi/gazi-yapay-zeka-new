"use client";

import { UserContext_ } from "@/types/user";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const faculties = [
  "Diş Hekimliği Fakültesi",
  "Eczacılık Fakültesi",
  "Fen Fakültesi",
  "Gazi Eğitim Fakültesi",
  "Hemşirelik Fakültesi",
  "Mühendislik Fakültesi",
  "Mimarlık Fakültesi",
  "Sağlık Bilimleri Fakültesi",
  "Spor Bilimleri Fakültesi",
  "Teknoloji Fakültesi",
  "Tıp Fakültesi",
  "Uygulamalı Bilimler Fakültesi",
];

const all_majors = {
  "Diş Hekimliği Fakültesi": [
    "Klinik Bilimler",
    "Temel Bilimler",
    "Diğer Diş Hekimliği Bölümleri",
  ],
  "Eczacılık Fakültesi": [
    "Temel Eczacılık Bilimleri",
    "Eczacılık Meslek Bilimleri",
    "Eczacılık Teknolojisi",
    "Diğer Eczacılık Bölümleri",
  ],
  "Fen Fakültesi": [
    "Biyoloji",
    "Fizik",
    "Kimya",
    "Matematik",
    "İstatistik",
    "Diğer Fen Bölümleri",
  ],
  "Gazi Eğitim Fakültesi": [
    "Bilgisayar ve Öğretim Teknolojileri Eğitimi",
    "Eğitim Bilimleri",
    "Güzel Sanatlar Eğitimi",
    "Matematik ve Fen Bilimleri Eğitimi",
    "Özel Eğitim",
    "Temel Eğitim",
    "Türkçe ve Sosyal Bilimler Eğitimi",
    "Yabancı Diller Eğitimi",
    "Diğer Eğitim Bölümü",
  ],
  "Hemşirelik Fakültesi": [
    "Cerrahi Hastalıkları Hemşireliği Ana Bilim Dalı",
    "Çocuk Sağlığı ve Hastalıkları Hemşireliği Ana Bilim Dalı",
    "Doğum, Kadın Sağlığı ve Hastalıkları Hemşireliği Ana Bilim Dalı",
    "Halk Sağlığı Hemşireliği Ana Bilim Dalı",
    "Hemşirelik Esasları Ana Bilim Dalı",
    "Hemşirelikte Yönetim Ana Bilim Dalı",
    "İç Hastalıkları Hemşireliği Ana Bilim Dalı",
    "Ruh Sağlığı ve Hastalıkları Hemşireliği Ana Bilim Dalı",
    "Diğer Hemşirelik Bölümü",
  ],
  "Mühendislik Fakültesi": [
    "Bilgisayar Mühendisliği",
    "Elektrik-Elektronik Mühendisliği",
    "Endüstri Mühendisliği",
    "İnşaat Mühendisliği",
    "Makine Mühendisliği",
    "Kimya Mühendisliği",
    "Diğer Mühendislik Bölümü",
  ],
  "Mimarlık Fakültesi": [
    "Endüstriyel Tasarım",
    "Mimarlık",
    "Şehir ve Bölge Planlama",
    "Diğer Mimarlık Bölümü",
  ],
  "Sağlık Bilimleri Fakültesi": [
    "Beslenme ve Diyetetik",
    "Fizyoterapi ve Rehabilitasyon",
    "Hemşirelik (Hemşirelik Fakültesi)",
    "Odyoloji",
    "Dil ve Konuşma Terapisi",
    "Sosyal Hizmet",
    "Diğer Sağlık Bilimleri Bölümü",
  ],
  "Spor Bilimleri Fakültesi": [
    "Antrenörlük Eğitimi",
    "Beden Eğitimi ve Spor Öğretmenliği",
    "Rekreasyon",
    "Spor Yöneticiliği",
    "Diğer Spor Bilimleri Bölümü",
  ],
  "Teknoloji Fakültesi": [
    "Ağaçişleri Endüstri Mühendisliği",
    "Bilgisayar Mühendisliği",
    "Elektrik-Elektronik Mühendisliği",
    "Endüstriyel Tasarım Mühendisliği",
    "Enerji Sistemleri Mühendisliği",
    "İnşaat Mühendisliği",
    "İmalat Mühendisliği",
    "Metalurji ve Malzeme Mühendisliği",
    "Otomotiv Mühendisliği",
    "Diğer Teknoloji Bölümü",
  ],
  "Tıp Fakültesi": [
    "Temel Tıp Bilimleri",
    "Dahili Tıp Bilimleri",
    "Cerrahi Tıp Bilimleri",
    "Diğer Tıp Bölümü",
  ],
  "Uygulamalı Bilimler Fakültesi": [
    "Fotonik",
    "Yönetim Bilişim Sistemleri",
    "Diğer Uygulamalı Bilimler Bölümü",
  ],
} as any;

const ProfilePage = ({ user }: { user: UserContext_ }) => {
  let pb_auth = Cookies.get("pb_auth");

  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNo, setPhoneNo] = useState(user.phoneNo);
  const [schoolNo, setSchoolNo] = useState(user.schoolNo);
  const [faculty, setFaculty] = useState(user.faculty);
  const [grade, setGrade] = useState(user.grade);
  const [majoring, setMajoring] = useState(user.majoring);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [resetEmail, setResetEmail] = useState("");

  const sendResetEmail = async () => {
    try {
      const resetResponse = await axios.post<{
        error?: any;
        status?: number;
      }>(
        "/api/users/email_reset",
        {
          email: resetEmail.trim(),
        },
        {
          headers: {
            cookie: `pb_auth=${pb_auth}`,
          },
        }
      );
      if (resetResponse.data.error) {
        console.log("mail not sent.");
        console.log(resetResponse.data.error);
        alert("Bir hata oluştu. Lütfen tekrar deneyiniz.");
      } else {
        console.log("mail sent.");
        alert("E-posta değiştirme bağlantısı e-posta adresinize gönderildi.");
      }
      setResetEmail("");
    } catch (error) {
      throw error;
    }
  };

  const sendResetPassword = async () => {
    try {
      const resetResponse = await axios.post<{
        error?: any;
        status?: number;
      }>(
        "/api/users/password_reset",
        {
          email,
        },
        {
          headers: {
            cookie: `pb_auth=${pb_auth}`,
          },
        }
      );
      if (resetResponse.data.error) {
        console.log("mail not sent.");
        alert("Bir hata oluştu. Lütfen tekrar deneyiniz.");
      } else {
        console.log("mail sent.");
        alert("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
      }
      setResetEmail("");
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async () => {
    const res = await axios.patch(`/api/users/${user.id}`, {
        name,
        phoneNo,
        schoolNo,
        faculty,
        grade,
        majoring,
    })
    router.push("/dashboard")
  };

  return (
    <div className="w-full flex flex-col items-center py-12">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                E-posta adresinizi mi değiştirmek istiyorsunuz?
              </ModalHeader>
              <ModalBody>
                <p>
                  Aşağıdaki alana yeni e-posta adresinizi girip eski e-posta
                  adresinize gönderilecek bağlantıyı kullanarak e-posta
                  adresinizi kolaylıkla değiştirebilirsiniz.
                </p>
                <input
                  type="email"
                  className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
                  value={resetEmail}
                  placeholder="Yeni e-posta adresiniz"
                  onChange={(event) => setResetEmail(event.target.value)}
                />
              </ModalBody>
              <ModalFooter className="flex flex-col items-center">
                <Button color="primary" onPress={sendResetEmail}>
                  E-posta'mı değiştir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="sm:w-1/3 w-11/12 flex flex-col gap-4">
        <Input
          type="text"
          value={name}
          variant="underlined"
          onChange={(e) => setName(e.target.value)}
          placeholder="İsim ve soyisminizi giriniz"
          label="İsim Soyisim"
        />
        <div className="flex items-end gap-4">
          <Input
            isDisabled
            type="email"
            value={email}
            variant="underlined"
            placeholder="E-posta adresinizi giriniz"
            label="E-posta"
          />
          <Button size="sm" variant="light" color="primary" onPress={onOpen}>
            Değiştir
          </Button>
        </div>
        <div className="flex items-end gap-4">
          <Input
            isDisabled
            type="text"
            value="*********"
            variant="underlined"
            label="Şifreniz"
          />
          <Button
            size="sm"
            variant="light"
            color="primary"
            onPress={sendResetPassword}
          >
            Değiştir
          </Button>
        </div>
        <Divider />
        <Select
          label="Fakülteniz"
          labelPlacement="outside"
          placeholder="Fakülteniz"
          selectedKeys={faculty ? [faculty] : []}
          onChange={(e) => setFaculty(e.target.value)}
        >
          {faculties.map((faculty) => {
            return (
              <SelectItem
                value={faculty}
                key={faculty}
                onClick={() => {
                  setFaculty(faculty);
                }}
              >
                {faculty}
              </SelectItem>
            );
          })}
        </Select>
        <Select
          label="Bölümünüz"
          labelPlacement="outside"
          placeholder="Bölümünüz"
          selectedKeys={majoring ? [majoring] : []}
          onChange={(e) => setMajoring(e.target.value)}
        >
          {all_majors[faculty]?.map((major: any) => {
            return (
              <SelectItem
                value={major}
                key={major}
                onClick={() => {
                  setMajoring(major);
                }}
              >
                {major}
              </SelectItem>
            );
          })}
        </Select>
        <Select
          label="Sınıfınız"
          labelPlacement="outside"
          placeholder={"Sınıfınız"}
          selectedKeys={grade ? [grade] : []}
          onChange={(e) =>
            setGrade(
              e.target.value as
                | "Hazırlık"
                | "1. Sınıf"
                | "2. Sınıf"
                | "3. Sınıf"
                | "4. Sınıf"
                | "5. Sınıf"
                | "6. Sınıf"
                | "Yüksek Lisans"
                | "Doktora"
                | ""
            )
          }
        >
          <SelectItem
            value="Hazırlık"
            key="Hazırlık"
            onClick={() => {
              setGrade("Hazırlık");
            }}
          >
            Hazırlık
          </SelectItem>
          <SelectItem
            value="1. Sınıf"
            key="1. Sınıf"
            onClick={() => {
              setGrade("1. Sınıf");
            }}
          >
            1. Sınıf
          </SelectItem>
          <SelectItem
            value="2. Sınıf"
            key="2. Sınıf"
            onClick={() => {
              setGrade("2. Sınıf");
            }}
          >
            2. Sınıf
          </SelectItem>
          <SelectItem
            value="3. Sınıf"
            key="3. Sınıf"
            onClick={() => {
              setGrade("3. Sınıf");
            }}
          >
            3. Sınıf
          </SelectItem>
          <SelectItem
            value="4. Sınıf"
            key="4. Sınıf"
            onClick={() => {
              setGrade("4. Sınıf");
            }}
          >
            4. Sınıf
          </SelectItem>
          <SelectItem
            value="5. Sınıf"
            key="5. Sınıf"
            onClick={() => {
              setGrade("5. Sınıf");
            }}
          >
            5. Sınıf
          </SelectItem>
          <SelectItem
            value="6. Sınıf"
            key="6. Sınıf"
            onClick={() => {
              setGrade("6. Sınıf");
            }}
          >
            6. Sınıf
          </SelectItem>
          <SelectItem
            value="Yüksek Lisans"
            key="Yüksek Lisans"
            onClick={() => {
              setGrade("Yüksek Lisans");
            }}
          >
            Yüksek Lisans
          </SelectItem>
          <SelectItem
            value="Doktora"
            key="Doktora"
            onClick={() => {
              setGrade("Doktora");
            }}
          >
            Doktora
          </SelectItem>
        </Select>
        <Input
          type="text"
          label="Telefon numaranız"
          value={phoneNo}
          onChange={(e) => {
            setPhoneNo(e.target.value);
            console.log(phoneNo);
          }}
          placeholder="+90 555 555 55 55"
          labelPlacement="outside"
        />
        <Input
          type="text"
          label="Okul numaranız"
          value={schoolNo}
          onChange={(e) => setSchoolNo(e.target.value)}
          placeholder="Okul numaranızı giriniz."
          labelPlacement="outside"
        />
        <button
          onClick={updateProfile}
          className="disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2 w-full border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
