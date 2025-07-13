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
      { teamName: "PSG", matchCount: 12, nftWon: 5 },
      { teamName: "Real Madrid", matchCount: 8, nftWon: 3 },
    ],
  },
  {
    publicKey: "0x9i8u7y6t5r4e3w2q1p0",
    teams: [
      { teamName: "Barcelona", matchCount: 15, nftWon: 7 },
      { teamName: "Bayern Munich", matchCount: 6, nftWon: 2 },
    ],
  },
  {
    publicKey: "0x2c3v4b5n6m7k8j9h0g1",
    teams: [
      { teamName: "Manchester City", matchCount: 10, nftWon: 4 },
      { teamName: "Liverpool", matchCount: 9, nftWon: 3 },
    ],
  },
  {
    publicKey: "0x7f6d5s4a3p2o1i9u8y7",
    teams: [
      { teamName: "Juventus", matchCount: 7, nftWon: 2 },
      { teamName: "AC Milan", matchCount: 5, nftWon: 1 },
      { teamName: "Inter Milan", matchCount: 3, nftWon: 0 },
    ],
  },
  {
    publicKey: "0x3e4r5t6y7u8i9o0p1a2",
    teams: [
      { teamName: "Arsenal", matchCount: 11, nftWon: 4 },
      { teamName: "Chelsea", matchCount: 8, nftWon: 3 },
      { teamName: "Tottenham", matchCount: 6, nftWon: 1 },
    ],
  },
  {
    publicKey: "0x8q9w0e1r2t3y4u5i6o7",
    teams: [
      { teamName: "Atletico Madrid", matchCount: 9, nftWon: 3 },
      { teamName: "Sevilla", matchCount: 7, nftWon: 2 },
    ],
  },
  {
    publicKey: "0x5z6x7c8v9b0n1m2a3s4",
    teams: [
      { teamName: "Borussia Dortmund", matchCount: 10, nftWon: 5 },
      { teamName: "RB Leipzig", matchCount: 6, nftWon: 2 },
    ],
  },
  {
    publicKey: "0x1q2w3e4r5t6y7u8i9o0",
    teams: [
      { teamName: "Ajax", matchCount: 8, nftWon: 3 },
      { teamName: "PSV", matchCount: 5, nftWon: 1 },
    ],
  },
  {
    publicKey: "0x9a8s7d6f5g4h3j2k1l0",
    teams: [
      { teamName: "Porto", matchCount: 7, nftWon: 2 },
      { teamName: "Benfica", matchCount: 6, nftWon: 2 },
      { teamName: "Sporting CP", matchCount: 4, nftWon: 1 },
    ],
  },
  {
    publicKey: "0x4f5g6h7j8k9l0z1x2c3",
    teams: [
      { teamName: "Lyon", matchCount: 9, nftWon: 3 },
      { teamName: "Marseille", matchCount: 7, nftWon: 2 },
      { teamName: "Monaco", matchCount: 5, nftWon: 1 },
    ],
  },
  {
    publicKey: "0x6v7b8n9m0a1s2d3f4g5",
    teams: [
      { teamName: "Napoli", matchCount: 8, nftWon: 3 },
      { teamName: "Roma", matchCount: 6, nftWon: 2 },
      { teamName: "Lazio", matchCount: 4, nftWon: 1 },
    ],
  },
  {
    publicKey: "0x2p3o4i5u6y7t8r9e0w1",
    teams: [
      { teamName: "Celtic", matchCount: 7, nftWon: 2 },
      { teamName: "Rangers", matchCount: 6, nftWon: 1 },
    ],
  },
  {
    publicKey: "0x7l8k9j0h1g2f3d4s5a6",
    teams: [
      { teamName: "Zenit", matchCount: 5, nftWon: 1 },
      { teamName: "CSKA Moscow", matchCount: 4, nftWon: 1 },
    ],
  },
  {
    publicKey: "0x0m9n8b7v6c5x4z3a2s1",
    teams: [
      { teamName: "Galatasaray", matchCount: 6, nftWon: 2 },
      { teamName: "Fenerbahçe", matchCount: 5, nftWon: 1 },
      { teamName: "Beşiktaş", matchCount: 4, nftWon: 1 },
    ],
  },
  {
    publicKey: "0x3d4f5g6h7j8k9l0p1o2",
    teams: [
      { teamName: "Ajax", matchCount: 7, nftWon: 2 },
      { teamName: "Feyenoord", matchCount: 5, nftWon: 1 },
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
