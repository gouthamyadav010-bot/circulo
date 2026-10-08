"use client";

import { useState } from "react";
import { 
  Store, 
  MapPin, 
  ShieldCheck, 
  CheckCircle, 
  Eye, 
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { WasteJourney } from "@/components/circulo/WasteJourney";
import { VerifiedBadge } from "@/components/circulo/VerifiedBadge";
import Link from "next/link";

export default function NewMarketplaceListing() {
  const [view, setView] = useState<"form" | "preview" | "success">("form");
  const [price, setPrice] = useState("1850");

  if (view === "form") {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Create Marketplace Listing</h2>
        <p className="text-slate-500 font-medium mb-8">Set pricing and details for your recovered material.</p>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 gradient-bg"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Material</label>
                <div className="w-full px-5 py-4 border-2 border-slate-100 rounded-xl bg-slate-50 font-bold text-slate-900">Recycled Aggregate</div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Quantity (t)</label>
                <div className="w-full px-5 py-4 border-2 border-slate-100 rounded-xl bg-slate-50 font-black text-brand-600 text-xl">41.2 t</div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Quality / Grade</label>
                <div className="relative">
                   <div className="w-full px-5 py-4 border-2 border-slate-100 rounded-xl bg-slate-50 font-bold text-slate-900">Grade A</div>
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recycler-declared</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Price per Tonne (₹)</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</div>
                  <input 
                    type="number" 
                    className="w-full pl-9 pr-5 py-4 border-2 border-slate-200 rounded-xl focus:border-brand-500 focus:ring-0 outline-none font-black text-slate-900 text-xl transition-colors" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                <div className="w-full px-5 py-4 border-2 border-slate-100 rounded-xl bg-slate-50 font-bold text-slate-900 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-slate-400" /> Hyderabad, Telangana
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Availability</label>
                <div className="w-full px-5 py-4 border-2 border-emerald-100 rounded-xl bg-emerald-50 font-bold text-emerald-800 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" /> Available Now
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
              <textarea 
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:border-brand-500 outline-none font-medium text-slate-900 h-28 resize-none" 
                defaultValue="Processed recycled aggregate suitable for applicable construction and infrastructure use."
              ></textarea>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-end">
            <Button size="lg" className="h-14 px-8 font-bold bg-slate-900 text-white" onClick={() => setView("preview")}>
               <span className="grid w-full grid-cols-[1.5rem_minmax(0,1fr)_1.5rem] items-center gap-4">
                 <Eye className="w-5 h-5 shrink-0 justify-self-start" aria-hidden="true" />
                 <span className="text-center">Preview Listing</span>
                 <span aria-hidden="true" />
               </span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "preview") {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Listing Preview</h2>
        <p className="text-slate-500 font-medium mb-8">This is how your material will appear to buyers.</p>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-8">
          <div className="h-64 bg-slate-100 relative">
             <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Recycled Aggregate" className="w-full h-full object-cover" />
             <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-sm font-bold text-brand-700 shadow-sm flex items-center border border-white/20">
                <Store className="w-4 h-4 mr-1.5" /> Recovered Material
             </div>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Recycled Aggregate</h3>
                <div className="text-brand-600 font-black text-2xl mt-1">₹{price} <span className="text-sm font-bold text-brand-600/70">/ t</span></div>
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-emerald-100">
                41.2 t available
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 border-y border-slate-100 py-6">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Grade</span>
                <span className="font-bold text-slate-900">Grade A <span className="text-slate-400 font-normal ml-1">(Recycler-declared)</span></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</span>
                <span className="font-bold text-slate-900 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-slate-400" /> Hyderabad, Telangana
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Seller</span>
                <span className="font-bold text-slate-900 flex items-center">
                  EcoCycle Recycling Facility <VerifiedBadge className="ml-2 scale-75 origin-left" />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Source</span>
                <span className="font-bold text-slate-900">Recovered from C&D waste</span>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-bold text-slate-900 mb-2">Description</h4>
              <p className="text-slate-600 font-medium leading-relaxed">
                Processed recycled aggregate suitable for applicable construction and infrastructure use.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex items-start gap-4">
               <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
               <div>
                 <h4 className="font-bold text-blue-900 mb-1">Processing Proof Available</h4>
                 <p className="text-sm font-medium text-blue-800/80">Platform processing record (PROC-24001) confirms 41.2t recovered from 48.6t input waste.</p>
               </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" size="lg" className="flex-1 font-bold h-14 relative" onClick={() => setView("form")}>
             <span className="mx-auto">Edit Listing</span>
          </Button>
          <Button size="lg" className="flex-[2] font-bold h-14 bg-brand-600 text-white" onClick={() => setView("success")}>
             <span className="grid w-full grid-cols-[1.5rem_minmax(0,1fr)_1.5rem] items-center gap-2">
               <Tag className="w-5 h-5 justify-self-start" aria-hidden="true" />
               <span className="text-center">Publish to Marketplace</span>
               <span aria-hidden="true" />
             </span>
          </Button>
        </div>
      </div>
    );
  }

  if (view === "success") {
    return (
      <div className="max-w-4xl mx-auto py-16 flex flex-col items-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center w-full">
          <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-brand-100">
            <Store className="w-12 h-12 text-brand-600" />
          </div>
          
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Material is now available</h2>
          <p className="text-xl text-slate-500 font-medium mb-12 max-w-lg">
            41.2 t of recovered aggregate is now listed in the circular materials marketplace.
          </p>

          <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 mb-12 overflow-x-auto max-w-4xl">
            <WasteJourney 
              stages={[
                { label: "Listed", state: "done", icon: CheckCircle },
                { label: "Matched", state: "done", icon: CheckCircle },
                { label: "Transport", state: "done", icon: CheckCircle },
                { label: "Tracking", state: "done", icon: CheckCircle },
                { label: "Receipt", state: "done", icon: CheckCircle },
                { label: "Processing", state: "done", icon: CheckCircle },
                { label: "Recovered", state: "done", icon: CheckCircle },
                { label: "Marketplace", state: "active", icon: Store },
              ]} 
              compact={true}
            />
          </div>

          <div className="flex gap-4 w-full max-w-md">
            <Link href="/company/marketplace" className="w-full">
              <Button size="lg" className="w-full font-bold h-14 bg-slate-900 text-white relative">
                <span className="mx-auto">View in Marketplace (Simulate Buyer)</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}
