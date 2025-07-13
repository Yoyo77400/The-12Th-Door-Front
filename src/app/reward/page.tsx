"use client";
import { useState, useEffect } from "react";
import Cubes from "@/components/Cubes";
import RewardSection from "@/components/RewardSection";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

export default function Reward() {
  const [selected, setSelected] = useState<number>(0);
  const { primaryWallet } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  const [walletAddress, setWalletAddress] = useState<string>("");

  useEffect(() => {
    if (isLoggedIn && primaryWallet?.address) {
      setWalletAddress(primaryWallet.address);
      console.log("Connected wallet address:", primaryWallet.address);
    }
  }, [isLoggedIn, primaryWallet]);

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] pt-8 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Title */}
      <div className="text-5xl font-bold mb-8 pt-6 text-white">Rewards</div>

      {/* Wallet Address */}
      {isLoggedIn && walletAddress && (
        <div className="bg-[#443149] text-white rounded-lg p-3 mb-4 flex items-center">
          <span className="font-medium mr-2">Wallet:</span>
          <span className="text-violet-300 truncate">{walletAddress}</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-600 text-white rounded-full text-xs">
          🃏
        </span>
        <span className="font-semibold text-gray-400">x3 actual nft cards</span>
      </div>

      {/* Section cubes : on passe selected et onSelect */}
      <Cubes selected={selected} onSelect={setSelected} />

      {/* Section dynamique : reçoit selected */}
      <RewardSection selected={selected} />
    </div>
  );
}
