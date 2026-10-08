"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  Map, 
  BarChart3, 
  AlertTriangle, 
  Users, 
  ChevronDown,
  TrendingUp,
  Package,
  Recycle,
  Truck,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthorityDashboard() {
  const [city, setCity] = useState("Hyderabad");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Circular Economy Command Center</h1>
          <p className="text-slate-500 mt-1 font-medium">Monitor registered construction waste, material recovery and active circular movements.</p>
        </div>
        
        <div className="relative">
          <Button 
            variant="outline" 
            className="relative w-48 justify-between bg-white border-slate-200"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="mx-auto flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              {city}
            </span>
            <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400" />
          </Button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1">
              {["Hyderabad", "Secunderabad", "All locations"].map((loc) => (
                <button
                  key={loc}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                  onClick={() => {
                    setCity(loc);
                    setDropdownOpen(false);
                  }}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold mb-2 uppercase tracking-wider">Registered C&D Waste</div>
          <div className="text-2xl font-black text-slate-900">1,284 t</div>
          <div className="text-xs text-emerald-600 font-medium mt-2 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +12% this month
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold mb-2 uppercase tracking-wider">Collected</div>
          <div className="text-2xl font-black text-slate-900">1,046 t</div>
          <div className="text-xs text-slate-500 font-medium mt-2 flex items-center">
            81% collection rate
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-50 rounded-bl-full -z-0"></div>
          <div className="text-slate-500 text-xs font-semibold mb-2 uppercase tracking-wider relative z-10">Material Recovered</div>
          <div className="text-2xl font-black text-brand-700 relative z-10">912 t</div>
          <div className="text-xs text-brand-600 font-medium mt-2 flex items-center relative z-10">
            87% recovery rate
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold mb-2 uppercase tracking-wider">Active Movements</div>
          <div className="text-2xl font-black text-slate-900">24</div>
          <div className="text-xs text-blue-600 font-medium mt-2 flex items-center">
            <Truck className="w-3 h-3 mr-1" /> In transit now
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold mb-2 uppercase tracking-wider">Verified Recyclers</div>
          <div className="text-2xl font-black text-slate-900">8</div>
          <div className="text-xs text-emerald-600 font-medium mt-2 flex items-center">
            <ShieldCheck className="w-3 h-3 mr-1" /> Network active
          </div>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-white">
            <Recycle className="w-24 h-24" />
          </div>
          <div className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wider relative z-10">Circularity Rate</div>
          <div className="text-2xl font-black text-white relative z-10">71%</div>
          <div className="text-xs text-emerald-400 font-medium mt-2 flex items-center relative z-10">
            12% above average
          </div>
        </div>
      </div>

      {/* Map & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Movements Map */}
        <div className="lg:col-span-2 bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden relative shadow-inner min-h-[400px]">
          <div className="absolute inset-0 bg-[url('https://api.maptiler.com/maps/basic-v2/256/12/2932/1865.png?key=fAWeU1kL3Q32xY9h0sRk')] bg-repeat bg-center opacity-60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/80 to-blue-50/40 backdrop-blur-[1px]"></div>
          
          <div className="absolute inset-0 p-6 flex flex-col z-10 pointer-events-none">
            <div className="flex justify-between items-start pointer-events-auto">
              <div className="bg-white/90 backdrop-blur-md shadow-sm rounded-xl p-3 border border-white/50">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Map className="w-4 h-4 text-brand-600" /> Active Movements
                </h3>
              </div>
              <div className="bg-white/90 backdrop-blur-md shadow-sm rounded-xl p-2 border border-white/50 flex gap-3 text-xs font-medium">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-900"></div> Sites</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-brand-500"></div> Facilities</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Trucks</div>
              </div>
            </div>

            {/* SVG Routes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
              {/* Route 1 */}
              <path d="M 150 100 Q 300 150 450 350" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" className="opacity-50" />
              <path d="M 150 100 Q 300 150 350 215" fill="none" stroke="#3b82f6" strokeWidth="4" />
              
              {/* Route 2 */}
              <path d="M 600 80 Q 550 200 470 340" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" className="opacity-50" />
              <path d="M 600 80 Q 550 200 520 250" fill="none" stroke="#3b82f6" strokeWidth="4" />

              {/* Route 3 */}
              <path d="M 200 400 Q 300 420 440 370" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" className="opacity-50" />
              <path d="M 200 400 Q 300 420 320 415" fill="none" stroke="#3b82f6" strokeWidth="4" />
            </svg>

            {/* Markers */}
            <div className="absolute top-[100px] left-[150px] w-3 h-3 bg-slate-900 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[80px] left-[600px] w-3 h-3 bg-slate-900 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[400px] left-[200px] w-3 h-3 bg-slate-900 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Hub Facility */}
            <div className="absolute top-[350px] left-[450px] w-5 h-5 bg-brand-500 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2 shadow-lg flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-50"></span>
            </div>

            {/* Trucks */}
            <div className="absolute top-[215px] left-[350px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow-md border border-slate-200">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="absolute top-[250px] left-[520px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow-md border border-slate-200">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="absolute top-[415px] left-[320px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow-md border border-slate-200">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Analytics Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Material Breakdown</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium mb-1.5">
                  <span className="text-slate-700">Concrete</span>
                  <span className="text-slate-900 font-bold">58%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-800 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-1.5">
                  <span className="text-slate-700">Steel / Metals</span>
                  <span className="text-slate-900 font-bold">22%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-1.5">
                  <span className="text-slate-700">Wood / Timber</span>
                  <span className="text-slate-900 font-bold">12%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-1.5">
                  <span className="text-slate-700">Mixed / Other</span>
                  <span className="text-slate-900 font-bold">8%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full" style={{ width: '8%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100 p-6 shadow-sm">
            <h3 className="font-bold text-emerald-900 mb-2">Recovery Overview</h3>
            <p className="text-sm text-emerald-700 mb-6 font-medium">Platform-wide material processing.</p>
            
            <div className="flex items-end gap-3 h-24 mb-2">
              <div className="w-1/3 bg-emerald-200 rounded-t-lg h-[40%] relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-emerald-800">14%</div>
                <div className="absolute bottom-2 w-full text-center text-[10px] font-bold text-emerald-800 uppercase">Landfill</div>
              </div>
              <div className="w-1/3 bg-emerald-400 rounded-t-lg h-[65%] relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-emerald-900">22%</div>
                <div className="absolute bottom-2 w-full text-center text-[10px] font-bold text-emerald-900 uppercase">Downcycled</div>
              </div>
              <div className="w-1/3 gradient-bg rounded-t-lg h-[100%] relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-brand-700">64%</div>
                <div className="absolute bottom-2 w-full text-center text-[10px] font-bold text-white uppercase">High-Value</div>
              </div>
            </div>
            <div className="h-1 w-full bg-emerald-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Anomalies & Network */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Activity Requiring Review */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-amber-100 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Activity Requiring Review</h3>
            </div>
            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">3 Alerts</span>
          </div>

          <div className="space-y-4 flex-1">
            {/* Anomaly 1 */}
            <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Quantity Discrepancy</h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    TRK-8822 &middot; 50t expected vs 48.6t received. 
                  </p>
                  <div className="text-[10px] font-bold text-amber-700 mt-2 uppercase tracking-wide">Potentially irregular movement</div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="relative w-28 shrink-0 bg-white border-amber-200 hover:bg-amber-50">
                <span className="mx-auto text-amber-700">Review</span>
              </Button>
            </div>

            {/* Anomaly 2 */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Route Deviation</h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    TRK-1049 &middot; Off verified route for 12 mins.
                  </p>
                  <div className="text-[10px] font-bold text-brand-600 mt-2 uppercase tracking-wide">Review Recommended</div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="relative w-28 shrink-0 bg-white">
                <span className="mx-auto">Review</span>
              </Button>
            </div>

            {/* Anomaly 3 */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Prolonged Stop</h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    TRK-9901 &middot; Stationary for 45 mins at unverified location.
                  </p>
                  <div className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-wide">Pending Auto-Clear</div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="relative w-28 shrink-0 bg-white">
                <span className="mx-auto">Review</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Verified Recycler Network */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Verified Recycler Network</h3>
            </div>
            <Button variant="ghost" size="sm" className="relative text-brand-600 font-bold hover:text-brand-700">
               <span className="mx-auto">View All</span>
            </Button>
          </div>

          <div className="space-y-4 flex-1">
            {[
              { name: "EcoCycle Solutions", type: "Concrete & Masonry", cap: "85% capacity", rating: "99.8% Trust Score" },
              { name: "MetalRecover Hub", type: "Steel & Ferrous", cap: "42% capacity", rating: "98.5% Trust Score" },
              { name: "TimberLoop Processing", type: "Wood & Biomass", cap: "60% capacity", rating: "99.1% Trust Score" },
              { name: "Urban Aggregate Co.", type: "Mixed C&D", cap: "90% capacity", rating: "97.4% Trust Score" }
            ].map((facility, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                    <Building2 className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{facility.name}</h4>
                    <div className="text-xs text-slate-500 mt-0.5 font-medium">{facility.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-600">{facility.rating}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{facility.cap}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

