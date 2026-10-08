"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Building2, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type OrganizationType = "company" | "recycler";
type AuthFormProps = {
  mode: "signup" | "login";
  initialType: OrganizationType;
  nextPath?: string;
  message?: string;
};

export function AuthForm({ mode, initialType, nextPath, message }: AuthFormProps) {
  const router = useRouter();
  const [organizationType, setOrganizationType] = useState<OrganizationType>(initialType);
  const [organizationName, setOrganizationName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function destinationForCurrentUser(userId: string) {
    const supabase = createClient();
    const { data: membership, error: membershipError } = await supabase
      .from("organization_memberships")
      .select("organization_id")
      .eq("user_id", userId)
      .limit(1)
      .maybeSingle();

    if (membershipError || !membership) {
      throw new Error("Your organization setup is not ready yet. Please try again shortly.");
    }

    const { data: organization, error: organizationError } = await supabase
      .from("organizations")
      .select("organization_type")
      .eq("id", membership.organization_id)
      .maybeSingle();

    if (organizationError || !organization) {
      throw new Error("We could not load your organization. Please contact support.");
    }

    return `/${organization.organization_type}/dashboard`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured for this environment yet.");
      return;
    }

    setBusy(true);
    try {
      const supabase = createClient();

      if (mode === "signup") {
        const { data, error: signupError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: new URL("/auth/callback", window.location.origin).toString(),
            data: {
              full_name: fullName.trim(),
              organization_name: organizationName.trim(),
              organization_type: organizationType,
            },
          },
        });

        if (signupError) throw signupError;

        if (!data.session) {
          setNotice("Account created. Check your email to confirm it, then sign in.");
          return;
        }

        if (data.user) router.replace(await destinationForCurrentUser(data.user.id));
      } else {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (loginError) throw loginError;
        if (data.user) {
          const destination = await destinationForCurrentUser(data.user.id);
          const rolePrefix = destination.split("/").slice(0, 2).join("/");
          const safeNext = nextPath?.startsWith(`${rolePrefix}/`) || nextPath === rolePrefix
            ? nextPath
            : destination;
          router.replace(safeNext);
        }
      }

      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const isSignup = mode === "signup";

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-violet-50 px-4 py-10">
      <section className="mx-auto w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg shadow-sm">
            <Recycle className="h-6 w-6 text-white" aria-hidden="true" />
          </span>
          <span className="text-2xl font-bold tracking-tight text-slate-900">Circulo</span>
        </Link>

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {isSignup ? "Create your organization account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-slate-600">
            {isSignup
              ? "Register your company or recycling facility to get started."
              : "Sign in to continue to your organization workspace."}
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <fieldset>
                <legend className="mb-2 block text-sm font-semibold text-slate-700">Organization type</legend>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    aria-pressed={organizationType === "company"}
                    onClick={() => setOrganizationType("company")}
                    className={`relative flex min-h-14 items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${organizationType === "company" ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                  >
                    <Building2 className="absolute left-4 h-5 w-5" aria-hidden="true" />
                    <span className="text-center">Construction company</span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={organizationType === "recycler"}
                    onClick={() => setOrganizationType("recycler")}
                    className={`relative flex min-h-14 items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${organizationType === "recycler" ? "border-violet-500 bg-violet-50 text-violet-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                  >
                    <Recycle className="absolute left-4 h-5 w-5" aria-hidden="true" />
                    <span className="text-center">Recycling facility</span>
                  </button>
                </div>
              </fieldset>

              <label className="block text-sm font-semibold text-slate-700">
                Organization name
                <input
                  required
                  minLength={2}
                  maxLength={120}
                  autoComplete="organization"
                  value={organizationName}
                  onChange={(event) => setOrganizationName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  placeholder={organizationType === "company" ? "Your construction company" : "Your recycling facility"}
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Your name
                <input
                  required
                  minLength={2}
                  maxLength={120}
                  autoComplete="name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  placeholder="Full name"
                />
              </label>
            </>
          )}

          <label className="block text-sm font-semibold text-slate-700">
            Work email
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              placeholder="you@company.com"
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Password
            <input
              required
              type="password"
              minLength={8}
              autoComplete={isSignup ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              placeholder={isSignup ? "At least 8 characters" : "Your password"}
            />
          </label>

          {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">{error}</p>}
          {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800">{notice}</p>}
          {message === "organization-missing" && !error && (
            <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-800">
              Your account is not connected to an organization yet. Please contact support.
            </p>
          )}
          {message === "confirmation-failed" && !error && (
            <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700">
              Email confirmation could not be completed. Please request a new confirmation email and try again.
            </p>
          )}

          <Button type="submit" size="lg" disabled={busy} className="h-12 w-full font-bold">
            {busy ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {isSignup ? "Already registered? " : "New to Circulo? "}
          <Link href={isSignup ? "/auth/login" : `/auth/signup?type=${organizationType}`} className="font-bold text-brand-700 hover:underline">
            {isSignup ? "Sign in" : "Create an organization account"}
          </Link>
        </p>
      </section>
    </main>
  );
}
