import LoginForm from "@/components/LoginForm";
import ReturnMainPage from "@/components/ReturnMainPage";
import React from "react";

const Login = () => {
  return (
    <div className="w-full flex flex-col min-h-screen items-center justify-center text-neutral-200 gap-6">
      <ReturnMainPage />
      <h1 className="text-4xl">Gazi Yapay Zeka</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
