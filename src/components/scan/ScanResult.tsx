"use client";

import { TicketData } from "@/app/scan/page";
import TicketInfo from "./TicketInfo";

interface ScanResultProps {
  success: boolean;
  message: string;
  ticketData: TicketData | null;
  onReset: () => void;
}

export default function ScanResult({ success, message, ticketData, onReset }: ScanResultProps) {
  return (
    <div className="bg-[#0E0A0F]/80 border border-[#443149]/60 rounded-lg p-6 shadow-xl">
      <div className="flex flex-col items-center text-center mb-6">
        {success ? (
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
        <h2 className={`text-xl font-bold ${success ? 'text-green-500' : 'text-red-500'}`}>
          {success ? 'Succès' : 'Échec'}
        </h2>
        <p className="text-white/80 mt-2">{message}</p>
      </div>

      {success && ticketData && (
        <div className="mb-6">
          <TicketInfo ticket={ticketData} />
        </div>
      )}

      <div className="flex flex-col space-y-3">
        <button
          onClick={onReset}
          className="w-full bg-[#443149] hover:bg-[#443149]/80 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Scanner un autre ticket
        </button>
        
        {success && (
          <button
            onClick={() => window.location.href = "/"}
            className="w-full border border-[#443149]/60 text-white/80 py-2 px-4 rounded-lg font-medium hover:bg-[#443149]/20 transition-colors"
          >
            Retour à l&apos;accueil
          </button>
        )}
      </div>
    </div>
  );
}
