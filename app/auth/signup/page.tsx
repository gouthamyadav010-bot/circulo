import { Suspense } from "react";
import { AuthForm } from "@/app/auth/AuthForm";

export default function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <Suspense fallback={<AuthPageFallback />}>
      <SignupContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SignupContent({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const params = await searchParams;
  const initialType = params.type === "recycler" ? "recycler" : "company";

  return <AuthForm mode="signup" initialType={initialType} />;
}

function AuthPageFallback() {
  return <main className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-violet-50 px-4 py-10" />;
}
