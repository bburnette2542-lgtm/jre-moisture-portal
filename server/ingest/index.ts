import { SampleAdapter } from "./sample-adapter";
import type { VendorIngestAdapter } from "./types";
import { DetecAdapter, OmniSenseAdapter, SmtAdapter } from "./vendor-stubs";

export type { VendorIngestAdapter } from "./types";

export function getActiveAdapter(): VendorIngestAdapter {
  const key = (process.env.JRE_INGEST_ADAPTER ?? "sample").toLowerCase();

  if (key === "omnisense") return OmniSenseAdapter();
  if (key === "detec") return DetecAdapter();
  if (key === "smt") return SmtAdapter();
  return new SampleAdapter();
}
