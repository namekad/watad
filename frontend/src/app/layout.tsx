"use client";

import { usePathname } from "next/navigation";
import { LazyMotion, domAnimation } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { inter, poppins, cairo } from "./fonts";
import "./globals.css";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const pathname = usePathname();
  const isRTL = pathname.startsWith("/ar");

  return (
    <html
      lang={isRTL ? "ar" : "en"}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${inter.variable} ${poppins.variable} ${cairo.variable}`}
    >
      <body>
        <LazyMotion features={domAnimation}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </LazyMotion>
      </body>
    </html>
  );
}
