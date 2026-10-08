"use client";

import { useState } from "react";
import { 
  Package, 
  MapPin, 
  Truck, 
  CheckCircle, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  UploadCloud,
  Zap,
  Recycle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { WasteJourney } from "@/components/circulo/WasteJourney";
import Link from "next/link";

export default function RecyclerIncoming() {
  const [view, setView] = useState<"list" | "receipt" | "success">("list");
  const [actualWeight, setActualWeight] = useState("48.6");
  const [slipFileName, setSlipFileName] = useState("");
  
  if (view === "receipt") {
    return (
      <div className="max-w-4xl mx-auto py-8 space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="relative w-12 h-12 p-0 rounded-xl" onClick={() => setView("list")}>
            <span className="mx-auto">&larr;</span>
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Verify & Receive Shipment</h2>
            <p className="text-slate-500 font-medium mt-1">Shipment #CIR-24001 &middot; Green Heights</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6 text-lg">Expected Cargo</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Material</span>
                  <span className="font-bold text-slate-900 text-lg">Concrete</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Expected Quantity</span>
                  <span className="font-black text-slate-900 text-xl bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">50.0 t</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Origin</span>
                  <span className="font-bold text-slate-900">Green Heights</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Transporter</span>
                  <span className="font-bold text-slate-900 flex items-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" /> Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-2 rounded-full mt-1">
                  <Truck className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900">Transport Completed</h4>
                  <p className="text-sm text-emerald-700 mt-1 font-medium">GPS matches your facility bounds. Ready for weighbridge verification.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-900"></div>
               <h3 className="font-bold text-slate-900 mb-6 text-lg mt-2">Weighbridge Data</h3>
               
               <div className="mb-6">
                 <label className="block text-sm font-bold text-slate-700 mb-2">Actual Received Quantity (t)</label>
                 <div className="relative">
                   <input 
                     type="number" 
                     className="w-full px-5 py-4 text-2xl font-black text-slate-900 border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-0 outline-none transition-colors" 
                     value={actualWeight}
                     onChange={(e) => setActualWeight(e.target.value)}
                   />
                   <div className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">tonnes</div>
                 </div>
               </div>

               {parseFloat(actualWeight) !== 50.0 && (
                 <motion.div 
                   initial={{ opacity: 0, height: 0 }} 
                   animate={{ opacity: 1, height: 'auto' }}
                   className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3"
                 >
                   <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                   <div>
                     <h4 className="font-bold text-slate-700 text-sm">Weight Discrepancy Note</h4>
                     <p className="text-xs font-medium text-slate-500 mt-1">
                       A difference of {Math.abs(50.0 - parseFloat(actualWeight || "0")).toFixed(1)}t detected. This is typical for bulk construction materials due to moisture and loading variations. Both parties will be notified of final settled amount.
                     </p>
                   </div>
                 </motion.div>
               )}

               <div className="mb-8">
                 <label className="block text-sm font-bold text-slate-700 mb-2">Weighbridge Slip</label>
                 <label className="block border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                   <input type="file" accept="image/*,.pdf" className="sr-only" onChange={(event) => setSlipFileName(event.currentTarget.files?.[0]?.name ?? "")} />
                   <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-slate-600 transition-colors" />
                   <span className="text-sm font-bold text-slate-700">{slipFileName || "Upload Slip Photo"}</span>
                   <span className="mt-1 block text-xs text-slate-400">{slipFileName ? "Selected for this demo" : "Choose a photo or PDF"}</span>
                 </label>
               </div>

               <Button 
                 size="lg" 
                 className="w-full h-14 font-bold bg-slate-900 text-white relative"
                 onClick={() => setView("success")}
               >
                 <span className="mx-auto">Confirm & Generate Receipt</span>
               </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "success") {
    return (
      <div className="max-w-3xl mx-auto py-16 flex flex-col items-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center w-full">
          <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-brand-100">
            <CheckCircle className="w-12 h-12 text-brand-600" />
          </div>
          
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Receipt Generated</h2>
          <p className="text-xl text-slate-500 font-medium mb-8 max-w-lg">
            Shipment CIR-24001 has been logged and the Chain of Custody is updated.
          </p>

          <div className="flex items-center gap-4 mb-12">
            <div className="font-black text-slate-700 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 text-sm">48.6t Final Weight</div>
            <div className="font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 text-sm flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5" /> Immutable Record
            </div>
          </div>

          <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 mb-12">
            <WasteJourney 
              stages={[
               { label: "Project", state: "done", icon: Package },
               { label: "Estimate", state: "done", icon: Zap },
               { label: "Review", state: "done", icon: CheckCircle },
               { label: "Listed", state: "done", icon: Package },
               { label: "Matched", state: "done", icon: Zap },
               { label: "Transport", state: "done", icon: Truck },
               { label: "Tracking", state: "done", icon: MapPin },
               { label: "Receipt", state: "done", icon: FileText },
               { label: "Processing", state: "next", icon: Recycle },
              ]} 
              compact={true}
            />
          </div>

          <div className="flex w-full max-w-sm gap-4">
            <Link href="/recycler/processing" className="inline-flex h-14 flex-1 items-center justify-center rounded-xl bg-slate-900 px-8 text-base font-bold text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><span className="mx-auto">Proceed to Processing</span></Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Initial List View
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Incoming Shipments</h2>
          <p className="text-slate-500 mt-1 font-medium">Manage and receive waste deliveries.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-5">Shipment ID</th>
              <th className="px-6 py-5">Material</th>
              <th className="px-6 py-5">Expected</th>
              <th className="px-6 py-5">Origin</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-5 text-slate-900 font-bold">CIR-24001</td>
              <td className="px-6 py-5 text-slate-900 font-bold">Concrete</td>
              <td className="px-6 py-5 text-slate-600">50.0 t</td>
              <td className="px-6 py-5 text-slate-600">Green Heights</td>
              <td className="px-6 py-5">
                <span className="bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center inline-flex">
                  <MapPin className="w-3 h-3 mr-1" /> Arrived
                </span>
              </td>
              <td className="px-6 py-5 text-right">
                <Button size="sm" className="font-bold relative bg-slate-900 text-white hover:bg-slate-800" onClick={() => setView("receipt")}>
                  <span className="mx-auto">Receive</span>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
