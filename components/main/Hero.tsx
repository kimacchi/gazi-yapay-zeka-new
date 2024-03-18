/* eslint-disable react/jsx-no-undef */
import React from "react";
import {
  TypewriterEffect,
  TypewriterEffectSmooth,
} from "../ui/typewriter-effect";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { WavyBackground } from "../ui/wavy-background";
import { CalendarClockIcon } from "lucide-react";
import Link from "next/link";

const words = [
  {
    text: "Gazi",
  },
  {
    text: "Üniversitesi",
  },
  {
    text: "Yapay",
  },
  {
    text: "Zeka",
  },
  {
    text: "Topluluğu",
  },
];

const Hero = () => {
  return (
    <div className="w-full overflow-x-hidden bg-black">
      <WavyBackground className="">
        <div className="w-full flex flex-col items-center sm:py-24 text-center sm:gap-12 py-12 gap-12 px-8 sm:px-0">
          <h1 className="sm:text-4xl text-3xl font-black">
            Gazi Üniversitesi<br></br>Yapay Zeka Topluluğu
          </h1>
          <CardContainer className="inter-var">
            <CardBody className="relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black/70  border-white/[0.2]  w-11/12 sm:w-[50rem] h-auto rounded-xl px-2 py-4 sm:p-6 border  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold  text-white"
              >
                Yarının dünyasını kodluyoruz!
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className=" text-sm max-w-sm mt-2 text-neutral-300"
              >
                Siz de bizimle birlikte yarına adım atın!
              </CardItem>
              <CardItem
                translateZ="100"
                // className="w-full mt-4 grid grid-cols-3 grid-rows-2 gap-4 items-center justify-center"
                className="w-full mt-16 flex gap-4 items-center justify-between sm:px-24 px-2"
              >
                <Link
                  href="/login"
                  className="bg-black/30 backdrop-blur-sm p-2 sm:p-6 text-base sm:text-xl rounded-md hover:bg-white hover:text-dark-blue transition-all"
                >
                  Giriş yap →
                </Link>
                <Link
                  href="/signup"
                  className="bg-violet-500/50 backdrop-blur-sm p-2 sm:p-6 text-base sm:text-xl rounded-md hover:bg-white hover:text-dark-blue transition-all"
                >
                  Kayıt Ol
                </Link>
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl text-xs font-normal text-white hover:bg-white hover:text-black"
                >
                  <Link href="#bloglar">
                    Daha fazlasını öğren →
                  </Link>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </WavyBackground>
    </div>
  );
};

export default Hero;
