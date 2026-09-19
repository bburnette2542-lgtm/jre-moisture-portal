# James River Exteriors · Owner Portal

Polished **Next.js App Router + Tailwind** mock of the James River Exteriors moisture-monitoring owner portal.

**This is CONCEPT / SAMPLE DATA.** It is not live telemetry, not a bid, and not a guarantee. Every screen is marked as a sample. There is no real authentication and no real secrets.

The portal is **100% JRE-branded**. This mock is the **owner / GC read-only view** for **Virginia Home 725-011 — Last Wing** pilot. Owners can see pin status, sample readings, trends, and that JRE was notified. There is no “Dispatch repair” control — that stays with JRE operations.

## Screens

1. Login / landing — sample demo enter (no real auth)
2. Job overview — project, last wing, OK / Watch / Alert chips
3. Wing plan map — labeled pins S1–S12
4. Sensor detail — sample temp, RH, moisture, and 30-day trends
5. Alerts — sample list with status + “JRE notified”
6. About — sensors in the wall; JRE hosts the portal and the data

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and choose **Enter sample portal**.

```bash
npm run build
npm start
```

## Deploy

Connect this GitHub repo to [Vercel](https://vercel.com/new) and deploy. Framework is Next.js; `vercel.json` is included.

If a preview URL is published from this work, it will be listed here:

- Preview: connect the repo to Vercel → Deploy (no live preview URL from this environment yet)
