import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig, isSupabaseConfigured } from "./env";

export async function updateSession(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.next({ request });
  }

  const { url, publishableKey } = getSupabaseConfig();
  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const path = request.nextUrl.pathname;
  const requestedType = path.startsWith("/company/")
    ? "company"
    : path.startsWith("/recycler/")
      ? "recycler"
      : null;

  if (!requestedType) return response;

  if (!claims?.sub) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", path);
    return redirectWithCookies(loginUrl, response);
  }

  const { data: membership } = await supabase
    .from("organization_memberships")
    .select("organization_id")
    .eq("user_id", claims.sub)
    .limit(1)
    .maybeSingle();

  if (!membership) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("message", "organization-missing");
    return redirectWithCookies(loginUrl, response);
  }

  const { data: organization } = await supabase
    .from("organizations")
    .select("organization_type")
    .eq("id", membership.organization_id)
    .maybeSingle();

  if (organization?.organization_type && organization.organization_type !== requestedType) {
    return redirectWithCookies(
      new URL(`/${organization.organization_type}/dashboard`, request.url),
      response
    );
  }

  return response;
}

function redirectWithCookies(destination: URL, response: NextResponse) {
  const redirectResponse = NextResponse.redirect(destination);
  response.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie));

  for (const header of ["cache-control", "expires", "pragma"]) {
    const value = response.headers.get(header);
    if (value) redirectResponse.headers.set(header, value);
  }

  return redirectResponse;
}
