"use client";
import dynamic from "next/dynamic";
import React from "react";

import { LatLngExpression } from "leaflet";

import { Prisma } from "@prisma/client";
type Course = Prisma.CourseGetPayload<{
  include: {
    routes: true;
    locations: {
      include: {
        place: true;
      };
    };
  };
}>;
export function CourseRouteRoad({ course }: { course: Course }) {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("./route"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  console.log(course);
  return (
    <div className="flex flex-col gap-3">
      <Map course={course} />
    </div>
  );
}
