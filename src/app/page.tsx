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
import userSWR from "swr";
import fetchHomepage from "../service/strapi/homepage";
import Loading from "./components/ux/loading";
import HeroSectionComponent from "./components/homepage/hero-section";
import { CustomersSection, HeroSection, Questions, ServicesSection, Team } from "../service/strapi/interface/section";

const World = dynamic(() => import("@/src/app/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function Home() {

  const { data, isLoading, error } = userSWR('homepage', fetchHomepage);

  // if (isLoading) {
  //   return (
  //     <Loading />
  //   );
  // }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="h-full">
      <HeroSectionComponent />
      {data?.content.map((content, index) => {
        switch (content.__component) {
          case "section.questions":
            return <SmoothScroll props={content as Questions} />;
          case "section.team":
            return <Member props={content as Team} />;
          case "section.services":
            return <WhatWeDo props={content as ServicesSection} />;
          case "section.customers":
            return <Customer props={content as CustomersSection} />;
          case "section.info-form":
            return <InfoForm />;
          default:
            return null;
        }
      })}
      <InfoForm />
    </div>
  );
}
