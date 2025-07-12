"use client";

import { useState } from "react";
import SportsCardGrid, { CardItem } from "@/components/SportsCardGrid";
import SportsCard from "@/components/SportsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sampleCards: CardItem[] = [
  {
    id: 1,
    match: "PSG - Strasbourg",
    date: "12 Aug 2023",
    playerName: "Fabian Ruiz",
    teamName: "Paris Saint-Germain",
    imageSrc: "/images/fabian.png",
    rarity: "rare",
    action: "Longshot goal",
    competition: "Ligue 1",
    result: "Victory 3-0",
  },
  {
    id: 3,
    match: "PSG - Rennes",
    date: "19 Sep 2023",
    playerName: "Khvicha Kvaratskhelia",
    teamName: "Paris Saint-Germain",
    imageSrc: "/images/Sport-card-kvara.png",
    rarity: "legendary",
    action: "Exceptional ball touch",
    competition: "Champions League",
    result: "Victory 2-0",
  },
  {
    id: 4,
    match: "PSG - Real Madrid",
    date: "27 Oct 2024",
    playerName: "Vitinha",
    teamName: "Paris Saint-Germain",
    imageSrc: "/images/vitinha.png",
    rarity: "common",
    action: "",
    competition: "Ligue 1",
    result: "Victory 4-0",
  },
  {
    id: 5,
    match: "PSG - Real Madrid",
    date: "11 July 2025",
    playerName: "Gonçalo Ramos",
    teamName: "Paris Saint-Germain",
    imageSrc: "/images/diogo.png",
    rarity: "rare",
    action: "",
    competition: "Ligue 1",
    result: "Draw 1-1",
  },
];

export default function CollectionPage() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtrer les cartes en fonction du filtre actif et de la recherche
  const filteredCards = sampleCards.filter((card) => {
    // Filtre par compétition
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "ligue1" && card.competition === "Ligue 1") ||
      (activeFilter === "champions" && card.competition === "Champions League");

    // Filtre par recherche
    const matchesSearch =
      searchQuery === "" ||
      card.playerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.match.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Gérer le clic sur une carte
  const handleCardClick = (cardId: number) => {
    setSelectedCard(cardId);
  };

  // Trouver les détails de la carte sélectionnée
  const selectedCardData = selectedCard
    ? sampleCards.find((card) => card.id === selectedCard)
    : null;

  return (
    <div className="container mx-auto py-8 mx-24">
      <h1 className="text-3xl font-bold text-white/90 mb-8 text-center">
        Collection
      </h1>

      {/* Filtres et recherche */}
      <div className="mb-8 px-24 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex gap-2 flex-wrap">
          <Button
            className={`px-4 py-2 ${
              activeFilter === "all"
                ? "bg-[#443149] text-white"
                : "bg-black border border-[#443149]/60 text-white/70"
            } rounded-md hover:bg-[#443149]/80 transition ${
              activeFilter === "all" ? "animated" : ""
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </Button>
          <Button
            className={`px-4 py-2 ${
              activeFilter === "ligue1"
                ? "bg-[#443149] text-white"
                : "bg-black border border-[#443149]/60 text-white/70"
            } rounded-md hover:bg-[#443149]/80 transition ${
              activeFilter === "ligue1" ? "animated" : ""
            }`}
            onClick={() => setActiveFilter("ligue1")}
          >
            Ligue 1
          </Button>
          <Button
            className={`px-4 py-2 ${
              activeFilter === "champions"
                ? "bg-[#443149] text-white"
                : "bg-black border border-[#443149]/60 text-white/70"
            } rounded-md hover:bg-[#443149]/80 transition ${
              activeFilter === "champions" ? "animated" : ""
            }`}
            onClick={() => setActiveFilter("champions")}
          >
            Champions League
          </Button>
        </div>
        <div className="w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Utilisation du composant SportsCardGrid */}
      <SportsCardGrid
        cards={filteredCards}
        onCardClick={handleCardClick}
        emptyMessage="No cards found"
        emptyActionLabel="See all cards"
        onEmptyAction={() => {
          setActiveFilter("all");
          setSearchQuery("");
        }}
      />

      {/* Modal pour afficher une carte en grand */}
      {selectedCard && selectedCardData && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-[#0E0A0F] p-6 rounded-lg max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center m-4 mb-4">
              <h2 className="text-2xl font-bold text-white">
                {selectedCardData.match}
              </h2>
              <Button
                className="text-white/70 hover:text-white text-xl"
                onClick={() => setSelectedCard(null)}
              >
                ×
              </Button>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0">
                <SportsCard
                  imageSrc={selectedCardData.imageSrc}
                  playerName={selectedCardData.playerName}
                  teamName={selectedCardData.teamName}
                  rarity={selectedCardData.rarity}
                  size="none"
                />
              </div>
              <div className="flex-grow">
                <p className="text-white mb-2">
                  <span className="mr-2 font-semibold text-white/70">
                    Date:
                  </span>{" "}
                  {selectedCardData.date}
                </p>
                <p className="text-white mb-2">
                  <span className="mr-2 font-semibold text-white/70">
                    Competition:
                  </span>{" "}
                  {selectedCardData.competition}
                </p>
                <p className="text-white mb-2">
                  <span className="mr-2 font-semibold text-white/70">
                    Result:
                  </span>{" "}
                  {selectedCardData.result}
                </p>
                <p className="text-white mb-2">
                  <span className="mr-2 font-semibold text-white/70">
                    Action:
                  </span>{" "}
                  {selectedCardData.action}
                </p>
                <p className="text-white mb-6">
                  <span className="mr-2 font-semibold text-white/70">
                    Rarity:
                  </span>
                  {(() => {
                    const rarity = selectedCardData.rarity || "common";
                    const bgColor =
                      rarity === "common"
                        ? "bg-gray-600"
                        : rarity === "rare"
                        ? "bg-purple-700"
                        : rarity === "epic"
                        ? "bg-purple-500"
                        : "bg-yellow-600";

                    return (
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs ${bgColor}`}
                      >
                        {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                      </span>
                    );
                  })()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
