"use client";
import dynamic from "next/dynamic";
import React from "react";
import { Overview } from "./overview";

import { Prisma } from "@prisma/client";

type Location = Prisma.LocationGetPayload<{
  include: {
    course: true;
  };
}>;

export function Detail({ location }: { location: Location }) {
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
      <Overview location={location}>
        <></>
      </Overview>
      <p className="p-2 text-gray-700 text-sm">{location?.description}</p>
      <Map />
    </div>
  );
}
