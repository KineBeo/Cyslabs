"use client";
import { cn } from "@/src/lib/utils";
import React, { ReactNode } from "react";
import { SparklesCore } from "../ui/sparkles";

interface SpaceBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: SpaceBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-950 dark:bg-zinc-950 text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 z-0 w-full h-full">
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
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `
             [--aurora:repeating-linear-gradient(100deg,#1e3a8a_0%,#2563eb_30%,#3b82f6_50%,#2563eb_70%,#1e3a8a_100%)]
              [background-image:var(--aurora)]
              [background-size:200%]
              [background-position:50%_50%]
              filter blur-[10px]
              after:content-[""]
              after:absolute
              after:inset-0
              after:[background-image:var(--aurora)]
              after:[background-size:200%]
              after:animate-aurora
              after:[background-attachment:fixed]
              after:mix-blend-soft-light
              absolute
              -inset-[10px]
              opacity-50
              will-change-transform`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default AuroraBackground;
