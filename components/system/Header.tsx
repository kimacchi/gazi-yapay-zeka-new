import React from "react";
import Link from "next/link";

const isAdmin = true;

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between p-4">
      <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
      {isAdmin ? (
        <div className="hidden sm:gap-6 sm:flex ">
          <Link href="/dashboard/events">Etkinlik Yönetimi</Link>
          <Link href="/dashboard/users">Üye Yönetimi</Link>
          <Link href="/dashboard/committees">Komiteler</Link>
          <Link href="/dashboard/members">İdari Kurul Yönetimi</Link>
          <Link href="/dashboard/sponsors">Sponsor Yönetimi</Link>
          <Link href="/dashboard/blogs">Bloglar</Link>
        </div>
      ) : undefined}
      <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
    </div>
  );
};

export default Header;
