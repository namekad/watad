"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimateOnScroll from "../AnimateOnScroll";

interface HeroProps {
  translations: {
    title: string;
    description: string;
    primaryCTA: string;
    secondaryCTA: string;
  };
}

export default function Hero({ translations }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary-50 to-white dark:from-secondary-900 dark:to-secondary-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary-100/50 dark:from-primary-900/30" />
        <div className="absolute h-96 w-96 -top-24 -right-24 rounded-full bg-primary-200/50 dark:bg-primary-800/30 blur-3xl" />
      </div>

      <div className="container-content relative z-10">
        <div className="grid gap-8 py-20 md:grid-cols-2 md:py-32 lg:gap-16">
          {/* Hero Content */}
          <div className="flex flex-col justify-center">
            <AnimateOnScroll animation="slideRight">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-secondary-900 dark:text-white md:text-5xl lg:text-6xl">
                {translations.title}
              </h1>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slideRight" delay={0.2}>
              <p className="mb-8 text-lg text-secondary-600 dark:text-secondary-300 md:text-xl">
                {translations.description}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slideRight" delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-primary">
                  {translations.primaryCTA}
                </button>
                <button className="btn btn-secondary">
                  {translations.secondaryCTA}
                </button>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Hero Image */}
          <div className="relative flex items-center justify-center">
            <AnimateOnScroll animation="slideLeft">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full max-w-lg"
              >
                <Image
                  src="/images/hero.jpg"
                  alt="Hero Image"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-xl"
                  priority
                />
              </motion.div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
