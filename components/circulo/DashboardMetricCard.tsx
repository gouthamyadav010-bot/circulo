import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardMetricCardProps {
  title: string;
  value: string;
  supportingText: string;
  icon?: LucideIcon;
  delay?: number;
}

export function DashboardMetricCard({
  title,
  value,
  supportingText,
  icon: Icon,
  delay = 0,
}: DashboardMetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col"
    >
      {Icon && (
        <div className="mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
            <Icon className="w-5 h-5" />
          </div>
        </div>
      )}
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-slate-800 mb-1">{title}</div>
      <div className="text-xs text-slate-500">{supportingText}</div>
    </motion.div>
  );
}

