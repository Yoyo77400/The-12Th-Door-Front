import Image from "next/image";

export default function SportsCard() {
  return (
    <div className="relative w-[500px] h-[500px] z-10">
      <Image
        className="absolute top-0 left-0 z-0"
        src="/images/Sport-card-kvara.png"
        alt="Player Image"
        width={300}
        height={400}
        priority
      />
    </div>
  );
}
