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
