import React from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

export function MatchScoreBreakdown() {
  const metrics = [
    { label: "Material compatibility", score: "30 / 30", desc: "Facility accepts and processes concrete.", pct: 100 },
    { label: "Processing capacity", score: "20 / 20", desc: "Available capacity is sufficient for the listed quantity.", pct: 100 },
    { label: "Distance", score: "18 / 20", desc: "Facility is approximately 18 km from pickup location.", pct: 90 },
    { label: "Verification", score: "15 / 15", desc: "Recycler has completed Circulo platform verification.", pct: 100 },
    { label: "Cost efficiency", score: "7 / 10", desc: "Estimated transport and processing economics are favorable.", pct: 70 },
    { label: "Sustainability efficiency", score: "4 / 5", desc: "Shorter transport distance improves logistical efficiency.", pct: 80 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="pt-6 mt-6 border-t border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-slate-900">Why this recycler?</h4>
          <div className="flex items-center text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            <Info className="w-3.5 h-3.5 mr-1.5" /> AI recommendation score
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
          {metrics.map((m, i) => (
            <div key={i}>
              <div className="flex justify-between items-end mb-1">
                <span className="font-semibold text-slate-900 text-sm">{m.label}</span>
                <span className="font-bold text-slate-700 text-sm">{m.score}</span>
              </div>
              <p className="text-xs text-slate-500 mb-2">{m.desc}</p>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${m.pct}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full bg-gradient-to-r from-brand-500 to-accent-violet rounded-full"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-sm font-medium text-slate-600 text-center">
            <span className="font-bold text-slate-900">AI recommends. People decide.</span><br/>
            AI recommendations are based on available platform data and are intended to support human decision-making.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

