"use client";

import { useState } from "react";
import QRScanner from "@/components/scan/QRScanner";
import LocationVerifier from "@/components/scan/LocationVerifier";
import TicketInfo from "@/components/scan/TicketInfo";
import ScanResult from "@/components/scan/ScanResult";
import StadiumSelector from "@/components/scan/StadiumSelector";

export type Stadium = {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  radius: number;
};

export type ScanStatus =
  | "idle"
  | "scanning"
  | "verifying"
  | "success"
  | "error";

export type TicketData = {
  id: string;
  eventName: string;
  date: string;
  seat?: string;
  gate?: string;
  ownerPublicKey: string;
};

export default function ScanPage() {
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);
  const [isLocationValid, setIsLocationValid] = useState<boolean | null>(null);

  // Liste des stades disponibles
  const stadiums: Stadium[] = [
    {
      id: "parc-des-princes",
      name: "Parc des Princes",
      location: {
        latitude: 48.8414,
        longitude: 2.253,
      },
      radius: 500,
    },
    {
      id: "stade-velodrome",
      name: "Stade Vélodrome",
      location: {
        latitude: 43.2698,
        longitude: 5.3959,
      },
      radius: 500,
    },
    {
      id: "groupama-stadium",
      name: "Groupama Stadium",
      location: {
        latitude: 45.7653,
        longitude: 4.9822,
      },
      radius: 500,
    },
  ];

  const handleScan = (data: string | null) => {
    if (!data) return;

    try {
      // Essayer de parser les données du QR code
      const parsedData: TicketData = JSON.parse(data);
      setTicketData(parsedData);
      setScanStatus("verifying");
    } catch (error) {
      setErrorMessage("QR code invalide. Veuillez réessayer.");
      setScanStatus("error");
    }
  };

  const handleLocationVerified = (isValid: boolean) => {
    setIsLocationValid(isValid);
    setScanStatus(isValid ? "success" : "error");
    if (!isValid) {
      setErrorMessage("Vous n'êtes pas à l'emplacement du stade sélectionné.");
    }
  };

  const resetScan = () => {
    setScanStatus("idle");
    setTicketData(null);
    setErrorMessage("");
    setIsLocationValid(null);
  };

  return (
    <div className="container mx-auto px-4 py-4 max-w-md">
      <h1 className="text-2xl font-bold text-white/90 mb-6 text-center">
        Scanner votre ticket
      </h1>

      {scanStatus === "idle" && (
        <div className="space-y-6">
          <div className="bg-[#0E0A0F]/80 border border-[#443149]/60 rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white/90 mb-4">
              Sélectionnez un stade
            </h2>
            <StadiumSelector
              stadiums={stadiums}
              selectedStadium={selectedStadium}
              onSelectStadium={setSelectedStadium}
            />

            {selectedStadium && (
              <div className="mt-6">
                <button
                  onClick={() => setScanStatus("scanning")}
                  className="w-full bg-[#443149] hover:bg-[#443149]/80 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Commencer le scan
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {scanStatus === "scanning" && selectedStadium && (
        <div className="bg-[#0E0A0F]/80 border border-[#443149]/60 rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-white/90 mb-4">
            Scannez votre QR Code
          </h2>
          <QRScanner onScan={handleScan} />
          <button
            onClick={resetScan}
            className="w-full mt-4 border border-[#443149]/60 text-white/80 py-2 px-4 rounded-lg font-medium hover:bg-[#443149]/20 transition-colors"
          >
            Annuler
          </button>
        </div>
      )}

      {scanStatus === "verifying" && ticketData && selectedStadium && (
        <div className="bg-[#0E0A0F]/80 border border-[#443149]/60 rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-white/90 mb-4">
            Vérification de la localisation
          </h2>
          <TicketInfo ticket={ticketData} />
          <div className="mt-4">
            <LocationVerifier
              stadium={selectedStadium}
              onLocationVerified={handleLocationVerified}
            />
          </div>
        </div>
      )}

      {(scanStatus === "success" || scanStatus === "error") && (
        <ScanResult
          success={scanStatus === "success"}
          message={
            scanStatus === "success"
              ? "Ticket validé avec succès !"
              : errorMessage
          }
          ticketData={ticketData}
          onReset={resetScan}
        />
      )}
    </div>
  );
}
