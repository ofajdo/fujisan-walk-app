"use server";
import prisma from "@/lib/db";

interface Location {
  id: string;
}

export async function LocationSerchById({ id }: Location) {
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
}

export async function LocationsGet() {
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
}
