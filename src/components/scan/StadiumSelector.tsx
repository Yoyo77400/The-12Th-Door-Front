"use client";

import { Stadium } from "@/app/scan/page";

interface StadiumSelectorProps {
  stadiums: Stadium[];
  selectedStadium: Stadium | null;
  onSelectStadium: (stadium: Stadium) => void;
}

export default function StadiumSelector({ 
  stadiums, 
  selectedStadium, 
  onSelectStadium 
}: StadiumSelectorProps) {
  return (
    <div className="space-y-3">
      {stadiums.map((stadium) => (
        <div
          key={stadium.id}
          onClick={() => onSelectStadium(stadium)}
          className={`p-4 rounded-lg cursor-pointer transition-colors ${
            selectedStadium?.id === stadium.id
              ? "bg-[#443149]/40 border-2 border-[#443149]"
              : "bg-[#0E0A0F] border border-[#443149]/40 hover:bg-[#443149]/20"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white/90">{stadium.name}</h3>
              <p className="text-sm text-white/60 mt-1">
                Rayon: {stadium.radius}m
              </p>
            </div>
            {selectedStadium?.id === stadium.id && (
              <svg className="w-6 h-6 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
