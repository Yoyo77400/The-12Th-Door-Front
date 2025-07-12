"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";


export default function Home() {
    return (
    <>
      <main className="p-8">
        <Button className="animated">Explosion</Button>
        <Button>Normal</Button>
      </main>
      <Footer />
    </>
  );
}


