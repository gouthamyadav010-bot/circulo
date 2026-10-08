"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type OrganizationAccountProps = { fallbackName: string };

export function OrganizationAccount({ fallbackName }: OrganizationAccountProps) {
  const router = useRouter();
  const [name, setName] = useState(fallbackName);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    let active = true;
    async function loadOrganization() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: membership } = await supabase
          .from("organization_memberships")
          .select("organization_id")
          .eq("user_id", user.id)
          .limit(1)
          .maybeSingle();
        if (!membership) return;

        const { data: organization } = await supabase
          .from("organizations")
          .select("name")
          .eq("id", membership.organization_id)
          .maybeSingle();

        if (active && organization?.name) setName(organization.name);
      } catch {
        // Keep the display fallback if Supabase has not been configured yet.
      }
    }

    void loadOrganization();
    return () => { active = false; };
  }, [fallbackName]);

  async function signOut() {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.replace("/");
    router.refresh();
  }

  return (
    <div className="min-w-0 flex-1">
      <div className="truncate font-medium text-slate-700" title={name}>{name}</div>
      <button
        type="button"
        onClick={signOut}
        className="relative mt-1 inline-flex w-full items-center justify-center rounded-md py-1 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
      >
        <LogOut className="absolute left-2 h-3.5 w-3.5" aria-hidden="true" />
        <span className="text-center">Sign out</span>
      </button>
    </div>
  );
}
