import { SENSORS } from "@/lib/sample-data";
import type { IngestReading } from "@/lib/types";
import { formatEt } from "../format";
import type { VendorIngestAdapter } from "./types";

function wave(nowMs: number, index: number, amplitude: number) {
  const minutes = nowMs / 60_000;
  return Math.sin(minutes * 0.42 + index * 1.7) * amplitude;
}

/**
 * SAMPLE ingest: time-based drift over the seeded last-wing map.
 * Replace this adapter — do not replace the portal — when a vendor API lands.
 */
export class SampleAdapter implements VendorIngestAdapter {
  id = "sample" as const;
  label = "JRE sample ingest";

  async pullReadings(now = Date.now()): Promise<IngestReading[]> {
    const observedAt = formatEt(new Date(now));

    return SENSORS.map((sensor, index) => {
      const tempF = round(sensor.tempF + wave(now, index, 0.35));
      const rh = round(sensor.rh + wave(now, index + 3, 1.1));
      const moisture = round(sensor.moisture + wave(now, index + 8, sensor.id === "S6" ? 0.35 : 0.18));

      return {
        sensorId: sensor.id,
        tempF,
        rh: clamp(rh, 30, 80),
        moisture: clamp(moisture, 7, 22),
        observedAt,
        source: "sample",
      };
    });
  }
}

function round(value: number) {
  return Math.round(value * 10) / 10;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
