"use client";

import Link from "next/link";
import { Building2, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectsList() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
          <p className="text-slate-500 mt-1">Manage your demolition and construction sites.</p>
        </div>
        <Link href="/company/projects/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Green Heights Redevelopment", type: "Demolition", waste: "185t listed", loc: "Hyderabad, TS", status: "Active" },
          { name: "Sector 4 Industrial", type: "Construction", waste: "45t listed", loc: "Secunderabad, TS", status: "Active" },
          { name: "Metro Hub Expansion", type: "Renovation", waste: "12t listed", loc: "Madhapur, TS", status: "Planning" }
        ].map((proj, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
                <Building2 className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${proj.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                {proj.status}
              </span>
            </div>
            <h3 className="font-semibold text-lg text-slate-900 mb-1">{proj.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{proj.type} • {proj.loc}</p>
            
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-sm font-medium text-brand-600">{proj.waste}</span>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                Manage <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

