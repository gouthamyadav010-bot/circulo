import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Truck } from "lucide-react";

export default function CompanyMatchesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Recycler Matches</h2>
        <p className="mt-1 text-slate-500">Review the recycler matched to your concrete shipment.</p>
      </div>
      <article className="rounded-3xl border border-brand-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"><ShieldCheck className="h-4 w-4" /> Verified recycler</div>
            <h3 className="text-xl font-bold text-slate-900">EcoCycle Recycling Facility</h3>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-500"><MapPin className="h-4 w-4" /> Hyderabad · 18 km away</p>
          </div>
          <div className="rounded-2xl bg-brand-50 px-5 py-4 text-center"><div className="text-3xl font-black text-brand-700">94%</div><div className="text-xs font-bold uppercase tracking-wide text-brand-700">AI match</div></div>
        </div>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Material</dt><dd className="mt-1 font-bold text-slate-900">Concrete</dd></div>
          <div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Expected quantity</dt><dd className="mt-1 font-bold text-slate-900">50.0 t</dd></div>
          <div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Status</dt><dd className="mt-1 font-bold text-emerald-700">Matched</dd></div>
        </dl>
        <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
          <Link href="/company/tracking" className="inline-flex h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-bold shadow-sm transition-colors bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><span className="mx-auto flex items-center gap-2">Arrange transport <Truck className="h-4 w-4" /></span></Link>
          <Link href="/company/waste" className="inline-flex h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><span className="mx-auto flex items-center gap-2">View waste listing <ArrowRight className="h-4 w-4" /></span></Link>
        </div>
      </article>
    </div>
  );
}
