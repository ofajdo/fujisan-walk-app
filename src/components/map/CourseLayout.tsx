"use client";
import React, { ReactNode } from "react";
import type { Prisma } from "@prisma/client";
import "maplibre-gl/dist/maplibre-gl.css";
import { CourseRouteMap } from "./ReactMapGl/MapCourse";
import { toLngLat } from "./ReactMapGl/MapUtils";

type Course = Prisma.CourseGetPayload<{
  include: {
    startingPoint: {
      include: {
        place: true;
      };
    };
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

type CourseMapProps = {
  course: Course;
  children: ReactNode;
  center: number[];
};

const Map: React.FC<CourseMapProps> = ({ course, children, center }) => {
  const startingPoint = course?.startingPoint;

  return (
    <>
      <div className="w-full h-full flex-1">
        <CourseRouteMap
          center={center ? center : toLngLat(startingPoint.place)}
          course={course}
        />
      </div>

      <div
        className={`flex-1 h-full w-full max-h-[40%] overflow-y-scroll sm:max-w-md sm:max-h-full`}
      >
        {children}
      </div>
    </>
  );
};

export default Map;
