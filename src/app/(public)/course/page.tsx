import { CoursesGet } from "@/data/courses";
import { CourseList } from "@/components/course/CourseList";
import type { Prisma } from "@prisma/client";
import { Metadata } from "next";
import Footer from "@/components/footer/Footer";

export const revalidate = 30000;

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

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "コース一覧 - 富士宮市歩く博物館デジタル",
  description:
    "富士宮市歩く博物館をデジタル化したものです。こちらはコース一覧です。出典：「歩く博物館パンフレット」・「歩く博物館ガイドブック　訂正版」",
  verification: {
    google: "pN0H3UKaXSIYAoZW9gR1IEyLjFql2k2mErkNYOn9Rbc",
  },
};

const Course = async () => {
  const courses: Course[] = await CoursesGet().catch(() => []);

  return (
    <div className="text-center">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-center">コース一覧</h1>
        <p>（全{courses.length}コース）</p>
      </div>
      <CourseList courses={courses}></CourseList>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Course;
