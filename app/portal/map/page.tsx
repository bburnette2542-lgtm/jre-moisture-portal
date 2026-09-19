import { MapLive } from "@/components/dashboard/MapLive";

export const metadata = {
  title: "Wing plan",
};

export default function MapPage() {
  return <MapLive role="owner" />;
}
