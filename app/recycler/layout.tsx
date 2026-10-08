"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Inbox, Settings, Activity, Store, ArrowLeftRight, User, Menu, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrganizationAccount } from "@/components/circulo/OrganizationAccount";

const navItems = [
  { name: "Dashboard", href: "/recycler/dashboard", icon: LayoutDashboard },
  { name: "Opportunities", href: "/recycler/opportunities", icon: Inbox },
  { name: "Incoming", href: "/recycler/incoming", icon: Activity },
  { name: "Processing", href: "/recycler/processing", icon: Settings },
  { name: "Marketplace", href: "/recycler/marketplace", icon: Store },
  { name: "Transactions", href: "/recycler/transactions", icon: ArrowLeftRight },
];

export default function RecyclerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-base-bg overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <Settings className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Circulo</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
                    isActive
                      ? "bg-violet-50 text-violet-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5",
                      isActive ? "text-violet-600" : "text-slate-400 group-hover:text-slate-500"
                    )}
                  />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center p-3 rounded-lg bg-blue-50 mb-3 border border-blue-100">
            <ShieldCheck className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <div className="text-xs font-medium text-blue-800">Status</div>
              <div className="text-sm font-bold text-blue-700">Verified Recycler</div>
            </div>
          </div>
          <div className="flex items-start gap-3 px-3 py-2 text-sm">
            <User className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" />
            <OrganizationAccount fallbackName="EcoCycle Facility" />
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex flex-col w-full h-full">
        <header className="flex-shrink-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <Settings className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Circulo</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 text-slate-500 hover:bg-slate-100 rounded-md"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bottom-0 bg-white z-10 overflow-y-auto border-b border-slate-200">
             <div className="py-2 px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div
                      className={cn(
                        "flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive
                          ? "bg-violet-50 text-violet-700"
                          : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 flex-shrink-0 h-5 w-5",
                          isActive ? "text-violet-600" : "text-slate-400"
                        )}
                      />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto bg-base-bg p-4 pb-24">
          {children}
        </main>
        
        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-20">
          <div className="flex items-center justify-around h-16">
            {[navItems[0], navItems[1], navItems[2], navItems[3]].map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} className="flex-1 flex flex-col items-center justify-center py-2">
                  <item.icon className={cn("w-5 h-5 mb-1", isActive ? "text-violet-600" : "text-slate-400")} />
                  <span className={cn("text-[10px] font-medium", isActive ? "text-violet-600" : "text-slate-500")}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Desktop Main Content */}
      <main className="hidden md:flex flex-1 flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white/50 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-slate-800 capitalize">
            {pathname.split("/").pop() || "Dashboard"}
          </h1>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
