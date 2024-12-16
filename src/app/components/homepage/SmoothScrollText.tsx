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
        <div ref={containerRef} className="h-[300vh] relative">
          {/* Fixed left section */}
          <div className="sticky top-0 w-1/2 h-screen flex items-center justify-center p-8">
            <div className="p-10 border-l-4 border-blue-500">
              <h1 className="text-7xl font-bold text-white leading-tight">
                WHY<br />
                CYSLABS?<br />
              </h1>
            </div>
          </div>

          {/* Scrolling right section */}
          <div className="absolute right-0 w-1/2 desktop:top-80 desktop:space-y-96">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="h-[30vh] w-2/3 flex items-center"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.6, // Increased duration for smoother animation
                  ease: [0.5, 0, 0.5, 1], // Changed easing function for smoother animation
                }}
              >
                <div className="p-8 rounded-lg">
                  <h2 className="desktop:text-5xl text-3xl font-bold text-white mb-4">{section.title}</h2>
                  <p className="text-gray-300 desktop:text-2xl desktop:font-semibold">{section.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </RandomStarBackground>
  );
}