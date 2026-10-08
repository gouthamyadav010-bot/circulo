"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Recycle, 
  CheckCircle, 
  Package, 
  MapPin, 
  Zap, 
  Truck, 
  FileText, 
  Factory, 
  Store,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WasteJourney } from "@/components/circulo/WasteJourney";
import { useState } from "react";
import Link from "next/link";

export default function GreenHeightsCompletion() {
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Recycle className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Your waste completed a circular journey.</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          50 t of concrete entered the Circulo network, 48.6 t reached the recycler, and <span className="font-bold text-slate-700">41.2 t</span> was recovered as recycled aggregate.
        </p>
      </motion.div>

      {/* Main Journey & Score Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
      >
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Project</div>
              <h2 className="text-xl font-bold text-slate-900">Green Heights Redevelopment</h2>
            </div>
            <div className="bg-brand-50 text-brand-700 font-bold px-3 py-1.5 rounded-lg text-sm">
              Journey Complete
            </div>
          </div>
          
          <div className="w-full overflow-x-auto pb-4">
            <WasteJourney 
              stages={[
                { label: "Project", state: "done", icon: Building2 },
                { label: "Estimate", state: "done", icon: Zap },
                { label: "Review", state: "done", icon: CheckCircle },
                { label: "Listed", state: "done", icon: Package },
                { label: "Matched", state: "done", icon: Zap },
                { label: "Transport", state: "done", icon: Truck },
                { label: "Tracking", state: "done", icon: MapPin },
                { label: "Receipt", state: "done", icon: FileText },
                { label: "Processing", state: "done", icon: Factory },
                { label: "Recovered", state: "done", icon: Store },
                { label: "Marketplace", state: "done", icon: Store },
              ]} 
              compact={true}
            />
          </div>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
             <div className="text-sm font-bold text-brand-600 uppercase tracking-wider mb-2">Final Output</div>
             <div className="text-6xl font-black text-slate-900 mb-2">41.2 <span className="text-3xl text-slate-400 font-bold">t</span></div>
             <div className="text-lg font-medium text-slate-600 mb-6">Recovered Material</div>
             <div className="inline-flex items-center bg-slate-100 px-4 py-2 rounded-xl text-sm font-bold text-slate-700">
               <Store className="w-4 h-4 mr-2 text-slate-500" />
               Listed on Marketplace
             </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-4">Platform Circularity Score</div>
            <div className="relative w-40 h-40 flex-shrink-0 mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                <path className="text-emerald-500" strokeDasharray="87, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="font-black text-5xl text-slate-900">87</span>
                 <span className="font-bold text-slate-400">/ 100</span>
              </div>
            </div>
            
            <Button variant="outline" className="font-bold relative" onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}>
              <span className="mx-auto flex items-center">
                How is this calculated? <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showScoreBreakdown ? 'rotate-180' : ''}`} />
              </span>
            </Button>
          </div>
        </div>

        {/* Expandable Score Breakdown */}
        {showScoreBreakdown && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-slate-100 bg-slate-50 p-8"
          >
            <h3 className="font-bold text-slate-900 mb-6">Score Breakdown</h3>
            <div className="space-y-6">
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900">Waste Recovery</h4>
                  <p className="text-sm font-medium text-slate-500 mt-1">48.6 t processed from received waste.</p>
                </div>
                <div className="font-bold text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200">30 <span className="text-slate-400 text-xs">/ 35</span></div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900">Material Recovered</h4>
                  <p className="text-sm font-medium text-slate-500 mt-1">41.2 t recovered as recycled aggregate.</p>
                </div>
                <div className="font-bold text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200">28 <span className="text-slate-400 text-xs">/ 30</span></div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900">Traceability</h4>
                  <p className="text-sm font-medium text-slate-500 mt-1">Movement and receipt checkpoints recorded.</p>
                </div>
                <div className="font-bold text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200">15 <span className="text-slate-400 text-xs">/ 15</span></div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900">Verified Processing</h4>
                  <p className="text-sm font-medium text-slate-500 mt-1">Processing record and proof submitted.</p>
                </div>
                <div className="font-bold text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200">10 <span className="text-slate-400 text-xs">/ 10</span></div>
              </div>

              <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                <span className="font-bold text-slate-900 text-lg">Total</span>
                <span className="font-black text-emerald-600 text-xl">87 <span className="text-slate-400 text-sm">/ 100</span></span>
              </div>
            </div>
            
            <p className="text-xs font-medium text-slate-500 mt-6 text-center">
              Platform-generated score based on recorded circularity activity.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Visual Circular Loop Illustration */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-900 rounded-3xl p-12 text-center relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/20 rounded-full blur-[80px]"></div>
        
        <h3 className="font-bold text-white text-2xl mb-12 relative z-10">The Circular Loop</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
           <div className="flex flex-col items-center">
             <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 mb-4">
               <Building2 className="w-8 h-8 text-slate-300" />
             </div>
             <span className="text-slate-400 font-bold text-sm">Construction</span>
           </div>
           
           <div className="flex-1 h-px bg-gradient-to-r from-slate-700 via-brand-500 to-slate-700 hidden md:block w-full"></div>
           
           <div className="flex flex-col items-center">
             <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center border border-brand-400 mb-4 shadow-lg shadow-brand-500/20">
               <Recycle className="w-8 h-8 text-white" />
             </div>
             <span className="text-brand-300 font-bold text-sm">Recovery</span>
           </div>
           
           <div className="flex-1 h-px bg-gradient-to-r from-slate-700 via-emerald-500 to-slate-700 hidden md:block w-full"></div>
           
           <div className="flex flex-col items-center">
             <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center border border-emerald-400 mb-4 shadow-lg shadow-emerald-500/20">
               <Store className="w-8 h-8 text-white" />
             </div>
             <span className="text-emerald-300 font-bold text-sm">Marketplace</span>
           </div>
        </div>
      </motion.div>

      <div className="flex justify-center pt-8">
        <Link href="/company/dashboard">
          <Button size="lg" className="h-14 font-bold bg-slate-900 text-white relative px-8">
            <span className="mx-auto">Back to Dashboard</span>
          </Button>
        </Link>
      </div>

    </div>
  );
}

