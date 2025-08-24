import { CourseItem } from "@/components/course/courseItem";
import { Overview } from "@/components/location/overview";
import { CourseRouteRoad } from "@/components/map/CourseRouteRoad";
import { CourseGetById } from "@/data/courses";
import LetsStart from "@/components/course/letsStart";
import React from "react";
import Link from "next/link";

export default async function Course({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await CourseGetById(id);

  if (!course) {
    return <div className="p-4">コースが見つかりませんでした。</div>;
  }
  return (
    <div>
      <div className="p-1 my-4">
        {course && <CourseItem course={course} />}
        <LetsStart course={course} />
      </div>
      <ol className="flex flex-col gap-4">
        {course?.locations.map((location, index) => {
          return (
            <li key={index}>
              <div className="w-full p-2 bg-gray-100 rounded-xl shadow">
                <Overview location={location}>
                  <div>
                    <Link
                      href={`https://www.google.com/maps/@?api=1&map_action=map&center=${location.place?.latitude},${location.place?.longitude}&zoom=18`}
                    >
                      Googleマップで開く
                    </Link>
                  </div>
                </Overview>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
