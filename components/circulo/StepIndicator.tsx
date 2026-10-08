import React from "react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center space-x-2 md:space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-none">
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isPast = stepNum < currentStep;

        return (
          <React.Fragment key={step}>
            <div
              className={cn(
                "flex items-center text-sm font-semibold transition-colors whitespace-nowrap",
                isActive ? "text-slate-900" : isPast ? "text-slate-500" : "text-slate-300"
              )}
            >
              <span className="mr-1.5 opacity-60">0{stepNum}</span>
              {step}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "text-lg transition-colors",
                  isPast ? "text-slate-400" : "text-slate-200"
                )}
              >
                &rarr;
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

