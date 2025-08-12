import { CoursesGet } from "@/data/courses";
import { CourseList } from "@/components/course/course_list";

const Course = async () => {
  const courses = await CoursesGet();

  return <CourseList courses={courses}></CourseList>;
};

export default Course;
