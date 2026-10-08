"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  Check, 
  AlertCircle,
  ArrowRight,
  GitCompare,
  MapPin,
  Recycle,
  CheckCircle,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/circulo/StepIndicator";
import { WasteJourney } from "@/components/circulo/WasteJourney";
import { cn } from "@/lib/utils";
import Link from "next/link";

// --- Subcomponents ---

function EditableQuantityField({ value, onChange }: { value: number, onChange: (val: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input 
        type="number" 
        className="w-24 px-3 py-1.5 border border-slate-300 rounded-lg text-right font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500 outline-none bg-white transition-all"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="text-sm text-slate-500 font-medium">t</span>
    </div>
  );
}

// --- Main Page Component ---

export default function CreateProjectFlow() {
  const [step, setStep] = useState(1);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [boqState, setBoqState] = useState<"idle" | "uploading" | "analyzing" | "done">("idle");
  const [boqFileName, setBoqFileName] = useState("");

  const [materials, setMaterials] = useState([
    { id: 'concrete', name: "Concrete", original: 120, current: 120, conf: "High", usage: "Recycled aggregate" },
    { id: 'bricks', name: "Bricks", original: 50, current: 50, conf: "High", usage: "Recovered masonry material" },
    { id: 'metal', name: "Metal", original: 15, current: 15, conf: "Medium", usage: "Metal recycling" },
    { id: 'wood', name: "Wood", original: 8, current: 8, conf: "Medium", usage: "Biomass / Repurposing" },
    { id: 'glass', name: "Glass", original: 6, current: 6, conf: "Medium", usage: "Glass cullet" },
    { id: 'tiles', name: "Tiles", original: 20, current: 20, conf: "Medium", usage: "Crushed aggregate" },
    { id: 'soil', name: "Soil", original: 15, current: 15, conf: "Low", usage: "Landscaping fill" },
  ]);

  const [selectedListingMaterials, setSelectedListingMaterials] = useState<string[]>(['concrete']);
  
  const totalCurrent = materials.reduce((acc, m) => acc + m.current, 0);

  const handleBoqUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBoqFileName(e.target.files[0].name);
      setBoqState("uploading");
      setTimeout(() => setBoqState("analyzing"), 1000);
      setTimeout(() => setBoqState("done"), 3000);
    }
  };

  const generateEstimate = () => {
    setStep(2);
    setAiProcessing(true);
    setTimeout(() => {
      setAiProcessing(false);
      setStep(3); 
    }, 4000);
  };

  const confirmEstimate = () => {
    setStep(4);
  };

  const finishListing = () => {
    setStep(5);
  };

  const toggleMaterial = (id: string) => {
    setSelectedListingMaterials(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 md:px-0 min-h-[80vh] flex flex-col">
      
      {step < 5 && (
        <StepIndicator 
          currentStep={step > 3 ? 4 : step} 
          steps={["Project", "Estimate", "Review", "List"]} 
        />
      )}

      <AnimatePresence mode="wait">
        
        {/* STEP 1: PROJECT DETAILS */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Tell us about the project</h1>
              <p className="text-slate-500 text-lg">We&apos;ll use these details to generate a preliminary construction waste estimate.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Project Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all" defaultValue="Green Heights Redevelopment" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Location</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all" defaultValue="Hyderabad, Telangana" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="block text-sm font-medium text-slate-900 mb-3">Project Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["New Construction", "Demolition", "Renovation", "Infrastructure"].map((pt) => (
                    <div key={pt} className={cn(
                      "border rounded-xl p-4 text-center cursor-pointer transition-all",
                      pt === "Demolition" ? "border-brand-500 bg-brand-50 text-brand-700 font-bold shadow-sm" : "border-slate-200 text-slate-600 hover:border-slate-300 font-medium bg-white"
                    )}>
                      {pt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                 <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Building Type</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none font-medium text-slate-800">
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Built-up Area (sq.ft.)</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none font-medium text-slate-800" defaultValue="50,000" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Number of Floors</label>
                    <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none font-medium text-slate-800" defaultValue={8} />
                 </div>
              </div>
            </div>

            {/* BOQ UPLOAD */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Have a BOQ or project document?</h3>
              <p className="text-slate-500 mb-6">Upload it and Circulo will extract relevant quantities to improve the preliminary estimate.</p>
              
              {boqState === "idle" && (
                <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center hover:bg-slate-50 transition-colors group cursor-pointer">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf" onChange={handleBoqUpload} />
                  <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-4 group-hover:text-brand-500 transition-colors" />
                  <h4 className="font-semibold text-slate-800 mb-1">Click to upload or drag & drop</h4>
                  <p className="text-sm text-slate-500">PDF up to 50MB</p>
                </div>
              )}

              {boqState === "analyzing" && (
                <div className="border border-slate-200 rounded-2xl p-6 flex items-center bg-slate-50 shadow-inner">
                   <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                     <FileText className="w-6 h-6 text-blue-600 animate-pulse" />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900 flex items-center gap-2">
                       Analyzing project document... <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                     </h4>
                     <p className="text-sm text-slate-500">{boqFileName}</p>
                   </div>
                </div>
              )}

              {boqState === "done" && (
                <div className="border border-emerald-200 bg-emerald-50/50 rounded-2xl p-6 flex items-start">
                   <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4 flex-shrink-0">
                     <Check className="w-6 h-6 text-emerald-600" />
                   </div>
                   <div className="pt-1">
                     <h4 className="font-bold text-emerald-900 mb-1">BOQ analyzed</h4>
                     <p className="text-sm text-emerald-700 mb-2">24 relevant construction items identified from {boqFileName}.</p>
                     <p className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded inline-block shadow-sm">
                       AI-extracted information — review before confirming.
                     </p>
                   </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 pb-12">
               <Button size="lg" className="w-full md:w-auto text-base" onClick={generateEstimate}>
                 Generate Estimate
               </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: AI PROCESSING ANIMATION */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-32 flex-1"
          >
             <div className="relative w-48 h-48 mb-12">
               {/* Sophisticated AI Processing Visual */}
               <div className="absolute inset-0 rounded-full border border-brand-200/50 scale-150 animate-ping" style={{ animationDuration: '3s' }}></div>
               <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-500 via-accent-violet to-accent-pink opacity-20 blur-2xl animate-pulse"></div>
               
               <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="48" fill="none" stroke="url(#grad)" strokeWidth="1.5" strokeDasharray="4 12" />
                 <defs>
                   <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#3b82f6" />
                     <stop offset="100%" stopColor="#8b5cf6" />
                   </linearGradient>
                 </defs>
               </svg>
               
               <div className="absolute inset-0 m-auto w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center z-10">
                 <Sparkles className="w-10 h-10 text-brand-600 animate-pulse" />
               </div>
               
               {/* Floating Material Particles */}
               <motion.div className="absolute -top-4 -left-4 bg-white px-4 py-2 rounded-xl shadow-md text-xs font-bold text-slate-700" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>Concrete</motion.div>
               <motion.div className="absolute top-1/2 -right-12 bg-white px-4 py-2 rounded-xl shadow-md text-xs font-bold text-slate-700" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}>Bricks</motion.div>
               <motion.div className="absolute -bottom-8 left-1/4 bg-white px-4 py-2 rounded-xl shadow-md text-xs font-bold text-slate-700" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.2, delay: 1 }}>Metal</motion.div>
             </div>
             
             <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Estimating material quantities...</h3>
             <p className="text-slate-500 font-medium">Calculating preliminary waste profile based on demolition data</p>
          </motion.div>
        )}

        {/* STEP 3: HUMAN REVIEW / EDIT */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center tracking-tight">
                  AI Waste Estimate
                  <span className="ml-4 bg-brand-50 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center border border-brand-100 shadow-sm">
                    <Sparkles className="w-3 h-3 mr-1" /> AI Generated
                  </span>
                </h1>
                <p className="text-slate-500 text-lg">Circulo generated a preliminary waste profile based on your project information.</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                 <div className="text-6xl font-black text-slate-900 tracking-tighter">
                   {totalCurrent} <span className="text-3xl text-slate-400 font-bold tracking-normal">t</span>
                 </div>
                 <div className="text-sm font-bold text-slate-500 mt-2 uppercase tracking-wide">Estimated C&D Waste</div>
               </div>
               
               <div className="flex-1 w-full md:max-w-sm bg-slate-50 rounded-2xl p-5 border border-slate-100 shadow-inner">
                 <h4 className="text-sm font-bold text-slate-900 mb-3">How did AI estimate this?</h4>
                 <ul className="text-xs text-slate-600 font-medium space-y-2 list-disc pl-4 mb-4">
                   <li>project type: demolition</li>
                   <li>built-up area: 50,000 sq.ft.</li>
                   <li>building type: residential (8 floors)</li>
                   <li>BOQ quantities extracted from uploaded document</li>
                 </ul>
                 <div className="flex items-center text-xs font-bold text-emerald-800 bg-emerald-100 inline-flex px-2 py-1 rounded shadow-sm">
                   Confidence: 86%
                 </div>
               </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="bg-slate-50 border-b border-slate-200 p-4 px-6 flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">Review Quantities</span>
                <span className="text-xs font-bold text-brand-700 bg-brand-100 px-2 py-1 rounded shadow-sm">AI recommends. Human confirms.</span>
              </div>
              
              <div className="divide-y divide-slate-100">
                {materials.map((mat, i) => (
                  <div key={mat.id} className="p-4 px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4 md:w-1/3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 border border-slate-200 shadow-sm">
                        {mat.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{mat.name}</div>
                        <div className="text-xs font-semibold text-slate-500 mt-0.5">Conf: {mat.conf}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:w-1/3 items-start md:items-center">
                      <div className="text-xs font-bold text-slate-500 mb-1">AI Estimate</div>
                      <div className="font-bold text-slate-700">{mat.original} t</div>
                    </div>

                    <div className="flex flex-col md:w-1/3 items-start md:items-end">
                      <div className="text-xs font-bold text-slate-900 mb-1">Human Review</div>
                      <EditableQuantityField 
                        value={mat.current} 
                        onChange={(val) => {
                          const newMats = [...materials];
                          newMats[i].current = val;
                          setMaterials(newMats);
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-amber-900 leading-relaxed">
                This is an AI-generated preliminary estimate. Review and confirm quantities before creating a waste listing.
              </p>
            </div>

            <div className="flex justify-between items-center pt-6 pb-12">
               <Button variant="ghost" onClick={() => setStep(1)} className="font-bold">Edit Project</Button>
               <Button size="lg" className="font-bold" onClick={confirmEstimate}>
                 Confirm Estimate
               </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: WASTE LISTING */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Create Waste Listing</h1>
              <p className="text-slate-500 text-lg">Select the materials you want to make available for recycling or reuse.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materials.filter(m => m.current > 0).slice(0, 3).map((mat) => (
                <div 
                  key={mat.id}
                  onClick={() => toggleMaterial(mat.id)}
                  className={cn(
                    "rounded-2xl p-6 border transition-all cursor-pointer shadow-sm",
                    selectedListingMaterials.includes(mat.id)
                      ? "border-brand-500 bg-brand-50/50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  )}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-slate-900">{mat.name}</h3>
                    <div className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center",
                      selectedListingMaterials.includes(mat.id) ? "bg-brand-500 border-brand-500" : "border-slate-300 bg-white"
                    )}>
                      {selectedListingMaterials.includes(mat.id) && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 mb-4">{mat.current} <span className="text-lg text-slate-400 font-bold">t</span></div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Potential Use</div>
                  <div className="text-sm font-medium text-slate-900">{mat.usage}</div>
                </div>
              ))}
            </div>

            {selectedListingMaterials.includes('concrete') && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                 <h3 className="text-xl font-bold text-slate-900">Listing: Concrete ({materials.find(m=>m.id==='concrete')?.current} t)</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-slate-900 mb-2">Condition</label>
                       <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none font-medium text-slate-800">
                         <option>Requires processing</option>
                         <option>Mixed</option>
                         <option>Segregated</option>
                         <option>Reusable</option>
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-slate-900 mb-2">Pickup Location</label>
                       <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-500" disabled defaultValue="Hyderabad, Telangana" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-slate-900 mb-2">Additional Notes</label>
                       <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none font-medium text-slate-800" rows={2} placeholder="Optional notes for recyclers"></textarea>
                     </div>
                   </div>

                   <div className="space-y-6">
                     <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-inner h-full flex flex-col justify-center items-center text-center">
                       <h4 className="text-sm font-bold text-emerald-900 mb-1">Potential Recovery Value</h4>
                       <div className="text-3xl font-black text-emerald-600 mb-3">₹92,500</div>
                       <p className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg">
                         Indicative platform estimate. Final transaction value depends on recycler assessment.
                       </p>
                     </div>
                   </div>
                 </div>

                 {/* AI Pre-Match Preview */}
                 <div className="mt-8 p-6 bg-gradient-to-r from-violet-50 to-brand-50 rounded-2xl border border-violet-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles className="w-24 h-24 text-violet-500" /></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <h4 className="font-bold text-slate-900 flex items-center text-lg mb-1">
                          <GitCompare className="w-5 h-5 text-violet-600 mr-2" /> AI Match Preview
                        </h4>
                        <p className="text-sm font-medium text-slate-600 max-w-md mb-4">
                          Based on your material, quantity and location, we expect several verified recyclers may be suitable.
                        </p>
                        <div className="text-sm font-bold text-slate-900 bg-white inline-flex px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                          3 suitable recyclers found
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-violet-200 shadow-md min-w-[250px]">
                        <div className="text-xs font-bold text-violet-600 uppercase tracking-wide mb-1">Best Potential Match</div>
                        <div className="font-bold text-slate-900 text-lg">EcoCycle Recycling Facility</div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                          <span className="text-sm font-medium text-slate-500 flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> 18km away</span>
                          <span className="text-sm font-black text-slate-900 bg-slate-100 px-2 py-1 rounded">94% Match</span>
                        </div>
                      </div>
                    </div>
                 </div>

              </motion.div>
            )}

            <div className="flex justify-between items-center pt-6 pb-12">
               <Button variant="ghost" onClick={() => setStep(3)} className="font-bold">Back to Estimates</Button>
               <Button size="lg" className="font-bold" onClick={finishListing} disabled={selectedListingMaterials.length === 0}>
                 List Waste
               </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: SUCCESS & JOURNEY */}
        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
             <div className="w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-brand-500/20">
               <Check className="w-10 h-10" />
             </div>
             
             <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Waste is now in the circular network.</h1>
             <p className="text-xl text-slate-500 font-medium mb-12 max-w-lg">Your {materials.find(m=>m.id==='concrete')?.current} t concrete listing is ready for recycler matching.</p>

             {/* Reusable Journey Component */}
             <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-lg p-8 mb-12">
               <h3 className="font-bold text-slate-900 text-left mb-8 flex items-center">
                 <Recycle className="w-5 h-5 text-brand-500 mr-2" /> AI Circular Waste Journey
               </h3>
               
               <WasteJourney 
                 stages={[
                   { label: "Project", state: "done", icon: Building2 },
                   { label: "AI Estimate", state: "done", icon: Sparkles },
                   { label: "Human Review", state: "done", icon: CheckCircle },
                   { label: "Waste Listed", state: "done", icon: FileText },
                   { label: "Recycler Match", state: "next", icon: GitCompare },
                   { label: "Transport", state: "locked", icon: Truck },
                 ]} 
               />
             </div>

             <div className="flex gap-4">
               <Link href="/company/dashboard">
                 <Button variant="outline" size="lg" className="font-bold">Back to Dashboard</Button>
               </Link>
               <Link href="/company/waste">
                 <Button size="lg" className="font-bold">View Waste Journey</Button>
               </Link>
             </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
