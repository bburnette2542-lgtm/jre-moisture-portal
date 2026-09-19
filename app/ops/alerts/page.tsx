import { AlertsLive } from "@/components/dashboard/AlertsLive";

export const metadata = {
  title: "Ops queue",
};

export default function OpsAlertsPage() {
  return <AlertsLive role="ops" />;
}
