import Link from "next/link";
import { SampleTag } from "@/components/SampleTag";
import { StatusChip } from "@/components/StatusChip";
import { ALERTS, getSensor } from "@/lib/sample-data";

export const metadata = {
  title: "Alerts",
};

const badge: Record<(typeof ALERTS)[number]["status"], string> = {
  Open: "bg-alert/10 text-alert",
  Cleared: "bg-ok/10 text-ok",
  Info: "bg-navy/8 text-navy",
};

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-teal uppercase">
            Alerts
          </p>
          <h1 className="mt-1 font-serif text-3xl text-navy">Sample alert history</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            The owner view shows status and that James River was notified. Dispatch
            stays with the JRE desk — it is not available here.
          </p>
        </div>
        <SampleTag />
      </div>

      <div className="space-y-3 md:hidden">
        {ALERTS.map((alert) => {
          const sensor = getSensor(alert.sensorId);
          return (
            <article key={alert.id} className="rounded-2xl border border-navy/8 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <Link href={`/portal/sensors/${alert.sensorId}`} className="font-mono font-semibold text-teal">
                  {alert.sensorId}
                </Link>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge[alert.status]}`}>
                  {alert.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-navy">{alert.summary}</p>
              <p className="mt-2 text-xs text-muted">{alert.timeEt}</p>
              <p className="mt-2 text-xs font-semibold text-teal">{alert.deskNote}</p>
              {sensor ? <StatusChip status={sensor.status} /> : null}
            </article>
          );
        })}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-paper text-[11px] tracking-[0.12em] text-muted uppercase">
            <tr>
              <th className="px-4 py-3 font-semibold">Time (ET)</th>
              <th className="px-4 py-3 font-semibold">Sensor</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Value</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">JRE desk</th>
            </tr>
          </thead>
          <tbody>
            {ALERTS.map((alert) => (
              <tr key={alert.id} className="border-t border-navy/6">
                <td className="px-4 py-3 text-muted">{alert.timeEt}</td>
                <td className="px-4 py-3">
                  <Link href={`/portal/sensors/${alert.sensorId}`} className="font-mono font-semibold text-teal hover:underline">
                    {alert.sensorId}
                  </Link>
                  <p className="text-xs text-muted">{getSensor(alert.sensorId)?.detail}</p>
                </td>
                <td className="px-4 py-3 text-navy">{alert.type}</td>
                <td className="px-4 py-3 text-navy">{alert.value}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge[alert.status]}`}>
                    {alert.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-teal">{alert.deskNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
