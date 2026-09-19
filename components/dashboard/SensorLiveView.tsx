"use client";

import Link from "next/link";
import { useLiveSnapshot } from "@/hooks/useLiveSnapshot";
import { MOISTURE_THRESHOLD, statusLabel } from "@/lib/sample-data";
import type { Role } from "@/lib/types";
import { AlertCard } from "../AlertCard";
import { MetricTile } from "../MetricTile";
import { SampleTag } from "../SampleTag";
import { StatusChip } from "../StatusChip";
import { TrendChart } from "../TrendChart";
import { WingPlan } from "../WingPlan";

export function SensorLiveView({ id, role }: { id: string; role: Role }) {
  const snapshot = useLiveSnapshot();
  const hrefBase = role === "ops" ? "/ops/sensors" : "/portal/sensors";
  const mapHref = role === "ops" ? "/ops/map" : "/portal/map";

  if (!snapshot) {
    return <p className="text-sm text-muted">Loading sensor…</p>;
  }

  const sensor = snapshot.sensors.find((item) => item.id.toLowerCase() === id.toLowerCase());
  if (!sensor) {
    return <p className="text-sm text-muted">No sample pin {id}.</p>;
  }

  const related = snapshot.alerts.filter((alert) => alert.sensorId === sensor.id);
  const moistureAccent = sensor.status === "alert" ? "#B42318" : "#1A6B6B";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href={mapHref} className="text-xs font-semibold text-teal hover:underline">
            ← Wing plan
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h1 className="font-serif text-3xl text-navy">
              {sensor.id} · {sensor.detail}
            </h1>
            <StatusChip status={sensor.status} />
            <SampleTag />
          </div>
          <p className="mt-2 text-sm text-muted">
            {sensor.location} · {sensor.zone} · Last reading {sensor.lastReading} · SAMPLE
          </p>
        </div>
        <p className="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-teal">
          {sensor.status === "ok"
            ? "Within sample range"
            : role === "ops"
              ? `Desk owns ${statusLabel(sensor.status)}`
              : `JRE notified · ${statusLabel(sensor.status)}`}
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricTile label="Temperature" value={sensor.tempF.toFixed(1)} unit="°F" />
        <MetricTile label="Relative humidity" value={`${sensor.rh}`} unit="%" accent="gold" />
        <MetricTile
          label="Moisture"
          value={sensor.moisture.toFixed(1)}
          unit="%"
          hint={`Sample threshold ${MOISTURE_THRESHOLD}%`}
          accent={sensor.status === "alert" ? "alert" : "teal"}
        />
      </section>

      <TrendChart
        values={sensor.moistureTrend}
        threshold={MOISTURE_THRESHOLD}
        label="30-day moisture trend"
        unit="%"
        accent={moistureAccent}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <TrendChart values={sensor.tempTrend} max={90} label="30-day temperature" unit="°F" accent="#0B2C4A" />
        <TrendChart values={sensor.rhTrend} max={80} label="30-day relative humidity" unit="%" accent="#C4A35A" />
      </div>

      <WingPlan sensors={snapshot.sensors} selectedId={sensor.id} compact hrefBase={hrefBase} />

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-serif text-lg text-navy">Sample events for {sensor.id}</h2>
          <SampleTag />
        </div>
        {related.length === 0 ? (
          <p className="text-sm text-muted">No sample alerts on this pin.</p>
        ) : (
          related.map((alert) => (
            <AlertCard key={alert.id} alert={alert} role={role} hrefBase={hrefBase} />
          ))
        )}
      </section>
    </div>
  );
}
