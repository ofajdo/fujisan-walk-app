"use client";

import { Overview } from "./overview";

export function Detail({ location }: { location: any }) {
  console.log();
  return (
    <div className="flex flex-col gap-3">
      <Overview location={location} />
      <p className="p-2 text-gray-700 text-sm">{location?.description}</p>
    </div>
  );
}
