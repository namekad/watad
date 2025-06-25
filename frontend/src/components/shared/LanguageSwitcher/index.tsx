"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split("/")[1];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLanguage = (newLocale: string) => {
    const currentPath = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${currentPath}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 md:px-3 md:py-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-900"
        aria-label="Select language"
      >
        <Image
          src="/globe.svg"
          alt=""
          width={20}
          height={20}
          className="w-5 h-5 pointer-events-none"
        />
        <span className="font-medium text-sm md:text-base hidden md:inline">
          {currentLocale.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 md:w-48 rounded-lg shadow-lg bg-white dark:bg-secondary-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <button
              onClick={() => toggleLanguage("en")}
              className={`flex items-center gap-3 w-full px-3 md:px-4 py-2 text-sm ${
                currentLocale === "en"
                  ? "text-primary-600 bg-primary-50 dark:bg-primary-900/10"
                  : "text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700/50"
              }`}
            >
              <span className="font-medium">English</span>
              {currentLocale === "en" && (
                <span className="ml-auto text-primary-600">✓</span>
              )}
            </button>
            <button
              onClick={() => toggleLanguage("ar")}
              className={`flex items-center gap-3 w-full px-3 md:px-4 py-2 text-sm ${
                currentLocale === "ar"
                  ? "text-primary-600 bg-primary-50 dark:bg-primary-900/10"
                  : "text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700/50"
              }`}
            >
              <span className="font-medium">العربية</span>
              {currentLocale === "ar" && (
                <span className="ml-auto text-primary-600">✓</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
