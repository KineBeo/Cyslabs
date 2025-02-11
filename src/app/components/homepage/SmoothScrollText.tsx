import React, { useEffect, useRef, useMemo, useCallback, memo } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion } from 'framer-motion';
import { Omit } from '@react-spring/web';
import { Questions } from '@/src/service/strapi/interface/section';
import dynamic from 'next/dynamic';

// Tối ưu dynamic import với suspense
const RandomStarBackground = dynamic(() => import('../ui/random-start-background'), {
  ssr: false,
});

// Tối ưu text conversion
const useConvertText = (text: string) =>
  useMemo(() => {
    const parts = text.split('|').map(part => part.trim());
    return parts.length > 1 ? (
      <>
        {parts[0]} <br className="hidden lg:inline" />
        <span className="lg:hidden" />
        {parts[1]}
      </>
    ) : text;
  }, [text]);

// Animation variants đơn giản hóa
const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// Tối ưu AnswerSection với memo sâu
const AnswerSection = memo(({ title, description }: { title: string, description: string }) => {
  const animationProps = useMemo(() => ({
    initial: 'initial',
    whileInView: 'animate',
    viewport: { margin: "0px 0px -25% 0px" },
    variants: sectionVariants
  }), []);

  return (
    <motion.div
      {...animationProps}
      className="flex items-center w-4/5 mobile:w-full h-[30vh]"
    >
      <div className="p-4 rounded-lg transform transition lg:hover:scale-105 md:hover:scale-105">
        <h2 className="mb-4 font-bold text-white mobile:text-xl tablet:text-2xl mini-laptop:text-3xl laptop:text-4xl desktop:text-5xl">
          {title}
        </h2>
        <p className="desktop:font-semibold text-gray-300 desktop:text-2xl">
          {description}
        </p>
      </div>
    </motion.div>
  );
}, (prev, next) =>
  prev.title === next.title && prev.description === next.description
);

AnswerSection.displayName = 'AnswerSection';

// Component chính
const SmoothScroll = memo(({ props }: { props: Omit<Questions, "__component"> }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const convertedQuestion = useConvertText(props.question);
  const rafHandle = useRef<number>(0);

  // Tối ưu Lenis config
  const scrollConfig = useMemo(() => ({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 0.5,
    smoothWheel: true,
    touchMultiplier: 1.2,
    lerp: 0.1,
  }), []);

  const setupLenis = useCallback(() => {
    if (!wrapperRef.current || !containerRef.current || lenisRef.current) return;

    lenisRef.current = new Lenis({
      ...scrollConfig,
      wrapper: wrapperRef.current,
      content: containerRef.current
    });

    const animate = (time: number) => {
      lenisRef.current?.raf(time);
      rafHandle.current = requestAnimationFrame(animate);
    };
    rafHandle.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafHandle.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [scrollConfig]);

  useEffect(() => {
    setupLenis();
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [setupLenis]);

  // Tối ưu render answer sections
  const renderAnswers = useMemo(() =>
    props.answers?.map((section) => (
      <AnswerSection
        key={section.title + section.description}
        title={section.title}
        description={section.description}
      />
    ))
    , [props.answers]);

  return (
    <RandomStarBackground id="smooth-scroll">
      <div ref={wrapperRef} className="relative w-full min-h-screen">
        <div ref={containerRef} className="relative h-[325vh] desktop:h-[350vh]">
          <div className="sticky top-0 h-screen flex items-center justify-start p-4 lg:p-24 md:p-20 w-1/2">
            <div className="p-4 md:p-10 lg:p-12 border-l-4 border-blue-500">
              <h1 className="font-bold text-white mobile:text-2xl tablet:text-3xl mini-laptop:text-4xl laptop:text-5xl desktop:text-7xl leading-tight">
                {convertedQuestion}
              </h1>
            </div>
          </div>

          <div className="absolute right-0 top-[20%] w-1/2 space-y-40">
            {renderAnswers}
          </div>
        </div>
      </div>
    </RandomStarBackground>
  );
});

SmoothScroll.displayName = 'SmoothScroll';

export default SmoothScroll;