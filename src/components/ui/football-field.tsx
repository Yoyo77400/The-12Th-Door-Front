import { cn } from "@/lib/utils";

export default function FootballField({ className }: { className?: string }) {
  return (
    <div className={cn("z-[-1] relative", className)}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full md:rotate-0 md:scale-100 [transform:rotate(90deg)] md:[transform:rotate(0deg)] object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lignes de touche */}
        <rect
          x="50"
          y="50"
          width="700"
          height="400"
          fill="none"
          stroke="#443149"
          strokeOpacity="0.5"
          strokeWidth="3"
        />

        {/* Ligne médiane */}
        <line
          x1="400"
          y1="50"
          x2="400"
          y2="450"
          stroke="#443149"
          strokeOpacity="0.5"
          strokeWidth="3"
        />

        {/* Cercle central */}
        <circle
          cx="400"
          cy="250"
          r="80"
          fill="none"
          stroke="#443149"
          strokeOpacity="0.5"
          strokeWidth="3"
        />
        <circle cx="400" cy="250" r="2" fill="#443149" strokeOpacity="0.5" />

        {/* Surface de réparation gauche */}
        <rect
          x="50"
          y="150"
          width="120"
          height="200"
          fill="none"
          stroke="#443149"
          strokeOpacity="0.5"
          strokeWidth="3"
        />

        {/* Surface de but gauche */}
        <rect
          x="50"
          y="200"
          width="50"
          height="100"
          fill="none"
          stroke="#443149"
          strokeOpacity="0.5"
          strokeWidth="3"
        />

        {/* Arc de cercle surface de réparation gauche */}
        <path
          d="M 170 200 A 80 80 0 0 1 170 300"
          fill="none"
          stroke="#443149"
          strokeOpacity="0.5"
          strokeWidth="3"
        />

        {/* Point de penalty gauche */}
        <circle cx="140" cy="250" r="2" stroke="#443149" strokeOpacity="0.5" />

        {/* Surface de réparation droite */}
        <rect
          x="630"
          y="150"
          width="120"
          height="200"
          fill="none"
          stroke="#443149"
          strokeOpacity="0.5"
          strokeWidth="3"
        />

        {/* Surface de but droite */}
        <rect
          x="700"
          y="200"
          width="50"
          height="100"
          fill="none"
          stroke="#443149"
          strokeOpacity="0.5"
          strokeWidth="3"
        />

        {/* Arc de cercle surface de réparation droite */}
        <path
          d="M 630 200 A 80 80 0 0 0 630 300"
          fill="none"
          stroke="#443149"
          strokeOpacity="0.5"
          strokeWidth="3"
        />

        {/* Point de penalty droit */}
        <circle cx="660" cy="250" r="2" stroke="#443149" strokeOpacity="0.5" />

        {/* Buts */}
        <rect
          x="45"
          y="220"
          width="5"
          height="60"
          fill="#443149"
          strokeOpacity="0.5"
        />
        <rect
          x="750"
          y="220"
          width="5"
          height="60"
          fill="#443149"
          strokeOpacity="0.5"
        />

        {/* Corners */}
      </svg>
    </div>
  );
}
