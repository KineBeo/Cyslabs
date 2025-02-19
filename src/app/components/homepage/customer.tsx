"use client";
import React, { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { CustomersSection } from "@/src/service/strapi/interface/section";

// Dynamically import heavy components
const RandomStarBackground = dynamic(() => import("../ui/random-start-background"), {
  ssr: false,
});

// Memoize and optimize ProductItem component
const ProductItem = memo<{ title: string; type: string, url?: string }>(({ title, type, url }) => (
  <>
    <div
      className="tablet:mx-4 mini-laptop:mx-8 before:z-[-1] before:absolute relative before:inset-0 before:bg-cyan-700 mx-20 mobile:mx-4 px-2 py-4 before:scale-y-0 hover:before:scale-y-100 before:origin-bottom transition-all before:transition-transform duration-200 before:duration-200 ease-in-out cursor-pointer"
      onClick={() => window.open(`${url}`)}
    >
      <div className="tablet:gap-16 z-10 relative flex justify-between mini-laptop:gap-16 mobile:gap-12 hover:px-2 transition-all">
        <p className="group-hover:text-white font-bold text-white mini-laptop:text-xl mobile:text-xl tablet:text-xl text-2xl">
          {title}
        </p>
        <p className="group-hover:text-white text-white mobile:text-lg text-xl">{type}</p>
      </div>
    </div>
    <div className="tablet:mx-4 mini-laptop:mx-8 bg-slate-500 mx-20 mobile:mx-4 px-2 h-0.5" />
  </>
));
ProductItem.displayName = 'ProductItem';

// Optimize title splitting with memoization
const useSplitTitle = (title: string) =>
  useMemo(() => title.split(" | "), [title]);

interface CustomerProps {
  props: CustomersSection;
}

export default function Customer({ props }: CustomerProps) {
  // Memoize split words
  const words = useSplitTitle(props.title);

  // Memoize customer items to prevent unnecessary re-renders
  const customerItems = useMemo(() =>
    props.customers.map((product) => (
      <ProductItem
        key={product.id}
        title={product.name}
        type={product.type}
        url={product.url}
      />
    )),
    [props.customers]
  );

  return (
    <RandomStarBackground
      id="customer-star"
      className="flex justify-center items-center h-screen"
    >
      <div className="gap-8 grid grid-cols-5 mobile:grid-cols-1 tablet:grid-cols-1 px-12 mobile:px-0 pb-40 h-fit">
        <div className="flex flex-col col-span-2 mx-auto w-full">
          <div className="ml-4 p-10 border-blue-500 border-l-4 w-full font-extrabold text-white text-4xl laptop:text-5xl desktop:text-7xl">
            {words.map((word, index) => (
              <div key={index} className="mobile:text-center tablet:text-center">
                {word}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mobile:place-self-start col-span-3 p-10">
          {customerItems}
        </div>
      </div>
    </RandomStarBackground>
  );
}