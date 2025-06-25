"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import MobileMenu from "./MobileMenu";

const navigation = [
  { name: { en: "Home", ar: "الرئيسية" }, href: "/" },
  { name: { en: "About", ar: "من نحن" }, href: "/about" },
  { name: { en: "Services", ar: "خدماتنا" }, href: "/services" },
  { name: { en: "Contact", ar: "اتصل بنا" }, href: "/contact" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  return (
    <header className="w-full py-3 md:py-4 border-b bg-white dark:bg-secondary-900 relative z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo className="flex-shrink-0" />

          {/* Mobile Menu */}
          <MobileMenu
            navigation={navigation}
            currentLocale={currentLocale}
            pathname={pathname}
          />

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${currentLocale}${item.href}`}
                  className={`text-sm font-medium hover:text-primary-600 transition-colors ${
                    pathname === `/${currentLocale}${item.href}`
                      ? "text-primary-600"
                      : "text-secondary-600 dark:text-secondary-300"
                  }`}
                >
                  {item.name[currentLocale as keyof typeof item.name]}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language Switcher */}
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
