"use client";

import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
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

const SignupForm = ({
  signUpAction,
}: {
  signUpAction: (
    email: string,
    username: string,
    password: string,
    passwordConfirm: string,
    name: string
  ) => Promise<AxiosResponse<any, any>>;
}) => {
  const route = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const [inProgress, setInProgress] = useState(false);

  const [error, setError] = useState<{
    error: boolean;
    messages: string[];
  }>({
    error: false,
    messages: [],
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    // this is responsible for the signup process

    setInProgress(true);

    const res = await axios.post("api/users/signup", {
      email,
      username,
      password,
      passwordConfirm,
      name,
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
      // ! for password res.data.error.originalError.data.data.password.message
      // ! for passwordConfirm res.data.error.originalError.data.data.password.message
      // ! for email res.data.error.originalError.data.data.email.message
      // ! for username res.data.error.originalError.data.data.username.message | "Must be in a valid format"
      const messages: string[] = [];

      if (res.data.error.originalError.data.data.password)
        messages.push(res.data.error.originalError.data.data.password.message);
      if (res.data.error.originalError.data.data.email)
        messages.push(res.data.error.originalError.data.data.email.message);
      if (res.data.error.originalError.data.data.username)
        messages.push(
          "Username " + res.data.error.originalError.data.data.username.message
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
      console.log({
        error: true,
        messages: messages,
      }, res.data.error.originalError.data)
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Modal
        isOpen={success}
        onOpenChange={(e) => {
          setSuccess(e);
        }}
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

      {error.error ? (
        <div className=" bg-rose-800 opacity-80 p-2 rounded-md sm:w-96 w-72">
          <p>Hata!!</p>
          <hr></hr>
          <ul>
            {
              error.messages.map((message) => {
                return <li className="text-xs p-1">{message}</li>;
              })
            }
          </ul>
        </div>
      ) : null}

      <Tooltip
        content="Aralarında boşluk olacak şekilde isim soyisim giriniz."
        placement="top"
        className="bg-fuchsia-900"
      >
        <input
          className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="İsminiz..."
        />
      </Tooltip>
      <input
        className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="E-posta adresiniz..."
      />
      <Tooltip
        content="Özel karakter, boşluk vb. karakter içermeyen bir kullanıcı adı giriniz."
        placement="top"
        className="bg-fuchsia-900"
      >
        <input
          className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Kullanıcı adınız..."
        />
      </Tooltip>
      <Tooltip
        content="En az sekiz, en fazla 16 karakterden oluşacak ve özel karakter olmayacak şekilde bir şifre giriniz."
        placement="top"
        className="bg-fuchsia-900"
      >
        <input
          className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Şifreniz"
        />
      </Tooltip>
      <Tooltip
        content="En az sekiz, en fazla 16 karakterden oluşacak ve özel karakter olmayacak şekilde bir şifre giriniz."
        placement="top"
        className="bg-fuchsia-900"
      >
        <input
          className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          placeholder="Şifrenizi onaylayın..."
        />
      </Tooltip>
      <button
        className="text-xl sm:w-96 mt-2 w-72 border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
        onClick={handleSubmit}
        disabled={inProgress}
      >
        {inProgress ? <Spinner /> : "KAYIT OL"}
      </button>
    </div>
  );
};

export default SignupForm;
