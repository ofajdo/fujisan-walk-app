import { CourseItem } from "@/components/course/courseItem";
import { Overview } from "@/components/location/overview";
import { CourseRouteRoad } from "@/components/map/CourseRouteRoad";
import { CourseGetById } from "@/data/courses";

import type { Prisma } from "@prisma/client";

type Course = Prisma.CourseGetPayload<{
  include: {
    startingPoint: true;
    routes: true; // orderByは型に影響しないので true でOK
    points: {
      include: {
        point: true;
      };
    };
    locations: {
      include: {
        course: true;
        place: true; // ここは null 許容される
      };
    };
  };
}>;

export default async function Course({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course: Course | null = await CourseGetById(id);

  return (
    <>
      <div className="h-full w-full flex-1">
        {course && <CourseRouteRoad course={course} />}
      </div>
      <div className="flex-1 overflow-y-scroll p-2">
        <div className="p-1">{course && <CourseItem course={course} />}</div>
        <ol className="flex flex-col">
          {course?.locations.map((location, index) => {
            return (
              <li key={index}>
                <div className="w-full p-1 border-b-2">
                  <Overview location={location}>
                    <></>
                  </Overview>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
