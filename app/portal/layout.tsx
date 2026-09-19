import { AppShell } from "@/components/AppShell";
import { LiveSnapshotProvider } from "@/hooks/useLiveSnapshot";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LiveSnapshotProvider role="owner">
      <AppShell role="owner">{children}</AppShell>
    </LiveSnapshotProvider>
  );
}
