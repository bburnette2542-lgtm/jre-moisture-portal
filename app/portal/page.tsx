import { OverviewLive } from "@/components/dashboard/OverviewLive";

export const metadata = {
  title: "Job overview",
};

export default function OverviewPage() {
  return <OverviewLive role="owner" />;
}
