"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";


import { cn } from "@/src/lib/utils";
import RandomStarBackground from "../ui/random-start-background";

export default function InfoForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <RandomStarBackground
      id="signup-star"
      className="h-screen flex items-center justify-center"
    >
      <div className="max-w-3xl w-full h-fit mx-auto rounded-none desktop:rounded-2xl laptop:rounded-2xl p-4 desktop:p-8 laptop:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl laptop:text-2xl desktop:text-2xl text-neutral-800 dark:text-neutral-200 text-center">
          Welcome to CYSLABS
        </h2>
        <p className="text-neutral-600 text-sm laptop:text-base desktop:text-base max-w-sm mt-2 dark:text-neutral-300">
          Do you want to contact with us?
        </p>
        <p className="text-neutral-600 text-sm laptop:text-base desktop:text-base max-w-sm mt-2 dark:text-neutral-300">
          Please provide your infomation? We will conntact you soon.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col desktop:flex-row laptop:flex-row space-y-2 desktop:space-y-0 laptop:space-y-0 desktop:space-x-2 laptop:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname" className="laptop:text-base desktop:text-base" >First name</Label>
              <Input id="firstname" placeholder="Tyler" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname"  className="laptop:text-base desktop:text-base">Last name</Label>
              <Input id="lastname" placeholder="Durden" type="text" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="laptop:text-base desktop:text-base">Your Email</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password"  className="laptop:text-base desktop:text-base">Phone number</Label>
            <Input id="password" placeholder="0123465789" type="password" />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Send &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </RandomStarBackground>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
