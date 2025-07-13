"use client";

import Logo from "./Logo";
import NavLinks from "@/components/NavLinks";
import WalletConnection from "./WalletConnection";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { Button } from "./ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { primaryWallet } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicKey = primaryWallet?.address;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Version Desktop */}
      <header className="hidden md:flex text-foreground text-white pt-2 pb-2 px-6 justify-between items-center border-b border-[#443149]/60">
        {/* Ellipse background */}
        <div className="absolute h-[600px] bg-primary opacity-30 rounded-full blur-3xl left-1/2 -translate-x-1/2 -top-32 z-[-1] -translate-y-1/2" />
        <Logo />
        <div className="items-center gap-10 hidden lg:flex">
          <NavLinks />
        </div>
        {!isLoggedIn ? <WalletConnection /> : <Button>{publicKey}</Button>}
      </header>

      {/* Version Mobile */}
      <div className="md:hidden">
        <header className="text-foreground text-white pt-2 pb-2 px-4 flex justify-between items-center border-b border-[#443149]/60 relative z-50">
          {/* Ellipse background */}
          <div className="absolute h-[600px] bg-primary opacity-30 rounded-full blur-3xl left-1/2 -translate-x-1/2 -top-32 z-[-1] -translate-y-1/2" />
          <Logo />
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-[#443149]/20 transition-colors relative z-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Menu Mobile - Full height overlay */}
        <div
          className={`fixed inset-0 bg-[#0E0A0F] z-40 transition-opacity duration-300 ${
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            <div className="flex flex-col items-center justify-center flex-grow space-y-8">
              <NavLinks />
              <div className="w-full max-w-xs flex justify-center items-center">
                {!isLoggedIn ? (
                  <WalletConnection />
                ) : (
                  <Button className="w-full">{publicKey}</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
