"use client";
import { cn } from "@/src/lib/utils";
import React, { ReactNode, useEffect, useRef } from "react";

interface SpaceBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  numberOfStars?: number;
  interactionRadius?: number;
  repelStrength?: number;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  numberOfStars = 100,
  interactionRadius = 100,
  repelStrength = 0.5,
  ...props
}: SpaceBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // Star particle class
    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      twinkleSpeed: number;
      originalX: number;
      originalY: number;
      velocityX: number;
      velocityY: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.originalX = this.x;
        this.originalY = this.y;
        this.size = Math.random() * 2;
        this.opacity = Math.random();
        this.speed = 0.1 + Math.random() * 2.0;
        this.twinkleSpeed = 0.003 + Math.random() * 0.007;
        this.velocityX = 0;
        this.velocityY = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }

      update() {
        // Twinkle effect
        this.opacity += Math.sin(Date.now() * this.twinkleSpeed) * 0.01;
        this.opacity = Math.max(0.2, Math.min(1, this.opacity));

        // Calculate distance from mouse
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply repulsion force if mouse is nearby
        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          this.velocityX += (dx / distance) * force * repelStrength;
          this.velocityY += (dy / distance) * force * repelStrength;
        }

        // Apply return force to original position
        const returnForce = 0.05;
        this.velocityX += (this.originalX - this.x) * returnForce;
        this.velocityY += (this.originalY - this.y) * returnForce;

        // Apply friction
        this.velocityX *= 0.95;
        this.velocityY *= 0.95;

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Slow upward movement
        this.originalY += this.speed;
        if (this.originalY > (canvas?.height || 0)) {
          this.originalY = 0;
          this.originalX = Math.random() * (canvas?.width || 0);
          this.x = this.originalX;
          this.y = this.originalY;
        }
      }
    }

    // Create stars
    const stars = Array.from({ length: numberOfStars }, () => new Star());

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.update();
        star.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [numberOfStars, interactionRadius, repelStrength]);

  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-950 dark:bg-zinc-950 text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
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