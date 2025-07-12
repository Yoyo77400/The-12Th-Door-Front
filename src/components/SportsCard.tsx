import Image from "next/image";

export interface SportsCardProps {
  imageSrc?: string;
  playerName?: string;
  teamName?: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
  size?: "sm" | "md" | "lg" | "none";
  className?: string;
}

export default function SportsCard({
  imageSrc = "/images/Sport-card-kvara.png",
  playerName,
  teamName,
  rarity = "rare",
  size = "md",
  className = "",
}: SportsCardProps) {
  // Définir les dimensions en fonction de la taille
  const dimensions = {
    none: { width: 250, height: 250, containerClass: "" },
    sm: { width: 150, height: 200, containerClass: "w-[250px] h-[250px]" },
    md: { width: 260, height: 360, containerClass: "w-[350px] h-[450px]" },
    lg: { width: 450, height: 600, containerClass: "w-[750px] h-[750px]" },
  };

  return (
    <div
      className={`relative ${dimensions[size].containerClass} z-10 ${className} mx-auto flex flex-col items-center`}
    >
      <div className="relative w-full h-full flex justify-center items-center">
        <Image
          className={`transition-all duration-300 hover:scale-105`}
          src={imageSrc}
          alt={playerName || "Player Image"}
          width={dimensions[size].width}
          height={dimensions[size].height}
          priority
        />
      </div>
      {playerName && (
        <div className="w-2/3 bg-black/60 backdrop-blur-sm p-2 rounded z-10 mt-2 text-center">
          <p className="text-white font-semibold text-sm">{playerName}</p>
          {teamName && <p className="text-white/70 text-xs">{teamName}</p>}
        </div>
      )}
    </div>
  );
}
