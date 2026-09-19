import { NextResponse } from "next/server";
import { getActiveAdapter } from "@/server/ingest";

export const dynamic = "force-dynamic";

export async function GET() {
  const adapter = getActiveAdapter();
  return NextResponse.json({
    adapter: adapter.id,
    label: adapter.label,
    note: "Vendor adapters live in server/ingest/. Set JRE_INGEST_ADAPTER when OmniSense, Detec, or SMT credentials exist. Until then SAMPLE ingest feeds the JRE store.",
    stubs: ["omnisense", "detec", "smt"],
  });
}
