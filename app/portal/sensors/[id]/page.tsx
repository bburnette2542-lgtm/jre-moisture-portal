import { notFound } from "next/navigation";
import { SensorLiveView } from "@/components/dashboard/SensorLiveView";
import { getSensor, SENSORS } from "@/lib/sample-data";

export function generateStaticParams() {
  return SENSORS.map((sensor) => ({ id: sensor.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sensor = getSensor(id);
  return {
    title: sensor ? `Sensor ${sensor.id}` : "Sensor",
  };
}

export default async function SensorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!getSensor(id)) notFound();
  return <SensorLiveView id={id} role="owner" />;
}
