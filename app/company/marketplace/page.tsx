"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  MapPin, 
  Store,
  ChevronRight,
  ShoppingCart,
  CheckCircle,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerifiedBadge } from "@/components/circulo/VerifiedBadge";
import { motion } from "framer-motion";

export interface MaterialListing {
  id: string;
  name: string;
  qty: number;
  unit: string;
  price: number;
  grade: string;
  location: string;
  seller: string;
  source: string;
  img: string;
  proof: string;
  originalProject: string;
  method: string;
  desc: string;
}

export default function Marketplace() {
  const [view, setView] = useState<"list" | "details" | "checkout" | "success">("list");
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialListing | null>(null);
  
  const materials: MaterialListing[] = [
    {
      id: "MAT-24001",
      name: "Recycled Aggregate",
      qty: 41.2,
      unit: "t",
      price: 1850,
      grade: "Grade A",
      location: "Hyderabad, Telangana",
      seller: "EcoCycle Recycling Facility",
      source: "Recovered from C&D waste",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      proof: "PROC-24001",
      originalProject: "Green Heights Redevelopment",
      method: "Crushing + Screening",
      desc: "Processed recycled aggregate suitable for applicable construction and infrastructure use."
    },
    {
      id: "MAT-24002",
      name: "Recovered Bricks",
      qty: 18,
      unit: "t",
      price: 4200,
      grade: "Grade B",
      location: "Hyderabad, Telangana",
      seller: "ReclaimWorks",
      source: "Demolition salvage",
      img: "https://images.unsplash.com/photo-1773649967262-bb72bc856682?auto=format&fit=crop&w=900&q=85",
      proof: "PROC-23992",
      originalProject: "Old Town Deconstruction",
      method: "Sorting & Cleaning",
      desc: "Intact red clay bricks recovered from wall demolition."
    },
    {
      id: "MAT-24003",
      name: "Recycled Metal",
      qty: 12,
      unit: "t",
      price: 48000,
      grade: "Grade A",
      location: "Secunderabad, TS",
      seller: "ScrapTech Processing",
      source: "Structural steel salvage",
      img: "https://images.unsplash.com/photo-1646714458797-47844e141807?auto=format&fit=crop&w=900&q=85",
      proof: "PROC-24011",
      originalProject: "Tech Park Phase 1",
      method: "Cutting & Sorting",
      desc: "Recovered structural rebar and I-beams, cut to standard lengths."
    }
  ];

  const handleSelect = (item: MaterialListing) => {
    setSelectedMaterial(item);
    setView("details");
  };

  if (view === "list") {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Circular Materials Marketplace</h2>
            <p className="text-slate-500 font-medium text-lg">Give recovered construction materials another useful life.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-auto">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search recovered materials..." 
                className="pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-medium focus:border-brand-500 focus:ring-0 outline-none w-full sm:w-72 transition-colors"
              />
            </div>
            <Button variant="outline" size="lg" className="h-[52px] font-bold w-full sm:w-auto relative px-6">
               <Filter className="w-4 h-4 mr-2" />
               <span className="mx-auto">Filters</span>
            </Button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {["All Materials", "Aggregates", "Metals", "Bricks", "Wood", "Glass"].map((chip, i) => (
             <button key={chip} className={`whitespace-nowrap px-4 py-2 rounded-lg font-bold text-sm border-2 transition-colors ${i === 0 ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
               {chip}
             </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {materials.map((mat) => (
            <div key={mat.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col cursor-pointer" onClick={() => handleSelect(mat)}>
              <div className="h-56 bg-slate-100 relative overflow-hidden">
                <img src={mat.img} alt={mat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 shadow-sm border border-white/20">
                  {mat.source}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-slate-900">{mat.name}</h3>
                  <div className="bg-brand-50 text-brand-700 px-2 py-1 rounded text-xs font-black">{mat.qty} {mat.unit}</div>
                </div>
                
                <div className="font-black text-2xl text-brand-600 mb-6">
                  ₹{mat.price.toLocaleString()}<span className="text-sm font-bold text-slate-400 ml-1">/ {mat.unit}</span>
                </div>
                
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center text-sm font-medium text-slate-600">
                    <span className="w-24 text-slate-400 font-bold uppercase tracking-wider text-[10px]">Grade</span> 
                    {mat.grade} <span className="text-slate-400 text-xs ml-1">(Recycler-declared)</span>
                  </div>
                  <div className="flex items-center text-sm font-medium text-slate-600">
                    <span className="w-24 text-slate-400 font-bold uppercase tracking-wider text-[10px]">Location</span> 
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> {mat.location.split(',')[0]}
                  </div>
                  <div className="flex items-center text-sm font-medium text-slate-600">
                    <span className="w-24 text-slate-400 font-bold uppercase tracking-wider text-[10px]">Seller</span> 
                    <VerifiedBadge className="scale-75 origin-left -ml-2 mr-1" />
                    <span className="truncate">{mat.seller}</span>
                  </div>
                </div>

                <Button className="w-full h-12 font-bold bg-slate-900 text-white group-hover:bg-brand-600 transition-colors relative">
                  <span className="mx-auto">View Material</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === "details" && selectedMaterial) {
    return (
      <div className="max-w-5xl mx-auto py-8">
        <Button variant="ghost" className="mb-6 font-bold text-slate-500 hover:text-slate-900 -ml-4" onClick={() => setView("list")}>
          &larr; Back to Marketplace
        </Button>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-8 relative">
          <div className="h-80 relative">
             <img src={selectedMaterial.img} alt={selectedMaterial.name} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
             
             <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
               <div>
                 <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center mb-4 shadow-sm">
                   <Store className="w-4 h-4 mr-1.5" /> Recovered Material
                 </div>
                 <h1 className="text-4xl font-black text-white tracking-tight mb-2">{selectedMaterial.name}</h1>
                 <div className="text-white/80 font-medium flex items-center">
                   <MapPin className="w-4 h-4 mr-1" /> {selectedMaterial.location}
                 </div>
               </div>
               <div className="text-right">
                 <div className="text-white/80 text-sm font-bold uppercase tracking-wider mb-1">Available Quantity</div>
                 <div className="text-4xl font-black text-brand-400">{selectedMaterial.qty} {selectedMaterial.unit}</div>
               </div>
             </div>
          </div>
          
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-10">
               <div>
                 <h3 className="text-xl font-bold text-slate-900 mb-4">Material Details</h3>
                 <p className="text-slate-600 font-medium leading-relaxed mb-8">
                   {selectedMaterial.desc}
                 </p>

                 <div className="grid grid-cols-2 gap-6">
                   <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Grade</div>
                     <div className="font-bold text-slate-900">{selectedMaterial.grade}</div>
                     <div className="text-xs font-medium text-slate-500 mt-0.5">Recycler-declared</div>
                   </div>
                   <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Source Project</div>
                     <div className="font-bold text-slate-900">{selectedMaterial.originalProject}</div>
                   </div>
                   <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Processing Method</div>
                     <div className="font-bold text-slate-900">{selectedMaterial.method}</div>
                   </div>
                   <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Seller</div>
                     <div className="font-bold text-slate-900 flex items-center">
                       {selectedMaterial.seller}
                       <VerifiedBadge className="ml-1 scale-75 origin-left" />
                     </div>
                   </div>
                 </div>
               </div>

               <div className="border-t border-slate-100 pt-10">
                 <h3 className="text-xl font-bold text-slate-900 mb-6">Processing Proof Available</h3>
                 <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex gap-6">
                   <div className="bg-emerald-100 w-16 h-16 rounded-xl flex items-center justify-center shrink-0">
                     <ShieldCheck className="w-8 h-8 text-emerald-600" />
                   </div>
                   <div>
                     <h4 className="font-bold text-emerald-900 mb-2">Platform processing record</h4>
                     <p className="text-sm font-medium text-emerald-800/80 mb-4">
                       This material has a verified processing history (Record: {selectedMaterial.proof}). Photo/video proof was submitted by the recycler during the recovery phase.
                     </p>
                     
                     <div className="flex gap-4">
                       <div className="bg-white/60 px-3 py-2 rounded-lg border border-emerald-200/50">
                         <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-0.5">Received Waste</div>
                         <div className="font-bold text-emerald-900">48.6 t</div>
                       </div>
                       <div className="bg-white/60 px-3 py-2 rounded-lg border border-emerald-200/50">
                         <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-0.5">Recovered Output</div>
                         <div className="font-bold text-emerald-900">41.2 t</div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-inner sticky top-24">
                 <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Price</div>
                 <div className="text-4xl font-black text-brand-600 mb-6">
                   ₹{selectedMaterial.price.toLocaleString()} <span className="text-lg text-slate-400 font-bold">/ {selectedMaterial.unit}</span>
                 </div>

                 <div className="space-y-4 mb-8">
                   <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                     <span className="font-medium text-slate-600">Availability</span>
                     <span className="font-bold text-emerald-600 flex items-center"><CheckCircle className="w-4 h-4 mr-1.5" /> In Stock</span>
                   </div>
                   <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                     <span className="font-medium text-slate-600">Min. Order</span>
                     <span className="font-bold text-slate-900">1 {selectedMaterial.unit}</span>
                   </div>
                 </div>

                 <Button size="lg" className="w-full h-14 font-bold bg-slate-900 text-white relative shadow-lg shadow-slate-900/20" onClick={() => setView("checkout")}>
                   <ShoppingCart className="w-5 h-5 mr-2 absolute left-6" />
                   <span className="mx-auto">Place Order</span>
                 </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (view === "checkout" && selectedMaterial) {
    const orderQty = 10;
    const subtotal = selectedMaterial.price * orderQty;
    const handling = 500;
    const total = subtotal + handling;

    return (
      <div className="max-w-2xl mx-auto py-16">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 gradient-bg"></div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight text-center">Simulated Checkout</h2>
          <div className="bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg w-max mx-auto mb-8 border border-brand-100">
            Demo Transaction
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
            <h3 className="font-bold text-slate-900 mb-4 pb-4 border-b border-slate-200">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-900">{selectedMaterial.name}</div>
                  <div className="text-sm font-medium text-slate-500">{orderQty} {selectedMaterial.unit} @ ₹{selectedMaterial.price.toLocaleString()}</div>
                </div>
                <div className="font-bold text-slate-900">₹{subtotal.toLocaleString()}</div>
              </div>
              <div className="flex justify-between items-start">
                <div className="font-medium text-slate-500">Platform handling</div>
                <div className="font-bold text-slate-900">₹{handling.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <span className="font-bold text-slate-900 text-lg">Total</span>
              <span className="font-black text-brand-600 text-2xl">₹{total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" size="lg" className="flex-1 font-bold h-14 relative" onClick={() => setView("details")}>
              <span className="mx-auto">Cancel</span>
            </Button>
            <Button size="lg" className="flex-[2] font-bold h-14 bg-slate-900 text-white hover:bg-slate-800 relative" onClick={() => setView("success")}>
              <span className="mx-auto">Confirm Order</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "success" && selectedMaterial) {
    return (
      <div className="max-w-2xl mx-auto py-20 flex flex-col items-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center w-full">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Order placed</h2>
          <p className="text-xl text-slate-500 font-medium mb-12 max-w-lg">
            10 {selectedMaterial.unit} of {selectedMaterial.name.toLowerCase()} has been reserved.
          </p>

          <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 mb-8 text-left space-y-4">
             <div className="flex justify-between border-b border-slate-100 pb-4">
               <span className="font-medium text-slate-500">Order</span>
               <span className="font-bold text-slate-900">ORD-24001</span>
             </div>
             <div className="flex justify-between border-b border-slate-100 pb-4">
               <span className="font-medium text-slate-500">Material</span>
               <span className="font-bold text-slate-900">{selectedMaterial.name}</span>
             </div>
             <div className="flex justify-between border-b border-slate-100 pb-4">
               <span className="font-medium text-slate-500">Quantity</span>
               <span className="font-bold text-slate-900">10 {selectedMaterial.unit}</span>
             </div>
             <div className="flex justify-between border-b border-slate-100 pb-4">
               <span className="font-medium text-slate-500">Seller</span>
               <span className="font-bold text-slate-900">{selectedMaterial.seller}</span>
             </div>
             <div className="flex justify-between pb-2">
               <span className="font-medium text-slate-500">Status</span>
               <span className="font-bold text-emerald-600 flex items-center"><CheckCircle className="w-4 h-4 mr-1.5" /> Confirmed</span>
             </div>
          </div>

          <Button variant="outline" size="lg" className="w-full max-w-xs font-bold h-14 relative" onClick={() => setView("list")}>
             <span className="mx-auto">Back to Marketplace</span>
          </Button>
        </motion.div>
      </div>
    );
  }

  return null;
}
