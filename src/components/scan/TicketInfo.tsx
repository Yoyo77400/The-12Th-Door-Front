"use client";

import { TicketData } from "@/app/scan/page";

interface TicketInfoProps {
  ticket: TicketData;
}

export default function TicketInfo({ ticket }: TicketInfoProps) {
  return (
    <div className="bg-[#0E0A0F] border border-[#443149]/40 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-medium text-white/90 mb-3">Ticket Information</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-white/60">Event:</span>
          <span className="text-white font-medium">{ticket.eventName}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-white/60">Date:</span>
          <span className="text-white font-medium">{ticket.date}</span>
        </div>
        
        {ticket.seat && (
          <div className="flex justify-between">
            <span className="text-white/60">Seat:</span>
            <span className="text-white font-medium">{ticket.seat}</span>
          </div>
        )}
        
        {ticket.gate && (
          <div className="flex justify-between">
            <span className="text-white/60">Gate:</span>
            <span className="text-white font-medium">{ticket.gate}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-white/60">Owner:</span>
          <span className="text-white/90 font-mono text-sm truncate max-w-[180px]">
            {ticket.ownerPublicKey}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-white/60">Ticket ID:</span>
          <span className="text-white/90 font-mono text-sm">{ticket.id}</span>
        </div>
      </div>
    </div>
  );
}
