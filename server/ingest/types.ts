import type { IngestReading, IngestSource } from "@/lib/types";

/**
 * Vendor-neutral ingest contract.
 *
 * CEM hardware (OmniSense / Detec / SMT / Sensocon) may send packets here later.
 * The portal never talks to a vendor cloud. Adapters normalize into JRE readings.
 */
export interface VendorIngestAdapter {
  id: IngestSource;
  label: string;
  pullReadings(): Promise<IngestReading[]>;
}
