"use client";
import { cn } from "@/src/lib/utils";
import React, { ReactNode } from "react";
import { SparklesCore } from "../ui/sparkles";
import { Overlay } from "../threejs/Overlay";
import { Scene } from "../threejs/Scene";

interface SpaceBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
    showRadialGradient?: boolean;
}

export const WhatWeDoBackground = ({
    className,
    children,
    showRadialGradient = true,
    ...props
}: SpaceBackgroundProps) => {
    return (
      <main className="">
        <div
          className={cn(
            "relative flex flex-col min-h-screen items-center justify-center bg-zinc-950 dark:bg-zinc-950 text-slate-950 transition-bg",
            className
          )}
          {...props}
        >
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={2.4}
              particleDensity={15}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
          {children}
        </div>
      </main>
    );
};

export default WhatWeDoBackground;