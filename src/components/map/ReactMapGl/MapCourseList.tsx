"use client";

import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import type { MapRef, ViewState } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "maplibre-gl-compass/style.css";
import { Prisma } from "@prisma/client";
import { MapUtils } from "./MapUtils";

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
    const map = MapUtils(mapRef);
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

  React.useEffect(() => {
    setViewState({
      ...viewState,
      longitude: center[0],
      latitude: center[1],
    });
  }, [center]);

  const [popupInfo, setPopupInfo] = React.useState<Course | null>(null);
  return (
    <MapCourse viewState={viewState} onViewStateChange={setViewState}>
      {courses.map((course) => {
        let position = course.locations[1]?.place;
        if (!position) {
          position = course.startingPoint.place;
        }
        return (
          <React.Fragment key={course.id}>
            <Marker
              longitude={Number(position?.longitude)}
              latitude={Number(position?.latitude)}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(course);
              }}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-[32px] h-[32px] rounded-full text-base font-mono text-center leading-[28px] bg-gray-800 text-gray-200 border-2 border-gray-200`}
                >
                  {course.name}
                </div>
              </div>
            </Marker>
            {popupInfo?.id === course.id && (
              <Popup
                longitude={Number(position?.longitude)}
                latitude={Number(position?.latitude)}
                anchor="top"
                onClose={() => setPopupInfo(null)}
              >
                <a
                  className="block text-center outline-none"
                  href={`/map/${course.id}`}
                >
                  <p>
                    <span className="text-blue-500 font-mono font-bold px-2">
                      {course.name}
                    </span>
                    {course.districts}地区
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
