"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Inbox, 
  Activity, 
  CheckCircle, 
  MapPin, 
  Building2, 
  Truck, 
  ShieldCheck,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardMetricCard } from "@/components/circulo/DashboardMetricCard";
import { VerifiedBadge } from "@/components/circulo/VerifiedBadge";
import Link from "next/link";

export default function RecyclerDashboard() {
  const [view, setView] = useState<"dashboard" | "opportunity" | "accepted">("dashboard");
  const [showBricksDetails, setShowBricksDetails] = useState(false);

  if (view === "opportunity") {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <Button variant="ghost" className="mb-6 font-bold text-slate-500 hover:text-slate-900 px-0" onClick={() => setView("dashboard")}>
          &larr; Back to Dashboard
        </Button>
        
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-slate-100 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">50 t Concrete Opportunity</h2>
                <div className="bg-brand-50 border border-brand-200 text-brand-700 px-2.5 py-1 rounded-md text-xs font-bold">New</div>
              </div>
              <div className="flex items-center text-sm font-medium text-slate-500 mb-4">
                <MapPin className="w-4 h-4 mr-1.5" /> Hyderabad, Telangana &middot; 18 km away
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">Segregated</span>
                <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">Expected: Today</span>
              </div>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 min-w-[240px]">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Source</div>
              <div className="font-bold text-slate-900 text-lg mb-2">Green Heights Redevelopment</div>
              <VerifiedBadge />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                AI Compatibility Analysis <Info className="w-4 h-4 text-slate-400 ml-2" />
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-sm font-semibold text-slate-600">Material compatibility</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Excellent</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-sm font-semibold text-slate-600">Quantity fit</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Excellent</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-sm font-semibold text-slate-600">Capacity availability</span>
                  <span className="font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded">Good</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-sm font-semibold text-slate-600">Distance</span>
                  <span className="font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded">Good</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm font-semibold text-slate-600">Expected processing</span>
                  <span className="font-bold text-slate-900">Recycled aggregate</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-white border border-violet-100 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-inner relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Activity className="w-32 h-32 text-violet-600" /></div>
               <div className="relative z-10">
                 <div className="text-6xl font-black text-slate-900 tracking-tighter mb-2">94<span className="text-3xl text-slate-400">%</span></div>
                 <div className="text-sm font-bold text-violet-700 uppercase tracking-widest bg-violet-100 px-3 py-1 rounded-full mb-4 inline-block">Match</div>
                 <p className="text-xs font-semibold text-slate-600 bg-white/60 px-3 py-2 rounded-lg border border-white backdrop-blur">
                   AI recommendation &mdash; recycler confirmation required.
                 </p>
               </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
            <Link href="/company/projects/green-heights" className="inline-flex h-14 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-slate-200 bg-white px-8 text-base font-bold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><span className="mx-auto">View Source Project</span></Link>
            <Button size="lg" className="flex-1 font-bold h-14 bg-violet-600 hover:bg-violet-700 text-white relative shadow-md" onClick={() => setView("accepted")}>
              <span>Accept Waste</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "accepted") {
    return (
      <div className="max-w-2xl mx-auto py-20 flex flex-col items-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center w-full">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Waste accepted</h2>
          <p className="text-lg text-slate-600 font-medium mb-8 max-w-md">
            50 t concrete from Green Heights Redevelopment has been accepted.
          </p>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm w-full mb-8 text-left space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Recycler</span>
              <span className="font-bold text-slate-900 text-lg">EcoCycle Recycling Facility</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Quantity</span>
              <span className="font-bold text-slate-900 text-lg">50 t</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Status</span>
              <span className="font-black text-emerald-700 text-lg bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">Accepted</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Next step</span>
              <span className="font-bold text-slate-700 flex items-center"><Truck className="w-4 h-4 mr-2 text-slate-400" /> Transport coordination</span>
            </div>
          </div>

          <Link href="/recycler/incoming" className="inline-flex h-14 w-full items-center justify-center rounded-xl bg-violet-600 px-8 text-base font-bold text-white shadow-md transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><span className="mx-auto">Continue to Incoming Shipment</span></Link>
        </motion.div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Good morning, EcoCycle
          </h2>
          <p className="text-slate-500 mt-2 text-lg">Here are waste opportunities matched to your facility.</p>
        </div>
      </div>

      {/* Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardMetricCard title="Incoming Opportunities" value="12" supportingText="High match potential" icon={Inbox} delay={0.1} />
        <DashboardMetricCard title="Suitable Materials" value="8" supportingText="Across 3 categories" icon={Activity} delay={0.2} />
        <DashboardMetricCard title="Expected Today" value="86 t" supportingText="From confirmed matches" icon={Truck} delay={0.3} />
        <DashboardMetricCard title="Available Capacity" value="180 t" supportingText="Based on 500t monthly limit" icon={Building2} delay={0.4} />
      </section>

      {/* Opportunities */}
      <section>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Incoming Waste Opportunities</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Opportunity 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transition-transform group-hover:scale-110">
              <Activity className="w-32 h-32" />
            </div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Concrete &middot; 50 t</h4>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">From: Green Heights Redevelopment</div>
              </div>
              <div className="bg-violet-50 border border-violet-200 text-violet-700 px-3 py-1.5 rounded-lg text-sm font-black text-center shadow-sm">
                94%<div className="text-[10px] uppercase font-bold tracking-widest mt-0.5">Match</div>
              </div>
            </div>

            <div className="space-y-3 mb-6 relative z-10">
              <div className="flex items-center text-sm font-medium text-slate-600">
                <MapPin className="w-4 h-4 mr-2 text-slate-400" /> Hyderabad &middot; 18 km
              </div>
              <div className="flex items-center text-sm font-medium text-slate-600">
                <Truck className="w-4 h-4 mr-2 text-slate-400" /> Expected arrival: <span className="font-bold text-slate-900 ml-1">Today, 4:30 PM</span>
              </div>
              <div className="flex items-center text-sm font-medium text-slate-600">
                <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500" /> Verification: <span className="font-bold text-slate-900 ml-1">Company listing verified</span>
              </div>
              <div className="flex items-center text-sm font-medium text-slate-600">
                <Activity className="w-4 h-4 mr-2 text-brand-500" /> Processing compatibility: <span className="font-bold text-emerald-600 ml-1">High</span>
              </div>
            </div>

            <Button className="w-full font-bold relative bg-slate-900 hover:bg-slate-800 text-white h-12 shadow-sm" onClick={() => setView("opportunity")}>
              <span>View Opportunity</span>
            </Button>
          </div>

          {/* Opportunity 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Bricks &middot; 32 t</h4>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">From: Metro Heights Project</div>
              </div>
              <div className="bg-violet-50 border border-violet-100 text-violet-700 px-3 py-1.5 rounded-lg text-sm font-black text-center">
                89%<div className="text-[10px] uppercase font-bold tracking-widest mt-0.5">Match</div>
              </div>
            </div>

            <div className="space-y-3 mb-6 relative z-10">
              <div className="flex items-center text-sm font-medium text-slate-600">
                <MapPin className="w-4 h-4 mr-2 text-slate-400" /> Hyderabad &middot; 26 km
              </div>
              <div className="flex items-center text-sm font-medium text-slate-600">
                <Truck className="w-4 h-4 mr-2 text-slate-400" /> Expected arrival: <span className="font-bold text-slate-900 ml-1">Tomorrow</span>
              </div>
              <div className="flex items-center text-sm font-medium text-slate-600">
                <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500" /> Verification: <span className="font-bold text-slate-900 ml-1">Company listing verified</span>
              </div>
              <div className="flex items-center text-sm font-medium text-slate-600">
                <Activity className="w-4 h-4 mr-2 text-brand-500" /> Processing compatibility: <span className="font-bold text-brand-600 ml-1">Medium</span>
              </div>
            </div>

            <Button variant="outline" className="relative h-12 w-full font-bold shadow-sm" onClick={() => setShowBricksDetails((shown) => !shown)}>
              <span className="mx-auto">{showBricksDetails ? "Hide Opportunity Details" : "View Opportunity"}</span>
            </Button>
            {showBricksDetails && (
              <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50 p-4 text-sm" role="status">
                <p className="font-bold text-slate-900">Bricks · 32 t · Metro Heights Project</p>
                <p className="mt-1 text-slate-600">Hyderabad · 26 km away · 89% match</p>
                <p className="mt-1 text-slate-600">Processing compatibility: Medium</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
