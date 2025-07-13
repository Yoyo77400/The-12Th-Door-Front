"use client";

import dynamic from "next/dynamic";
import { useCallback } from "react";

// Chargement dynamique pour éviter le SSR
const QrReader = dynamic(() => import("react-qr-scanner"), { ssr: false });

interface QRScannerProps {
  onScan: (data: string | null) => void;
}

export default function QRScanner({ onScan }: QRScannerProps) {
  const handleScan = (data: string | null) => {
    if (!data || data === "undefined") return;

    console.log("QR brut :", data);

    try {
      const parsed = JSON.parse(data);
      console.log("QR JSON parsé :", parsed);
      onScan(parsed); // ✅ passe l’objet parsé
    } catch (e) {
      console.warn("QR invalide (pas du JSON) :", data);
      onScan(data); // ✅ passe la donnée brute
    }
  };

  const handleError = useCallback((err: any) => {
    console.error("Erreur caméra :", err);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <QrReader
        delay={300}
        onScan={handleScan}
        onError={handleError}
        style={{ width: "100%" }}
        constraints={{
          video: { facingMode: "environment" },
        }}
      />
    </div>
  );
}
