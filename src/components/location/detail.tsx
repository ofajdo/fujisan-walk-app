"use client";
import React from "react";
import { Overview } from "./overview";

import { Prisma } from "@prisma/client";

import { LocationsRoad } from "../map/LocationsMapLoad";

type Location = Prisma.LocationGetPayload<{
  include: {
    course: {
      include: {
        routes: true;
        locations: {
          include: {
            place: true;
          };
        };
      };
    };
    culture: {
      include: { culture: true };
    };
  };
}>;

export function Detail({ location }: { location: Location }) {
  return (
    <div className="flex flex-col gap-3">
      <Overview location={location}>
        <></>
      </Overview>
      <div>
        <ul className="flex flex-wrap gap-2 justify-around">
          {location?.culture.map((cul, index) => (
            <li key={index} className="text-sm text-blue-600">
              ・{cul?.culture.name}
            </li>
          ))}
        </ul>
        <p className="p-2 text-gray-700 text-sm">{location?.description}</p>
      </div>
      <div className="h-64 w-full">
        <LocationsRoad
          course={location.course}
          location_index={location.number}
        />
      </div>
    </div>
  );
}
