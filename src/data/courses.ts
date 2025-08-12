"use server";
import prisma from "@/lib/db";

export const CoursesGet = async () => {
  const courses = await prisma.course.findMany({
    include: {
      startingPoint: true,
      points: {
        include: {
          point: true,
        },
      },
      locations: true,
    },
  });
  courses.sort();
  return courses;
};

export const CourseGetById = async (id: string) => {
  const course = await prisma.course.findUnique({
    where: {
      id: id,
    },
    include: {
      startingPoint: true,
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
        },
      },
    },
  });
  return course;
};
