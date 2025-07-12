"use client";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="cursor-pointer" href="/">
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold">12th</span>
        <span className="text-xl font-semibold text-white/80">Door</span>
      </div>
    </Link>
  );
}
