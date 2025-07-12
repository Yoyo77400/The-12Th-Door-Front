"use client";

import Leaderboard, { LeaderboardData } from "@/components/Leaderboard";

// Exemple de données pour le leaderboard
const mockData: LeaderboardData[] = [
  {
    publicKey: "0x1a2b3c4d5e6f7g8h9i0j",
    teams: [
      { teamName: "PSG", matchCount: 5, nftWon: 2 },
      { teamName: "Real Madrid", matchCount: 3, nftWon: 1 },
    ],
  },
  {
    publicKey: "0x9i8h7g6f5e4d3c2b1a0",
    teams: [
      { teamName: "Barcelona", matchCount: 8, nftWon: 4 },
      { teamName: "Bayern Munich", matchCount: 2, nftWon: 0 },
    ],
  },
  {
    publicKey: "0x2c3d4e5f6g7h8i9j0k1l",
    teams: [
      { teamName: "Manchester City", matchCount: 6, nftWon: 3 },
      { teamName: "Liverpool", matchCount: 4, nftWon: 2 },
    ],
  },
];

export default function LeaderboardExample() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Leaderboard Example</h1>
      <Leaderboard data={mockData} />
    </div>
  );
}
