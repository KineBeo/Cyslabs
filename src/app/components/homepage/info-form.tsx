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
      className="h-screen flex items-center justify-center
      mobile:px-4
      tablet:px-8
      mini-laptop:px-8"
    >
      <div className="max-w-3xl w-full h-fit mx-auto shadow-input bg-white dark:bg-black
      desktop:p-8 desktop:rounded-2xl 
      laptop:p-8 laptop:rounded-2xl
      p-4 rounded-xl transition-all
      ease-in-out duration-300
      "
      >
        <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center capitalize">
          CYSLABS are here for you
        </h2>
        <p className="text-neutral-600 text-base mt-2 dark:text-neutral-300
        mobile:text-center
        tablet:text-center">
          Do you want to contact with us?
        </p>
        <p className="text-neutral-600 text-base mt-2 dark:text-neutral-300
        mobile:text-center
        tablet:text-center">
          Join us Now! We will conntact you soon.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-row gap-4 mb-4
          mobile:flex-col
          "
          >
            <LabelInputContainer>
              <Label htmlFor="firstname" className="text-base" >First name</Label>
              <Input id="firstname" placeholder="Type your first name" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname"  className="text-base">Last name</Label>
              <Input id="lastname" placeholder="Type your last name" type="text" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="text-base">Your Email</Label>
            <Input id="email" placeholder="Type your email" type="email" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password"  className="text-base">Phone number</Label>
            <Input id="password" placeholder="Contact number" type="phone" />
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
