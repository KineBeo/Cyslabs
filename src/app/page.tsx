"use client";
import WhatWeDo from "./components/homepage/whatwedo";
import Customer from "./components/homepage/customer";
import Member from "./components/homepage/member";
import InfoForm from "./components/homepage/info-form";
import SmoothScroll from "./components/homepage/SmoothScrollText";
import userSWR from "swr";
import fetchHomepage from "../service/strapi/homepage";
import HeroSectionComponent from "./components/homepage/hero-section";
import { CustomersSection, Questions, ServicesSection, Team } from "../service/strapi/interface/section";

export default function Home() {

  const { data, error } = userSWR('homepage', fetchHomepage);

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
          // case "section.team":
          //   return <Member props={content as Team} />;
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
