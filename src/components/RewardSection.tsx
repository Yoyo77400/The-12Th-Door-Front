"use client";

import { fanTokens } from "@/lib/data/fanTokens";
import Link from "next/link";
import { useState } from "react";
import Countdown from "@/components/Countdown";
import UploadForm from "@/components/UploadForm";

type Props = {
  selected: number;
};

export default function RewardSection({ selected }: Props) {
  const club = fanTokens[selected];
  const logo = club?.logo ?? null;
  const label = club?.Label ?? "Titre du club";
  const [showModal, setShowModal] = useState(false);

  // Condition bidon
  const hasAccess = selected % 2 === 0;

  let content;

  if (hasAccess) {
    // SI accès autorisé
    content = (
      <div className="space-y-4">
        <p className="text-sm text-green-300">
          Congratulations! You have access to exclusive {label} rewards.
        </p>
        <div className="flex justify-center">
          <UploadForm />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-green-200 text-center mt-[4rem]">
          <div>
            <span className="font-semibold">Tokens Staked:</span> 120
          </div>
          <div>
            <span className="font-semibold">Next Match:</span>
            <Countdown />
          </div>
        </div>
      </div>
    );
  } else {
    // SINON accès refusé
    content = (
      <div className="space-y-2">
        <p className="text-red-300 text-1xl">
          You do not yet have access to this club&apos;s rewards.
        </p>
        <p className="text-3xl font-bold text-white">What are the benefits ?</p>
        <ul className="list-disc pl-5 text-sm text-gray-400">
          <li>Detain and stake fan tokens on the socios !</li>
          <li>Be rewarded for your engagement !</li>
          <li>Get exclusive content for your match attendance !</li>
        </ul>
        <button className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-100 transition">
          <Link
            href="https://www.socios.com/"
            className="hover:underline text-1xl"
          >
            Get {label} Fan Tokens on Socios.com
          </Link>
        </button>
      </div>
    );
  }

  return (
    <section className="relative flex-1 bg-gray-900 rounded-2xl p-6 shadow-md w-full mt-4 mb-4 overflow-hidden">
      {/* Image de fond */}
      {logo && (
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <img
            src={logo}
            alt="Background"
            className="opacity-5 w-full h-full object-contain"
          />
        </div>
      )}

      {/* Contenu commun */}
      <div className="relative z-10 text-gray-400 space-y-4">
        <h2 className="text-5xl font-bold">{label}</h2>
        {content}
      </div>

      {showModal && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-bold mb-4">Available Prizes</h3>
            <p className="text-sm">Coming soon...</p>
            <div className="mt-4 text-right">
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
