"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`block ${className}`}>
      <Image
        src="/icons/wtd.png"
        alt="Al-Watad Logo"
        width={120}
        height={40}
        className="h-8 md:h-10 w-auto object-contain"
        priority
      />
    </Link>
  );
}
