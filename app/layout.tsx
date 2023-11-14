import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { Suspense } from "react";
import Loading from "./loading";
import UserProvider from "./UserContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gazi Yapay Zeka",
  description: "Gazi Üniversitesi Yapay Zeka Topluluğu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" className="dark">
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body
          className={` bg-neutral-900 min-h-screen font-Roboto text-neutral-200`}
        >
            <UserProvider>
              {children}
            </UserProvider>
          <Analytics />
        </body>
      </html>
  );
}
