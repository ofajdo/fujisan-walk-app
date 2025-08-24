"use client";

import { Prisma } from "@prisma/client";
import { Overview } from "@/components/location/overview";
import React from "react";
import WalkedButton from "./walked";

import { locationsDB } from "@/lib/localdb";

import { useLiveQuery } from "dexie-react-hooks";

import { LocationSerchById } from "@/data/locations";

type Location = Prisma.LocationGetPayload<{
  include: {
    course: true;
  };
}>;

type Course = Prisma.CourseGetPayload<{
  include: {
    startingPoint: true;
    routes: true; // orderByは型に影響しないので true でOK
    points: {
      include: {
        point: true;
      };
    };
    locations: {
      include: {
        course: true;
        place: true; // ここは null 許容される
      };
    };
  };
}>;

const LocationList = ({ course }: { course: Course | null }) => {
  const items = useLiveQuery(() => locationsDB.items.toArray()) || [];
  const [locations, setLocations] = React.useState<Location[] | null>(null);

  React.useEffect(() => {
    const fetchLocations = async () => {
      if (!items || items.length === 0) {
        setLocations([]);
        return;
      }
      const locationPromises = items.map((item) => LocationSerchById(item));
      const resolvedLocations = await Promise.all(locationPromises);
      setLocations(
        resolvedLocations.filter((loc) => loc !== null) as Location[]
      );
    };
    fetchLocations();
  }, [items]);

  return (
    <ol className="flex flex-col">
      {course?.locations.map((location, index) => {
        return (
          <li
            key={index}
            className={`${
              !!locations?.some((loc) => loc.id === location.id)
                ? "opacity-50 order-2"
                : "order-1"
            }`}
          >
            <div className={`w-full p-2`}>
              <Overview location={location}>
                <WalkedButton
                  location={location}
                  onWalked={() => {
                    if (locations?.some((loc) => loc.id === location.id)) {
                      locationsDB.items.delete(location.id);
                    } else {
                      locationsDB.items.add({ id: location.id });
                    }
                  }}
                  walked={
                    !!locations?.some((loc) => loc.id === location.id) || false
                  }
                />
              </Overview>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default LocationList;
