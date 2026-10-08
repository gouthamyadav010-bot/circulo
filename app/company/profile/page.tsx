import { Building2, MapPin, ShieldCheck } from "lucide-react";

export default function CompanyProfilePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div><h2 className="text-2xl font-bold text-slate-900">Company Profile</h2><p className="mt-1 text-slate-500">Organization details for your Circulo workspace.</p></div>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Building2 className="h-7 w-7" /></div>
          <div><h3 className="text-xl font-bold text-slate-900">Green Heights Redevelopment</h3><p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><MapPin className="h-4 w-4" /> Hyderabad, Telangana</p></div>
        </div>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700"><ShieldCheck className="h-4 w-4" /> Verified company</div>
        <dl className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
          <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Active material stream</dt><dd className="mt-1 font-bold text-slate-900">Construction concrete</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Circularity score</dt><dd className="mt-1 font-bold text-slate-900">87 / 100</dd></div>
        </dl>
      </section>
    </div>
  );
}
