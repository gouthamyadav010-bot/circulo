import { Suspense } from "react";
import { AuthForm } from "@/app/auth/AuthForm";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; message?: string }>;
}) {
  return (
    <Suspense fallback={<AuthPageFallback />}>
      <LoginContent searchParams={searchParams} />
    </Suspense>
  );
}

async function LoginContent({ searchParams }: { searchParams: Promise<{ next?: string; message?: string }> }) {
  const params = await searchParams;
  return <AuthForm mode="login" initialType="company" nextPath={params.next} message={params.message} />;
}

function AuthPageFallback() {
  return <main className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-violet-50 px-4 py-10" />;
}
