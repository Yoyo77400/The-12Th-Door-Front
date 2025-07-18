import HeroSection from "@/components/HeroSection";
import Description from "@/components/Description";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <div className="h-full w-full px-8 md:px-24">
      <HeroSection />
      <Description />
      <FAQ />
    </div>
  );
}
