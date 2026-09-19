export type SensorStatus = "ok" | "watch" | "alert";
export type Role = "owner" | "ops";
export type AlertStatus = "Open" | "Cleared" | "Info";
export type TriageStatus = "new" | "acknowledged" | "dispatched" | "cleared" | "info";
export type IngestSource = "sample" | "omnisense" | "detec" | "smt";

export type Sensor = {
  id: string;
  location: string;
  detail: string;
  zone: string;
  status: SensorStatus;
  tempF: number;
  rh: number;
  moisture: number;
  lastReading: string;
  x: number;
  y: number;
  moistureTrend: number[];
  tempTrend: number[];
  rhTrend: number[];
};

export type Notification = {
  name: string;
  role: string;
  channel: string;
  at: string;
};

export type AlertItem = {
  id: string;
  timeEt: string;
  sensorId: string;
  type: string;
  value: string;
  status: AlertStatus;
  triage: TriageStatus;
  deskNote: string;
  summary: string;
  notified: Notification[];
  dispatchedAt?: string;
  dispatchedTo?: string;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
};

export type IngestReading = {
  sensorId: string;
  tempF: number;
  rh: number;
  moisture: number;
  observedAt: string;
  source: IngestSource;
};

export type Snapshot = {
  job: {
    name: string;
    wing: string;
    phase: string;
    fullTitle: string;
    roleLabel: string;
    lastUpdated: string;
    gateway: string;
    hosting: string;
    domain: string;
  };
  sensors: Sensor[];
  alerts: AlertItem[];
  counts: Record<SensorStatus, number>;
  ingest: {
    adapter: string;
    source: IngestSource;
    note: string;
  };
  role: Role;
};

export type OpsAction = "acknowledge" | "dispatch" | "clear";
