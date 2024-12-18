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
import { HeroSection, Questions } from "../service/strapi/interface/section";

const World = dynamic(() => import("@/src/app/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function Home() {

  const { data, isLoading, error } = userSWR('homepage', fetchHomepage);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="h-full">
      {data?.content.map((content, index) => {
        switch (content.__component) {
          case "section.hero-section":
            return (
              <HeroSectionComponent props={content as HeroSection}
                key={index}
              />
            );
          case "section.questions":
            return <SmoothScroll props={content as Questions} />;
          case "section.member":
            return <Member />;
          case "section.customer":
            return <Customer />;
          case "section.info-form":
            return <InfoForm />;
          default:
            return null;
        }
      })}
      <WhatWeDo />
      <Member />
      <Customer />
      <InfoForm />
    </div>
  );
}
