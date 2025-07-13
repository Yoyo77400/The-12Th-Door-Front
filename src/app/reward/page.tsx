"use client";

import { useState } from "react";
import Image from "next/image";
import Cubes from "@/components/Cubes";
import RewardSection from "@/components/RewardSection";

export default function Reward() {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] pt-8 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Title */}
      <div className="text-5xl font-bold mb-8 pt-6 text-white">Rewards</div>
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
