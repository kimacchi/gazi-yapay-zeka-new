import LoginForm from "@/components/LoginForm";
import ReturnMainPage from "@/components/ReturnMainPage";
import React from "react";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

const Login = () => {
  // const router = useRouter();
  // const token = cookies().get("pb_auth")?.value
  // pb.authStore.loadFromCookie(token || "");
  // if(pb.authStore.isValid) router.push("/dashboard");
  return (
    <div className="w-full flex flex-col min-h-screen items-center justify-center text-neutral-200 gap-6">
      <ReturnMainPage />
      <h1 className="text-4xl">Gazi Yapay Zeka</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
