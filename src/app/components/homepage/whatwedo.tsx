import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  Suspense,
  memo
} from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { ReactLenis } from "lenis/react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { Service } from "@/src/service/strapi/interface/collection";
import { ServicesSection } from "@/src/service/strapi/interface/section";

// Dynamically import heavy components
const RandomStarBackground = dynamic(() => import("../ui/random-start-background"), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />,
});

// Optimized Icon Component with dynamic import
const ServiceIcon = memo(({ name }: { name: string }) => {
  // Replace with actual icon rendering logic
  return <div className="text-4xl">{name}</div>;
});
ServiceIcon.displayName = 'ServiceIcon';

// Memoized and optimized AnimatedServiceCard
const AnimatedServiceCard = memo<{
  service: Service;
  index: number;
  isLoaded: boolean;
}>(({ service, index, isLoaded }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.1,
    once: false,
  });
  const controls = useAnimation();

  // Memoize animation variants
  const animationVariants = useMemo(() => ({
    initial: { opacity: 0.5, y: 0 },
    inView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        ease: "backOut",
        delay: index * 0.1,
      }
    },
    outOfView: {
      opacity: 0,
      y: 100,
      transition: {
        duration: 2,
        ease: "backOut",
      }
    }
  }), [index]);

  useEffect(() => {
    const animateCard = async () => {
      if (!isLoaded) {
        await controls.set(animationVariants.initial);
        return;
      }

      await controls.start(isInView ? animationVariants.inView : animationVariants.outOfView);
    };

    animateCard();
  }, [isLoaded, isInView, controls, animationVariants]);

  return (
    <motion.div
      ref={ref}
      initial={animationVariants.initial}
      animate={controls}
      exit={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "backOut",
        },
      }}
      className="bg-gray-900 hover:bg-gray-800 shadow-xl p-6 rounded-3xl transition-colors duration-300"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ServiceIcon name={service.icon} />
      </Suspense>
      <h3 className="mb-2 font-bold text-xl mt-4">{service.title}</h3>
      <p className="text-gray-300">{service.description}</p>
    </motion.div>
  );
});
AnimatedServiceCard.displayName = 'AnimatedServiceCard';

export default function WhatWeDo({ props }: { props: ServicesSection }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Memoize services to prevent unnecessary re-renders
  const memoizedServices = useMemo(() =>
    props.services.map((service, index) => (
      <AnimatedServiceCard
        key={service.id || index}
        service={service}
        index={index}
        isLoaded={isLoaded}
      />
    )),
    [props.services, isLoaded]
  );

  useEffect(() => {
    // Optimize Lenis initialization
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Slight delay to ensure initial render is complete
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      lenis.destroy();
      clearTimeout(loadTimer);
    };
  }, []);

  return (
    <ReactLenis root>
      <RandomStarBackground id="what-we-do">
        <div className="flex justify-center items-center py-16 h-full text-white">
          <div className="mx-auto mobile:px-8 tablet:px-8">
            <h2 className="my-12 font-bold text-center desktop:text-7xl laptop:text-6xl mini-laptop:text-5xl tablet:text-4xl mobile:text-3xl">
              What We Do
            </h2>
            <div className="gap-10 grid grid-cols-1 desktop:grid-cols-3 laptop:grid-cols-3 px-6 mobile:px-2">
              <AnimatePresence>
                {memoizedServices}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </RandomStarBackground>
    </ReactLenis>
  );
}