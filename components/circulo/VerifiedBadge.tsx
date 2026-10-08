import React from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  className?: string;
}

export function VerifiedBadge({ className }: VerifiedBadgeProps) {
  return (
    <div className="relative group inline-flex">
      <div 
        className={cn(
          "inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-emerald-50 border border-emerald-100 text-emerald-700 shadow-sm cursor-help",
          className
        )}
      >
        <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
        Verified Recycler
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        <div className="bg-slate-900 text-white text-xs p-2 rounded-lg shadow-xl text-center relative">
          Recycler documents and required platform information have been reviewed by Circulo.
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
        </div>
      </div>
    </div>
  );
}

