// app/page.tsx (ou pages/index.tsx)

import Image from "next/image";
import Cubes from "@/components/Cubes";



export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-8">

    {/*Title*/}
    <div className="text-5xl font-bold mb-8 p-6 text-white">Rewards</div>


      {/* Section cubes */}
        <Cubes />
    


      {/* Contenu dynamique (à venir) */}
      <main className="flex-1 p-4">
        <p>Contenu dynamique à venir ici...</p>
      </main>

    </div>
  );
}
