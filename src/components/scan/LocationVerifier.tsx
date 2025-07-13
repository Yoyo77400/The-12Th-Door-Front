"use client";

import { useState, useEffect } from "react";
import { Stadium } from "@/app/scan/page";

interface LocationVerifierProps {
  stadium: Stadium;
  onLocationVerified: (isValid: boolean) => void;
}

export default function LocationVerifier({ stadium, onLocationVerified }: LocationVerifierProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("Vérification de votre position...");
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      setMessage("La géolocalisation n'est pas supportée par votre navigateur.");
      onLocationVerified(false);
      return;
    }

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      // Formule de Haversine pour calculer la distance entre deux points sur la Terre
      const R = 6371e3; // Rayon de la Terre en mètres
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance; // Distance en mètres
    };

    const geoSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const distanceToStadium = calculateDistance(
        latitude,
        longitude,
        stadium.location.latitude,
        stadium.location.longitude
      );
      
      setDistance(Math.round(distanceToStadium));
      
      const isWithinRadius = distanceToStadium <= stadium.radius;
      
      setStatus("success");
      setMessage(
        isWithinRadius
          ? `Position validée ! Vous êtes à ${Math.round(distanceToStadium)}m du stade.`
          : `Vous êtes à ${Math.round(distanceToStadium)}m du stade, ce qui est en dehors du rayon autorisé (${stadium.radius}m).`
      );
      
      onLocationVerified(isWithinRadius);
    };

    const geoError = (error: GeolocationPositionError) => {
      console.error("Erreur de géolocalisation:", error);
      setStatus("error");
      
      let errorMsg = "Impossible de déterminer votre position.";
      if (error.code === 1) {
        errorMsg = "Vous avez refusé l'accès à votre position.";
      } else if (error.code === 2) {
        errorMsg = "Position indisponible. Vérifiez que votre GPS est activé.";
      } else if (error.code === 3) {
        errorMsg = "Délai d'attente dépassé pour obtenir votre position.";
      }
      
      setMessage(errorMsg);
      onLocationVerified(false);
    };

    const watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [stadium, onLocationVerified]);

  return (
    <div className="bg-[#0E0A0F] border border-[#443149]/40 rounded-lg p-4">
      <div className="flex items-center">
        {status === "loading" && (
          <div className="mr-3 h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        )}
        {status === "success" && distance !== null && distance <= stadium.radius && (
          <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {(status === "error" || (distance !== null && distance > stadium.radius)) && (
          <svg className="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <p className="text-white/80">{message}</p>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-white/60">
          Stade sélectionné: <span className="font-medium text-white/90">{stadium.name}</span>
        </p>
        <p className="text-sm text-white/60">
          Rayon autorisé: <span className="font-medium text-white/90">{stadium.radius}m</span>
        </p>
      </div>
    </div>
  );
}
