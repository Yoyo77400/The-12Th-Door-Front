"use client";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link className="cursor-pointer" href="/">
      {/* <div className="flex items-end gap-2">
        <span className="text-2xl font-bold">12th</span>
        <span className="text-xl font-semibold text-white/80">Door</span>
      </div> */}
      <Image src="/images/logo3.png" alt="Logo" width={80} height={80} />
    </Link>
  );
}
