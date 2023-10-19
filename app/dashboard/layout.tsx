import Header from "@/components/system/Header";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard | Gazi Yapay Zeka",
  description: "Gazi Yapay Zeka Kullanıcı Paneli",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ! Check the docs for nested root layouts because right now it couses problems.
      <html lang="en" className="dark">
        <body
          className={`${inter.className} bg-neutral-900 min-h-screen font-Roboto text-neutral-200`}
        >
            <Header />
            {children}
        </body>
      </html>
  );
}
