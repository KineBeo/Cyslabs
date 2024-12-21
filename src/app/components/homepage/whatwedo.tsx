import Lenis from "lenis";
import React, { useEffect, useRef, useState } from "react";
import { ReactLenis } from "lenis/react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import RandomStarBackground from "../ui/random-start-background";
import { Service } from "@/src/service/strapi/interface/collection";
import { ServicesSection } from "@/src/service/strapi/interface/section";

// Define props types
interface AnimatedServiceCardProps {
  service: Service;
  index: number;
}

interface WhatWeDoProps {
  props: ServicesSection;
}

export default function WhatWeDo({ props }: WhatWeDoProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

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

  const services = props.services;
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <RandomStarBackground id="what-we-do">
        <div className="flex justify-center items-center py-16 h-full text-white">
          <div className="mx-auto mobile:px-8 tablet:px-8">
            <h2 className="my-12 font-bold text-center desktop:text-7xl laptop:text-6xl mini-laptop:text-5xl tablet:text-4xl mobile:text-3xl">What We Do</h2>
            <div className="gap-10 grid grid-cols-1 desktop:grid-cols-3 laptop:grid-cols-3 px-6 mobile:px-2">
              <AnimatePresence>
                {services.map((service, index) => (
                  <AnimatedServiceCard
                    key={index}
                    service={service}
                    index={index}
                    isLoaded={isLoaded}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </RandomStarBackground>
    </ReactLenis>
  );
}

function AnimatedServiceCard({
  service,
  index,
  isLoaded,
}: AnimatedServiceCardProps & { isLoaded: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.2,
    once: false,
  });
  const controls = useAnimation();

  useEffect(() => {
    const animateCard = async () => {
      if (!isLoaded) {
        // Initial state - fully visible but positioned
        await controls.set({
          opacity: 50,
          y: 0,
        });
        return;
      }

      if (isInView) {
        // Animate in when scrolling down
        await controls.start({
          opacity: 1,
          y: 0,
          transition: {
            duration: 2,
            ease: "backOut",
            delay: index * 0.1, // Stagger effect
          },
        });
      } else {
        // Animate out when scrolling up/down out of view
        await controls.start({
          opacity: 0,
          y: 100, // Increase distance for more pronounced effect
          transition: {
            duration: 2,
            ease: "backOut",
          },
        });
      }
    };

    animateCard();
  }, [isLoaded, isInView, controls, index]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 1,
        y: 200,
      }}
      animate={controls}
      exit={{
        opacity: 100,
        y: 0,
        transition: {
          duration: 1.5,
          ease: "backOut",
        },
      }}
      className="bg-gray-900 hover:bg-gray-800 shadow-xl p-6 rounded-3xl"
    >
      <div className="mb-4 text-4xl">{service.icon}</div>
      <h3 className="mb-2 font-bold text-xl">{service.title}</h3>
      <p className="text-gray-300">{service.description}</p>
    </motion.div>
  );
}