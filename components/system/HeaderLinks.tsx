"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  //   Link,
} from "@nextui-org/react";
import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const HeaderLinks = ({ data }: { data: { url: string; title: string }[] }) => {
  const router = useRouter();
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="p-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="white"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {data.map((link) => {
            return (
              <DropdownItem
                key={link.title}
                onClick={() => {
                  router.push(link.url);
                }}
              >
                <Link href={link.url} key={link.url} className="w-full h-full">
                  {link.title}
                </Link>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default HeaderLinks;
