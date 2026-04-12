"use client";
import React, { ReactNode } from "react";
import type { Prisma } from "@prisma/client";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapCourseList } from "./ReactMapGl/MapCourseList";

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
  courses: Course[];
  children: ReactNode;
};

const Map: React.FC<CourseMapProps> = ({ courses, children }) => {
  return (
    <>
      <div className="w-full h-full flex-1">
        <MapCourseList
          courses={courses}
          center={[138.621, 35.222]}
        ></MapCourseList>
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
