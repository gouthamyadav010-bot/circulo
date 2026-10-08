"use client";

import { useState } from "react";
import { 
  CheckCircle, 
  Store, 
  Camera, 
  FileText,
  AlertCircle,
  Factory,
  ArrowDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { WasteJourney } from "@/components/circulo/WasteJourney";
import Link from "next/link";

export default function Processing() {
  const [view, setView] = useState<"form" | "confirming" | "success" | "create-listing">("form");
  const [recoveredWeight, setRecoveredWeight] = useState("41.2");
  const [proofFileName, setProofFileName] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);
  const receivedWeight = 48.6;
  
  const residual = receivedWeight - parseFloat(recoveredWeight || "0");
  const isValid = !isNaN(residual) && residual >= 0 && residual <= receivedWeight;

  if (view === "form") {
    return (
      <div className="max-w-5xl mx-auto py-8 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Process Received Material</h2>
            <p className="text-slate-500 mt-2 font-medium">Record what was recovered from this waste stream and provide processing evidence.</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-emerald-800 font-bold text-sm flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
            Ready for processing
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-1.5 gradient-bg"></div>
               
               <h3 className="font-bold text-lg text-slate-900 mb-6">Processing Form</h3>
               
               <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                   <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Input Material</label>
                     <div className="font-bold text-slate-900 text-lg">Concrete</div>
                   </div>
                   <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Actual Received</label>
                     <div className="font-black text-slate-900 text-xl">{receivedWeight.toFixed(1)} t</div>
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Processing Method</label>
                   <select className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl bg-white focus:border-slate-900 outline-none font-medium text-slate-900">
                     <option>Crushing + Screening</option>
                     <option>Crushing</option>
                     <option>Sorting</option>
                     <option>Reuse without processing</option>
                     <option>Other</option>
                   </select>
                 </div>

                 <div className="border-t border-slate-100 pt-6 mt-6">
                   <h4 className="font-bold text-slate-900 mb-4">Processing Output</h4>
                   <div className="grid grid-cols-2 gap-6">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Recovered Material</label>
                       <input type="text" className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl bg-slate-50 font-medium text-slate-900" defaultValue="Recycled Aggregate" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Recovered Quantity (t)</label>
                       <div className="relative">
                         <input 
                           type="number" 
                           className="w-full px-5 py-4 border-2 border-brand-200 rounded-xl focus:border-brand-500 focus:ring-0 outline-none font-black text-brand-700 text-xl" 
                           value={recoveredWeight}
                           onChange={(e) => setRecoveredWeight(e.target.value)}
                         />
                         <div className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-brand-400">t</div>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-inner flex items-center justify-between">
                    <div>
                      <div className="text-slate-400 text-sm font-bold mb-1">Residual / Non-recovered</div>
                      <div className="text-xs text-slate-500">Calculated automatically</div>
                    </div>
                    <div className="text-3xl font-black text-white">
                      {isValid ? residual.toFixed(1) : "--"} t
                    </div>
                 </div>
               </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
               <h3 className="font-bold text-lg text-slate-900 mb-6">Processing Record</h3>
               
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Processing Date</label>
                   <input type="date" className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 font-medium text-slate-900" defaultValue="2026-10-08" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Recovered Quality / Grade</label>
                   <select className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white font-medium text-slate-900 mb-2">
                     <option>Grade A</option>
                     <option>Grade B</option>
                     <option>Sub-base</option>
                   </select>
                   <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                     <AlertCircle className="w-3 h-3 mr-1" /> Recycler-declared grade
                   </div>
                 </div>
                 <div className="col-span-2">
                   <label className="block text-sm font-bold text-slate-700 mb-2">Operator Note (Optional)</label>
                   <textarea className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 font-medium text-slate-900 h-24 resize-none" placeholder="Add any details about the processing..."></textarea>
                 </div>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
               <h3 className="font-bold text-slate-900 mb-4 text-lg">Processing Proof</h3>
               <p className="text-sm text-slate-500 mb-6 font-medium">Upload evidence showing how the material was processed.</p>
               
               <label className="mb-6 block border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                 <input type="file" accept="image/*,video/*,.pdf" className="sr-only" onChange={(event) => setProofFileName(event.currentTarget.files?.[0]?.name ?? "")} />
                 <Camera className="w-10 h-10 text-slate-400 mx-auto mb-3 group-hover:text-brand-500 transition-colors" />
                 <span className="text-sm font-bold text-slate-700 block mb-1">{proofFileName || "Choose processing proof"}</span>
                 <span className="text-xs text-slate-400 font-medium">Photo, video, or PDF · {proofFileName ? "selected for this demo" : "click to choose"}</span>
               </label>
               
               {proofFileName && <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="bg-emerald-100 p-2 rounded-lg">
                     <FileText className="w-4 h-4 text-emerald-600" />
                   </div>
                   <div>
                     <div className="text-sm font-bold text-slate-900">{proofFileName}</div>
                     <div className="text-xs font-medium text-emerald-600">Selected for this demo</div>
                   </div>
                 </div>
               </div>}
               
               <div className="mt-6 text-xs text-slate-500 text-center font-medium bg-slate-50 p-2 rounded-lg">
                 {proofFileName ? "Proof selected by recycler" : "No proof attached"}
               </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white shadow-xl">
               <h4 className="font-bold text-lg mb-6 text-white text-center">Material Flow</h4>
               
               <div className="flex flex-col items-center">
                 <div className="w-full bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
                   <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Received</div>
                   <div className="font-black text-2xl">{receivedWeight.toFixed(1)} t</div>
                 </div>
                 
                 <div className="h-8 w-px bg-slate-600 relative">
                   <ArrowDown className="w-4 h-4 text-slate-500 absolute -bottom-2 -left-[7px] bg-slate-900" />
                 </div>
                 
                 <div className="flex items-center justify-center my-2 gap-2 text-slate-400 font-bold text-sm">
                   <Factory className="w-4 h-4" /> Processing
                 </div>
                 
                 <div className="h-8 w-px bg-slate-600 relative">
                   <ArrowDown className="w-4 h-4 text-slate-500 absolute -bottom-2 -left-[7px] bg-slate-900" />
                 </div>

                 <div className="flex w-full gap-4 mt-2">
                   <div className="flex-1 bg-brand-600 rounded-xl p-4 text-center border border-brand-500 shadow-lg shadow-brand-900/50">
                     <div className="text-[10px] text-brand-200 font-bold uppercase tracking-wider mb-1">Recovered</div>
                     <div className="font-black text-xl text-white">{isValid ? parseFloat(recoveredWeight).toFixed(1) : "--"} t</div>
                   </div>
                   <div className="flex-1 bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
                     <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Residual</div>
                     <div className="font-black text-xl text-slate-300">{isValid ? residual.toFixed(1) : "--"} t</div>
                   </div>
                 </div>
               </div>
            </div>
            
            <div className="flex flex-col gap-3 pt-4">
              <Button size="lg" className="h-14 font-bold bg-brand-600 text-white hover:bg-brand-700 relative w-full" onClick={() => setView("confirming")}>
                 <span className="mx-auto">Confirm Processing</span>
              </Button>
              <Button variant="outline" size="lg" className="relative h-14 w-full font-bold" onClick={() => setDraftSaved(true)}>
                 <span className="mx-auto">{draftSaved ? "Draft Saved" : "Save Draft"}</span>
              </Button>
              {draftSaved && <p className="text-center text-xs font-medium text-emerald-700" role="status">Draft saved for this session.</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "confirming") {
    return (
      <div className="max-w-2xl mx-auto py-16">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-brand-500"></div>
          
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <Factory className="w-8 h-8 text-brand-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center tracking-tight">Processing recorded</h2>
          <p className="text-center text-slate-500 font-medium mb-8">
            {recoveredWeight} t of recycled aggregate was recorded as recovered from this shipment.
          </p>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4 mb-8">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-sm font-bold text-slate-500">Received</span>
              <span className="font-bold text-slate-900">{receivedWeight.toFixed(1)} t</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-sm font-bold text-slate-500">Recovered</span>
              <span className="font-black text-brand-600">{parseFloat(recoveredWeight).toFixed(1)} t</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-sm font-bold text-slate-500">Residual</span>
              <span className="font-bold text-slate-500">{residual.toFixed(1)} t</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-bold text-slate-500">Processing proof</span>
              <span className="font-bold text-emerald-700 flex items-center text-sm">
                <CheckCircle className="w-4 h-4 mr-1.5" /> Submitted
              </span>
            </div>
          </div>

          <Button size="lg" className="w-full font-bold h-14 bg-slate-900 text-white relative" onClick={() => setView("success")}>
            <span className="mx-auto">Recovered Material &mdash; NEXT</span>
          </Button>
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
          
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Processing Receipt</h2>
          <p className="text-xl text-slate-500 font-medium mb-8 max-w-lg">
            Digital processing record has been generated successfully.
          </p>

          <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 mb-8 text-left max-w-2xl">
             <div className="flex justify-between items-start mb-8">
               <div>
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Receipt ID</div>
                 <div className="font-black text-xl text-slate-900">PROC-24001</div>
               </div>
               <div className="text-right">
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date</div>
                 <div className="font-bold text-slate-900">Oct 8, 2026</div>
               </div>
             </div>
             
             <div className="space-y-4 mb-8">
               <div className="flex justify-between border-b border-slate-100 pb-4">
                 <span className="font-medium text-slate-500">Recycler</span>
                 <span className="font-bold text-slate-900">EcoCycle Recycling Facility</span>
               </div>
               <div className="flex justify-between border-b border-slate-100 pb-4">
                 <span className="font-medium text-slate-500">Source shipment</span>
                 <span className="font-bold text-slate-900">CIR-24001</span>
               </div>
               <div className="flex justify-between border-b border-slate-100 pb-4">
                 <span className="font-medium text-slate-500">Input</span>
                 <span className="font-bold text-slate-900">{receivedWeight.toFixed(1)} t concrete</span>
               </div>
               <div className="flex justify-between border-b border-slate-100 pb-4">
                 <span className="font-medium text-slate-500">Recovered</span>
                 <span className="font-bold text-brand-600">{parseFloat(recoveredWeight).toFixed(1)} t recycled aggregate</span>
               </div>
               <div className="flex justify-between border-b border-slate-100 pb-4">
                 <span className="font-medium text-slate-500">Residual</span>
                 <span className="font-bold text-slate-500">{residual.toFixed(1)} t</span>
               </div>
               <div className="flex justify-between pb-2">
                 <span className="font-medium text-slate-500">Processing method</span>
                 <span className="font-bold text-slate-900">Crushing + Screening</span>
               </div>
             </div>
             
             <div className="bg-emerald-50 text-emerald-800 font-bold p-3 rounded-xl text-center border border-emerald-200">
               Processing Recorded
             </div>
          </div>

          <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 mb-12 max-w-4xl overflow-x-auto">
            <WasteJourney 
              stages={[
                { label: "Project", state: "done", icon: FileText },
                { label: "Estimate", state: "done", icon: CheckCircle },
                { label: "Review", state: "done", icon: CheckCircle },
                { label: "Listed", state: "done", icon: FileText },
                { label: "Matched", state: "done", icon: CheckCircle },
                { label: "Transport", state: "done", icon: CheckCircle },
                { label: "Tracking", state: "done", icon: CheckCircle },
                { label: "Receipt", state: "done", icon: FileText },
                { label: "Processing", state: "done", icon: Factory },
                { label: "Recovered", state: "active", icon: Store },
              ]} 
              compact={true}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button size="lg" className="flex-1 font-bold h-14 bg-slate-900 text-white relative" onClick={() => setView("create-listing")}>
              <span className="mx-auto">Create Marketplace Listing</span>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (view === "create-listing") {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-xl">
           <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Create Recovered Material Listing</h2>
           <p className="text-slate-500 font-medium mb-10">Your recovered material can now be made available to buyers through the Circulo marketplace.</p>
           
           <div className="space-y-6 mb-10">
             <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex justify-between items-center">
               <div>
                 <div className="text-sm font-bold text-slate-500 mb-1">Material</div>
                 <div className="text-xl font-bold text-slate-900">Recycled Aggregate</div>
               </div>
               <div className="text-right">
                 <div className="text-sm font-bold text-slate-500 mb-1">Quantity</div>
                 <div className="text-xl font-black text-brand-600">{parseFloat(recoveredWeight).toFixed(1)} t</div>
               </div>
             </div>
             
             <div className="grid grid-cols-2 gap-6">
               <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Origin</div>
                 <div className="font-bold text-slate-900 text-sm">EcoCycle Recycling Facility</div>
               </div>
               <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</div>
                 <div className="font-bold text-slate-900 text-sm">Hyderabad, Telangana</div>
               </div>
               <div className="col-span-2 bg-slate-50 rounded-2xl p-5 border border-slate-100">
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Source Project</div>
                 <div className="font-bold text-slate-900 text-sm">Green Heights Redevelopment</div>
               </div>
             </div>
           </div>
           
           <div className="flex gap-4">
             <Link href="/recycler/marketplace/new" className="flex-1">
               <Button size="lg" className="w-full font-bold h-14 bg-brand-600 text-white hover:bg-brand-700 relative">
                 <span className="mx-auto">Continue to Marketplace</span>
               </Button>
             </Link>
           </div>
        </div>
      </div>
    );
  }

  return null;
}
