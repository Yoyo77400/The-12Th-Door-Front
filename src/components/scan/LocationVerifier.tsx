"use client";

import { useState, useEffect } from "react";
import { Stadium } from "@/app/scan/page";

interface LocationVerifierProps {
  stadium: Stadium;
  onLocationVerified: (isValid: boolean) => void;
}

export default function LocationVerifier({ stadium, onLocationVerified }: LocationVerifierProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("Verifying your location...");
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      setMessage("Geolocation is not supported by your browser.");
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
      
      // Adjust the radius based on the stadium size
      // For testing purposes, we can use a larger radius
      const effectiveRadius = stadium.radius * 1.5; // 50% larger radius for flexibility
      const isWithinRadius = distanceToStadium <= effectiveRadius;
      
      setStatus("success");
      setMessage(
        isWithinRadius
          ? `Location verified! You are ${Math.round(distanceToStadium)}m from the stadium.`
          : `You are ${Math.round(distanceToStadium)}m from the stadium, which is outside the allowed radius (${effectiveRadius}m).`
      );
      
      onLocationVerified(isWithinRadius);
    };

    const geoError = (error: GeolocationPositionError) => {
      console.error("Geolocation error:", error);
      setStatus("error");
      
      let errorMsg = "Unable to determine your location.";
      if (error.code === 1) {
        errorMsg = "You have denied access to your location.";
      } else if (error.code === 2) {
        errorMsg = "Location unavailable. Please check that your GPS is enabled.";
      } else if (error.code === 3) {
        errorMsg = "Timeout exceeded while trying to get your location.";
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
          Stadium: <span className="font-medium text-white/90">{stadium.name}</span>
        </p>
        <p className="text-sm text-white/60">
          Allowed radius: <span className="font-medium text-white/90">{stadium.radius * 1.5}m</span>
        </p>
      </div>
    </div>
  );
}
