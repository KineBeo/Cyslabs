"use client";;
import { cn } from "@/src/lib/utils";
import React, { ReactNode } from "react";
import { SparklesCore } from "./sparkles";

interface SpaceBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
    showRadialGradient?: boolean;
}

export const RandomStarBackground = ({
  className,
  children,
  showRadialGradient = true,
  id = "tsparticlesfullpage", // Thêm prop id
  ...props
}: SpaceBackgroundProps & { id?: string }) => {
  return (
      <div
        className={cn(
          "relative transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <SparklesCore
            id={id} // Sử dụng prop id
            background="transparent"
            minSize={0.6}
            maxSize={2}
            particleDensity={4}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        {children}
      </div>
  );
};

export default RandomStarBackground;