"use client";

import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import type { MapRef, ViewState } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "maplibre-gl-compass/style.css";
import { Prisma } from "@prisma/client";
import { MapUtils } from "./MapUtils";
import { useLiveQuery } from "dexie-react-hooks";
import { coursesDB } from "@/lib/localdb";
import { FaCircleCheck } from "react-icons/fa6";

const mapStyle = process.env.NEXT_PUBLIC_MAP_STYLE!;

type MapCourseProps = {
  viewState: ViewState;
  onViewStateChange: (vs: ViewState) => void;
  children?: React.ReactNode;
};

export function MapCourse({
  viewState,
  onViewStateChange,
  children,
}: MapCourseProps) {
  const mapRef = React.useRef<MapRef | null>(null);

  const handleLoad = React.useCallback(() => {
    MapUtils(mapRef);
  }, []);

  return (
    <Map
      ref={mapRef}
      {...viewState}
      onMove={(e) => onViewStateChange(e.viewState)}
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyle}
      onLoad={handleLoad}
    >
      {children && children}
    </Map>
  );
}

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

const CourseRouteMapCourse = ({
  center,
  courses,
}: {
  center: number[];
  courses: Course[];
}) => {
  const [viewState, setViewState] = React.useState<ViewState>({
    longitude: center[0],
    latitude: center[1],
    zoom: 10,
    bearing: 0,
    pitch: 0,
    padding: { bottom: 0, top: 0, left: 0, right: 0 },
  });

  const items = useLiveQuery(() => coursesDB.items.toArray()) || [];

  React.useEffect(() => {
    setViewState((current) => ({
      ...current,
      longitude: center[0],
      latitude: center[1],
    }));
  }, [center]);

  const [popupInfo, setPopupInfo] = React.useState<Course | null>(null);
  return (
    <MapCourse viewState={viewState} onViewStateChange={setViewState}>
      {courses.map((course) => {
        let position = course.locations[1]?.place;
        if (!position) {
          position = course.startingPoint.place;
        }
        if (!position) return null;

        const longitude = Number(position.longitude);
        const latitude = Number(position.latitude);
        if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
          return null;
        }

        return (
          <React.Fragment key={course.id}>
            <Marker
              longitude={longitude}
              latitude={latitude}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(course);
              }}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-[32px] h-[32px] rounded-full text-base font-mono text-center leading-[28px] ${!items?.some((cou) => cou.id === course.id) ? "bg-gray-800" : "bg-green-500"} text-gray-200 border-2 border-gray-200`}
                >
                  {course.name}
                </div>
              </div>
            </Marker>
            {popupInfo?.id === course.id && (
              <Popup
                longitude={longitude}
                latitude={latitude}
                anchor="top"
                onClose={() => setPopupInfo(null)}
              >
                <a
                  className="block text-center outline-none"
                  href={`/map/${course.id}`}
                >
                  <p className="inline-flex gap-2">
                    <span className="text-blue-500 font-mono font-bold">
                      {course.name}
                    </span>
                    {course.districts}地区
                    {!!items?.some((cou) => cou.id === course.id) && (
                      <span className="text-green-500 text-lg">
                        <FaCircleCheck />
                      </span>
                    )}
                  </p>
                  <p className="font-medium text-md text-balance">
                    {course.title}
                  </p>
                </a>
              </Popup>
            )}
          </React.Fragment>
        );
      })}
    </MapCourse>
  );
};

export const MapCourseList = React.memo(CourseRouteMapCourse);
