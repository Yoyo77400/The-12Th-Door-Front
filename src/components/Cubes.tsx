// app/dashboard/Cubes.tsx
"use client";
import Image from "next/image";

const images = [
  "/img1.png",
  "/img2.png",
  "/img3.png",
  "/img4.png",
  "/img5.png",
];

export default function Cubes() {
  return (
    <section className="overflow-x-auto whitespace-nowrap p-4">
      <div className="flex gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="min-w-[250px] h-[200px] rounded-xl bg-gray-800 flex items-center justify-center overflow-hidden"
          >
            <Image
              src={src}
              alt={`Cube ${index + 1}`}
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
