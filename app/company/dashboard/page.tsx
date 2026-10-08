"use client";

import { motion } from "framer-motion";
import { Plus, Camera, Upload, ListPlus, Building2, Recycle, ArrowUpRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardMetricCard } from "@/components/circulo/DashboardMetricCard";
import { ProjectCard } from "@/components/circulo/ProjectCard";
import Link from "next/link";

export default function CompanyDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Good morning, GreenBuild Infra
          </h2>
          <p className="text-slate-500 mt-1">Here&apos;s your circular construction activity.</p>
        </div>
      </div>

      {/* Hero / Primary Dashboard Area */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-12 shadow-lg">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-violet/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Turn construction waste into recovered value.
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-lg">
            Estimate, list, match, track and recover materials through one intelligent circular workflow.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/company/projects/new">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-50 rounded-xl font-semibold px-12 shadow-sm relative">
                <Plus className="w-5 h-5 absolute left-4" />
                <span>Create Project</span>
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white rounded-xl relative px-12">
              <Camera className="w-5 h-5 absolute left-4" />
              <span>Scan Waste</span>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white rounded-xl relative px-12">
              <Upload className="w-5 h-5 absolute left-4" />
              <span>Upload BOQ</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Executive Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardMetricCard 
          title="Active Projects" 
          value="4" 
          supportingText="+1 this month"
          icon={Building2}
          delay={0.1}
        />
        <DashboardMetricCard 
          title="Waste Generated" 
          value="1,284 t" 
          supportingText="Across active projects"
          icon={Recycle}
          delay={0.2}
        />
        <DashboardMetricCard 
          title="Diverted for Recycling" 
          value="912 t" 
          supportingText="71% of registered waste"
          icon={ArrowUpRight}
          delay={0.3}
        />
      </section>

      {/* Impact Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 gradient-bg"></div>
          <h3 className="text-xl font-bold text-slate-900 mb-6">Your Circular Impact</h3>
          
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-black text-slate-900 mb-1">48.6 <span className="text-lg text-slate-400 font-medium">t</span></div>
              <div className="text-sm font-medium text-slate-500">Waste diverted to recycler</div>
            </div>
            <div>
              <div className="text-3xl font-black text-brand-600 mb-1">41.2 <span className="text-lg text-brand-400 font-medium">t</span></div>
              <div className="text-sm font-medium text-slate-500">Material recovered</div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-end mb-1">
                <div className="text-3xl font-black text-slate-900">87</div>
                <div className="text-lg font-bold text-slate-400 mb-0.5 ml-1">/ 100</div>
              </div>
              <div className="text-sm font-medium text-slate-500">Circularity Score</div>
            </div>
          </div>
          
          <div className="mt-8 bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2.5 rounded-xl border border-emerald-200">
                <Recycle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Green Heights journey complete</h4>
                <p className="text-xs font-medium text-slate-500 mt-0.5">41.2t of your concrete waste is now on the marketplace.</p>
              </div>
            </div>
            <Link href="/company/projects/green-heights">
              <Button className="font-bold bg-slate-900 text-white relative px-6">
                <span className="mx-auto">View Completion</span>
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3"></div>
          
          <div>
            <h3 className="font-bold text-lg mb-2">Platform Circularity Score</h3>
            <p className="text-sm text-slate-400 font-medium mb-6">Score based on recovery and traceability completeness.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                <path className="text-emerald-500" strokeDasharray="87, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-black text-2xl">87</div>
            </div>
            <Link href="/company/projects/green-heights">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 font-bold relative">
                <span className="mx-auto">Details</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Active Projects */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-slate-900">Active Projects</h3>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard 
            name="Green Heights Redevelopment"
            location="Hyderabad, Telangana"
            type="Demolition"
            size="50,000 sq.ft."
            waste="234 t"
            stage="Waste Listing"
            circularity="87 / 100"
          />
          <ProjectCard 
            name="Sector 4 Industrial Phase 2"
            location="Secunderabad, Telangana"
            type="New Construction"
            size="120,000 sq.ft."
            waste="415 t"
            stage="Recycler Match"
            circularity="92 / 100"
          />
          <ProjectCard 
            name="Metro Hub Expansion"
            location="Madhapur, Telangana"
            type="Renovation"
            size="35,000 sq.ft."
            waste="85 t"
            stage="Project"
            circularity="-- / 100"
          />
        </div>
      </section>

    </div>
  );
}
