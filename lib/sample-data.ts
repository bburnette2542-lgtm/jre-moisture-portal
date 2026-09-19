import type { AlertItem, Sensor, SensorStatus } from "./types";

export const JOB = {
  name: "Virginia Home 725-011",
  wing: "Last Wing",
  phase: "Pilot",
  fullTitle: "Virginia Home 725-011 — Last Wing",
  ownerView: "Gilbane / Owner · read-only",
  lastUpdated: "Sep 18, 2026 · 06:18 ET",
  gateway: "OK",
  hosting: "JRE hosted",
  domain: "monitor.jamesriverexteriors.com",
} as const;

function series(
  start: number,
  end: number,
  wobble: number,
  spikeAt?: { from: number; values: number[] },
): number[] {
  const days = 30;
  return Array.from({ length: days }, (_, i) => {
    if (spikeAt && i >= spikeAt.from) {
      return spikeAt.values[i - spikeAt.from] ?? spikeAt.values.at(-1)!;
    }
    const t = i / (days - 1);
    const base = start + (end - start) * t;
    const wave = Math.sin(i * 0.7) * wobble;
    return Math.round((base + wave) * 10) / 10;
  });
}

export const SENSORS: Sensor[] = [
  {
    id: "S1",
    location: "Window bay 1",
    detail: "Window head",
    zone: "South elevation",
    status: "ok",
    tempF: 71.6,
    rh: 46,
    moisture: 10.4,
    lastReading: "Sep 18, 2026 · 06:12 ET",
    x: 22,
    y: 68,
    moistureTrend: series(9.8, 10.4, 0.4),
    tempTrend: series(70.2, 71.6, 0.6),
    rhTrend: series(44, 46, 1.2),
  },
  {
    id: "S2",
    location: "Window bay 1",
    detail: "Base of wall",
    zone: "South elevation",
    status: "ok",
    tempF: 70.9,
    rh: 47,
    moisture: 11.1,
    lastReading: "Sep 18, 2026 · 06:12 ET",
    x: 28,
    y: 78,
    moistureTrend: series(10.2, 11.1, 0.3),
    tempTrend: series(69.8, 70.9, 0.5),
    rhTrend: series(45, 47, 1.1),
  },
  {
    id: "S3",
    location: "Window bay 2",
    detail: "Window head",
    zone: "South elevation",
    status: "watch",
    tempF: 71.8,
    rh: 62,
    moisture: 12.4,
    lastReading: "Sep 18, 2026 · 06:13 ET",
    x: 46,
    y: 68,
    moistureTrend: series(11.6, 12.4, 0.4),
    tempTrend: series(70.4, 71.8, 0.5),
    rhTrend: series(48, 54, 1.4, {
      from: 22,
      values: [56, 58, 59, 61, 62, 62, 62, 62],
    }),
  },
  {
    id: "S4",
    location: "Window bay 2",
    detail: "Base of wall",
    zone: "South elevation",
    status: "ok",
    tempF: 71.1,
    rh: 49,
    moisture: 11.8,
    lastReading: "Sep 18, 2026 · 06:13 ET",
    x: 52,
    y: 78,
    moistureTrend: series(10.9, 11.8, 0.35),
    tempTrend: series(70.1, 71.1, 0.4),
    rhTrend: series(46, 49, 1.0),
  },
  {
    id: "S5",
    location: "Window bay 3",
    detail: "Window head",
    zone: "South elevation",
    status: "ok",
    tempF: 72.1,
    rh: 45,
    moisture: 10.8,
    lastReading: "Sep 18, 2026 · 06:14 ET",
    x: 70,
    y: 68,
    moistureTrend: series(10.1, 10.8, 0.3),
    tempTrend: series(70.8, 72.1, 0.5),
    rhTrend: series(43, 45, 1.1),
  },
  {
    id: "S6",
    location: "Window bay 3",
    detail: "Base of wall",
    zone: "South elevation",
    status: "alert",
    tempF: 72.4,
    rh: 48,
    moisture: 18.2,
    lastReading: "Sep 18, 2026 · 06:14 ET",
    x: 76,
    y: 78,
    moistureTrend: series(11.2, 13.1, 0.4, {
      from: 22,
      values: [13.4, 14.1, 14.8, 15.6, 16.4, 17.1, 17.8, 18.2],
    }),
    tempTrend: series(70.6, 72.4, 0.5),
    rhTrend: series(44, 48, 1.2),
  },
  {
    id: "S7",
    location: "West penetration",
    detail: "Penetration",
    zone: "West elevation",
    status: "ok",
    tempF: 70.4,
    rh: 44,
    moisture: 9.7,
    lastReading: "Sep 18, 2026 · 06:10 ET",
    x: 10,
    y: 58,
    moistureTrend: series(9.2, 9.7, 0.25),
    tempTrend: series(69.4, 70.4, 0.4),
    rhTrend: series(42, 44, 0.9),
  },
  {
    id: "S8",
    location: "East penetration",
    detail: "Penetration",
    zone: "East elevation",
    status: "watch",
    tempF: 70.2,
    rh: 55,
    moisture: 15.1,
    lastReading: "Sep 18, 2026 · 06:11 ET",
    x: 90,
    y: 58,
    moistureTrend: series(11.4, 13.2, 0.3, {
      from: 23,
      values: [13.6, 14.0, 14.4, 14.8, 15.0, 15.1, 15.1],
    }),
    tempTrend: series(69.6, 70.2, 0.4),
    rhTrend: series(50, 55, 1.1),
  },
  {
    id: "S9",
    location: "North roof-to-wall",
    detail: "Roof-to-wall",
    zone: "North elevation",
    status: "ok",
    tempF: 69.8,
    rh: 43,
    moisture: 10.1,
    lastReading: "Sep 18, 2026 · 06:09 ET",
    x: 28,
    y: 20,
    moistureTrend: series(9.6, 10.1, 0.3),
    tempTrend: series(68.2, 69.8, 0.8),
    rhTrend: series(41, 43, 1.0),
  },
  {
    id: "S10",
    location: "North roof-to-wall",
    detail: "Roof-to-wall",
    zone: "North elevation",
    status: "ok",
    tempF: 70.0,
    rh: 42,
    moisture: 9.9,
    lastReading: "Sep 18, 2026 · 06:09 ET",
    x: 72,
    y: 20,
    moistureTrend: series(9.4, 9.9, 0.25),
    tempTrend: series(68.4, 70.0, 0.7),
    rhTrend: series(40, 42, 0.9),
  },
  {
    id: "S11",
    location: "Corridor",
    detail: "Window head",
    zone: "Interior corridor",
    status: "ok",
    tempF: 71.4,
    rh: 44,
    moisture: 9.5,
    lastReading: "Sep 18, 2026 · 06:08 ET",
    x: 30,
    y: 44,
    moistureTrend: series(9.1, 9.5, 0.2),
    tempTrend: series(70.6, 71.4, 0.3),
    rhTrend: series(43, 44, 0.8),
  },
  {
    id: "S12",
    location: "Corridor",
    detail: "Base of wall",
    zone: "Interior corridor",
    status: "ok",
    tempF: 71.2,
    rh: 45,
    moisture: 10.2,
    lastReading: "Sep 18, 2026 · 06:08 ET",
    x: 70,
    y: 44,
    moistureTrend: series(9.8, 10.2, 0.25),
    tempTrend: series(70.4, 71.2, 0.3),
    rhTrend: series(43, 45, 0.8),
  },
];

