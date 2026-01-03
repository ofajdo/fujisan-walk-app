"use client";
import React, { ReactNode, useState } from "react";
import { CourseItem } from "@/components/course/CourseItem";
import LocationList from "./locationList";
import type { Prisma } from "@prisma/client";
import { LngLatLike } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useLiveQuery } from "dexie-react-hooks";
import { locationsDB } from "@/lib/localdb";
//import { CourseRouteRoad } from "./leaflet/CourseRouteRoad";
import { GetUser } from "@/actions/user";
import { DeleteUserLocation } from "@/data/users";
import { CourseRouteMap } from "./ReactMapGl/mapComponent";

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
export const toLngLat = (
  place: { latitude: string; longitude: string } | null
) => [
  Number(place?.longitude || "35.222"),
  Number(place?.latitude || "138.621"),
];

const Map: React.FC<CourseMapProps> = ({ course, children, center }) => {
  const items = useLiveQuery(() => locationsDB.items.toArray()) || [];
  const courseRoute: number[][] = course.routes.map((route) => toLngLat(route));
  const startingPoint = course?.startingPoint;
  // const courseData = course.locations.map((location) => {
  //   return {
  //     id: location.id,
  //     position: toLngLat(location.place) as [number, number],
  //     text: `${location.number}`,
  //     color: items?.some((v) => v.id === location.id) ? "#aaa" : "#333",
  //     onClick: async () => {
  //       const user = await GetUser().catch((err) => null);
  //       if (items?.some((loc) => loc.id === location.id)) {
  //         locationsDB.items.delete(location.id);
  //         if (user?.id)
  //           await DeleteUserLocation({
  //             id: location.id,
  //             user: user.id,
  //           }).catch(() => null);
  //       } else {
  //         await locationsDB.items.add({ id: location.id });
  //       }
  //       setCenter(toLngLat(location.place));
  //     },
  //   };
  // });
  // const Contents = (map: any) => {
  //   if (!map) return;
  //   const cleanup = CourseLines({ map: map, route: courseRoute });
  //   const locationsMarkerController = addCircleMarkers(map, [
  //     ...courseData,

  //     {
  //       id: startingPoint.id,
  //       position: toLngLat(startingPoint.place) as [number, number],
  //       text: `スタート＆ゴール`,
  //       color: "#2222ff",
  //       onClick: () => {},
  //     },
  //   ]);

  //   // クリーンアップ関数を返す
  //   return cleanup;
  // };

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
