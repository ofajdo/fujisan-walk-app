import prisma from "@/lib/db";
import { cache } from "react";

export const CoursesGet = cache(async () => {
  const courses = await prisma.course.findMany({
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
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
  return courses;
});

export const CourseGetById = cache(async (id: string) => {
  const course = await prisma.course.findUnique({
    where: {
      id: id,
    },
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
        },
      },
    },
  });
  return course;
});
