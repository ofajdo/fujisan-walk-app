"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

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

function RouteMap({ course }: { course: Course }) {
  const [currentPosition, setCurrentPosition] =
    useState<LatLngExpression | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position: GeolocationPosition) => {
        setCurrentPosition([
          position.coords.latitude,
          position.coords.longitude,
        ]);
        if (
          typeof position.coords.heading === "number" &&
          !isNaN(position.coords.heading)
        ) {
          setHeading(position.coords.heading);
        }
      },
      (error) => {
        console.error("現在地の取得に失敗しました:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000,
      }
    );

    // DeviceOrientation API
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (typeof event.alpha === "number" && !isNaN(event.alpha)) {
        // iOSはalphaが磁北基準、Androidは真北基準の場合あり
        setHeading(event.alpha);
      }
    };

    // iOSの許可取得
    const requestPermission = async () => {
      // @ts-ignore
      if (
        typeof window.DeviceOrientationEvent !== "undefined" &&
        typeof (window.DeviceOrientationEvent as any).requestPermission ===
          "function"
      ) {
        await (window.DeviceOrientationEvent as any).requestPermission();
      }
    };

    window.addEventListener("deviceorientation", handleOrientation, true);

    // iOS用: 初回タップで許可を促す
    window.addEventListener("click", requestPermission, { once: true });

    return () => {
      navigator.geolocation.clearWatch(watchId);
      window.removeEventListener("deviceorientation", handleOrientation, true);
      window.removeEventListener("click", requestPermission);
    };
  }, []);

  // headingが変わるたびにアイコンを再生成
  const currentLocationIcon = useMemo(
    () =>
      L.divIcon({
        html: `
      <svg width="24" height="24" viewBox="0 0 24 24" style="transform: rotate(${
        heading ?? 0
      }deg);">
        <circle cx="12" cy="12" r="9" fill="#2563eb" stroke="white" stroke-width="2"/>
        <polygon points="12,4 16,16 12,13 8,16" fill="white"/>
      </svg>
    `,
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      }),
    [heading]
  );

  const route: LatLngExpression[] = course.routes.map((place) => [
    Number(place.latitude),
    Number(place.longitude),
  ]);

  const ToLatLng = (place: { latitude: string; longitude: string }) =>
    [Number(place.latitude), Number(place.longitude)] as LatLngExpression;

  return (
    <MapContainer center={route[0]} zoom={15} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline positions={route} />

      {course.routes.map((place, index) =>
        place.display ? (
          <Marker position={route[index]} key={index}>
            <Popup>{place.name}</Popup>
          </Marker>
        ) : null
      )}

      {course.locations.map((location, index) => {
        if (!location.place) return null;
        const icon = L.divIcon({
          html: `${location.number}`,
          className:
            "rounded-full bg-gray-700 text-white text-lg font-mono text-center leading-[24px]",
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
        return (
          <Marker position={ToLatLng(location.place)} icon={icon} key={index}>
            <Popup>{location.title}</Popup>
          </Marker>
        );
      })}

      {currentPosition && (
        <Marker position={currentPosition} icon={currentLocationIcon} />
      )}
    </MapContainer>
  );
}

export default RouteMap;
