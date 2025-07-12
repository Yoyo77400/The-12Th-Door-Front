"use client";

import { cn } from "@/lib/utils";
import SportsCard from "./SportsCard";
import { useState } from "react";

type TimelineItem = {
  title: string;
  date: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  isWon: boolean;
};

const exampleTimelineItem: TimelineItem[] = [
  {
    title: "PSG - Strasbourg",
    date: "12 Aug 2023",
    description: "You have won a card",
    status: "completed",
    isWon: true,
  },
  {
    title: "PSG - Lens",
    date: "26 Aug 2023",
    description: "Unlucky, this time time you lost",
    status: "completed",
    isWon: false,
  },
  {
    title: "PSG - Monaco",
    date: "26 Nov 2023",
    description: "Ongoing match",
    status: "current",
    isWon: false,
  },
  {
    title: "PSG - Newcastle",
    date: "28 Nov 2023",
    description: "Champions League - Next match",
    status: "upcoming",
    isWon: false,
  },
];

type TimelineProps = {
  items?: TimelineItem[];
  className?: string;
};

export default function Timeline({ className }: TimelineProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <div className={cn("w-full py-6", className)}>
      {/* Conteneur principal avec ligne horizontale */}
      <div className="relative w-full flex justify-center">
        {/* Ligne horizontale continue */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-[#443149]/30 z-0" />

        {/* Points et contenu */}
        <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl px-4 md:px-0">
          {exampleTimelineItem.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 md:gap-0 relative"
            >
              {/* Point sur la ligne */}
              <div
                className={cn(
                  "rounded-full h-8 w-8 flex items-center justify-center z-10 border-2",
                  {
                    "bg-[#443149] text-white border-[#443149]":
                      item.status === "completed",
                    "bg-gradient-to-br from-[#443149] to-[#0E0A0F] text-white border-[#443149]/60":
                      item.status === "current",
                    "bg-black border-[#443149]/30 text-[#443149]/50":
                      item.status === "upcoming",
                  }
                )}
                onMouseEnter={() => (item.isWon ? setHoveredItem(index) : null)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.status === "completed" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>

              {/* Contenu en dessous du point */}
              <div className="mt-6 text-center w-42 md:w-52">
                <h3
                  className={cn("text-sm font-bold truncate", {
                    "text-white":
                      item.status === "completed" || item.status === "current",
                    "text-white/50": item.status === "upcoming",
                  })}
                >
                  {item.title}
                </h3>
                <span
                  className={cn("text-xs block", {
                    "text-white/80":
                      item.status === "completed" || item.status === "current",
                    "text-white/40": item.status === "upcoming",
                  })}
                >
                  {item.date}
                </span>
                <p
                  className={cn("text-xs mt-1 line-clamp-2", {
                    "text-white/70":
                      item.status === "completed" || item.status === "current",
                    "text-white/30": item.status === "upcoming",
                  })}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
