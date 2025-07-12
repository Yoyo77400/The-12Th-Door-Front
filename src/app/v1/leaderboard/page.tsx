import Leaderboard from "@/components/Leaderboard";

type LeaderboardTeam = {
  teamName: string;
  matchCount: number;
  nftWon: number;
};

export interface LeaderboardData {
  publicKey: string;
  teams: LeaderboardTeam[];
}

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

export default function LeaderboardPage() {
  return (
    <div className="w-2/3 mx-auto mt-8">
      <Leaderboard data={mockData} />
    </div>
  );
}
