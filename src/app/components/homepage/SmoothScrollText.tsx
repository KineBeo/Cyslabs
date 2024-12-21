// components/SmoothScroll.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import RandomStarBackground from '../ui/random-start-background';
import { Omit } from '@react-spring/web';
import { Questions } from '@/src/service/strapi/interface/section';

function convertTextToTsx(text: string): JSX.Element {
  const parts = text.split('|').map(part => part.trim());
  return (
    <>
      {parts[0]} <br /> {parts[1]}
    </>
  );
}
interface SmoothScrollProps {
  props: Omit<Questions, "__component">;
}

export default function SmoothScroll({ props }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const sections = props.answers;

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
      <div ref={wrapperRef} className="relative w-full min-h-screen">
        <div ref={containerRef} className="relative h-[325vh] desktop:h-[350vh]">
          {/* Fixed left section */}
          <div className="top-0 sticky flex justify-center items-center p-8 w-1/2 h-screen">
            <div className="p-10 border-blue-500 border-l-4">
              <h1 className="font-bold text-white mobile:text-2xl tablet:text-3xl mini-laptop:text-4xl laptop:text-5xl desktop:text-7xl leading-tight">
                {convertTextToTsx(props.question)}
              </h1>
            </div>
          </div>

          {/* Scrolling right section */}
          <div className="desktop:top-80 laptop:top-80 mini-laptop:top-80 mobile:top-80 tablet:top-80 right-0 absolute desktop:space-y-96 laptop:space-y-64 mini-laptop:space-y-64 mobile:space-y-64 tablet:space-y-64 w-1/2">
            {sections && sections.map((section, index) => (
              <motion.div
                key={index}
                className="flex items-center w-2/3 mobile:w-full tablet:w-4/5 h-[30vh]"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.6, // Increased duration for smoother animation
                  ease: [0.5, 0, 0.5, 1], // Changed easing function for smoother animation
                }}
              >
                <div className="p-8 rounded-lg">
                  <h2 className="mb-4 font-bold text-white mobile:text-xl tablet:text-2xl mini-laptop:text-3xl laptop:text-4xl desktop:text-5xl">{section.title}</h2>
                  <p className="desktop:font-semibold text-gray-300 desktop:text-2xl">{section.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </RandomStarBackground>
  );
}