import FootballField from "./ui/football-field";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen w-full">
      <div className="top-[3rem] flex flex-col mx-auto text-center items-center z-10 mb-8">
        <h1 className="text-4xl font-bold text-white/80 z-10 mb-4">
          12th Door
        </h1>
        <p className="text-xl w-1/2 font-semibold text-white/60 z-10">
          Turn every big play into a unique digital card, Secured, Owned, and
          forever yours.
        </p>
        <FootballField className="w-[80vw] h-[60vw] md:w-[80vw] md:h-[50vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </section>
  );
}
