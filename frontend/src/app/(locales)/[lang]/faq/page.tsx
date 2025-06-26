"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useTranslations } from "next-intl";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-secondary-200 dark:border-secondary-700">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-secondary-900 dark:text-white">
          {question}
        </span>
        <span
          className={`ml-6 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-secondary-600 dark:text-secondary-300 whitespace-pre-line">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQPage() {
  const t = useTranslations("faq");
  const questions = Array.from({ length: 8 }, (_, i) => ({
    question: t(`questions.${i}.question`),
    answer: t(`questions.${i}.answer`),
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <AnimateOnScroll>
          <h1 className="text-4xl font-bold text-center text-secondary-900 dark:text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-center text-secondary-600 dark:text-secondary-300 mb-12">
            {t("subtitle")}
          </p>
        </AnimateOnScroll>

        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll delay={0.2}>
            <div className="space-y-2">
              {questions.map((faq, index) => (
                <FAQItem key={index} {...faq} />
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.4}>
            <div className="mt-12 text-center">
              <p className="text-secondary-600 dark:text-secondary-300">
                {t("stillHaveQuestions")}{" "}
                <a
                  href="/contact"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {t("contactSupport")}
                </a>
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
}
