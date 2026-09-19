import { NextResponse } from "next/server";
import { ROLE_COOKIE, isRole } from "@/server/role";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { role?: unknown } | null;
  if (!isRole(body?.role)) {
    return NextResponse.json({ error: "Choose owner or ops." }, { status: 400 });
  }

  const response = NextResponse.json({ role: body.role });
  response.cookies.set(ROLE_COOKIE, body.role, {
    path: "/",
    sameSite: "lax",
    httpOnly: false,
  });
  return response;
}
