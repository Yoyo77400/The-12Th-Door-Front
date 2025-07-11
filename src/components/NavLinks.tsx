const links = [
  { href: "#", label: "Home" },
  { href: "#", label: "Leaderboard" },
  { href: "#", label: "Rewards" },
  { href: "#", label: "FAQ" },
];

export default function NavLinks() {
  return (
    <nav className="flex gap-6">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-sm font-medium hover:text-purple-400 transition"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
