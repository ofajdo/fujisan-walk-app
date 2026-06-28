"use client";

import * as React from "react";
import Map, { Layer, Marker, Source } from "react-map-gl/maplibre";
import type { LngLatLike, MapRef, ViewState } from "react-map-gl/maplibre";
import type { Feature, LineString } from "geojson";
import {
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { CompassControl } from "maplibre-gl-compass";
import "maplibre-gl-compass/style.css";
import { Prisma } from "@prisma/client";
import { toLngLat } from "./MapUtils";
import { useLiveQuery } from "dexie-react-hooks";
import { locationsDB } from "@/lib/localdb";
import { MapUtils } from "./MapUtils";

const mapStyle = process.env.NEXT_PUBLIC_MAP_STYLE!;

type MapCourseProps = {
  viewState: ViewState;
  onViewStateChange: (vs: ViewState) => void;
  is3D: boolean;
  children?: React.ReactNode;
};

const dashArraySequence = [
  [0, 4, 3],
  [0.5, 4, 2.5],
  [1, 4, 2],
  [1.5, 4, 1.5],
  [2, 4, 1],
  [2.5, 4, 0.5],
  [3, 4, 0],
  [0, 0.5, 3, 3.5],
  [0, 1, 3, 3],
  [0, 1.5, 3, 2.5],
  [0, 2, 3, 2],
  [0, 2.5, 3, 1.5],
  [0, 3, 3, 1],
  [0, 3.5, 3, 0.5],
];
export function MapCourse({
  viewState,
  onViewStateChange,
  is3D,
  children,
}: MapCourseProps) {
  const mapRef = React.useRef<MapRef | null>(null);
  const stepRef = React.useRef(0);

  const handleLoad = React.useCallback(() => {
    const map = MapUtils(mapRef);
    if (!map) return;

    const animate = (timestamp: number) => {
      // スタイルがロード済みか
      if (!map.isStyleLoaded?.()) {
        requestAnimationFrame(animate);
        return;
      }

      // route-dashed レイヤーが存在するか
      const layer = map.getLayer("route-dashed");
      if (!layer) {
        requestAnimationFrame(animate);
        return;
      }
      const newStep = Math.floor((timestamp / 50) % dashArraySequence.length);
      if (newStep !== stepRef.current) {
        stepRef.current = newStep;
        map.setPaintProperty(
          "route-dashed",
          "line-dasharray",
          dashArraySequence[newStep],
        );
      }
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  React.useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const toggleTerrain = () => {
      if (is3D) {
        if (map.getSource("my-terrain-source")) {
          map.setTerrain({ source: "my-terrain-source", exaggeration: 3 });
        } else {
          map.once("sourcedata", toggleTerrain);
        }
      } else {
        map.setTerrain(null);
      }
    };

    if (map.isStyleLoaded()) {
      toggleTerrain();
    } else {
      map.once("style.load", toggleTerrain);
    }
  }, [is3D]);

  return (
    <Map
      ref={mapRef}
      {...viewState}
      onMove={(e) => onViewStateChange(e.viewState)}
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyle}
      onLoad={handleLoad}
      terrain={{
        source: "my-terrain-source",
        exaggeration: is3D ? 3 : 0,
      }}
    >
      <Source
        id="my-terrain-source"
        type="raster-dem"
        tiles={[
          "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
        ]}
        encoding="terrarium"
        tileSize={256}
        maxzoom={10}
        minzoom={9}
      />
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
  course,
  is3D,
}: {
  center: number[];
  course: Course;
  is3D: boolean;
}) => {
  const routeGeoJson: Feature<LineString> = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: course.routes.map((route) => toLngLat(route)),
    },
  };
  const items = useLiveQuery(() => locationsDB.items.toArray()) || [];
  const [viewState, setViewState] = React.useState<ViewState>({
    longitude: center[0],
    latitude: center[1],
    zoom: 16,
    bearing: 0,
    pitch: 0,
    padding: { bottom: 0, top: 0, left: 0, right: 0 },
  });

  React.useEffect(() => {
    setViewState((current) => ({
      ...current,
      longitude: center[0],
      latitude: center[1],
    }));
  }, [center]);

  React.useEffect(() => {
    setViewState((current) => ({
      ...current,
      pitch: is3D ? 45 : 0,
    }));
  }, [is3D]);

  if (!course.startingPoint.place) return null;

  return (
    <MapCourse
      viewState={viewState}
      onViewStateChange={setViewState}
      is3D={is3D}
    >
      {course.locations.map(({ id, place, number, title, description }) => {
        if (!place?.latitude || !place?.longitude) return null;
        const LugLat = toLngLat(place);
        const isVisited = items?.some((v) => v.id === id);
        return (
          <Marker
            key={id}
            longitude={LugLat[0]}
            latitude={LugLat[1]}
            pitchAlignment="map"
          >
            <div className="flex flex-col content-center">
              <div
                className={`w-[24px] h-[24px] rounded-full text-sm font-mono text-center leading-[24px] ${
                  isVisited
                    ? "bg-gray-400 text-gray-100" // 訪問済み
                    : "bg-gray-800 text-white" // 未訪問
                }`}
              >
                <span>{number}</span>
              </div>
            </div>
          </Marker>
        );
      })}

      <Marker
        longitude={Number(course.startingPoint.place?.longitude)}
        latitude={Number(course.startingPoint.place?.latitude)}
        pitchAlignment="map"
      >
        <div className="flex flex-col items-center">
          <h3 className="text-sm font-medium p-2 text-white bg-blue-700 rounded-3xl">
            スタート&ゴール
          </h3>
          <p className="text-[10px]">{course.startingPoint.name}</p>
        </div>
      </Marker>

      <Source id="route" type="geojson" data={routeGeoJson}>
        <Layer
          id="route-bg"
          type="line"
          layout={{ "line-join": "round", "line-cap": "round" }}
          paint={{
            "line-color": "#eee",
            "line-width": 4,
          }}
        />
        {/* アニメする点線 */}
        <Layer
          id="route-dashed"
          type="line"
          layout={{ "line-join": "round", "line-cap": "round" }}
          paint={{
            "line-color": "#00F",
            "line-width": 3,
            "line-dasharray": [0, 4, 3],
          }}
        />
      </Source>
    </MapCourse>
  );
};

export const CourseRouteMap = React.memo(CourseRouteMapCourse);
