"use client";

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// marker setting

import L from "leaflet";

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

// 事前ルートの座標例
function RouteMap({ course }: { course: Course }) {
  console.log(course);
  const route: LatLngExpression[] = course.routes.map((place) => {
    return [Number(place.latitude), Number(place.longitude)];
  });

  const ToLaLung = (place: { latitude: string; longitude: string }) => {
    const convertPlace: LatLngExpression = [
      Number(place.latitude),
      Number(place.longitude),
    ];
    return convertPlace;
  };

  const [currentPosition, setCurrentPosition] =
    useState<LatLngExpression | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setCurrentPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        }
      );
    }
  }, []);

  return (
    <MapContainer
      center={currentPosition || route[0]} // 現在地が取れればそれを中央に
      zoom={15}
      className="h-[40vh] min-h-64"
      preferCanvas={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {currentPosition && (
        <Marker position={currentPosition}>
          <Popup>現在地</Popup>
        </Marker>
      )}
      <Polyline positions={route} />

      {course.routes.map((place, index) => {
        if (place.display)
          return (
            <Marker position={route[index]} key={index}>
              <Popup>{place.name}</Popup>
            </Marker>
          );
      })}

      {course.locations.map((location, index) => {
        const icon = L.divIcon({
          html: `${location.number}`,
          className:
            "rounded-full bg-gray-700 text-white text-lg font-mono text-center leading-[24px]",
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
        if (location.place)
          return (
            <Marker position={ToLaLung(location.place)} icon={icon} key={index}>
              <Popup>{location.title}</Popup>
            </Marker>
          );
      })}
    </MapContainer>
  );
}

export default RouteMap;
