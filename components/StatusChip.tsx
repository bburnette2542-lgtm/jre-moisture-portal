import { statusLabel } from "@/lib/sample-data";
import type { SensorStatus } from "@/lib/types";

const styles: Record<SensorStatus, string> = {
  ok: "bg-ok/10 text-ok border-ok/20",
  watch: "bg-watch/10 text-watch border-watch/25",
  alert: "bg-alert/10 text-alert border-alert/20",
};

const darkStyles: Record<SensorStatus, string> = {
  ok: "bg-ok text-white border-ok",
  watch: "bg-gold text-navy border-gold",
  alert: "bg-alert text-white border-alert",
};

export function StatusChip({
  status,
  count,
  onDark = false,
}: {
  status: SensorStatus;
  count?: number;
  onDark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${onDark ? darkStyles[status] : styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "ok" ? "bg-ok" : status === "watch" ? "bg-watch" : "bg-alert"
        }`}
      />
      {count !== undefined ? `${count} ${statusLabel(status)}` : statusLabel(status)}
    </span>
  );
}
