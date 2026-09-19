import { AlertsLive } from "@/components/dashboard/AlertsLive";

export const metadata = {
  title: "Alerts",
};

export default function AlertsPage() {
  return <AlertsLive role="owner" />;
}
