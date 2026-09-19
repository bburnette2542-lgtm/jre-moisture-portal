export type SensorStatus = "ok" | "watch" | "alert";

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
  y: number; // SVG coordinates in the 1000×560 wing plan
  moistureTrend: number[];
  tempTrend: number[];
  rhTrend: number[];
};

export type AlertItem = {
  id: string;
  timeEt: string;
  sensorId: string;
  type: string;
  value: string;
  status: "Open" | "Cleared" | "Info";
  deskNote: string;
  summary: string;
};
