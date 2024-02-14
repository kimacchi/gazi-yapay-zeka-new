"use client";
import { Commitee } from "@/types/comitee";
import axios from "axios";
import Cookies from "js-cookie";
import { cookies } from "next/headers";
import Link from "next/link";
import React, { useEffect } from "react";

const Comittees = ({ data }: { data: Commitee[] }) => {
  const [list, setList] = React.useState<Commitee[]>(data);

  const [disabled, setDisabled] = React.useState(false);

  const moveUp = (idx: number) => {
    const tempList = [...list];
    const temp = tempList.splice(idx, 1);
    tempList.splice(idx - 1, 0, temp[0]);
    setList(tempList);
  };
  const moveDown = (idx: number) => {
    const tempList = [...list];
    const temp = tempList.splice(idx, 1);
    tempList.splice(idx + 1, 0, temp[0]);
    setList(tempList);
  };
  const deleteItem = (item: Commitee, idx: number) => {
    const tempList = [...list];
    tempList.splice(idx, 1);
    axios.delete("/api/committees/" + item.id, {
      headers: { cookie: `pb_auth=${Cookies.get("pb_auth")}` },
    });
    setList(tempList);
  };

  useEffect(() => {
    setDisabled(true);
    list.map((item, idx) => {
      axios.patch(
        "/api/committees/" + item.id,
        { order: idx },
        {
          headers: {
            cookie: `pb_auth=${Cookies.get("pb_auth")}`,
          },
        }
      );
    });
    setDisabled(false);
  }, [list]);
  return (
    <>
      {list.map((item, idx) => {
        return (
          <div
            key={item.id}
            className="w-full flex text-left bg-cyan-900/20 rounded-md hover:bg-cyan-800/30"
          >
            <Link
              href={`/dashboard/committees/${item.id}`}
              className="text-left p-2 rounded-md align-middle w-full flex items-center"
            >
              {item.committeeName}
            </Link>
            <div className="flex flex-col gap-2 py-2 pr-2">
              <button
                className="bg-zinc-950 hover:bg-zinc-800 p-1 rounded-md disabled:bg-zinc-600 disabled:cursor-not-allowed"
                onClick={() => {
                  moveUp(idx);
                }}
                disabled={disabled}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  className="bi bi-chevron-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                  />
                </svg>
              </button>
              <button
                className="bg-zinc-950 hover:bg-zinc-800 p-1 rounded-md disabled:bg-zinc-600 disabled:cursor-not-allowed"
                onClick={() => {
                  moveDown(idx);
                }}
                disabled={disabled}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  className="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </button>
            </div>
            <button
              className="bg-rose-900 p-2 hover:bg-red-900 ml-2"
              onClick={() => {
                deleteItem(item, idx);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="white"
                className="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
              </svg>
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Comittees;
