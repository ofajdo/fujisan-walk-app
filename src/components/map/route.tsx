"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Map as LeafletMap, LatLngExpression } from "leaflet";

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

const currentLocationIcon = L.divIcon({
  html: `<div style="
    background: #2563eb;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 6px rgba(0,0,0,0.5);
  "></div>`,
  className: "",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function RouteMap({ course }: { course: Course }) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const startWatching = () => {
    if (!("geolocation" in navigator)) {
      alert("このブラウザは位置情報に対応していません");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setPosition(coords);
      },
      (err) => {
        console.error("位置情報エラー:", err);
        alert("位置情報を取得できませんでした");
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => startWatching, []);

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

      {position && <Marker position={position} icon={currentLocationIcon} />}
    </MapContainer>
  );
}

export default RouteMap;
