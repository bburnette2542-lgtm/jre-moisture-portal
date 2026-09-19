"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLiveSnapshot } from "@/hooks/useLiveSnapshot";
import type { Role } from "@/lib/types";
import { ConceptBanner } from "./ConceptBanner";
import { JreLogo } from "./JreLogo";
import { LiveDot } from "./LiveDot";

const NAV: Record<Role, { href: string; label: string }[]> = {
  owner: [
    { href: "/portal", label: "Overview" },
    { href: "/portal/map", label: "Wing plan" },
    { href: "/portal/alerts", label: "Alerts" },
    { href: "/portal/about", label: "About" },
  ],
  ops: [
    { href: "/ops", label: "Desk" },
    { href: "/ops/map", label: "Wing plan" },
    { href: "/ops/alerts", label: "Queue" },
    { href: "/ops/about", label: "About" },
  ],
};

export function AppShell({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const snapshot = useLiveSnapshot();
  const [open, setOpen] = useState(false);
  const items = NAV[role];

  useEffect(() => {
    void fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
  }, [role]);
  const home = items[0].href;

  return (
    <div className="min-h-screen bg-paper">
      <ConceptBanner compact />
      <header className="sticky top-0 z-20 border-b border-navy/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href={home} className="shrink-0" aria-label="JRE home">
            <JreLogo compact kicker={role === "ops" ? "Ops desk" : "Owner portal"} />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {items.map((item) => {
              const active =
                item.href === home ? pathname === home : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                    active ? "bg-navy text-white" : "text-navy/75 hover:bg-navy/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <span className="rounded-full border border-gold/40 bg-gold-soft px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-navy uppercase">
              {role === "ops" ? "Ops desk" : "Owner view"}
            </span>
            <span className="rounded-full border border-teal/30 bg-teal-soft px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-teal uppercase">
              JRE-owned
            </span>
          </div>
          <button
            type="button"
            className="rounded-lg border border-navy/15 px-3 py-1.5 text-sm text-navy md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
          >
            Menu
          </button>
        </div>
        {open ? (
          <div className="border-t border-navy/10 px-4 py-3 md:hidden">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-navy hover:bg-navy/5"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>
      <div className="border-b border-navy/8 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5">
          <p className="text-sm text-navy">
            <span className="font-semibold">{snapshot?.job.fullTitle ?? "Virginia Home 725-011 — Last Wing"}</span>
            <span className="text-muted">
              {" "}
              · {snapshot?.job.roleLabel ?? (role === "ops" ? "JRE ops desk" : "Owner / GC")}
            </span>
          </p>
          <div className="flex items-center gap-3">
            <LiveDot />
            <p className="text-xs text-muted">
              Last updated {snapshot?.job.lastUpdated ?? "—"} · SAMPLE
            </p>
          </div>
        </div>
      </div>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8">{children}</main>
      <footer className="border-t border-navy/10 bg-navy text-gold-soft">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs">
          <p>
            James River Exteriors · {role === "ops" ? "Ops desk" : "Owner portal"} · CONCEPT / SAMPLE DATA
          </p>
          <p>JRE hosts the portal and the data. No vendor login.</p>
        </div>
      </footer>
    </div>
  );
}
