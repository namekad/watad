"use client";

import Image from "next/image";

// Icons import (placeholder paths - we'll need to add actual icons)
const icons = {
  network: "/icons/network.svg",
  social: "/icons/social.svg",
  shield: "/icons/shield.svg",
};

interface Feature {
  title: string;
  points: string[];
}

interface ServiceCardProps {
  title: string;
  intro: string;
  features: Feature[];
  icon: string;
}

function ServiceCard({ title, intro, features, icon }: ServiceCardProps) {
  return (
    <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg">
          <Image
            src={icons[icon as keyof typeof icons]}
            alt={title}
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </div>
        <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white">
          {title}
        </h3>
      </div>

      <p className="text-secondary-600 dark:text-secondary-300 mb-6">{intro}</p>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="border-t dark:border-secondary-700 pt-4">
            <h4 className="font-medium text-secondary-900 dark:text-white mb-2">
              {feature.title}
            </h4>
            <ul className="space-y-2">
              {feature.points.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-secondary-600 dark:text-secondary-300"
                >
                  <span className="text-primary-600 dark:text-primary-400">
                    •
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ServicesProps {
  title: string;
  description: string;
  sections: {
    [key: string]: {
      title: string;
      intro: string;
      features: Feature[];
      icon: string;
    };
  };
}

export default function Services({
  title,
  description,
  sections,
}: ServicesProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-secondary-900 dark:text-white">
            {title}
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(sections).map(([key, section]) => (
            <ServiceCard
              key={key}
              title={section.title}
              intro={section.intro}
              features={section.features}
              icon={section.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
