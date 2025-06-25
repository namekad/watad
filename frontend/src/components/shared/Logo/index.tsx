"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  return (
    <Link href={`/${currentLocale}`} className={`block ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Al-Watad Logo"
        width={120}
        height={40}
        className="h-8 md:h-10 w-auto"
        priority
      />
    </Link>
  );
}
