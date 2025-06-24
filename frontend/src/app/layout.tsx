"use client";

import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang={isRTL ? "ar" : "en"} dir={isRTL ? "rtl" : "ltr"}>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
