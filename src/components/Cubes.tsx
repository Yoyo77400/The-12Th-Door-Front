"use client";
import Image from "next/image";
import { useRef } from "react";
import { fanTokens } from "@/lib/data/fanTokens";

type CubeProps = {
  selected: number;
  onSelect: (index: number) => void;
};

export default function Cubes({ selected, onSelect }: CubeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const scrollAmount = 200;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="p-4 w-full max-w-full">
      <div className="relative flex items-center">
        {/* Flèche gauche à l'extérieur */}
        <button
          onClick={() => scroll("left")}
          className="z-10 bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md mr-2"
        >
          ◀
        </button>

        {/* Conteneur scrollable */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth whitespace-nowrap scrollbar-hide"
        >
          {fanTokens.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelect(index)}
              className={`relative min-w-[180px] h-[130px] rounded-xl bg-gray-800 border-4 ${
                item.borderColor
              } ${
                selected === index ? "opacity-100" : "opacity-30"
              } overflow-hidden cursor-pointer transition-opacity duration-200`}
            >
              <Image
                src={item.src}
                alt={item.Label}
                width={180}
                height={120}
                className="object-cover w-full h-full"
              />
              <div
                className="absolute bottom-2 right-2 bg-gray-700/60 text-white text-[11px] px-3 py-1 rounded-full shadow-md"
                style={{ backdropFilter: "blur(5px)" }}
              >
                {item.Label}
              </div>
            </div>
          ))}
        </div>

        {/* Flèche droite à l'extérieur */}
        <button
          onClick={() => scroll("right")}
          className="z-10 bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md ml-2"
        >
          ▶
        </button>
      </div>
    </section>
  );
}
