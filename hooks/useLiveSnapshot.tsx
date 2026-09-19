"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Role, Snapshot } from "@/lib/types";

type SnapshotContextValue = {
  snapshot: Snapshot | null;
  replace: (next: Snapshot) => void;
};

const SnapshotContext = createContext<SnapshotContextValue>({
  snapshot: null,
  replace: () => undefined,
});

export function useLiveSnapshot() {
  return useContext(SnapshotContext).snapshot;
}

export function useReplaceSnapshot() {
  return useContext(SnapshotContext).replace;
}

export function LiveSnapshotProvider({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  const load = useCallback(async () => {
    const response = await fetch(`/api/snapshot?role=${role}`, { cache: "no-store" });
    if (!response.ok) return;
    setSnapshot((await response.json()) as Snapshot);
  }, [role]);

  useEffect(() => {
    const first = window.setTimeout(() => {
      void load();
    }, 0);
    const timer = window.setInterval(() => {
      void load();
    }, 5000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, [load]);

  return (
    <SnapshotContext.Provider value={{ snapshot, replace: setSnapshot }}>
      {children}
    </SnapshotContext.Provider>
  );
}
