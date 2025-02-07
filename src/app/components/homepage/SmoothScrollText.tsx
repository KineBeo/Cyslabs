import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useTransform, MotionProps } from 'framer-motion';
import RandomStarBackground from '../ui/random-start-background';
import { Omit } from '@react-spring/web';
import { Questions } from '@/src/service/strapi/interface/section';

// Memoized text conversion to prevent unnecessary re-renders
const convertTextToTsx = (text: string): React.ReactNode => {
  const parts = text.split('|').map(part => part.trim());
  return parts.length > 1 ? (
    <>
      {parts[0]} <br /> {parts[1]}
    </>
  ) : text;
};

interface SmoothScrollProps {
  props: Omit<Questions, "__component">;
}

// Memoized Answer Section Component
const AnswerSection = React.memo(({
  title,
  description
}: {
  title: string,
  description: string
}) => {
  const sectionVariants = useMemo(() => ({
    initial: { opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.5, 0, 0.5, 1]
      }
    }
  }), []);

  return (
    <motion.div
      initial={sectionVariants.initial}
      whileInView={sectionVariants.animate}
      viewport={{ once: false }}
      className="flex items-center w-2/3 mobile:w-full tablet:w-4/5 h-[30vh]"
    >
      <div className="p-8 rounded-lg">
        <h2 className="mb-4 font-bold text-white mobile:text-xl tablet:text-2xl mini-laptop:text-3xl laptop:text-4xl desktop:text-5xl">
          {title}
        </h2>
        <p className="desktop:font-semibold text-gray-300 desktop:text-2xl">
          {description}
        </p>
      </div>
    </motion.div>
  );
});

export default function SmoothScroll({ props }: SmoothScrollProps) {
  // Optimize Lenis initialization with useRef
  const lenisRef = useRef<Lenis | null>(null);

  // Memoize scroll configuration
  const scrollConfig = useMemo(() => ({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1,
    smoothWheel: true,
    touchMultiplier: 2,
  }), []);

  // Refs for scroll tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Memoize sections to prevent unnecessary re-renders
  const sections = useMemo(() => props.answers || [], [props.answers]);

  // Optimize Lenis setup with useCallback
  const setupLenis = useCallback(() => {
    if (lenisRef.current) return;

    lenisRef.current = new Lenis(scrollConfig);

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [scrollConfig]);

  // Use effect for Lenis setup
  useEffect(() => {
    const cleanup = setupLenis();
    return cleanup;
  }, [setupLenis]);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

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
            {sections.map((section, index) => (
              <AnswerSection
                key={section.title || index}
                title={section.title}
                description={section.description}
              />
            ))}
          </div>
        </div>
      </div>
    </RandomStarBackground>
  );
}