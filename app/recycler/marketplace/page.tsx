"use client";

import { Package, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Marketplace() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Recovered Materials Marketplace</h2>
          <p className="text-slate-500 mt-1">Manage your active listings and market presence.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/recycler/marketplace/new" className="inline-flex h-10 items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><span className="mx-auto">Create Listing</span></Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Listing 1 */}
        <div className="bg-white rounded-2xl border border-violet-200 overflow-hidden shadow-sm relative">
          <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-xs font-bold shadow-sm z-10">
            Active
          </div>
          <div className="h-48 bg-slate-100 relative overflow-hidden">
            <div aria-hidden="true" className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-50 to-slate-200">
              <Package className="h-16 w-16 text-violet-300" />
            </div>
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm flex items-center">
              <ShieldCheck className="w-3 h-3 text-emerald-600 mr-1" /> Premium Verified
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-slate-900">Recycled Aggregate</h3>
              <span className="font-bold text-lg text-violet-600">₹1,850<span className="text-xs text-slate-500 font-normal">/t</span></span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-slate-600">
                <span className="w-20 font-medium">Quantity:</span> 41.2 tonnes available
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <span className="w-20 font-medium">Grade:</span> Grade A (Structural)
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Listed: Today</span>
              <Link href="/recycler/marketplace/new" className="inline-flex h-8 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><span className="mx-auto">Edit Listing</span></Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
