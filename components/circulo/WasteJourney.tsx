import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface JourneyStage {
  label: string;
  state: "done" | "active" | "next" | "locked";
  icon: LucideIcon;
}

interface WasteJourneyProps {
  stages: JourneyStage[];
  compact?: boolean;
}

export function WasteJourney({ stages, compact = false }: WasteJourneyProps) {
  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-none">
      <div className={cn("flex items-center min-w-max", compact ? "px-2" : "px-4")}>
        {stages.map((stage, i, arr) => (
          <React.Fragment key={stage.label}>
            <div className={cn("flex flex-col items-center relative group", compact ? "w-16" : "w-28")}>
              <div
                className={cn(
                  "rounded-full flex items-center justify-center transition-all duration-300 z-10",
                  compact ? "w-10 h-10" : "w-12 h-12",
                  stage.state === "done" ? "bg-brand-500 text-white shadow-md" : 
                  stage.state === "active" || stage.state === "next" ? "bg-white border-2 border-brand-500 text-brand-600 shadow-lg scale-110" : 
                  "bg-slate-100 text-slate-400"
                )}
              >
                <stage.icon className={cn(compact ? "w-4 h-4" : "w-5 h-5")} />
              </div>
              <span
                className={cn(
                  "font-bold mt-3 text-center whitespace-nowrap",
                  compact ? "text-[10px]" : "text-xs",
                  stage.state === "done" ? "text-slate-900" :
                  stage.state === "active" || stage.state === "next" ? "text-brand-600" :
                  "text-slate-400"
                )}
              >
                {stage.label}
              </span>
            </div>
            {i < arr.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-1 transition-all duration-500 -mt-8",
                  compact ? "w-6" : "w-12",
                  stage.state === "done" && (arr[i + 1].state === "done" || arr[i + 1].state === "active") ? "bg-brand-500" : 
                  stage.state === "done" && arr[i + 1].state === "next" ? "bg-gradient-to-r from-brand-500 to-slate-200" :
                  "bg-slate-200"
                )}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
