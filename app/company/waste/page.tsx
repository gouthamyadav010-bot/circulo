"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  Search, 
  GitCompare, 
  ArrowLeft, 
  MapPin,
  Check,
  CheckCircle,
  Truck,
  Building2,
  FileText,
  Activity,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerifiedBadge } from "@/components/circulo/VerifiedBadge";
import { cn } from "@/lib/utils";
import { MatchScoreBreakdown } from "@/components/circulo/MatchScoreBreakdown";
import { WasteJourney } from "@/components/circulo/WasteJourney";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function WasteManagement() {
  const [view, setView] = useState<"list" | "animating" | "results" | "confirming" | "success">("list");
  const [showWhy, setShowWhy] = useState(false);

  const startMatching = () => {
    setView("animating");
    setTimeout(() => {
      setView("results");
    }, 4500);
  };

  const handleSelectEcoCycle = () => {
    setView("confirming");
  };

  const confirmMatch = () => {
    setView("success");
  };

  if (view === "animating") {
    return (
      <div className="max-w-6xl mx-auto py-12 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="relative w-64 h-64 mb-12">
          {/* Subtle connecting lines animation */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ zIndex: 0 }}>
             <motion.path d="M 128 128 L -50 50" stroke="url(#grad)" strokeWidth="2" strokeDasharray="4 4" 
               initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }} transition={{ duration: 1.5 }} />
             <motion.path d="M 128 128 L 300 80" stroke="url(#grad)" strokeWidth="2" strokeDasharray="4 4" 
               initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }} transition={{ duration: 1.5, delay: 0.2 }} />
             <motion.path d="M 128 128 L 250 250" stroke="url(#grad)" strokeWidth="2" strokeDasharray="4 4" 
               initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.6 }} transition={{ duration: 1.5, delay: 0.5 }} />
             <defs>
               <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#3b82f6" />
                 <stop offset="100%" stopColor="#8b5cf6" />
               </linearGradient>
             </defs>
          </svg>

          {/* Central Node */}
          <div className="absolute inset-0 m-auto w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center z-10 border-4 border-slate-50">
            <div className="text-center">
              <div className="font-bold text-slate-900 leading-none">50t</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Concrete</div>
            </div>
          </div>

          {/* Orbiting Recycler Nodes */}
          <motion.div className="absolute -top-12 -left-16 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 z-10"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 }}
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">84%</div>
            <div className="text-xs font-bold text-slate-700">ReclaimWorks</div>
          </motion.div>

          <motion.div className="absolute -top-4 -right-24 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 z-10"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.7 }}
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">89%</div>
            <div className="text-xs font-bold text-slate-700">BuildCycle</div>
          </motion.div>

          {/* Winning Node */}
          <motion.div className="absolute -bottom-8 -right-12 bg-white p-4 rounded-2xl shadow-xl border-2 border-brand-500 flex items-center gap-4 z-20"
            initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1.1, y: 0 }} transition={{ delay: 2.5, type: "spring" }}
          >
            <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-black text-lg">94%</div>
            <div>
              <div className="text-sm font-black text-slate-900">EcoCycle Facility</div>
              <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mt-0.5">Top Match Found</div>
            </div>
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Finding the best recycler</h2>
        <p className="text-slate-500 font-medium text-center max-w-md">
          Circulo is analyzing recycler compatibility, capacity, distance, verification status and expected transaction efficiency.
        </p>
      </div>
    );
  }

  if (view === "results") {
    return (
      <div className="max-w-5xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Best Recycler Matches</h2>
            <p className="text-slate-500 text-lg mt-1">AI-ranked recommendations based on your waste profile.</p>
          </div>
          <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 text-sm">
            <div>
              <div className="font-bold text-slate-900">Concrete &middot; 50 t</div>
              <div className="text-slate-500 flex items-center mt-0.5 text-xs font-medium"><MapPin className="w-3 h-3 mr-1" /> Hyderabad, TS</div>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-semibold text-xs border border-emerald-100">
              Ready for recycler matching
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Top Match */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-lg border border-brand-200 overflow-hidden relative group transition-all hover:shadow-xl">
              {/* Subtle top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 gradient-bg"></div>
              <div className="absolute top-6 right-6">
                 <VerifiedBadge />
              </div>

              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-8">
                  <div className="w-32 h-32 relative flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                      <path className="text-brand-500" strokeDasharray="94, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-slate-900 tracking-tighter">94<span className="text-2xl text-slate-400">%</span></span>
                      <span className="text-xs font-bold text-brand-600 uppercase tracking-widest mt-0.5">Match</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">EcoCycle Recycling Facility</h3>
                    <div className="flex items-center text-sm font-medium text-slate-500 mb-6">
                      <MapPin className="w-4 h-4 mr-1.5" /> Hyderabad &middot; Approx. 18 km away
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Processing Capacity</div>
                        <div className="font-bold text-slate-900">500 t/month</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Available Capacity</div>
                        <div className="font-bold text-emerald-600">180 t</div>
                      </div>
                      <div className="col-span-2 bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Expected Processing</div>
                        <div className="font-bold text-slate-900 text-sm">Recycled aggregate</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-slate-100">
                  <Button 
                    variant="outline" 
                    className="font-bold h-12 w-full md:w-auto relative" 
                    onClick={() => setShowWhy(!showWhy)}
                  >
                    <span>Why 94%?</span>
                    <ChevronDown className={cn("absolute right-4 w-5 h-5 text-slate-400 transition-transform", showWhy ? "rotate-180" : "")} />
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="ghost" className="font-bold h-12">View Details</Button>
                    <Button 
                      className="font-bold h-12 px-8 bg-slate-900 text-white relative w-full md:w-auto"
                      onClick={handleSelectEcoCycle}
                    >
                      <span>Select EcoCycle</span>
                    </Button>
                  </div>
                </div>

                <AnimatePresence>
                  {showWhy && <MatchScoreBreakdown />}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Other Recyclers */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-2">Other Recommended</h4>
            
            {[
              { name: "BuildCycle Materials", score: "89%", dist: "32 km", cap: "300 t/month", verified: true },
              { name: "ReclaimWorks Recycling", score: "84%", dist: "41 km", cap: "220 t/month", verified: true }
            ].map((rec, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h5 className="font-bold text-slate-900 text-lg leading-tight w-2/3">{rec.name}</h5>
                  <div className="bg-slate-100 text-slate-700 font-black text-sm px-2 py-1 rounded-lg border border-slate-200">
                    {rec.score}
                  </div>
                </div>
                {rec.verified && <VerifiedBadge className="mb-3" />}
                <div className="flex items-center text-xs font-medium text-slate-500 mb-1">
                  <MapPin className="w-3 h-3 mr-1" /> {rec.dist}
                </div>
                <div className="text-xs font-medium text-slate-500 mb-4">
                  Processing capacity: <span className="font-bold text-slate-700">{rec.cap}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full font-bold relative">
                   <span>View details</span>
                </Button>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  if (view === "confirming") {
    return (
      <div className="max-w-2xl mx-auto py-16">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-slate-900"></div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center tracking-tight">Confirm Recycler Match</h2>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4 mb-8">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Waste</span>
              <span className="font-bold text-slate-900 text-lg">Concrete</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Quantity</span>
              <span className="font-bold text-slate-900 text-lg">50 t</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Recycler</span>
              <span className="font-bold text-slate-900 text-lg">EcoCycle Recycling Facility</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Match</span>
              <span className="font-black text-brand-600 text-lg bg-brand-50 px-2 py-0.5 rounded">94%</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Distance</span>
              <span className="font-bold text-slate-900 text-lg">18 km</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Status</span>
              <VerifiedBadge />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" size="lg" className="flex-1 font-bold h-14" onClick={() => setView("results")}>
              Choose Another
            </Button>
            <Button size="lg" className="flex-1 font-bold h-14 bg-slate-900 text-white hover:bg-slate-800 relative group" onClick={confirmMatch}>
              <span>Confirm Match</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "success") {
    return (
      <div className="max-w-4xl mx-auto py-12 flex flex-col items-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center w-full">
          <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-brand-100">
            <CheckCircle className="w-12 h-12 text-brand-600" />
          </div>
          
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Recycler matched successfully</h2>
          <p className="text-xl text-slate-500 font-medium mb-8 max-w-lg">
            Your 50 t concrete listing has been matched with EcoCycle Recycling Facility.
          </p>

          <div className="flex items-center gap-4 mb-12">
            <div className="font-black text-brand-700 bg-brand-100 px-3 py-1.5 rounded-lg border border-brand-200 text-sm">94% AI Match</div>
            <VerifiedBadge />
            <div className="font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-sm">18 km</div>
          </div>

          {/* Journey Updates */}
          <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 mb-12">
            <WasteJourney 
              stages={[
                { label: "Project", state: "done", icon: Building2 },
                { label: "AI Estimate", state: "done", icon: Sparkles },
                { label: "Human Review", state: "done", icon: CheckCircle },
                { label: "Waste Listed", state: "done", icon: FileText },
                { label: "Recycler Match", state: "done", icon: GitCompare },
                { label: "Transport", state: "next", icon: Truck },
              ]} 
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Link href="/company/tracking" className="flex-1">
              <Button size="lg" className="w-full font-bold h-14 bg-slate-900 text-white relative">
                <span>Arrange Transport</span>
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="flex-1 font-bold h-14 relative" onClick={() => setView("list")}>
              <span>View Waste Journey</span>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Initial List View Simulation (modified slightly to jump into flow)
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Waste Inventory</h2>
          <p className="text-slate-500 mt-1">Manage listed materials and scan new waste.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-5">Material</th>
                <th className="px-6 py-5">Quantity</th>
                <th className="px-6 py-5">Project</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5 text-slate-900 font-bold">Concrete</td>
                <td className="px-6 py-5 text-slate-600">50 tonnes</td>
                <td className="px-6 py-5 text-slate-600">Green Heights</td>
                <td className="px-6 py-5"><span className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold">Unlisted / Ready</span></td>
                <td className="px-6 py-5 text-right">
                  <Button size="sm" className="font-bold relative" onClick={startMatching}>
                    <span>Find Match</span>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
