/* eslint-disable react/jsx-no-undef */
import React from "react";
import {
  TypewriterEffect,
  TypewriterEffectSmooth,
} from "../ui/typewriter-effect";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

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
    <section className="w-full flex flex-col items-center sm:py-24 text-center sm:gap-12 py-12 gap-12 px-4">
      <h1 className="sm:text-4xl text-3xl font-black">
        Gazi Üniversitesi<br></br>Yapay Zeka Topluluğu
      </h1>
      <CardContainer className="inter-var">
        <CardBody className=" relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black/20  border-white/[0.2]  w-auto sm:w-[50rem] h-auto rounded-xl p-6 border  ">
          <CardItem translateZ="50" className="text-xl font-bold  text-white">
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
            className="w-full mt-4 flex flex-wrap gap-4 items-center justify-center"
          >
              <button className="sm:w-[13rem] px-2 py-4 bg-[#e05b0d] backdrop-blur-sm rounded-md text-lg font-mono hover:bg-dark-orange">
                Etkinliklerimiz
              </button>
              <button className="sm:w-[13rem] px-2 py-4 bg-[#e05b0d] backdrop-blur-sm rounded-md text-lg font-mono hover:bg-dark-orange">
                Bloglarımız
              </button>
              <button className="sm:w-[13rem] px-2 py-4 bg-[#e05b0d] backdrop-blur-sm rounded-md text-lg font-mono hover:bg-dark-orange">
                İdari Üyelerimiz
              </button>
              <button className="sm:w-[13rem] px-2 py-4 bg-[#e05b0d] backdrop-blur-sm rounded-md text-lg font-mono hover:bg-dark-orange">
                Bağlantılarımız
              </button>
              <button className="sm:w-[13rem] px-2 py-4 bg-[#e05b0d] backdrop-blur-sm rounded-md text-lg font-mono hover:bg-dark-orange">
                Sponsorlarımız
              </button>
              <button className="sm:w-[13rem] px-2 py-4 bg-[#e05b0d] backdrop-blur-sm rounded-md text-lg font-mono hover:bg-dark-orange">
                İletişim
              </button>
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl text-xs font-normal text-white hover:bg-white hover:text-black"
            >
              Giriş yap →
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-white text-black font-bold hover:bg-transparent hover:text-white text-xl"
            >
              Üye ol
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </section>
  );
};

export default Hero;
