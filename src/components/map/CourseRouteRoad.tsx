"use client";
import dynamic from "next/dynamic";
import React from "react";

import { LatLngExpression } from "leaflet";

export function CourseRouteRoad({
  route,
}: {
  route: { latitude: string; longitude: string }[];
}) {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("./route"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  const fitRoute: LatLngExpression[] = route.map((place) => {
    return [Number(place.latitude), Number(place.longitude)];
  });
  return (
    <div className="flex flex-col gap-3">
      <Map route={fitRoute} />
    </div>
  );
}
