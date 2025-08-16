import { CoursesGet } from "@/data/courses";
import { CourseList } from "@/components/course/course_list";
import type { Prisma } from "@prisma/client";

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

const Course = async () => {
  const courses: Course[] = await CoursesGet();

  return <CourseList courses={courses}></CourseList>;
};

export default Course;
