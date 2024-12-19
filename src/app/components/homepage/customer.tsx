"use client";
import React from "react";
import RandomStarBackground from "../ui/random-start-background";
import { CustomersSection } from "@/src/service/strapi/interface/section";

interface ProductItemProps {
  title: string;
  type: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ title, type }) => (
  <>
    <div
      className="relative mini-laptop:mx-8 before:z-[-1] before:absolute before:inset-0 before:bg-cyan-700 mx-20 mobile:mx-4 tablet:mx-4 px-2 py-4 before:origin-bottom transition-all before:transition-transform duration-200 before:duration-200 cursor-pointer before:scale-y-0 ease-in-out hover:before:scale-y-100"
    >
      <div className="relative z-10 flex justify-between mini-laptop:gap-16 mobile:gap-12 tablet:gap-16 hover:px-2 transition-all">
        <p className="group-hover:text-white font-bold text-2xl text-white">
          {title}
        </p>
        <p className="group-hover:text-white text-white text-xl">{type}</p>
      </div>
    </div>
    <div className="bg-slate-500 mx-20 mobile:mx-4 tablet:mx-4 px-2 h-0.5" />
  </>
);

const products = [
  { id: 1, title: "Đông Y Ông Bụt", type: "Website" },
  { id: 2, title: "5LABS", type: "Website" },
  { id: 3, title: "Soundtify", type: "Website" },
  { id: 4, title: "Soundtify", type: "Website" },
  { id: 5, title: "Soundtify", type: "Website" },
];

const spiltTitle = (title: string) => {
  const words = title.split(" | ");
  return words;
}

interface CustomerProps {
  props: CustomersSection;
}

export default function Customer({ props }: CustomerProps) {

  const words = spiltTitle(props.title);

  return (
    <RandomStarBackground
      id="customer-star"
      className="flex justify-center items-center h-screen"
    >
      <div className="gap-8 grid grid-cols-5 mobile:grid-cols-1 tablet:grid-cols-1 px-12 mobile:px-0 pb-40 h-fit">
        <div className="flex flex-col col-span-2 mx-auto w-full">
          <div className="ml-4 px-10 w-full font-extrabold text-4xl text-white desktop:text-7xl laptop:text-5xl">
            {words.map((word) => <div className="mobile:text-center tablet:text-center">{word}</div>)}
          </div>
        </div>
        <div className="flex flex-col col-span-3 mobile:place-self-start">
          {props.customers.map((product) => (
            <ProductItem
              key={product.id}
              title={product.name}
              type={product.type}
            />
          ))}
        </div>
      </div>
    </RandomStarBackground>
  );
}