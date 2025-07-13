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
    <nav className="flex gap-6 z-50">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="cursor-pointer text-sm font-medium hover:text-purple-400 transition"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
