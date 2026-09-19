import { AppShell } from "@/components/AppShell";
import { LiveSnapshotProvider } from "@/hooks/useLiveSnapshot";

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <LiveSnapshotProvider role="ops">
      <AppShell role="ops">{children}</AppShell>
    </LiveSnapshotProvider>
  );
}
