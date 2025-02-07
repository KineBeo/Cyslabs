"use client";
import React, { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { CustomersSection } from "@/src/service/strapi/interface/section";

// Dynamically import heavy components
const RandomStarBackground = dynamic(() => import("../ui/random-start-background"), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />,
});

// Memoize and optimize ProductItem component
const ProductItem = memo<{ title: string; type: string }>(({ title, type }) => (
  <>
    <div
      className="relative mini-laptop:mx-8 before:z-[-1] before:absolute before:inset-0 before:bg-cyan-700 mx-20 mobile:mx-4 tablet:mx-4 px-2 py-4 before:origin-bottom transition-all before:transition-transform duration-200 before:duration-200 cursor-pointer before:scale-y-0 ease-in-out hover:before:scale-y-100"
    >
      <div className="relative z-10 flex justify-between mini-laptop:gap-16 mobile:gap-12 tablet:gap-16 hover:px-2 transition-all">
        <p className="group-hover:text-white font-bold mobile:text-xl tablet:text-xl mini-laptop:text-xl text-2xl text-white">
          {title}
        </p>
        <p className="group-hover:text-white text-white mobile:text-lg text-xl">{type}</p>
      </div>
    </div>
    <div className="bg-slate-500 mx-20 mobile:mx-4 tablet:mx-4 mini-laptop:mx-8 px-2 h-0.5" />
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
          <div className="ml-4 w-full font-extrabold text-4xl text-white desktop:text-7xl laptop:text-5xl p-10 border-blue-500 border-l-4">
            {words.map((word, index) => (
              <div key={index} className="mobile:text-center tablet:text-center">
                {word}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col col-span-3 mobile:place-self-start p-10">
          {customerItems}
        </div>
      </div>
    </RandomStarBackground>
  );
}