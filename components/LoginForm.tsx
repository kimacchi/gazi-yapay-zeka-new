"use client";

import { Spinner } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { UserContext, useUserContext } from "@/app/UserContext";
import { useContext } from "react";
import { UserContext_ } from "@/types/user";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const route = useRouter();

  const {user, setUser} = useUserContext();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    try {
      // TODO: Add validation for email and password if they are empty,
      // TODO: Display error message returning from the backend upon failure
      const loginResponse = await axios.post<{
        record: UserContext_,
        token: string
      }>("/api/users/login", {
        email: email.trim(),
        password: password.trim(),
      });
      setUser({...(loginResponse.data.record), token: loginResponse.data.token});
      setLoading(false);

      if(loginResponse.data.token){
        route.push("/dashboard")
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-6">
        <input
          type="email"
          className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
          value={email}
          placeholder="E-posta adresiniz..."
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Şifreniz..."
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
        />
      </div>
      <div className="flex w-full justify-between">
        <Link href="/signup" className="hover:underline">Kayıt ol</Link>
        <Link href="/" className="hover:underline">Şifremi unuttum</Link>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="text-xl sm:w-96 mt-2 w-72 border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
      >
        {loading ? <Spinner /> : "Giriş yap"}
      </button>
    </form>
  );
};

export default LoginForm;
