import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(new URL("/auth/login?message=confirmation-failed", request.url));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/auth/login?message=confirmation-failed", request.url));
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/auth/login", request.url));

  const { data: membership } = await supabase
    .from("organization_memberships")
    .select("organization_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (!membership) return NextResponse.redirect(new URL("/auth/login?message=organization-missing", request.url));

  const { data: organization } = await supabase
    .from("organizations")
    .select("organization_type")
    .eq("id", membership.organization_id)
    .maybeSingle();

  const destination = organization?.organization_type === "recycler"
    ? "/recycler/dashboard"
    : "/company/dashboard";
  return NextResponse.redirect(new URL(destination, request.url));
}
