"use client";

import { useEffect, useRef, useState } from "react";
import { 
  MapPin, 
  Truck, 
  Recycle, 
  CheckCircle, 
  Package, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Zap,
  FileText,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { WasteJourney } from "@/components/circulo/WasteJourney";

export default function WasteTracking() {
  const [view, setView] = useState<"arrange" | "tracking">("arrange");
  const [receiptOpen, setReceiptOpen] = useState(false);
  const receiptDialogRef = useRef<HTMLDialogElement>(null);
  
  // Tracking states: 0: matched, 1: pickup, 2: transit, 3: delivered, 4: receipt
  const [trackingState, setTrackingState] = useState(1);

  useEffect(() => {
    const dialog = receiptDialogRef.current;
    if (!dialog) return;

    if (receiptOpen && !dialog.open) dialog.showModal();
    if (!receiptOpen && dialog.open) dialog.close();
  }, [receiptOpen]);

  const downloadTrackingDocument = () => {
    const hasReceipt = trackingState >= 4;
    const documentText = hasReceipt
      ? [
          "CIRCULO DIGITAL RECEIPT",
          "Shipment / receipt ID: TRK-8822",
          "Date: Oct 8, 2026",
          "Material: Concrete",
          "Source: Green Heights",
          "Destination: EcoCycle Facility",
          "Expected weight: 50.0 t",
          "Received weight: 48.6 t",
          "Status: Received and verified",
          "",
          "RECEIPT CHECKPOINTS",
          "Oct 8, 09:30 AM - Waste listed and matched; verified by AI",
          "Oct 8, 11:00 AM - Pickup confirmed; QR code scanned",
          "Oct 8, 2:28 PM - Arrived at EcoCycle Facility",
          "Oct 8, 2:45 PM - 48.6 t concrete recorded and verified",
        ].join("\n")
      : [
          "CIRCULO SHIPMENT MANIFEST",
          "Shipment ID: TRK-8822",
          "Date: Oct 8, 2026",
          "Material: Concrete",
          "Source: Green Heights",
          "Destination: EcoCycle Facility",
          "Expected weight: 50.0 t",
          `Tracking status: ${trackingState === 1 ? "Pickup confirmed" : trackingState === 2 ? "In transit" : "Arrived at destination"}`,
        ].join("\n");

    const file = new Blob([documentText], { type: "text/plain;charset=utf-8" });
    const fileUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = hasReceipt ? "circulo-receipt-TRK-8822.txt" : "circulo-manifest-TRK-8822.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
  };

  if (view === "arrange") {
    return (
      <div className="max-w-5xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Arrange Transport</h2>
            <p className="text-slate-500 text-lg mt-1">AI has optimized the best logistics for this shipment.</p>
          </div>
          <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 text-sm">
            <div>
              <div className="font-bold text-slate-900">Green Heights <ArrowRight className="inline w-3 h-3 text-slate-400 mx-1"/> EcoCycle</div>
              <div className="text-slate-500 flex items-center mt-0.5 text-xs font-medium">18 km &middot; 50t Concrete</div>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="text-brand-700 bg-brand-50 px-2 py-1 rounded font-semibold text-xs border border-brand-100">
              Ready for Transport
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-lg border border-brand-200 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 gradient-bg"></div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-brand-100 p-2.5 rounded-xl border border-brand-200">
                    <Zap className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">AI Recommended Transport</h3>
                    <p className="text-xs font-medium text-brand-600 uppercase tracking-wider">Fastest & most cost-effective</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
                    <div className="text-slate-500 text-sm font-semibold mb-2">Vehicle Type</div>
                    <div className="font-bold text-slate-900 text-xl flex items-center gap-2">
                      <Truck className="w-6 h-6 text-slate-400" />
                      Heavy-duty Tipper
                    </div>
                    <div className="text-xs text-slate-500 mt-2">Optimal for 50t load</div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
                    <div className="text-slate-500 text-sm font-semibold mb-2">Estimated Cost</div>
                    <div className="font-black text-slate-900 text-3xl">₹8,500</div>
                    <div className="text-xs text-emerald-600 mt-2 font-medium flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified Transporter
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6 flex justify-end">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 font-bold bg-slate-900 text-white relative"
                    onClick={() => setView("tracking")}
                  >
                    <span className="mx-auto">Confirm Transport</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
               <h4 className="font-bold text-slate-900 mb-4">Other Options</h4>
               <div className="space-y-3">
                 <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
                   <div>
                     <div className="font-bold text-slate-900">2x Standard Trucks</div>
                     <div className="text-sm text-slate-500">₹9,200 &middot; Arrives in 2 hrs</div>
                   </div>
                   <Button variant="ghost" className="relative w-20">
                     <span className="mx-auto">Select</span>
                   </Button>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
               <div className="absolute -right-4 -bottom-4 opacity-10">
                 <Truck className="w-32 h-32" />
               </div>
               <h4 className="font-bold text-xl mb-2">Why this vehicle?</h4>
               <p className="text-slate-300 text-sm leading-relaxed mb-6">
                 Circulo AI matched your 50t concrete load with an available heavy-duty tipper already in your area, reducing empty miles and saving you 12% on standard transport costs.
               </p>
               <div className="flex items-center gap-2 text-xs font-bold text-brand-300">
                 <ShieldCheck className="w-4 h-4" /> AI Verified Match
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-[calc(100dvh-140px)] min-w-0 max-w-6xl flex-col relative">
      <div className="mb-6 min-w-0 shrink-0 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
          <h2 className="text-2xl font-bold text-slate-900">Live Journey Tracking</h2>
          <p className="text-slate-500 mt-1 font-medium">50t Concrete • Green Heights → EcoCycle Facility</p>
          </div>
          <Button variant="outline" className="relative w-full shrink-0 font-bold sm:w-auto" onClick={downloadTrackingDocument}>
            <span className="mx-auto">{trackingState >= 4 ? "Download Receipt" : "Download Manifest"}</span>
          </Button>
        </div>
        <div className="min-w-0">
          <WasteJourney 
             stages={[
               { label: "Project", state: "done", icon: Package },
               { label: "Estimate", state: "done", icon: Zap },
               { label: "Review", state: "done", icon: CheckCircle },
               { label: "Listed", state: "done", icon: Package },
               { label: "Matched", state: "done", icon: Zap },
               { label: "Transport", state: trackingState > 1 ? "done" : "active", icon: Truck },
               { label: "Tracking", state: trackingState >= 3 ? "done" : trackingState === 2 ? "active" : "next", icon: MapPin },
               { label: "Receipt", state: trackingState >= 4 ? "done" : trackingState === 3 ? "active" : "next", icon: FileText },
               { label: "Processing", state: "next", icon: Recycle },
             ]}
             compact={true}
           />
        </div>
      </div>

      <div className="grid min-w-0 flex-1 grid-cols-1 gap-6 min-h-0 lg:grid-cols-3">
        
        {/* Timeline Sidebar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 overflow-y-auto shadow-sm">
          <h3 className="font-bold text-slate-900 mb-8 text-lg">Chain of Custody</h3>
          
          <div className="relative pl-6 space-y-8">
            <div className="absolute left-[11px] top-2 bottom-6 w-0.5 bg-slate-100"></div>
            
            {/* Dynamic line height based on state */}
            <motion.div 
              className="absolute left-[11px] top-2 w-0.5 bg-brand-500" 
              initial={{ height: "0%" }}
              animate={{ height: trackingState === 1 ? "25%" : trackingState === 2 ? "50%" : trackingState >= 3 ? "85%" : "0%" }}
              transition={{ duration: 0.5 }}
            ></motion.div>

            {/* Step 1: Listed */}
            <div className="relative">
              <div className="absolute -left-9 w-6 h-6 rounded-full bg-brand-50 border-2 border-brand-500 flex items-center justify-center z-10">
                <CheckCircle className="w-3 h-3 text-brand-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Waste Listed & Matched</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium">Oct 8, 09:30 AM • Verified by AI</p>
            </div>

            {/* Step 2: Pickup */}
            <div className="relative">
              <div className={`absolute -left-[38px] w-7 h-7 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${trackingState >= 1 ? 'bg-brand-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]' : 'bg-slate-100 border-2 border-slate-200'}`}>
                {trackingState > 1 ? <CheckCircle className="w-4 h-4 text-white" /> : <Package className={`w-3.5 h-3.5 ${trackingState === 1 ? 'text-white' : 'text-slate-400'}`} />}
              </div>
              <h4 className={`font-bold text-sm transition-colors ${trackingState >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>Pickup Confirmed</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium">Oct 8, 11:00 AM • QR Code Scanned</p>
              
              <AnimatePresence>
                {trackingState >= 1 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3">
                    <div className="w-32 h-20 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative group cursor-pointer">
                      <div aria-hidden="true" className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 transition-transform group-hover:scale-105">
                        <Truck className="h-8 w-8 text-slate-500" />
                      </div>
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-white text-xs font-bold">View Proof</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Step 3: In Transit */}
            <div className="relative">
              <div className={`absolute -left-[38px] w-7 h-7 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${trackingState === 2 ? 'bg-brand-500 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]' : trackingState > 2 ? 'bg-brand-500' : 'bg-slate-100 border-2 border-slate-200'}`}>
                {trackingState > 2 ? <CheckCircle className="w-4 h-4 text-white" /> : <Truck className={`w-3.5 h-3.5 ${trackingState === 2 ? 'text-white' : 'text-slate-400'}`} />}
              </div>
              <h4 className={`font-bold text-sm transition-colors ${trackingState === 2 ? 'text-brand-600' : trackingState > 2 ? 'text-slate-900' : 'text-slate-400'}`}>
                {trackingState > 2 ? 'Transit Complete' : 'In Transit'}
              </h4>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {trackingState === 2 ? 'Live Status • Est. Arrival 2:30 PM' : trackingState > 2 ? 'Arrived at 2:28 PM' : 'Waiting for pickup completion'}
              </p>
            </div>

            {/* Step 4: Delivered */}
            <div className="relative">
              <div className={`absolute -left-[38px] w-7 h-7 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${trackingState === 3 ? 'bg-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.2)]' : trackingState > 3 ? 'bg-emerald-500' : 'bg-slate-100 border-2 border-slate-200'}`}>
                 <MapPin className={`w-3.5 h-3.5 ${trackingState >= 3 ? 'text-white' : 'text-slate-400'}`} />
              </div>
              <h4 className={`font-bold text-sm transition-colors ${trackingState === 3 ? 'text-amber-600' : trackingState > 3 ? 'text-emerald-700' : 'text-slate-400'}`}>
                {trackingState > 3 ? 'Received & Verified' : 'Arrived at Destination'}
              </h4>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {trackingState === 3 ? 'Pending Recycler Weighbridge Verification' : 'Oct 8, 2:45 PM • 48.6t Recorded'}
              </p>
            </div>

          </div>
        </div>

        {/* Map Area */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_1px_1px,#cbd5e1_1px,transparent_0)] bg-[size:26px_26px] shadow-inner lg:col-span-2">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/80 to-blue-50/40 backdrop-blur-[1px]"></div>
          
          {/* Map UI Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
            <div className="flex justify-between items-start">
               <div className="bg-white/90 backdrop-blur-md shadow-sm rounded-xl p-3 px-4 border border-white/50 flex flex-col gap-2">
                 <div className="flex items-center text-xs font-bold text-slate-700">
                   <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2 shadow-sm"></div> Green Heights
                 </div>
                 <div className="flex items-center text-xs font-bold text-slate-700">
                   <div className="w-2.5 h-2.5 rounded-full bg-brand-500 mr-2 shadow-sm"></div> EcoCycle Facility
                 </div>
               </div>

               {/* Demo Controls - visually subtle for hackathon */}
               <div className="bg-slate-900/10 hover:bg-slate-900/20 backdrop-blur-md rounded-xl p-2 flex gap-1 transition-colors">
                 <button onClick={() => setTrackingState(1)} className={`px-2 py-1 text-[10px] font-bold rounded ${trackingState === 1 ? 'bg-white text-slate-900' : 'text-slate-600'}`}>Pickup</button>
                 <button onClick={() => setTrackingState(2)} className={`px-2 py-1 text-[10px] font-bold rounded ${trackingState === 2 ? 'bg-white text-slate-900' : 'text-slate-600'}`}>Transit</button>
                 <button onClick={() => setTrackingState(3)} className={`px-2 py-1 text-[10px] font-bold rounded ${trackingState === 3 ? 'bg-white text-slate-900' : 'text-slate-600'}`}>Deliver</button>
                 <button onClick={() => setTrackingState(4)} className={`px-2 py-1 text-[10px] font-bold rounded ${trackingState === 4 ? 'bg-white text-slate-900' : 'text-slate-600'}`}>Receipt</button>
               </div>
            </div>

            {/* Simulated Route SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
              <path d="M 180 120 Q 350 180 500 400" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="8 8" className="opacity-60" />
              <motion.path 
                d="M 180 120 Q 350 180 500 400" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="5" 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: trackingState === 1 ? 0 : trackingState === 2 ? 0.6 : 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Origin Marker */}
            <div className="absolute top-[120px] left-[180px]">
               <div className="relative group -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white w-4 h-4 rounded-full border-2 border-white shadow-md z-10"></div>
            </div>

            {/* Destination Marker */}
            <div className="absolute top-[400px] left-[500px]">
               <div className="relative group -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white w-4 h-4 rounded-full border-2 border-white shadow-md z-10"></div>
            </div>

            {/* Truck Marker (Animated based on state) */}
            <motion.div 
              className="absolute top-0 left-0 z-20"
              initial={{ x: 180, y: 120 }}
              animate={{ 
                x: trackingState === 1 ? 180 : trackingState === 2 ? 385 : 500, 
                y: trackingState === 1 ? 120 : trackingState === 2 ? 245 : 400 
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-xl border-2 border-slate-900">
                <Truck className="w-5 h-5 text-slate-900" />
                {trackingState === 2 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                  </span>
                )}
              </div>
            </motion.div>

            {/* Bottom Info Card */}
            <AnimatePresence mode="wait">
              {trackingState <= 2 && (
                <motion.div 
                  key="transit"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/40 mt-auto z-30"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="bg-brand-50 p-3 rounded-xl border border-brand-100">
                        <Clock className="w-6 h-6 text-brand-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">
                          {trackingState === 1 ? 'Awaiting Departure' : 'Est. Arrival in 45 mins'}
                        </h4>
                        <p className="text-sm font-medium text-slate-500">
                          {trackingState === 1 ? 'Truck loading completed' : '12km remaining • Traffic normal'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-200">
                      <ShieldCheck className="w-4 h-4 mr-1.5" /> 
                      {trackingState === 1 ? 'Manifest Verified' : 'Normal Route Verified'}
                    </div>
                  </div>
                </motion.div>
              )}

              {trackingState === 3 && (
                <motion.div 
                  key="arrived"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/40 mt-auto z-30 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                     <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                       <MapPin className="w-6 h-6 text-amber-600" />
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-900 text-lg">Arrived at EcoCycle</h4>
                       <p className="text-sm font-medium text-slate-500">Waiting for weighbridge verification</p>
                     </div>
                  </div>
                  <Button variant="outline" className="font-bold relative" onClick={() => setTrackingState(4)}>
                    <span className="mx-auto">Simulate Receipt</span>
                  </Button>
                </motion.div>
              )}

              {trackingState === 4 && (
                <motion.div 
                  key="receipt"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-slate-900 rounded-2xl p-5 shadow-xl mt-auto z-30 flex items-center justify-between text-white"
                >
                  <div className="flex items-center gap-4">
                     <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30">
                       <ShieldCheck className="w-6 h-6 text-emerald-400" />
                     </div>
                     <div>
                       <h4 className="font-bold text-white text-lg">Digital Receipt Verified</h4>
                       <p className="text-sm font-medium text-slate-300">48.6t concrete received successfully</p>
                     </div>
                  </div>
                  <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold relative w-32" onClick={() => setReceiptOpen(true)}>
                    <span className="mx-auto">View Receipt</span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {receiptOpen && (
        <dialog
          ref={receiptDialogRef}
          aria-labelledby="receipt-dialog-title"
          className="fixed inset-0 m-0 flex h-dvh max-h-none w-screen max-w-none items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop:bg-transparent"
          onClose={() => setReceiptOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setReceiptOpen(false);
          }}
        >
          <section className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  <ShieldCheck className="h-4 w-4" /> Verified digital receipt
                </div>
                <h3 id="receipt-dialog-title" className="text-2xl font-bold text-slate-900">Concrete Receipt</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">Shipment TRK-8822 · Oct 8, 2026</p>
              </div>
              <button
                type="button"
                aria-label="Close receipt"
                onClick={() => setReceiptOpen(false)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center">
              <p className="text-sm font-semibold text-emerald-800">Received and verified</p>
              <p className="mt-1 text-4xl font-black tracking-tight text-slate-900">48.6 <span className="text-xl font-bold text-slate-500">t</span></p>
              <p className="mt-1 text-sm font-medium text-slate-600">Concrete received at EcoCycle Facility</p>
            </div>

            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Source</dt>
                <dd className="mt-1 font-bold text-slate-900">Green Heights</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Destination</dt>
                <dd className="mt-1 font-bold text-slate-900">EcoCycle Facility</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Expected weight</dt>
                <dd className="mt-1 font-bold text-slate-900">50.0 t</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Received weight</dt>
                <dd className="mt-1 font-bold text-slate-900">48.6 t</dd>
              </div>
            </dl>

            <div className="mt-6">
              <h4 className="mb-3 font-bold text-slate-900">Receipt checkpoints</h4>
              <ol className="space-y-3 border-l-2 border-brand-100 pl-4 text-sm">
                <li>
                  <p className="font-bold text-slate-900">Pickup confirmed</p>
                  <p className="text-slate-500">Oct 8, 11:00 AM · QR code scanned</p>
                </li>
                <li>
                  <p className="font-bold text-slate-900">Arrived at destination</p>
                  <p className="text-slate-500">Oct 8, 2:28 PM · EcoCycle Facility</p>
                </li>
                <li>
                  <p className="font-bold text-slate-900">Weight recorded and verified</p>
                  <p className="text-slate-500">Oct 8, 2:45 PM · 48.6 t concrete</p>
                </li>
              </ol>
            </div>

            <Button className="relative mt-6 w-full font-bold" onClick={() => setReceiptOpen(false)}>
              <span className="mx-auto">Close receipt</span>
            </Button>
          </section>
        </dialog>
      )}
    </div>
  );
}
