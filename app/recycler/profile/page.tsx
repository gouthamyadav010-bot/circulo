import { Building2, MapPin, ShieldCheck } from "lucide-react";

export default function RecyclerProfilePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div><h2 className="text-2xl font-bold text-slate-900">Recycler Profile</h2><p className="mt-1 text-slate-500">Facility details for your Circulo workspace.</p></div>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-50 text-violet-700"><Building2 className="h-7 w-7" /></div>
          <div><h3 className="text-xl font-bold text-slate-900">EcoCycle Recycling Facility</h3><p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><MapPin className="h-4 w-4" /> Hyderabad, Telangana</p></div>
        </div>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700"><ShieldCheck className="h-4 w-4" /> Verified recycler</div>
        <dl className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
          <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Accepted material</dt><dd className="mt-1 font-bold text-slate-900">Concrete and construction aggregates</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Current shipment</dt><dd className="mt-1 font-bold text-slate-900">CIR-24001 · 48.6 t received</dd></div>
        </dl>
      </section>
    </div>
  );
}
