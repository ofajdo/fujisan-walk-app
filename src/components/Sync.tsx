"use client";

import { coursesDB, locationsDB } from "@/lib/localdb";

import { useLiveQuery } from "dexie-react-hooks";

import {
  PostUserLocations,
  GetUserLocations,
  PostUserCourses,
  GetUserCourses,
} from "@/data/users";

import { Prisma } from "@prisma/client";

import { GetUser } from "@/actions/user";
import React from "react";

type Location = Prisma.LocationGetPayload<{
  include: {
    course: true;
  };
}>;

type Item = { id: string };

export const SyncUserLocation = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const items = useLiveQuery(() => locationsDB.items.toArray());

  React.useEffect(() => {
    if (!items) return;
    const fetchLocations = async () => {
      const user = await GetUser().catch((error) => null);

      if (user?.id) {
        const dbData = await GetUserLocations({ user: user.id });
        const filteredData = dbData.filter(({ id }) => {
          return !items.map((item) => item.id).includes(id);
        });

        await locationsDB.items.bulkAdd(
          filteredData.map((item) => ({
            ...item,
          })),
        );

        await PostUserLocations({
          items: items.map((item) => {
            return { id: item.id, achievedAt: item.createdAt };
          }),
          user: user.id,
        }).catch(() => null);
      }
    };
    fetchLocations();
  }, [items]);

  return <>{children}</>;
};

export const SyncUserCourse = ({ children }: { children: React.ReactNode }) => {
  const items = useLiveQuery(() => coursesDB.items.toArray());

  React.useEffect(() => {
    if (!items) return;
    const fetchCourses = async () => {
      const user = await GetUser().catch((error) => null);

      if (user?.id) {
        const dbData = await GetUserCourses({ user: user.id });
        const filteredData = dbData.filter(({ id }) => {
          return !items.map((item) => item.id).includes(id);
        });

        await coursesDB.items.bulkAdd(
          filteredData.map((item) => ({
            ...item,
          })),
        );

        await PostUserCourses({
          items: items.map((item) => {
            return { id: item.id, achievedAt: item.createdAt };
          }),
          user: user.id,
        }).catch(() => null);
      }
    };
    fetchCourses();
  }, [items]);

  return <>{children}</>;
};
