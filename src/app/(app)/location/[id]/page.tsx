import Footer from "@/components/footer/Footer";
import { Detail } from "@/components/location/Detail";
import CourseMap from "@/components/map/CourseLayout";
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
  if (location) {
    return {
      title: `${location?.title} - 富士宮市歩く博物館デジタル`,
      description: `${location?.course?.name} ${location?.course?.title} - ${location?.description}`,
    };
  } else {
    return {
      title: `お探しの場所は見つかりませんでした - 富士宮市歩く博物館デジタル`,
      description: `お探しの場所は見つかりませんでした。`,
    };
  }
}

const toLngLat = (place: { latitude: string; longitude: string } | null) => [
  Number(place?.longitude || "138.621"),
  Number(place?.latitude || "35.222"),
];

export default async function Location({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = locations.find((l) => l.id === id);

  const course = courses.find((c) => c.id === location?.course.id);

  if (!location) return notFound();
  if (!course) return notFound();

  return (
    <>
      <CourseMap
        course={course}
        center={toLngLat(
          location.place ? location.place : course.startingPoint.place,
        )}
        is3D={false}
      >
        <div className="flex gap-2 text-center p-2">
          <Link
            className="flex-1 border-2 border-gray-400 rounded-md p-2"
            href={`/map/${location?.course.id}`}
          >
            戻る
          </Link>
        </div>
        <div className="p-1">{location && <Detail location={location} />}</div>

        <Footer />
      </CourseMap>
    </>
  );
}
