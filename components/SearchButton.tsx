"use client"
import { useRouter } from "next/navigation";
import React from "react";

const SearchButton = ({page}: {page: string | string[] | 1}) => {
    const [name, setName] = React.useState("")
    const router = useRouter()
    console.log(page)
  return (
    <form onSubmit={() => {
      router.push(`/dashboard/users?page=1&name=${name}`)
    }}>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Üye ara"
        className="border-white border p-2"
        onChange={(e) => {
            setName(e.target.value)
        }}
      />
      <button type="submit" className="border-white border p-2">
        Ara
      </button>
    </form>
  );
};

export default SearchButton;
