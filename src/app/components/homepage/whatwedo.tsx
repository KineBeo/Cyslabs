import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  Suspense
} from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { ReactLenis } from "lenis/react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { Service } from "@/src/service/strapi/interface/collection";
import { ServicesSection } from "@/src/service/strapi/interface/section";

// Pre-define animation variants outside component to prevent recreation
const CARD_ANIMATION_VARIANTS = {
  initial: { opacity: 0.5, y: 0 },
  exit: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "backOut",
    },
  }
};

// Cache for service cards
const cardCache = new Map();

const RandomStarBackground = dynamic(() => import("../ui/random-start-background"), {
  ssr: false,
});

const ServiceIcon = React.memo(({ name }: { name: string }) => {
  return <div className="text-4xl">{name}</div>;
});
ServiceIcon.displayName = 'ServiceIcon';

const AnimatedServiceCard = React.memo(({ service, index, isLoaded }: {
  service: Service;
  index: number;
  isLoaded: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.1,
  });
  const controls = useAnimation();

  // Generate unique cache key
  const cacheKey = `${service.id}-${index}`;

  // Get or create animation variants
  const animationVariants = useMemo(() => {
    if (cardCache.has(cacheKey)) {
      return cardCache.get(cacheKey);
    }

    const variants = {
      ...CARD_ANIMATION_VARIANTS,
      inView: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 1.5, // Reduced from 2
          ease: "backOut",
          delay: Math.min(index * 0.08, 0.5), // Capped delay
        }
      },
      outOfView: {
        opacity: 0,
        y: 100,
        transition: {
          duration: 1.5, // Reduced from 2
          ease: "backOut",
        }
      }
    };

    cardCache.set(cacheKey, variants);
    return variants;
  }, [index, cacheKey]);

  useEffect(() => {
    if (!isLoaded) {
      controls.set(animationVariants.initial);
      return;
    }

    if (isInView) {
      controls.start(animationVariants.inView);
    }
  }, [isLoaded, isInView, controls, animationVariants]);

  // Memoize card content
  const cardContent = useMemo(() => (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ServiceIcon name={service.icon} />
      </Suspense>
      <h3 className="mb-2 font-bold text-xl mt-4">{service.title}</h3>
      <p className="text-gray-300">{service.description}</p>
    </>
  ), [service]);

  return (
    <motion.div
      ref={ref}
      initial={animationVariants.initial}
      animate={controls}
      exit={animationVariants.exit}
      className="bg-gray-900 hover:bg-gray-800 shadow-xl p-6 rounded-3xl transition-colors duration-300"
    >
      {cardContent}
    </motion.div>
  );
});
AnimatedServiceCard.displayName = 'AnimatedServiceCard';

const WhatWeDo = React.memo(({ props }: { props: ServicesSection }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Memoize services with useCallback
  const renderServices = useCallback(() =>
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
    let rafId: number;

    if (!lenisRef.current) {
      const lenis = new Lenis({
        lerp: 0.08, // Reduced from 0.1
        smoothWheel: true,
        wheelMultiplier: 0.8 // Added for smoother scrolling
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // Reduced delay
    const loadTimer = setTimeout(() => setIsLoaded(true), 50);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(loadTimer);
    };
  }, []);

  // Memoize the entire content
  const content = useMemo(() => (
    <div className="flex justify-center items-center py-16 h-full text-white">
      <div className="mx-auto mobile:px-8 tablet:px-8">
        <h2 className="my-12 font-bold text-center desktop:text-7xl laptop:text-6xl mini-laptop:text-5xl tablet:text-4xl mobile:text-3xl">
          What We Do
        </h2>
        <div className="gap-10 grid grid-cols-1 desktop:grid-cols-3 laptop:grid-cols-3 px-6 mobile:px-2">
          <AnimatePresence>
            {renderServices()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  ), [renderServices]);

  return (
    <ReactLenis root>
      <RandomStarBackground id="what-we-do">
        {content}
      </RandomStarBackground>
    </ReactLenis>
  );
});
WhatWeDo.displayName = 'WhatWeDo';

export default WhatWeDo;