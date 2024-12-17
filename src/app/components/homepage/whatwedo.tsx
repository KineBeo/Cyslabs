import Lenis from "lenis";
import React, { useEffect, useRef, useState } from "react";
import { ReactLenis } from "lenis/react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import RandomStarBackground from "../ui/random-start-background";

// Define the Service type
interface Service {
  title: string;
  description: string;
  icon: string;
}

// Define props types
interface AnimatedServiceCardProps {
  service: Service;
  index: number;
}

export default function WhatWeDo() {
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

  const services: Service[] = [
    {
      title: "Web Application Development",
      description: "Custom web apps tailored to your business needs",
      icon: "💻",
    },
    {
      title: "UI/UX Design",
      description: "Deliver intuitive and engaging user experiences",
      icon: "🎨",
    },
    {
      title: "API Integration",
      description: "Seamless integration with third-party services and tools",
      icon: "🔗",
    },
    {
      title: "Performance Optimization",
      description: "Ensure fast and reliable application performance",
      icon: "⚡",
    },
    {
      title: "Security Solutions",
      description: "Implement robust security measures to protect your data",
      icon: "🛡️",
    },
    {
      title: "Maintenance & Support",
      description: "Ongoing updates and technical support for your web apps",
      icon: "🛠️",
    },
  ];

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <RandomStarBackground id="what-we-do">
        <div className="h-screen text-white py-16 justify-center items-center flex">
          <div className="mx-auto mobile:px-8 tablet:px-8">
            <h2 className="desktop:text-7xl laptop:text-6xl mini-laptop:text-5xl tablet:text-4xl mobile:text-3xl font-bold text-center my-12">What We Do</h2>
            <div className="grid grid-cols-1 laptop:grid-cols-3 desktop:grid-cols-3 px-6 mobile:px-2 gap-10">
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
      className="bg-gray-900 p-6 rounded-3xl shadow-xl  hover:bg-gray-800"
    >
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
      <p className="text-gray-300">{service.description}</p>
    </motion.div>
  );
}