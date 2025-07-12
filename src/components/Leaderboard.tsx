"use client";

import { Button } from "@/components/ui/button";

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

export default function Leaderboard({ data }: LeaderboardProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="bg-[#0E0A0F]/80 border border-[#443149]/60 rounded-lg overflow-hidden shadow-xl">
        {/* En-tête du tableau */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#443149]/60 bg-[#443149]/20 text-white font-medium">
          <div className="col-span-4 md:col-span-5">Public Key</div>
          <div className="col-span-4 md:col-span-3 text-center">Number of matches attended</div>
          <div className="col-span-3 md:col-span-3 text-center">Number of NFT won</div>
          <div className="col-span-1 md:col-span-1 text-right">Actions</div>
        </div>

        {/* Corps du tableau */}
        <div className="divide-y divide-[#443149]/40">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={item.publicKey || index} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#443149]/10 transition-colors">
                <div className="col-span-4 md:col-span-5 font-mono text-sm text-white/80 truncate">
                  {item.publicKey}
                </div>
                <div className="col-span-4 md:col-span-3 text-center text-white/90">
                  {item.teams.reduce((total, team) => total + team.matchCount, 0)}
                </div>
                <div className="col-span-3 md:col-span-3 text-center text-white/90">
                  {item.teams.reduce((total, team) => total + team.nftWon, 0)}
                </div>
                <div className="col-span-1 md:col-span-1 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-primary hover:text-primary/80 hover:bg-[#443149]/20 p-1 h-auto"
                  >
                    View
                  </Button>
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
