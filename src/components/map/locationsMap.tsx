"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { LatLngExpression } from "leaflet";

// 事前ルートの座標例
const route: LatLngExpression[] = [
  [35.007904, 136.597519],
  [35.02664, 136.622259],
  [34.982158, 136.631795],
];
const RouteMap: React.FC = () => {
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
      style={{ height: "100vh", width: "100%" }}
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
    </MapContainer>
  );
};

export default RouteMap;
