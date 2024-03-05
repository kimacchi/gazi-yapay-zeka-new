"use client";
import { Checkbox } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

const SearchButton = ({ page }: { page: string | string[] | 1 }) => {
  // const [name, setName] = React.useState<string | null>(null);
  const [active, setActive] = React.useState(false);
  const [board, setBoard] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);
  const router = useRouter();
  // console.log(active && "true");
  return (
    <form
      onSubmit={() => {
        
        router.replace(
          `/dashboard/users/`,
        );
        router.refresh()
      }}
    >
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Üye ara"
        className="border-white border p-2"
        onChange={(e) => {
          // setName(e.target.value);
        }}
      />
      <div>
        <Checkbox isSelected={active} onValueChange={setActive}>
          Aktif Üye
        </Checkbox>
        <Checkbox isSelected={board} onValueChange={setBoard}>
          İdari Kurul Üyesi
        </Checkbox>
        <Checkbox isSelected={admin} onValueChange={setAdmin}>
          Admin
        </Checkbox>
      </div>
      <button type="submit" className="border-white border p-2">
        Ara
      </button>
    </form>
  );
};

export default SearchButton;
