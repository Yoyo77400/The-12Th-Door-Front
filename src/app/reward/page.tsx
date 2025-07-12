// app/page.tsx (ou pages/index.tsx)

import Image from "next/image";
import Cubes from "@/components/Cubes";
import RewardSection from "@/components/RewardSection";




export default function Reward() {
  return (

    <div className="flex flex-col h-[calc(100vh-5rem)] pt-8 px-4 sm:px-8 md:px-16 lg:px-24">

    {/*Title*/}
    <div className="text-5xl font-bold mb-8 pt-6 text-white">Rewards</div>


      {/* Section cubes */}
        <Cubes />
    
      {/* Dynamic section */}
      <RewardSection />


    </div>
  );
}
