// components/SmoothScroll.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import RandomStarBackground from '../ui/random-start-background';

const sections = [
  {
    title: "We've heard all the reasons to not use smooth scroll.",
    description: "It feels hacky. It's inaccessible. It's not performant. It's over-engineered. And historically, those were all true."
  },
  {
    title: "But we like to imagine things as they could be,",
    description: "then build them. So, why should you use smooth scroll?"
  },
  {
    title: "The answer is simple:",
    description: "Because when done right, it creates an immersive, engaging experience that enhances user interaction."
  },
  {
    title: "It's all about the details.",
    description: "Smooth scrolling can guide users through content in a more controlled, intentional way."
  }
];

export default function SmoothScroll() {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return (
    <RandomStarBackground id="smooth-scroll">
    <div ref={wrapperRef} className="w-full min-h-screen relative">
      <div ref={containerRef} className="h-[350vh] relative">
        {/* Fixed left section */}
        <div className="sticky top-0 left-0 w-1/2 h-screen flex items-center justify-center p-8">
          <div className="bg-black p-12 rounded-lg border border-red-500">
            <h1 className="text-6xl font-bold text-white leading-tight">
              WHY<br />
              CYSLABS?<br />
            </h1>
          </div>
        </div>

        {/* Scrolling right section */}
        <div className="absolute right-0 w-1/2 top-0">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="h-[80vh] flex items-center p-8"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.6, // Increased duration for smoother animation
                ease: [0.42, 0, 0.58, 1], // Changed easing function for smoother animation
              }}
            >
              <div className="bg-black p-8 rounded-lg border border-blue-500">
                <h2 className="text-2xl font-semibold text-white mb-4">{section.title}</h2>
                <p className="text-gray-300">{section.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </RandomStarBackground>
  );
}