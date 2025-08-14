"use client";
import dynamic from "next/dynamic";
import React from "react";
import { Overview } from "./overview";

export function Detail({ location }: { location: any }) {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("../../components/map/locationsMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <div className="flex flex-col gap-3">
      <Overview location={location} />
      <p className="p-2 text-gray-700 text-sm">{location?.description}</p>
      <Map />
    </div>
  );
}
