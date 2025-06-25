"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiGlobe } from "react-icons/bi";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const switchLanguage = (locale: string) => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 p-2 md:px-3 md:py-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-900"
        aria-label="Select language"
      >
        <BiGlobe className="w-5 h-5" />
        <span className="font-medium text-sm md:text-base hidden md:inline">
          {currentLocale === "en" ? "English" : "العربية"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-secondary-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            <Link
              href={pathname.replace(/^\/[a-z]{2}/, "/en")}
              className="block px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
              onClick={() => switchLanguage("en")}
            >
              English
            </Link>
            <Link
              href={pathname.replace(/^\/[a-z]{2}/, "/ar")}
              className="block px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
              onClick={() => switchLanguage("ar")}
            >
              العربية
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
