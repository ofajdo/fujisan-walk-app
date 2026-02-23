"use client";

import { useState } from "react";
import LocationList from "./locationList";
import Map, { toLngLat } from "./Map";
import { CourseItem } from "../course/CourseItem";
import { Prisma } from "@prisma/client";
import Reference from "../footer/Reference";

type Course = Prisma.CourseGetPayload<{
  include: {
    startingPoint: {
      include: {
        place: true;
      };
    };
    routes: true;
    points: {
      include: {
        point: true;
      };
    };
    locations: {
      include: {
        course: true;
        place: true;
      };
    };
  };
}>;

export function CourseMap({ course }: { course: Course }) {
  const [center, setCenter] = useState<number[]>(
    toLngLat(course.startingPoint.place),
  );

  const SetCenter = (center: number[]) => {
    setCenter(center);
  };

  return (
    <>
      <Map course={course!} center={center}>
        <div className="p-1">
          {course && <CourseItem course={course} />}
          <a
            href={course.startingPoint.google}
            className="flex py-1 content-center justify-around items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="mb-1 p-1 text-center font-medium text-blue-900 text-xl">
              <span className="text-nowrap">スタート</span>&
              <span className="text-nowrap">ゴール</span>
            </h3>
            <div className="flex py-1 content-center justify-around flex-wrap items-center gap-1">
              <h4 className="font-bold text-gray-700 text-sm">
                {course.startingPoint.name}
              </h4>
              <div className="py-1 px-3 bg-gray-200 rounded-full text-sm">
                {course.startingPoint.address}
              </div>
            </div>
          </a>
        </div>
        <LocationList
          course={course}
          onWalked={(location: any) => {
            SetCenter(location);
          }}
        />
        <Reference />
      </Map>
    </>
  );
}