export const ALERTS: AlertItem[] = [
  {
    id: "a-918",
    timeEt: "Sep 18, 2026 · 06:14 ET",
    sensorId: "S6",
    type: "Moisture",
    value: "18.2%",
    status: "Open",
    deskNote: "JRE notified",
    summary:
      "Moisture crossed the 16% sample threshold at Last Wing · Window bay 3 · Base of wall.",
  },
  {
    id: "a-912",
    timeEt: "Sep 12, 2026 · 14:02 ET",
    sensorId: "S3",
    type: "RH",
    value: "62%",
    status: "Cleared",
    deskNote: "JRE notified",
    summary: "Relative humidity watch at Window bay 2 · Window head. Sample event later cleared.",
  },
  {
    id: "a-905",
    timeEt: "Sep 5, 2026 · 09:41 ET",
    sensorId: "S8",
    type: "Moisture",
    value: "15.1%",
    status: "Cleared",
    deskNote: "JRE notified",
    summary: "East penetration moisture approached threshold. Sample event later cleared.",
  },
  {
    id: "a-828",
    timeEt: "Aug 28, 2026 · 22:18 ET",
    sensorId: "S9",
    type: "Temp",
    value: "48°F",
    status: "Info",
    deskNote: "Logged",
    summary: "Night temperature dip at north roof-to-wall. Informational sample only.",
  },
  {
    id: "a-821",
    timeEt: "Aug 21, 2026 · 11:05 ET",
    sensorId: "S6",
    type: "Moisture",
    value: "14.8%",
    status: "Cleared",
    deskNote: "JRE notified",
    summary: "Earlier moisture rise at Window bay 3 · Base of wall. Sample event later cleared.",
  },
];

export const MOISTURE_THRESHOLD = 16;

export function getSensor(id: string): Sensor | undefined {
  return SENSORS.find((sensor) => sensor.id.toLowerCase() === id.toLowerCase());
}

export function statusCounts() {
  return SENSORS.reduce(
    (acc, sensor) => {
      acc[sensor.status] += 1;
      return acc;
    },
    { ok: 0, watch: 0, alert: 0 } as Record<SensorStatus, number>,
  );
}

export function statusLabel(status: SensorStatus) {
  if (status === "ok") return "OK";
  if (status === "watch") return "Watch";
  return "Alert";
}
