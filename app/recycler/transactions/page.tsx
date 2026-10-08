import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export default function RecyclerTransactionsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div><h2 className="text-2xl font-bold text-slate-900">Transactions</h2><p className="mt-1 text-slate-500">Shipment receipts and processing records for EcoCycle.</p></div>
      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5 sm:p-6">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-700"><FileText className="h-5 w-5" /></div>
          <div><h3 className="font-bold text-slate-900">Shipment CIR-24001</h3><p className="text-sm text-slate-500">Oct 8, 2026 · Green Heights</p></div>
        </div>
        <dl className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Received material</dt><dd className="mt-1 font-bold text-slate-900">Concrete · 48.6 t</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Receipt</dt><dd className="mt-1 font-bold text-emerald-700">Generated and verified</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Processing record</dt><dd className="mt-1 font-bold text-slate-900">41.2 t recycled aggregate recorded</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Settlement</dt><dd className="mt-1 font-bold text-slate-600">No settlement amount recorded</dd></div>
        </dl>
        <div className="border-t border-slate-100 p-5 sm:px-6"><Link href="/recycler/incoming" className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><span className="mx-auto flex items-center gap-2">Open incoming shipment <ArrowRight className="h-4 w-4" /></span></Link></div>
      </article>
    </div>
  );
}
