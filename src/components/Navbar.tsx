"use client";

import Logo from "./Logo";
import NavLinks from "@/components/NavLinks";
import WalletConnection from "./WalletConnection";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { Button } from "./ui/button";

export default function Navbar() {
  const { primaryWallet } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();

  // La publicKey peut être récupérée à partir du primaryWallet
  const publicKey = primaryWallet?.address;

  return (
    <header className="text-foreground text-white pt-2 pb-2 px-6 flex justify-between items-center border-b border-[#443149]/60">
      {/* Ellipse background */}
      <div className="absolute w-full h-[600px] bg-primary opacity-30 rounded-full blur-3xl left-1/2 -translate-x-1/2 -top-32 z-[-1] -translate-y-1/2" />
      <Logo />
      <div className="items-center gap-10 hidden lg:flex">
        <NavLinks />
      </div>
      {!isLoggedIn ? <WalletConnection /> : <Button>{publicKey}</Button>}
    </header>
  );
}
