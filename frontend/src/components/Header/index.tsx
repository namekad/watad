"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split("/")[1];

  const navigation = [
    { name: { en: "Home", ar: "الرئيسية" }, href: "/" },
    { name: { en: "About", ar: "من نحن" }, href: "/about" },
    { name: { en: "Services", ar: "خدماتنا" }, href: "/services" },
    { name: { en: "Contact", ar: "اتصل بنا" }, href: "/contact" },
  ];

  const toggleLanguage = (newLocale: string) => {
    const currentPath = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${currentPath}`);
  };

  return (
    <header className="w-full py-4 border-b">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex gap-4">
          {navigation.map((item) => (
            <li key={item.name[currentLocale as keyof typeof item.name]}>
              <Link
                href={`/${currentLocale}${item.href}`}
                className="hover:text-blue-600 transition-colors"
              >
                {item.name[currentLocale as keyof typeof item.name]}
              </Link>
            </li>
          ))}
        </ul>
        <div className="language-switcher flex gap-2">
          <button
            onClick={() => toggleLanguage("en")}
            className={`px-2 py-1 rounded ${
              currentLocale === "en" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => toggleLanguage("ar")}
            className={`px-2 py-1 rounded ${
              currentLocale === "ar" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            AR
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
