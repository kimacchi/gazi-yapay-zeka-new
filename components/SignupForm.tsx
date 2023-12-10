"use client";

import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/UserContext";
import Link from "next/link";

const SignupForm = () => {
  // const {user, setUser} = useUserContext();

  
  const route = useRouter();
  // useEffect(() => {
  //   if(user){
  //     route.push("/dashboard");
  //   }
  //   console.log(user)
  // }, [user]);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const [nameTooltip, setNameTooltip] = useState(false);
  const [usernameTooltip, setUsernameTooltip] = useState(false);
  const [passwordTooltip, setPasswordTooltip] = useState(false);
  const [passwordConfirmTooltip, setPasswordConfirmTooltip] = useState(false);

  const [inProgress, setInProgress] = useState(false);

  const [error, setError] = useState<{
    error: boolean;
    messages: string[];
  }>({
    error: false,
    messages: [],
  });

  const [criticalError, setCriticalError] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    // this is responsible for the signup process

    setInProgress(true);

    try {
      const res = await axios.post("api/users/signup", {
        email: email.trim(),
        username: username.trim(),
        password: password.trim(),
        passwordConfirm: passwordConfirm.trim(),
        name: name.trim(),
      });

      setInProgress(false);

      if (!res.data.error) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          route.push("/");
        }, 7000);
      } else {
        console.log(res.data);
        const messages: string[] = [];

        if (res.data.error.originalError.data.data.password)
          messages.push(
            res.data.error.originalError.data.data.password.message
          );
        if (res.data.error.originalError.data.data.email)
          messages.push(res.data.error.originalError.data.data.email.message);
        if (res.data.error.originalError.data.data.username)
          messages.push(
            "Username " +
              res.data.error.originalError.data.data.username.message
          );
        if (res.data.error.originalError.data.data.passwordConfirm)
          messages.push(
            "Confirmation password " +
              res.data.error.originalError.data.data.passwordConfirm.message
          );

        setError({
          error: true,
          messages: messages,
        });
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-6">
      <Modal
        isOpen={success}
        onOpenChange={(e) => {
          setSuccess(e);
        }}
        placement="center"
      >
        <ModalContent className="bg-emerald-800">
          <ModalHeader>Kayıt olma başarılı!</ModalHeader>
          <ModalBody>
            <p>
              Başarıyla kayıt oldunuz! Sitemiz şu an yapım aşamasındadır,
              yakında ayrılacıklara ulaşmak için tekrar görüşeceğiz!
            </p>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={criticalError}
        onOpenChange={(e) => {
          setCriticalError(e);
        }}
      >
        <ModalContent className="bg-rose-800">
          <ModalHeader>Kayıt olma başarısız!</ModalHeader>
          <ModalBody>
            <p>
              Beklenmedik bir problem oluştu. Lütfen daha sonra tekrar deneyin,
              problem devam ederse bize ulaşın.
            </p>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      {error.error ? (
        <div className=" bg-rose-800 opacity-80 p-2 rounded-md sm:w-96 w-72">
          <p>Hata!!</p>
          <hr></hr>
          <ul>
            {error.messages.map((message, idx) => {
              return (
                <li className="text-xs p-1" key={idx}>
                  {message}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <form className="flex flex-col gap-6">
        <Tooltip
          content="Aralarında boşluk olacak şekilde isim soyisim giriniz."
          placement="top"
          isOpen={nameTooltip}
          onOpenChange={(e) => setNameTooltip(e)}
          className="bg-fuchsia-900"
        >
          <input
            onKeyDown={async (e) => {
              if (e.key === "Enter") await handleSubmit();
            }}
            className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="İsminiz ve Soyisminiz..."
            onFocus={() => setNameTooltip(true)}
          />
        </Tooltip>
        <input
          onKeyDown={async (e) => {
            if (e.key === "Enter") await handleSubmit();
          }}
          className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="E-posta adresiniz..."
        />
        <Tooltip
          content="Özel karakter, boşluk vb. karakter içermeyen bir kullanıcı adı giriniz."
          placement="top"
          className="bg-fuchsia-900"
          isOpen={usernameTooltip}
          onOpenChange={(e) => setUsernameTooltip(e)}
        >
          <input
            onKeyDown={async (e) => {
              if (e.key === "Enter") await handleSubmit();
            }}
            className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            onFocus={() => setUsernameTooltip(true)}
            placeholder="Kullanıcı adınız..."
          />
        </Tooltip>
        <Tooltip
          content="En az 8, en fazla 72 karakterden oluşacak ve özel karakter olmayacak şekilde bir şifre giriniz."
          placement="top"
          className="bg-fuchsia-900"
          isOpen={passwordTooltip}
          onOpenChange={(e) => setPasswordTooltip(e)}
        >
          <input
            onKeyDown={async (e) => {
              if (e.key === "Enter") await handleSubmit();
            }}
            className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            onFocus={() => setPasswordTooltip(true)}
            placeholder="Şifreniz"
          />
        </Tooltip>
        <Tooltip
          content="En az 8, en fazla 72 karakterden oluşacak ve özel karakter olmayacak şekilde bir şifre giriniz."
          placement="top"
          className="bg-fuchsia-900"
          isOpen={passwordConfirmTooltip}
          onOpenChange={(e) => setPasswordConfirmTooltip(e)}
        >
          <input
            onKeyDown={async (e) => {
              if (e.key === "Enter") await handleSubmit();
            }}
            className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type="password"
            onFocus={() => setPasswordConfirmTooltip(true)}
            placeholder="Şifrenizi onaylayın..."
          />
        </Tooltip>
        <Link href="/login" className="hover:underline">
          Giriş yap
        </Link> 
        <button
          className="text-xl sm:w-96 mt-2 w-72 border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
          onClick={handleSubmit}
          disabled={inProgress}
        >
          {inProgress ? <Spinner /> : "KAYIT OL"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
