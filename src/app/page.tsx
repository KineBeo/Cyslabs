"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { AuroraBackground } from "./components/ui/aurora-background";
import SwipeButton from "./components/animata/button/swipe-button";
import WhatWeDo from "./components/homepage/whatwedo";
import Customer from "./components/homepage/customer";
import Member from "./components/homepage/member";
import InfoForm from "./components/homepage/info-form";
import SmoothScroll from "./components/homepage/SmoothScrollText";
import MacbookScene from "./components/mac3D/MacbookScene";

const World = dynamic(() => import("@/src/app/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function Home() {


  const words1 = [
    {
      text: "The",
    },
    {
      text: "Coolest",
    },
    {
      text: "Team",
    },
    {
      text: "Of",
    },
  ];

  const words2 = [
    {
      text: "CyberSecurity",
    },
    {
      text: "Has",
    },
    {
      text: "Arrived",
    },
  ]


  return (
    <div className="h-full bg-black">
      <div className="h-full w-full overflow-hidden relative">
        <AuroraBackground>
          <div
            className="absolute z-10  
          mobile:top-44
          tablet:top-48
          mini-laptop:top-52 
          laptop:top-56
          desktop:top-48"
          >
            <div
              className="text-foreground 
              mobile:text-3xl
              mobile:justify-center
              tablet:text-3xl
              tablet:justify-center
              mini-laptop:text-5xl
              laptop:text-6xl
              laptop:justify-start
              desktop:text-8xl
              desktop:justify-star
               font-bold"
            >
              {words1.map((word) => word.text).join(" ")}
            </div>
            <div
              className="text-foreground 
            font-bold
              mobile:text-2xl
              mobile:justify-center
              tablet:text-3xl
              tablet:justify-center
              mini-laptop:text-5xl
              laptop:text-6xl
              desktop:text-8xl
              laptop:ml-32
              desktop:ml-52  
              mobile:mt-2
              desktop:mt-6"
            >
              {words2.map((word) => word.text).join(" ")}
            </div>
          </div>
          <MacbookScene />
        </AuroraBackground>
        <div
          className="absolute z-20 flex justify-center w-full
        mobile:top-72
        tablet:top-80
        mini-laptop:top-80
        laptop:top-80
        desktop:top-96"
        >
          <div
            className="absolute z-20
          laptop:right-12
          laptop:top-16
          desktop:right-16
          desktop:top-16
          "
          >
            <div
              className="font-semibold text-black dark:text-white 
              mobile:text-lg
              mobile:justify-center
              mobile:text-center
              tablet:text-xl
              mini-laptop:text-2xl
              laptop:text-3xl
              laptop:justify-start
              desktop:text-3xl
              desktop:justify-start
              text-2xl"
            >
              Cyslabs is a cybersecurity squad keeping
            </div>
            <div
              className="font-semibold text-black dark:text-white 
              mobile:text-lg
              mobile:justify-center
              tablet:text-xl
              mini-laptop:text-2xl
              laptop:text-3xl
              laptop:justify-start
              desktop:text-3xl
              desktop:justify-start
              text-2xl"
            >
              data and privacy safe #StaySecure #CyberSquad
            </div>
            <div
              className="flex flex-row gap-4 mt-4 font-semibold
            mobile:justify-center
            tablet:justify-center
            mini-laptop:justify-center
            "
            >
              <SwipeButton
                firstText="Join now"
                secondText="Signup"
                className="min-w-[150px]"
                firstClass="bg-[#FEDC69] text-black 
                mobile:text-base
                tablet:text-lg"
                secondClass="bg-[#FEDC69] text-black 
                mobile:text-base
                tablet:text-lg"
              />
              <SwipeButton
                firstText="Join now"
                secondText="Signup"
                className="min-w-[150px]"
                firstClass="bg-transparent text-white border border-white
                mobile:text-base
                tablet:text-lg"
                secondClass="bg-transparent text-white border border-white
                mobile:text-base
                tablet:text-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <SmoothScroll />
      <WhatWeDo />
      <Member />
      <Customer />
      <InfoForm />
    </div>
  );
}
