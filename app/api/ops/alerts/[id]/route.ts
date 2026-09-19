import { NextResponse } from "next/server";
import { readRole } from "@/server/role";
import { getSnapshot, mutateAlert } from "@/server/store";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const role = await readRole();
  if (role !== "ops") {
    return NextResponse.json(
      { error: "Dispatch and triage stay on the JRE ops desk." },
      { status: 403 },
    );
  }

  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as { action?: string } | null;
  const action = body?.action;
  if (action !== "acknowledge" && action !== "dispatch" && action !== "clear") {
    return NextResponse.json({ error: "Unknown ops action." }, { status: 400 });
  }

  const alert = mutateAlert(id, action);
  if (!alert) {
    return NextResponse.json({ error: "Alert not found." }, { status: 404 });
  }

  return NextResponse.json({ alert, snapshot: getSnapshot("ops") });
}
