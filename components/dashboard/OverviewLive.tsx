"use client";

import Link from "next/link";
import { useLiveSnapshot } from "@/hooks/useLiveSnapshot";
import type { Role } from "@/lib/types";
import { AlertCard } from "../AlertCard";
import { MetricTile } from "../MetricTile";
import { SampleTag } from "../SampleTag";
import { StatusChip } from "../StatusChip";
import { WingPlan } from "../WingPlan";

export function OverviewLive({ role }: { role: Role }) {
  const snapshot = useLiveSnapshot();
  const hrefBase = role === "ops" ? "/ops/sensors" : "/portal/sensors";

  if (!snapshot) {
    return <p className="text-sm text-muted">Loading JRE sample ingest…</p>;
  }

  const openAlert = snapshot.alerts.find((alert) => alert.status === "Open");
  const headline =
    snapshot.sensors.find((sensor) => sensor.status === "alert") ??
    snapshot.sensors.find((sensor) => sensor.id === "S6") ??
    snapshot.sensors[0];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-navy px-5 py-6 text-white sm:px-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">
              {role === "ops" ? "Ops desk · sample" : "Job overview · sample"}
            </p>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{snapshot.job.name}</h1>
            <p className="mt-1 text-white/75">
              {snapshot.job.wing} {snapshot.job.phase} · {snapshot.job.roleLabel}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusChip status="ok" count={snapshot.counts.ok} onDark />
            <StatusChip status="watch" count={snapshot.counts.watch} onDark />
            <StatusChip status="alert" count={snapshot.counts.alert} onDark />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-white/10 px-3 py-1">
            Last updated {snapshot.job.lastUpdated} · SAMPLE
          </span>
          <span className="rounded-full bg-teal px-3 py-1">Gateway {snapshot.job.gateway}</span>
          <span className="rounded-full bg-gold px-3 py-1 text-navy">{snapshot.job.hosting}</span>
          <span className="rounded-full bg-white/10 px-3 py-1">{snapshot.ingest.note}</span>
        </div>
      </section>

      {openAlert ? (
        <AlertCard alert={openAlert} role={role} hrefBase={hrefBase} />
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        <MetricTile
          label="Temperature"
          value={headline.tempF.toFixed(1)}
          unit="°F"
          hint={`${headline.id} live sample`}
        />
        <MetricTile
          label="Relative humidity"
          value={`${headline.rh}`}
          unit="%"
          hint={`${headline.id} live sample`}
          accent="gold"
        />
        <MetricTile
          label="Moisture"
          value={headline.moisture.toFixed(1)}
          unit="%"
          hint={`${headline.id} · threshold 16%`}
          accent={headline.status === "alert" ? "alert" : "teal"}
        />
      </section>

      <WingPlan sensors={snapshot.sensors} compact hrefBase={hrefBase} />

      <section className="overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-navy/8 px-4 py-3">
          <h2 className="font-serif text-lg text-navy">Sensors S1–S12</h2>
          <SampleTag />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-paper text-[11px] tracking-[0.12em] text-muted uppercase">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Pin</th>
                <th className="px-4 py-2.5 font-semibold">Location</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
                <th className="px-4 py-2.5 font-semibold">Temp</th>
                <th className="px-4 py-2.5 font-semibold">RH</th>
                <th className="px-4 py-2.5 font-semibold">Moisture</th>
              </tr>
            </thead>
            <tbody>
              {snapshot.sensors.map((sensor) => (
                <tr key={sensor.id} className="border-t border-navy/6">
                  <td className="px-4 py-3">
                    <Link href={`${hrefBase}/${sensor.id}`} className="font-mono font-semibold text-teal hover:underline">
                      {sensor.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-navy">
                    {sensor.location} · {sensor.detail}
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip status={sensor.status} />
                  </td>
                  <td className="px-4 py-3 text-muted">{sensor.tempF.toFixed(1)} °F</td>
                  <td className="px-4 py-3 text-muted">{sensor.rh}%</td>
                  <td className="px-4 py-3 text-muted">{sensor.moisture.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
