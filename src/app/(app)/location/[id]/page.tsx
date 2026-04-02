import Reference from "@/components/footer/Reference";
import { Detail } from "@/components/location/Detail";
import CourseMap from "@/components/map/Map";
import { CoursesGet } from "@/data/courses";
import { LocationSerchById, LocationsGet } from "@/data/locations";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useMemo } from "react";

export const revalidate = 30000;

const courses = await CoursesGet();

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

const toLngLat = (place: { latitude: string; longitude: string } | null) => [
  Number(place?.longitude || "35.222"),
  Number(place?.latitude || "138.621"),
];

export default async function Location({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = locations.find((l) => l.id === id);

  const course = courses.find((c) => c.id === location?.course.id);

  if (!location) return <div className="p-4">見つかりませんでした。</div>;

  if (!course) return notFound();

  return (
    <>
      <CourseMap course={course} center={toLngLat(location.place)}>
        <div className="flex gap-2 text-center p-2">
          <Link
            className="flex-1 border-2 border-gray-400 rounded-md p-2"
            href={`/map/${location?.course.id}`}
          >
            戻る
          </Link>
        </div>
        <div className="p-1">{location && <Detail location={location} />}</div>

        <Reference />
      </CourseMap>
    </>
  );
}
