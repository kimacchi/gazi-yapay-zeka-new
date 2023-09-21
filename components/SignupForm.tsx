"use client";

import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";

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
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post('api/users/signup', { email, username, password, passwordConfirm, name })
    console.log(res.data)
  };

  return (
    <div className="flex flex-col gap-6">
      <input
        className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="İsminiz..."
      />
      <input
        className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="E-posta adresiniz..."
      />
      <input
        className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Kullanıcı adınız..."
      />
      <input
        className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Şifreniz"
      />
      <input
        className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
        onChange={(e) => setPasswordConfirm(e.target.value)}
        type="password"
        placeholder="Şifrenizi onaylayın..."
      />
      <button className="text-xl sm:w-96 mt-2 w-72 border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900" onClick={handleSubmit} >
        KAYIT OL
      </button>
    </div>
  );
};

export default SignupForm;
