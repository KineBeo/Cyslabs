"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/src/lib/utils";
import dynamic from "next/dynamic";

const RandomStarBackground = dynamic(() => import("../ui/random-start-background"), {
  ssr: false,
});


// Define types for form data
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

// Props interface for LabelInputContainer
interface LabelInputContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Component for input container
const LabelInputContainer: React.FC<LabelInputContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>{children}</div>
  );
};

// Props for BottomGradient
const BottomGradient: React.FC = () => {
  return (
    <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent" />
  );
};

const InfoForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: FormData = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RandomStarBackground
      id="signup-star"
      className="h-screen flex items-center justify-center
      mobile:px-4
      tablet:px-8
      mini-laptop:px-8"
    >
      <div
        className="max-w-3xl w-full h-fit mx-auto shadow-input bg-black border border-neutral-500
        desktop:p-8 desktop:rounded-2xl 
        laptop:p-8 laptop:rounded-2xl
        p-4 rounded-xl transition-all
        ease-in-out duration-300"
      >
        <p className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center capitalize">
          CYSLABS are here for you
        </p>
        <p className="text-neutral-600 text-base mt-2 dark:text-neutral-300 text-center">
          Do you want to contact with us?
        </p>
        <p className="text-neutral-600 text-base mt-2 dark:text-neutral-300 text-center">
          Join us Now! We will contact you soon.
        </p>

        {success && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-md">
            Thank you for your submission! We will contact you soon.
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md">
            {error}
          </div>
        )}

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-row gap-4 mb-4 mobile:flex-col">
            <LabelInputContainer>
              <Label htmlFor="firstname" className="text-base font-semibold">
                First name
              </Label>
              <Input
                name="firstname"
                id="firstname"
                placeholder="Type your first name"
                type="text"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname" className="text-base font-semibold">
                Last name
              </Label>
              <Input
                name="lastname"
                id="lastname"
                placeholder="Type your last name"
                type="text"
                required
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="text-base font-semibold">
              Your Email
            </Label>
            <Input
              name="email"
              id="email"
              placeholder="Type your email"
              type="email"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="phone" className="text-base font-semibold">
              Phone number
            </Label>
            <Input
              name="phone"
              id="phone"
              placeholder="Contact number"
              type="tel"
              required
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"} &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </RandomStarBackground>
  );
};

export default InfoForm;
