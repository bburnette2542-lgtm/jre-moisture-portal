"use client";

import { useLiveSnapshot } from "@/hooks/useLiveSnapshot";
import type { Role } from "@/lib/types";
import { AlertCard } from "../AlertCard";
import { SampleTag } from "../SampleTag";

export function AlertsLive({ role }: { role: Role }) {
  const snapshot = useLiveSnapshot();
  const hrefBase = role === "ops" ? "/ops/sensors" : "/portal/sensors";

  if (!snapshot) {
    return <p className="text-sm text-muted">Loading alerts…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-teal uppercase">
            {role === "ops" ? "Ops queue" : "Alerts"}
          </p>
          <h1 className="mt-1 font-serif text-3xl text-navy">
            {role === "ops" ? "Triage and dispatch" : "Sample alert history"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            {role === "ops"
              ? "Internal desk only. Acknowledge, dispatch a JRE crew, or clear. Owner copies stay read-only."
              : "The owner view shows status and that James River was notified. Dispatch stays with the JRE desk."}
          </p>
        </div>
        <SampleTag />
      </div>
      <div className="grid gap-3">
        {snapshot.alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} role={role} hrefBase={hrefBase} />
        ))}
      </div>
    </div>
  );
}
