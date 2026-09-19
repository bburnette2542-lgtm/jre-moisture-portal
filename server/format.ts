export function formatEt(date = new Date()) {
  const stamp = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
  return `${stamp.replace(",", "")} ET`;
}

export function readingStatus(moisture: number, rh: number) {
  if (moisture >= 16) return "alert" as const;
  if (moisture >= 14.5 || rh >= 60) return "watch" as const;
  return "ok" as const;
}

export function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
