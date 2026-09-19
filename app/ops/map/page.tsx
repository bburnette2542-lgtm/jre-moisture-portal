import { MapLive } from "@/components/dashboard/MapLive";

export const metadata = {
  title: "Ops wing plan",
};

export default function OpsMapPage() {
  return <MapLive role="ops" />;
}
