import { Detail } from "@/components/location/detail";
import { LocationSerchById } from "@/data/locations";

export default async function Location({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = await LocationSerchById({ id: id });
  return (
    <div className="w-full p-2 bg-gray-100 rounded-xl shadow-md">
      {location && <Detail location={location} />}
    </div>
  );
}
