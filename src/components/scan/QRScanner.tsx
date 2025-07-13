"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Import dynamique pour éviter les erreurs de rendu côté serveur
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

interface QRScannerProps {
  onScan: (data: string | null) => void;
}

export default function QRScanner({ onScan }: QRScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Demande de permission pour la caméra
    if (typeof navigator !== "undefined" && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => setHasPermission(true))
        .catch(() => setHasPermission(false));
    }
  }, []);

  const handleScan = (data: string | null) => {
    if (data) {
      onScan(data);
    }
  };

  const handleError = (err: Error) => {
    console.error("Erreur de scan QR:", err);
    setHasPermission(false);
  };

  if (!isMounted) {
    return <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center text-white/70">Chargement de la caméra...</div>;
  }

  if (hasPermission === false) {
    return (
      <div className="h-64 bg-gray-800 rounded-lg flex flex-col items-center justify-center p-4 text-center">
        <p className="text-white/70 mb-4">
          Impossible d&apos;accéder à la caméra. Veuillez autoriser l&apos;accès à la caméra pour scanner les QR codes.
        </p>
        <button 
          onClick={() => setHasPermission(null)}
          className="bg-[#443149] hover:bg-[#443149]/80 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="qr-scanner-container">
      <div className="relative overflow-hidden rounded-lg">
        {hasPermission && (
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
            className="rounded-lg"
          />
        )}
        <div className="absolute inset-0 border-2 border-[#443149] rounded-lg pointer-events-none"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1/2 h-1/2 border-2 border-white/50 rounded-lg"></div>
        </div>
      </div>
      <p className="text-center mt-4 text-white/70 text-sm">
        Positionnez le QR code dans le cadre pour le scanner
      </p>
    </div>
  );
}
