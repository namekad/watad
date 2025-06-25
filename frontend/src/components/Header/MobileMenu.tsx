"use client";

import { useState } from "react";
import Link from "next/link";

interface MobileMenuProps {
  navigation: readonly {
    readonly name: {
      readonly en: string;
      readonly ar: string;
    };
    readonly href: string;
  }[];
  currentLocale: string;
  pathname: string;
}

export default function MobileMenu({
  navigation,
  currentLocale,
  pathname,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 md:hidden text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full bg-white dark:bg-secondary-900 border-b dark:border-secondary-800 shadow-lg md:hidden">
          <ul className="container px-4 py-3 space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${currentLocale}${item.href}`}
                  className={`block py-2 text-base font-medium hover:text-primary-600 transition-colors ${
                    pathname === `/${currentLocale}${item.href}`
                      ? "text-primary-600"
                      : "text-secondary-600 dark:text-secondary-300"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name[currentLocale as keyof typeof item.name]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
