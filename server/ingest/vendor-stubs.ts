import type { IngestReading } from "@/lib/types";
import type { VendorIngestAdapter } from "./types";

/**
 * Placeholder adapters. They exist so OmniSense / Detec / SMT can be wired
 * without changing the portal or the store. Do not call them until quotes land.
 */
class UnconfiguredAdapter implements VendorIngestAdapter {
  constructor(
    readonly id: VendorIngestAdapter["id"],
    readonly label: string,
  ) {}

  async pullReadings(): Promise<IngestReading[]> {
    throw new Error(
      `${this.label} is not configured. Keep JRE_INGEST_ADAPTER=sample until the vendor API and credentials exist. Hardware may still be CEM-sourced — data must land on the JRE server.`,
    );
  }
}

export const OmniSenseAdapter = () =>
  new UnconfiguredAdapter("omnisense", "OmniSense ingest");
export const DetecAdapter = () => new UnconfiguredAdapter("detec", "Detec ingest");
export const SmtAdapter = () => new UnconfiguredAdapter("smt", "SMT ingest");
