"use client";

import { Prisma } from "@prisma/client";
import { Overview } from "@/components/location/overview";
import React from "react";

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
  return (
    <ol className="flex flex-col">
      {course?.locations.map((location, index) => {
        return (
          <li key={index}>
            <div className={`w-full p-1 border-b-2`}>
              <Overview location={location}>
                <button
                  className="py-1.5 px-3 text-sm bg-blue-600 font-medium text-white rounded-full"
                  onClick={() => {
                    // ここに歩いたときの処理を追加
                    console.log(`歩いた！: ${location}`);
                  }}
                >
                  歩いた！
                </button>
              </Overview>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default LocationList;
