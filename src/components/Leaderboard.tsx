"use client";

import { useState, useMemo } from "react";

type LeaderboardTeam = {
  teamName: string;
  matchCount: number;
  nftWon: number;
};

export interface LeaderboardData {
  publicKey: string;
  teams: LeaderboardTeam[];
}

interface LeaderboardProps {
  data: LeaderboardData[];
}

type SortOption = "matches" | "nfts";

export default function Leaderboard({ data }: LeaderboardProps) {
  const [sortBy, setSortBy] = useState<SortOption>("matches");

  // Calculate total matches and NFTs for each player and sort the data
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aTotal =
        sortBy === "matches"
          ? a.teams.reduce((total, team) => total + team.matchCount, 0)
          : a.teams.reduce((total, team) => total + team.nftWon, 0);

      const bTotal =
        sortBy === "matches"
          ? b.teams.reduce((total, team) => total + team.matchCount, 0)
          : b.teams.reduce((total, team) => total + team.nftWon, 0);

      return bTotal - aTotal;
    });
  }, [data, sortBy]);
  return (
    <div className="w-full overflow-x-auto mb-24">
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setSortBy("matches")}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              sortBy === "matches"
                ? "bg-[#443149] text-white"
                : "bg-[#0E0A0F]/80 text-white/70 hover:bg-[#443149]/70 hover:text-white"
            }`}
          >
            Sort by Matches
          </button>
          <button
            type="button"
            onClick={() => setSortBy("nfts")}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              sortBy === "nfts"
                ? "bg-[#443149] text-white"
                : "bg-[#0E0A0F]/80 text-white/70 hover:bg-[#443149]/70 hover:text-white"
            }`}
          >
            Sort by NFTs
          </button>
        </div>
      </div>
      <div className="bg-[#0E0A0F]/80 border border-[#443149]/60 rounded-lg overflow-hidden shadow-xl">
        {/* En-tête du tableau */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#443149]/60 bg-[#443149]/20 text-white font-medium">
          <div className="col-span-1 md:col-span-1 text-center">Rank</div>
          <div className="col-span-3 md:col-span-4">Public Key</div>
          <div className="col-span-4 md:col-span-3 text-center">
            Number of matches attended
          </div>
          <div className="col-span-3 md:col-span-3 text-center">
            Number of NFT won
          </div>
        </div>

        {/* Corps du tableau */}
        <div className="divide-y divide-[#443149]/40">
          {sortedData.length > 0 ? (
            sortedData.map((item, index) => (
              <div
                key={item.publicKey || index}
                className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#443149]/10 transition-colors"
              >
                <div className="col-span-1 md:col-span-1 text-center font-semibold text-white/90">
                  {index + 1}
                </div>
                <div className="col-span-3 md:col-span-4 font-mono text-sm text-white/80 truncate">
                  {item.publicKey}
                </div>
                <div className="col-span-4 md:col-span-3 text-center text-white/90">
                  {item.teams.reduce(
                    (total, team) => total + team.matchCount,
                    0
                  )}
                </div>
                <div className="col-span-3 md:col-span-3 text-center text-white/90">
                  {item.teams.reduce((total, team) => total + team.nftWon, 0)}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-white/60">
              No leaderboard data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
