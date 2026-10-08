"use client";

import { motion } from "framer-motion";
import { Building2, Recycle, ArrowRight, Leaf, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 bg-gradient-to-br from-brand-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-200/40 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-violet/20 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-accent-pink/10 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center justify-center space-x-2"
        >
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
            <Recycle className="text-white w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Circulo</h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-base-fg mb-6 max-w-4xl leading-tight"
        >
          Transform C&D waste into a <br className="hidden md:block" />
          <span className="gradient-text">tradable resource</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl leading-relaxed"
        >
          The AI-powered Circular Economy Platform. Trace, verify, and match construction waste with the optimal recycling facility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-24"
        >
          <Link href="/company/dashboard" className="group">
            <div className="glass-panel rounded-2xl p-8 text-left h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-transparent hover:border-brand-200">
              <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center mb-6 text-brand-600">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-base-fg group-hover:text-brand-600 transition-colors">
                Construction Company
              </h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Estimate waste using AI, list materials, find verified recyclers, and track the end-to-end journey.
              </p>
              <div className="flex items-center text-brand-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                Continue as Company <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </div>
          </Link>

          <Link href="/recycler/dashboard" className="group">
            <div className="glass-panel rounded-2xl p-8 text-left h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-transparent hover:border-accent-violet/30">
              <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center mb-6 text-accent-violet">
                <Recycle className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-base-fg group-hover:text-accent-violet transition-colors">
                Recycling Facility
              </h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Review incoming opportunities, manage processing, issue receipts, and list recovered materials.
              </p>
              <div className="flex items-center text-accent-violet font-semibold group-hover:translate-x-2 transition-transform duration-300">
                Continue as Recycler <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl text-center border-t border-slate-200 pt-12"
        >
          <div className="flex flex-col items-center">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-800 mb-2">Sustainable</h4>
            <p className="text-sm text-slate-500">Diverting material from landfills</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-brand-600 p-3 rounded-full mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-800 mb-2">AI-Powered</h4>
            <p className="text-sm text-slate-500">Intelligent estimation & matching</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-slate-100 text-slate-700 p-3 rounded-full mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-800 mb-2">Verified</h4>
            <p className="text-sm text-slate-500">Transparent chain of custody</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
