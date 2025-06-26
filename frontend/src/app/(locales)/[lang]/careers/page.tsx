"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface ValueCardProps {
  title: string;
  description: string;
  index: number;
}

const ValueCard = ({ title, description, index }: ValueCardProps) => (
  <AnimateOnScroll delay={index * 0.1}>
    <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-secondary-600 dark:text-secondary-300">
        {description}
      </p>
    </div>
  </AnimateOnScroll>
);

const BenefitCard = ({ title, description, index }: ValueCardProps) => (
  <AnimateOnScroll delay={index * 0.1}>
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">
          {index === 0 ? "📈" : index === 1 ? "⚖️" : "💰"}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-secondary-600 dark:text-secondary-300">
        {description}
      </p>
    </div>
  </AnimateOnScroll>
);

export default function CareersPage() {
  const t = useTranslations("careers");

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-white dark:bg-secondary-800">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold text-center text-secondary-900 dark:text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-center text-secondary-600 dark:text-secondary-300 mb-4">
              {t("subtitle")}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AnimateOnScroll>
              <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8">
                {t("intro")}
              </p>
              <p className="text-lg text-secondary-600 dark:text-secondary-300">
                {t("description")}
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-secondary-800">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center text-secondary-900 dark:text-white mb-12">
              {t("values.title")}
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t.raw("values.items").map((value: any, index: number) => (
              <ValueCard
                key={index}
                title={value.title}
                description={value.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center text-secondary-900 dark:text-white mb-12">
              {t("benefits.title")}
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t.raw("benefits.items").map((benefit: any, index: number) => (
              <BenefitCard
                key={index}
                title={benefit.title}
                description={benefit.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-secondary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AnimateOnScroll>
              <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-4">
                {t("cta")}
              </p>
              <a
                href={`mailto:${t("email")}`}
                className="text-2xl font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                {t("email")}
              </a>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
