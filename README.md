# James River Exteriors · Moisture portal

Next.js App Router + Tailwind **JRE-owned** moisture monitor for **Virginia Home 725-011 — Last Wing**.

**CONCEPT / SAMPLE DATA.** Readings are simulated until a partner-sensor API exists. This is not a bid, not a guarantee, and not live field telemetry. No real secrets.

## Two views

| Path | Who | What they see |
| --- | --- | --- |
| `/portal` | Owner / GC | Pins, trends, alerts, **JRE notified**. No Dispatch. |
| `/ops` | JRE desk | Same data plus triage, who was notified, **Dispatch repair**. |

Landing (`/`) is a sample demo enter — no real auth.

## SAMPLE ingest (JRE server layer)

The portal never talks to OmniSense, Detec, SMT, or Sensocon.

1. `GET /api/snapshot` pulls the active adapter and writes into the in-memory **sensor store** and **alert store**.
2. The dashboard polls that snapshot every 5 seconds so pins and charts feel alive.
3. The default adapter is `server/ingest/sample-adapter.ts` (time-based SAMPLE drift).
4. Vendor stubs live next to it. When quotes land, implement `pullReadings()` and set:

```bash
JRE_INGEST_ADAPTER=sample   # default
# later: omnisense | detec | smt
```

Adapter contract: `server/ingest/types.ts` (`VendorIngestAdapter`). Store: `server/store.ts`. Ops mutations: `POST /api/ops/alerts/:id` with `{ "action": "acknowledge" | "dispatch" | "clear" }` — **ops cookie only**.

`GET /api/ingest` reports which adapter is active.

In-memory store is process-local (fine on a warm Vercel instance). It resets on cold start. That is expected until a real JRE database is added.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Live URL

- https://jre-moisture-portal.vercel.app

## Screens

Owner: overview, wing plan (S1–S12), sensor detail + 30-day trends, alerts, about.

Ops: desk queue, same map/detail, Dispatch repair, notified list.
