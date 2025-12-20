import { Detail } from "@/components/location/Detail";
import { LocationSerchById, LocationsGet } from "@/data/locations";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

const locations = await LocationsGet();
export const generateStaticParams = () => {
  return locations.map((l) => ({
    id: l.id,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const location = locations.find((l) => l.id === id);

  return {
    title: `${location?.title} - 富士宮市歩く博物館デジタル`,
    description: `${location?.course?.name} ${location?.course?.title} - ${location?.description}`,
  };
}

export default async function Location({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = locations.find((l) => l.id === id);

  if (!location) return <div className="p-4">見つかりませんでした。</div>;

  return (
    <div>
      <div className="flex gap-2 text-center p-2">
        <Link
          className="flex-1 border-2 border-gray-400 rounded-md p-2"
          href={`/map/${location?.course.id}`}
        >
          戻る
        </Link>
      </div>
      <div className="w-full p-2 bg-gray-100 rounded-xl shadow-md">
        {location && <Detail location={location} />}
      </div>
    </div>
  );
}
