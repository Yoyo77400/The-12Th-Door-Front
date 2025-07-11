"use client";

import Logo from "./Logo";
import NavLinks from "@/components/NavLinks";
import { useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();

  const { login } = useLogin({
    onComplete: () => router.push("/dashboard"),
  });

  return (
    <header className="text-foreground text-white py-4 px-6 flex justify-between items-center border-b border-[#443149]/60">
      {/* Ellipse background */}
      <div className="absolute w-[700px] h-[600px] bg-primary opacity-30 rounded-full blur-3xl left-1/2 -translate-x-1/2 -top-32 z-[-1] -translate-y-1/2" />

      <Logo />
      <div className="flex items-center gap-10">
        <NavLinks />
      </div>
      <div className="flex items-center gap-6">
        <Button variant="default">Launch App</Button>
      </div>
    </header>
  );
}
