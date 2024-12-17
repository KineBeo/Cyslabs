"use client";
import React from "react";
import RandomStarBackground from "../ui/random-start-background";

interface ProductItemProps {
  title: string;
  type: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ title, type }) => (
  <>
    <div
      className="mx-20 mobile:mx-4 tablet:mx-4 mini-laptop:mx-8 px-2 py-4 
                cursor-pointer 
                relative 
                transition-all 
                duration-200 
                ease-in-out
                before:absolute 
                before:inset-0 
                before:bg-cyan-700 
                before:origin-bottom 
                before:scale-y-0 
                hover:before:scale-y-100 
                before:transition-transform 
                before:duration-200 
                before:z-[-1]"
    >
      <div className="flex justify-between mobile:gap-12 tablet:gap-16 mini-laptop:gap-16 relative z-10 hover:px-2 transition-all">
        <p className="font-bold text-2xl text-white group-hover:text-white">
          {title}
        </p>
        <p className="text-white group-hover:text-white text-xl">{type}</p>
      </div>
    </div>
    <div className="mx-20 mobile:mx-4 tablet:mx-4 px-2 bg-slate-500 h-0.5" />
  </>
);

const products = [
  { id: 1, title: "Đông Y Ông Bụt", type: "Website" },
  { id: 2, title: "5LABS", type: "Website" },
  { id: 3, title: "Soundtify", type: "Website" },
  { id: 4, title: "Soundtify", type: "Website" },
  { id: 5, title: "Soundtify", type: "Website" },
];

export default function Customer() {
  return (
    <RandomStarBackground id="customer-star" className="h-screen flex items-center justify-center">
      <div className="h-fit grid grid-cols-5 mobile:grid-cols-1 tablet:grid-cols-1 pb-40 gap-8 px-12 mobile:px-0">
        <div className="col-span-2 flex flex-col">
          <div className="desktop:text-7xl laptop:text-5xl text-4xl font-extrabold px-10 text-white">
            <div>
              CYSLABS
            </div>
            <div className="">
              IN USE
            </div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col mobile:place-self-start">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              title={product.title}
              type={product.type}
            />
          ))}
        </div>
      </div>
    </RandomStarBackground>
  );
}