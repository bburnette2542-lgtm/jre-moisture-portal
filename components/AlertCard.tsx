"use client";

import Link from "next/link";
import { useReplaceSnapshot } from "@/hooks/useLiveSnapshot";
import type { AlertItem, Role, Snapshot } from "@/lib/types";
import { SampleTag } from "./SampleTag";

const statusTone: Record<AlertItem["status"], string> = {
  Open: "bg-alert/10 text-alert",
  Cleared: "bg-ok/10 text-ok",
  Info: "bg-navy/8 text-navy",
};

const triageTone: Record<AlertItem["triage"], string> = {
  new: "bg-alert text-white",
  acknowledged: "bg-gold text-navy",
  dispatched: "bg-teal text-white",
  cleared: "bg-ok text-white",
  info: "bg-navy text-white",
};

export function AlertCard({
  alert,
  role,
  hrefBase,
}: {
  alert: AlertItem;
  role: Role;
  hrefBase: string;
}) {
  const replace = useReplaceSnapshot();
  const run = async (action: "acknowledge" | "dispatch" | "clear") => {
    const response = await fetch(`/api/ops/alerts/${alert.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (!response.ok) return;
    const payload = (await response.json()) as { snapshot: Snapshot };
    replace(payload.snapshot);
  };

  return (
    <article className="rounded-2xl border border-navy/8 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <Link href={`${hrefBase}/${alert.sensorId}`} className="font-mono text-sm font-semibold text-teal">
            {alert.sensorId}
          </Link>
          <p className="mt-1 text-sm font-medium text-navy">
            {alert.type} {alert.value} · {alert.timeEt}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone[alert.status]}`}>
            {alert.status}
          </span>
          {role === "ops" ? (
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase ${triageTone[alert.triage]}`}>
              {alert.triage}
            </span>
          ) : null}
          <SampleTag />
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{alert.summary}</p>
      <p className="mt-3 text-xs font-semibold text-teal">
        {role === "owner" ? "JRE notified" : alert.deskNote}
      </p>
      <ul className="mt-2 space-y-1 text-xs text-muted">
        {(role === "owner" ? alert.notified.slice(0, 1) : alert.notified).map((person, index) => (
          <li key={`${person.name}-${index}`}>
            {person.name} · {person.role}
            {role === "ops" ? ` · ${person.channel} · ${person.at}` : ""}
          </li>
        ))}
      </ul>
      {role === "ops" && alert.status === "Open" ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void run("acknowledge")}
            className="rounded-lg border border-navy/15 px-3 py-2 text-xs font-semibold text-navy hover:bg-navy/5"
          >
            Ack & triage
          </button>
          <button
            type="button"
            onClick={() => void run("dispatch")}
            className="rounded-lg bg-gold px-3 py-2 text-xs font-semibold text-navy hover:bg-[#d4b56a]"
          >
            Dispatch repair
          </button>
          <button
            type="button"
            onClick={() => void run("clear")}
            className="rounded-lg border border-teal/30 px-3 py-2 text-xs font-semibold text-teal hover:bg-teal-soft"
          >
            Clear
          </button>
        </div>
      ) : null}
      {role === "ops" && alert.dispatchedTo ? (
        <p className="mt-3 text-xs text-navy">
          Crew: {alert.dispatchedTo} · {alert.dispatchedAt}
        </p>
      ) : null}
    </article>
  );
}
