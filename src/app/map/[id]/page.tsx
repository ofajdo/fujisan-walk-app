import { CourseItem } from "@/components/course/courseItem";
import { CourseRouteRoad } from "@/components/map/CourseRouteRoad";
import { CourseGetById } from "@/data/courses";
import React from "react";
import LocationList from "@/components/map/locationList";

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
        <LocationList course={course} />
      </div>
    </>
  );
}
