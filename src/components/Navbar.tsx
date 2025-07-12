"use client";

import Logo from "./Logo";
import NavLinks from "@/components/NavLinks";
import { useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isAppLaunched = pathname.startsWith("/v1");

  const { login } = useLogin({
    onComplete: () => router.push("/v1"),
  });

  return (
    <header className="text-foreground text-white py-4 px-6 flex justify-between items-center border-b border-[#443149]/60">
      {/* Ellipse background */}
      <div className="absolute w-full h-[600px] bg-primary opacity-30 rounded-full blur-3xl left-1/2 -translate-x-1/2 -top-32 z-[-1] -translate-y-1/2" />
      <Logo />
      <div className="items-center gap-10 hidden lg:flex">
        <NavLinks />
      </div>
      {!isAppLaunched && (
        <div className="flex items-center gap-6">
          <Button variant="default" onClick={login}>
            Launch App
          </Button>
        </div>
      )}
    </header>
  );
}
