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

import L from "leaflet";
import { LatLngExpression } from "leaflet";

// 事前ルートの座標例
const RouteMap = ({ route }: { route: LatLngExpression[] }) => {
  // 現在地のstate（nullの場合もあるので union 型にする）
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
      zoom={13}
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
      {route.map((pos, idx) => (
        <Marker position={pos} key={idx}>
          <Popup>ルートポイント{idx + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RouteMap;
