import { NextResponse } from "next/server";
import { isRole, readRole } from "@/server/role";
import { getSnapshot, refreshFromAdapter } from "@/server/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requested = new URL(request.url).searchParams.get("role");
  const cookieRole = await readRole();
  const role = isRole(requested) ? requested : cookieRole ?? "owner";

  await refreshFromAdapter();
  return NextResponse.json(getSnapshot(role));
}
