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

export default function ModalTicket() {
  const [scanStatus, setScanStatus] = useState<ScanStatus>("scanning");
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [detectedStadium, setDetectedStadium] = useState<Stadium | null>(null);
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

      // Déterminer le stade en fonction des données du ticket
      const stadium = determineStadiumFromTicket(parsedData);

      if (stadium) {
        setDetectedStadium(stadium);
        setScanStatus("verifying");
      } else {
        setErrorMessage(
          "Impossible de déterminer le stade pour cet événement."
        );
        setScanStatus("error");
      }
    } catch (error) {
      setErrorMessage("QR code invalide. Veuillez réessayer.");
      setScanStatus("error");
    }
  };

  // Fonction pour déterminer le stade en fonction des données du ticket
  const determineStadiumFromTicket = (ticket: TicketData): Stadium | null => {
    // Logique pour associer un événement à un stade
    // Cette logique peut être adaptée en fonction de vos données
    const eventNameLower = ticket.eventName.toLowerCase();

    if (eventNameLower.includes("paris") || eventNameLower.includes("psg")) {
      return stadiums.find((s) => s.id === "parc-des-princes") || null;
    } else if (
      eventNameLower.includes("marseille") ||
      eventNameLower.includes("om")
    ) {
      return stadiums.find((s) => s.id === "stade-velodrome") || null;
    } else if (
      eventNameLower.includes("lyon") ||
      eventNameLower.includes("ol")
    ) {
      return stadiums.find((s) => s.id === "groupama-stadium") || null;
    }

    // Si aucune correspondance n'est trouvée, on peut utiliser l'IA pour analyser
    // Pour l'instant, on retourne null
    return null;
  };

  const handleLocationVerified = (isValid: boolean) => {
    setIsLocationValid(isValid);
    setScanStatus(isValid ? "success" : "error");
    if (!isValid) {
      setErrorMessage(
        "Vous n'êtes pas à l'emplacement du stade de l'événement."
      );
    }
  };

  const resetScan = () => {
    setScanStatus("scanning");
    setTicketData(null);
    setErrorMessage("");
    setDetectedStadium(null);
    setIsLocationValid(null);
  };

  return (
<div className="container mx-auto px-4 py-4 max-w-md">
  <h1 className="text-2xl font-bold text-white/90 mb-6 text-center">
    Scan your ticket
  </h1>

  {scanStatus === "scanning" && (
    <div className="bg-[#0E0A0F]/80 border border-[#443149]/60 rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-white/90 mb-4">
        Scan QR Code
      </h2>
      <p className="text-white/70 mb-4">
        Position your ticket in the frame to scan automatically
      </p>
      <QRScanner onScan={handleScan} />
    </div>
  )}

      {scanStatus === "verifying" && ticketData && detectedStadium && (
        <div className="bg-[#0E0A0F]/80 border border-[#443149]/60 rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-white/90 mb-4">
            Location verification
          </h2>
          <TicketInfo ticket={ticketData} />
          <div className="mt-2 mb-4 bg-[#443149]/20 p-3 rounded-lg">
            <p className="text-white/80 text-sm">
              <span className="font-medium">Detected stadium:</span>{" "}
              {detectedStadium.name}
            </p>
          </div>
          <div className="mt-4">
            <LocationVerifier
              stadium={detectedStadium}
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
              ? "Ticket validated successfully !"
              : errorMessage
          }
          ticketData={ticketData}
          onReset={resetScan}
        />
      )}
    </div>
  );
}
