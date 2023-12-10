"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { UserContext, useUserContext } from "@/app/UserContext";
import { useContext } from "react";
import { UserContext_ } from "@/types/user";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const route = useRouter();

  const { user, setUser } = useUserContext();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    try {
      // TODO: Add validation for email and password if they are empty,
      // TODO: Display error message returning from the backend upon failure
      const loginResponse = await axios.post<{
        record: UserContext_;
        token: string;
        error?: any;
        status?: number;
      }>("/api/users/login", {
        email: email.trim(),
        password: password.trim(),
      });
      if (loginResponse.data.error) {
        setPassword("");
        console.log("authentication failed.");
        setError(true);
      } else {
        setError(false);
        console.log("authentication successful.");
      }
      setUser({
        ...loginResponse.data.record,
        token: loginResponse.data.token,
      });
      setLoading(false);

      if (loginResponse.data.token) {
        route.push("/dashboard");
      }
    } catch (error) {
      throw error;
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [resetEmail, setResetEmail] = useState("");

  const resetPassword = async () => {
    try {
      const resetResponse = await axios.post<{
        error?: any;
        status?: number;
      }>("/api/users/password_reset", {
        email: resetEmail.trim(),
      });
      if (resetResponse.data.error) {
        console.log("mail not sent.");
        alert("Bir hata oluştu. Lütfen tekrar deneyiniz.");
      } else {
        console.log("mail sent.");
        alert("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.")
      }
      setResetEmail("");
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Şifrenizi mi unuttunuz?
              </ModalHeader>
              <ModalBody>
                <p>
                  Endişeye gerek yok, aşağıdaki alana şifresini unuttuğunuz
                  hesabın e-posta adresini girip ve e-postanıza gelen bağlantıyı
                  kullanarak şifrenizi sıfırlayabilirsiniz.
                </p>
                <input
                  type="email"
                  className="sm:w-96 w-72 h-10 px-2 rounded-md bg-transparent border-2 border-white"
                  value={resetEmail}
                  placeholder="E-posta adresiniz"
                  onChange={(event) => setResetEmail(event.target.value)}
                />
              </ModalBody>
              <ModalFooter className="flex flex-col items-center">
                <Button color="primary" onPress={resetPassword}>
                  Şifremi sıfırla
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {error && (
          <h2 className="sm:w-96 w-72 text-base p-2 rounded-lg bg-rose-700/50">
            Bilgiler geçersiz. Tekrar deneyiniz.
            <br></br>
            <span className="text-xs">
              Aksi durumda idari kurul ile iletişime geçiniz.
            </span>
          </h2>
        )}
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
          <Link href="/signup" className="hover:underline">
            Kayıt ol
          </Link>
          <button className="hover:underline" type="button" onClick={onOpen}>
            Şifremi unuttum
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="text-xl sm:w-96 mt-2 w-72 border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
        >
          {loading ? <Spinner /> : "Giriş yap"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
