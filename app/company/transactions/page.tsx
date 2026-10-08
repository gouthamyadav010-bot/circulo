import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export default function CompanyTransactionsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div><h2 className="text-2xl font-bold text-slate-900">Transactions</h2><p className="mt-1 text-slate-500">Shipment and service records for Green Heights.</p></div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5 sm:p-6">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700"><FileText className="h-5 w-5" /></div>
          <div><h3 className="font-bold text-slate-900">Shipment TRK-8822</h3><p className="text-sm text-slate-500">Oct 8, 2026 · Green Heights → EcoCycle Facility</p></div>
        </div>
        <dl className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Material received</dt><dd className="mt-1 font-bold text-slate-900">Concrete · 48.6 t</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Receipt status</dt><dd className="mt-1 font-bold text-emerald-700">Received and verified</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Transport estimate</dt><dd className="mt-1 font-bold text-slate-900">₹8,500 · estimate</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Pickup</dt><dd className="mt-1 font-bold text-slate-900">Oct 8, 11:00 AM · QR code scanned</dd></div>
        </dl>
        <div className="border-t border-slate-100 p-5 sm:px-6"><Link href="/company/tracking" className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><span className="mx-auto flex items-center gap-2">Open shipment tracking <ArrowRight className="h-4 w-4" /></span></Link></div>
      </div>
    </div>
  );
}
