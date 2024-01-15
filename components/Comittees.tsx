import { Commitee } from "@/types/comitee";
import Link from "next/link";
import React from "react";

const Comittees = ({ data }: { data: Commitee[] }) => {
  return (
    <>
      {data.map((item) => {
        return (
          <Link
            href={`/dashboard/committees/${item.id}`}
            key={item.id}
            className="text-left bg-cyan-900/20 p-2 rounded-md hover:bg-cyan-800/30"
          >
            {item.committeeName}
          </Link>
        );
      })}
    </>
  );
};

export default Comittees;
