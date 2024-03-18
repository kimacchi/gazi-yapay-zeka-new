"use client";
import React from "react";
import { LampContainer } from "../ui/lamp";
import { motion } from "framer-motion";
import { Blog } from "@/types/blog";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { useRouter } from "next/navigation";

const OurEvents = ({ blogs }: { blogs: Blog[] }) => {
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black to-transparent px-12 py-8 w-full"
      id="bloglar"
    >
      <h2 className="text-2xl">
        Sizlerle <span className="text-light-blue">Paylaştıklarımız</span>
      </h2>
      <div className="w-full flex flex-col gap-12 mt-12 justify-center">
        <BentoGrid>
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <BentoGridItem
                onClick_={() => router.push(`/bloglar/${blogs[0].id}`)}
                className={
                  index % 3 === 0
                    ? "md:col-span-2 w-full cursor-pointer"
                    : "w-full cursor-pointer"
                }
                key={index}
                title={blogs[0].title}
                description={blogs[0].summary}
                header={
                  <CustomHeader
                    url={`https://gazi-yapay-zeka.pockethost.io/api/files/${blogs[0].collectionId}/${blogs[0].id}/${blogs[0].thumbnail}`}
                  />
                }
              />
            );
          })}
        </BentoGrid>
        <div className="self-end px-36" >
          <a href="#bloglar">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              className="bg-dark-orange text-white px-6 py-2 rounded-lg"
            >
              Tüm Bloglar
            </motion.button>
          </a>
        </div>
      </div>
    </div>
  );
};

const CustomHeader = ({ url }: { url: string }) => {
  return (
    <img
      alt={"header"}
      src={url}
      className="w-full h-full object-cover rounded-lg"
    />
  );
};

export default OurEvents;
