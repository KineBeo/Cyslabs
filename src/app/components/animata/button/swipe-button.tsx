"use client";
import { cn } from "@/src/lib/utils";
import React from "react";

interface SwipeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  firstText: string;
  secondText: string;
  className?: string;
  firstClass?: string;
  secondClass?: string;
}

export default function SwipeButton({
  className = "",
  secondText = "Get access",
  firstText = "Get access",
  firstClass = "bg-orange-500 text-white",
  secondClass = "bg-black text-white",
  ...props
}: SwipeButtonProps) {
  const common = "block px-4 py-2 text-xl text-semibold duration-700 ease";
  return (
    <button
      {...props}
      className={cn("group relative min-w-fit overflow-hidden", className)}
    >
      <span
        className={cn(
          "absolute inset-0 translate-y-full group-hover:translate-y-0",
          common,
          secondClass,
        )}
      >
        {secondText}
      </span>
      <span className={cn("group-hover:-translate-y-full", common, firstClass)}>{firstText}</span>
    </button>
  );
}
