import prisma from "@/lib/db";
import { cache } from "react";

interface Location {
  id: string;
}

export const LocationSerchById = cache(async ({ id }: Location) => {
  const location = await prisma.location.findUnique({
    where: { id },
    include: {
      course: {
        include: {
          routes: true,
          locations: {
            include: {
              place: true,
            },
          },
        },
      },
      culture: {
        include: { culture: true },
      },
      topic: {
        include: { topic: true },
      },
    },
  });

  return location;
});

export const LocationsGet = cache(async () => {
  const location = await prisma.location.findMany({
    include: {
      place: true,
      course: {
        include: {
          startingPoint: {
            include: {
              place: true,
            },
          },
          routes: {
            orderBy: {
              sort: "asc",
            },
            where: { display: true },
          },
          points: {
            include: {
              point: true,
            },
          },
          locations: {
            orderBy: {
              number: "asc",
            },
            include: {
              course: true,
              place: true,
              topic: {
                include: { topic: true },
              },
              culture: {
                include: { culture: true },
              },
            },
          },
        },
      },
      culture: {
        include: { culture: true },
      },
      topic: {
        include: { topic: true },
      },
    },
  });

  return location;
});
