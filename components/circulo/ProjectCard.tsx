import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  name: string;
  location: string;
  type: string;
  size: string;
  waste: string;
  stage: string;
  circularity: string;
}

export function ProjectCard({
  name,
  location,
  type,
  size,
  waste,
  stage,
  circularity,
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-900 leading-tight">{name}</h3>
          <div className="flex items-center text-sm text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 mr-1" /> {location}
          </div>
        </div>
        <div className="bg-brand-50 text-brand-700 px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap">
          {circularity}
        </div>
      </div>

      <div className="text-sm text-slate-600 mb-6">
        {type} &middot; {size}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-xs text-slate-500 mb-1">Est. Waste</div>
          <div className="font-semibold text-slate-900">{waste}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-1">Current Stage</div>
          <div className="font-semibold text-slate-900">{stage}</div>
        </div>
      </div>

      {/* Mini Journey Indicator */}
      <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400 mb-6">
        <span className="text-brand-600">Proj</span>
        <span className="text-brand-300">&rarr;</span>
        <span className={stage === "Waste Listing" || stage === "Match" ? "text-brand-600" : ""}>Est</span>
        <span className="text-brand-300">&rarr;</span>
        <span className={stage === "Waste Listing" || stage === "Match" ? "text-brand-600" : ""}>List</span>
        <span className="text-brand-300">&rarr;</span>
        <span>Match</span>
        <span className="text-brand-300">&rarr;</span>
        <span>Trans</span>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 flex justify-end">
        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity relative pl-8 pr-8">
          <span>Manage</span>
          <ArrowRight className="w-4 h-4 absolute right-2" />
        </Button>
      </div>
    </div>
  );
}

