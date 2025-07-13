"use client";

import { ReactNode } from "react";
import SportsCard, { SportsCardProps } from "./SportsCard";

// Étendre l'interface SportsCardProps pour créer CardItem
export interface CardItem extends Omit<SportsCardProps, "size" | "className"> {
  id: number;
  match: string;
  date: string;
  competition?: string;
  action?: string;
  result?: string;
}

interface SportsCardGridProps {
  cards: CardItem[];
  onCardClick?: (cardId: number) => void;
  emptyMessage?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  children?: ReactNode;
}

export default function SportsCardGrid({
  cards = [],
  onCardClick,
  emptyMessage = "Vous n'avez pas encore de cartes dans votre collection.",
  emptyActionLabel = "Découvrir des matchs",
  onEmptyAction,
  children,
}: SportsCardGridProps) {
  return (
    <div className="w-full">
      {children}

      {/* Grille de cartes */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => onCardClick && onCardClick(card.id)}
            >
              <div className="mb-2">
                <SportsCard
                  imageSrc={card.imageSrc}
                  playerName={card.playerName}
                  teamName={card.teamName}
                  rarity={card.rarity}
                  size="md"
                  className="mx-auto"
                />
              </div>
              <div className="mt-2 text-center">
                <p className="text-white/70 text-sm z-10">{card.date}</p>
                {card.rarity && (
                  <span
                    className={`inline-block text-white/80 px-2 py-1 rounded-full text-xs mt-1 ${
                      card.rarity === "common"
                        ? "bg-gray-600"
                        : card.rarity === "rare"
                        ? "bg-purple-700"
                        : card.rarity === "epic"
                        ? "bg-purple-500"
                        : "bg-yellow-600"
                    }`}
                  >
                    {card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-white/70 text-xl">{emptyMessage}</p>
          {onEmptyAction && (
            <button
              className="mt-4 px-6 py-3 bg-[#443149] text-white rounded-md hover:bg-[#443149]/80 transition animated"
              onClick={onEmptyAction}
            >
              {emptyActionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
