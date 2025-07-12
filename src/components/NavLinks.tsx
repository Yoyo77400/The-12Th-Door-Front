"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "#", label: "Home" },
  { href: "#", label: "Leaderboard" },
  { href: "#", label: "Rewards" },
  { href: "#", label: "FAQ" },
];

const v1Links = [
  { href: "/rewards", label: "Rewards" },
  { href: "/collection", label: "Collection" },
];

export default function NavLinks() {
  const pathname = usePathname();

  const isAppLaunched = pathname.startsWith("/v1");

  return (
    <nav className="flex gap-6">
      {!isAppLaunched &&
        links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm font-medium hover:text-purple-400 transition"
          >
            {link.label}
          </Link>
        ))}
      {isAppLaunched &&
        v1Links.map((link) => (
          <Link
            key={link.label}
            href={"/v1" + link.href}
            className="text-sm font-medium hover:text-purple-400 transition"
          >
            {link.label}
          </Link>
        ))}
    </nav>
  );
}
