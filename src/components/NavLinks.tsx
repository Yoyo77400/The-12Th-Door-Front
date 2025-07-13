"use client";

import Link from "next/link";

const links = [
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/reward", label: "Reward" },
  { href: "/collection", label: "Collection" },
  { href: "/scan", label: "Scan" },
];

export default function NavLinks() {
  return (
    <nav className="flex md:flex-row flex-col md:gap-6 gap-6 z-50 md:items-center">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="cursor-pointer md:text-sm text-xl font-medium hover:text-purple-400 transition text-white/80 md:py-0 py-2 block text-center"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
