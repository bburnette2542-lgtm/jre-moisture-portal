import { ALERTS, JOB, SENSORS, statusCounts } from "@/lib/sample-data";
import type { AlertItem, IngestReading, Role, Sensor, Snapshot } from "@/lib/types";
import { cloneJson, formatEt, readingStatus } from "./format";
import { getActiveAdapter } from "./ingest";

type Memory = {
  sensors: Sensor[];
  alerts: AlertItem[];
  lastUpdated: string;
  ingestNote: string;
};

const globalForStore = globalThis as typeof globalThis & { __jreStore?: Memory };

function seed(): Memory {
  return {
    sensors: cloneJson(SENSORS),
    alerts: cloneJson(ALERTS),
    lastUpdated: JOB.lastUpdated,
    ingestNote: "SAMPLE adapter · waiting on partner-sensor quotes",
  };
}

function memory(): Memory {
  if (!globalForStore.__jreStore) {
    globalForStore.__jreStore = seed();
  }
  return globalForStore.__jreStore;
}

function pushTrend(values: number[], next: number) {
  const updated = [...values.slice(-29), next];
  return updated;
}

export function applyReadings(readings: IngestReading[]) {
  const state = memory();
  const observedAt = readings[0]?.observedAt ?? formatEt();

  for (const reading of readings) {
    const sensor = state.sensors.find((item) => item.id === reading.sensorId);
    if (!sensor) continue;

    const previousMoisture = sensor.moisture;
    sensor.tempF = reading.tempF;
    sensor.rh = reading.rh;
    sensor.moisture = reading.moisture;
    sensor.status = readingStatus(reading.moisture, reading.rh);
    sensor.lastReading = reading.observedAt;
    sensor.tempTrend = pushTrend(sensor.tempTrend, reading.tempF);
    sensor.rhTrend = pushTrend(sensor.rhTrend, reading.rh);
    sensor.moistureTrend = pushTrend(sensor.moistureTrend, reading.moisture);

    const alreadyOpen = state.alerts.some(
      (alert) => alert.sensorId === sensor.id && alert.status === "Open",
    );
    if (!alreadyOpen && previousMoisture < 16 && reading.moisture >= 16) {
      state.alerts.unshift({
        id: `a-${Date.now()}`,
        timeEt: reading.observedAt,
        sensorId: sensor.id,
        type: "Moisture",
        value: `${reading.moisture.toFixed(1)}%`,
        status: "Open",
        triage: "new",
        deskNote: "JRE notified",
        summary: `Moisture crossed the 16% sample threshold at Last Wing · ${sensor.location} · ${sensor.detail}.`,
        notified: [
          { name: "Brian Burnette", role: "JRE desk", channel: "desk", at: reading.observedAt },
          { name: "Gilbane / Owner", role: "Owner copy", channel: "portal", at: reading.observedAt },
        ],
      });
    }
  }

  state.lastUpdated = observedAt;
  state.ingestNote = "SAMPLE adapter · readings simulated until a vendor API is plugged in";
}

export async function refreshFromAdapter() {
  const adapter = getActiveAdapter();
  const readings = await adapter.pullReadings();
  applyReadings(readings);
  return adapter;
}

export function getSnapshot(role: Role): Snapshot {
  const state = memory();
  const adapter = getActiveAdapter();

  return {
    job: {
      name: JOB.name,
      wing: JOB.wing,
      phase: JOB.phase,
      fullTitle: JOB.fullTitle,
      roleLabel: role === "ops" ? "JRE ops desk · internal" : JOB.ownerView,
      lastUpdated: state.lastUpdated,
      gateway: JOB.gateway,
      hosting: JOB.hosting,
      domain: JOB.domain,
    },
    sensors: cloneJson(state.sensors),
    alerts: cloneJson(state.alerts),
    counts: statusCounts(state.sensors),
    ingest: {
      adapter: adapter.id,
      source: adapter.id,
      note: state.ingestNote,
    },
    role,
  };
}

export function mutateAlert(
  id: string,
  action: "acknowledge" | "dispatch" | "clear",
): AlertItem | null {
  const state = memory();
  const alert = state.alerts.find((item) => item.id === id);
  if (!alert) return null;

  const now = formatEt();

  if (action === "acknowledge") {
    alert.triage = "acknowledged";
    alert.acknowledgedAt = now;
    alert.acknowledgedBy = "Brian Burnette / JRE desk";
    alert.deskNote = "Ack & triage";
  }

  if (action === "dispatch") {
    alert.triage = "dispatched";
    alert.status = "Open";
    alert.dispatchedAt = now;
    alert.dispatchedTo = "JRE crew · last wing";
    alert.deskNote = "Dispatched";
    alert.notified = [
      ...alert.notified,
      { name: "JRE crew", role: "Dispatch", channel: "ops desk", at: now },
    ];
  }

  if (action === "clear") {
    alert.triage = "cleared";
    alert.status = "Cleared";
    alert.deskNote = "Cleared";
  }

  state.lastUpdated = now;
  return cloneJson(alert);
}
