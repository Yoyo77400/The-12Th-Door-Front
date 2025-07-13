"use client";

import { fanTokens } from "@/lib/data/fanTokens";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import ModalTicket from "@/components/ModalTicket";

type Props = {
  selected: number;
};

export default function RewardSection({ selected }: Props) {
  const club = fanTokens[selected];
  const logo = club?.logo ?? null;
  const label = club?.Label ?? "Club";
  const [showModal, setShowModal] = useState(false);

  const hasAccess = club?.tokenStaked > 0; // Exemple de condition d'accès

  const now = Date.now();
  const claimTarget = new Date(now + (club?.claimAfterSeconds ?? 0) * 1000);
  const matchTarget = new Date(now + (club?.nextMatchInSeconds ?? 0) * 1000);

  const [claimTimeLeft, setClaimTimeLeft] = useState(getTimeRemaining(claimTarget));
  const [matchTimeLeft, setMatchTimeLeft] = useState(getTimeRemaining(matchTarget));

  useEffect(() => {
    const interval = setInterval(() => {
      setClaimTimeLeft(getTimeRemaining(claimTarget));
      setMatchTimeLeft(getTimeRemaining(matchTarget));
    }, 1000);
    return () => clearInterval(interval);
  }, [selected]);

  function getTimeRemaining(target: Date) {
    const now = new Date().getTime();
    const diff = target.getTime() - now;

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    return {
      total: diff,
      text: `${String(Math.max(0, minutes)).padStart(2, "0")}m ${String(Math.max(0, seconds)).padStart(2, "0")}s`,
    };
  }

  let content;

  if (hasAccess) {
    content = (
  <div className="space-y-8">
    <p className="text-sm text-green-300 text-center">
      Congratulations! You have access to exclusive {label} rewards.
    </p>

    {/* Tokens Staked au centre */}
    <div className="text-center text-green-200 text-sm font-semibold">
      Tokens Staked: {club?.tokenStaked ?? 0}
    </div>

    {/* Section boutons + infos */}
    <div className="flex justify-between items-start flex-wrap gap-6 mt-4">
      {/* Colonne gauche */}
      <div className="flex flex-col items-start gap-3">
        <Button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Scan my ticket
        </Button>
        <div className="text-sm text-green-200">
          <span className="font-semibold">Next Match:</span>{" "}
          <span className="text-white ml-1">
            {matchTimeLeft.total > 0 ? matchTimeLeft.text : "Now!"}
          </span>
        </div>
      </div>

      {/* Colonne droite */}
      <div className="flex flex-col items-end gap-3 text-right">
        <button
          disabled={claimTimeLeft.total > 0}
          className={`px-4 py-2 rounded transition ${
            claimTimeLeft.total > 0
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "bg-yellow-600 text-white hover:bg-yellow-500"
          }`}
        >
          Claim season reward
        </button>
        <div className="text-sm">
          {claimTimeLeft.total > 0 ? (
            <span className="text-gray-300">
              Available in {claimTimeLeft.text}
            </span>
          ) : (
            <span className="text-green-400">Available</span>
          )}
        </div>
      </div>
    </div>
  </div>
);

  } else {
    content = (
      <div className="space-y-2">
        <p className="text-red-300 text-xl">
          You do not yet have access to this club's rewards.
        </p>
        <p className="text-3xl font-bold text-white">What are the benefits?</p>
        <ul className="list-disc pl-5 text-sm text-gray-400">
          <li>Detain and stake fan tokens on Socios!</li>
          <li>Be rewarded for your engagement!</li>
          <li>Get exclusive content for your match attendance!</li>
        </ul>
        <button className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-100 transition">
          <Link href="https://www.socios.com/" className="hover:underline text-lg">
            Get {label} Fan Tokens on Socios.com
          </Link>
        </button>
      </div>
    );
  }

  return (
    <section className="relative flex-1 bg-gray-900 rounded-2xl p-6 shadow-md w-full mt-4 mb-4 overflow-hidden">
      {/* Background logo */}
      {logo && (
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <img
            src={logo}
            alt="Background"
            className="opacity-5 w-full h-full object-contain"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-gray-400 space-y-4">
        <h2 className="text-5xl font-bold">{label}</h2>
        {content}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="modal-ticket bg-white text-black rounded-lg p-6 w-full max-w-3xl shadow-lg animate-in slide-in-from-top-8 duration-300">
            <ModalTicket />
            <div className="mt-4 text-right">
              <Button
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
