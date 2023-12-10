"use client";

import { UserContextType, UserContext_ } from "@/types/user";
import { createContext, useContext, useState } from "react";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserContext_ | null>(null);

  return <UserContext.Provider value={{
    user,
    setUser,
  }}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext)
