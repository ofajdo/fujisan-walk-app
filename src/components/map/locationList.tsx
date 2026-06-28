"use client";

import { Prisma } from "@prisma/client";
import { Overview } from "@/components/location/Overview";
import React, { useState } from "react";
import WalkedButton from "@/components/map/Walked";

import { coursesDB, locationsDB } from "@/lib/localdb";

import { useLiveQuery } from "dexie-react-hooks";
import { GetUser } from "@/actions/user";
import { DeleteUserCourses } from "@/data/users";

type Location = Prisma.LocationGetPayload<{
  include: {
    course: true;
  };
}>;

type Course = Prisma.CourseGetPayload<{
  include: {
    startingPoint: true;
    routes: true;
    points: {
      include: {
        point: true;
      };
    };
    locations: {
      include: {
        course: true;
        place: true;
      };
    };
  };
}>;

const LocationList = ({
  course,
  onWalked,
}: {
  course: Course | null;
  onWalked: (lcoation: any) => void;
}) => {
  const items = useLiveQuery(() => locationsDB.items.toArray()) || [];
  const courses = useLiveQuery(() => coursesDB.items.toArray()) || [];

  const [pending, setPending] = useState(false);

  if (!!!course) return null;
  const handleClick = async () => {
    setPending(true);
    const user = await GetUser().catch((err) => null);
    if (courses?.some((cou) => cou.id === course.id)) {
      await coursesDB.items.delete(course?.id);
      if (user?.id)
        await DeleteUserCourses({
          id: course?.id,
          user: user.id,
        }).catch(() => null);
    } else {
      await coursesDB.items.add({ id: course.id, createdAt: new Date() });
    }

    setTimeout(() => setPending(false), 500); // 0.5秒後に元に戻す（必要に応じて調整）
  };

  let buttonClass = "py-2 px-6 text-xl font-medium text-white rounded-full";
  if (pending) {
    buttonClass += " bg-sky-500";
  } else if (!!courses?.some((cou) => cou.id === course.id) || false) {
    buttonClass += " bg-gray-400";
  } else {
    buttonClass += " bg-blue-600";
  }

  return (
    <ol className="flex flex-col">
      {course?.locations.map((location, index) => {
        return (
          <li
            key={index}
            className={`${
              !!items?.some((loc) => loc.id === location.id)
                ? "order-1"
                : "order-0"
            }`}
          >
            <div className={`w-full p-2`}>
              <Overview location={location}>
                <WalkedButton location={location} onWalked={onWalked} />
              </Overview>
            </div>
          </li>
        );
      })}
      <li>
        <div className="p-2 flex justify-center">
          <button
            className={buttonClass}
            onClick={handleClick}
            disabled={pending}
          >
            ゴール！
          </button>
        </div>
      </li>
    </ol>
  );
};

export default LocationList;
