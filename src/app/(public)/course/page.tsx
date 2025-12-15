import { CoursesGet } from "@/data/courses";
import { CourseList } from "@/components/course/CourseList";
import type { Prisma } from "@prisma/client";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "コース一覧 - 富士宮市歩く博物館デジタル",
  description:
    "富士宮市歩く博物館のデジタル版です。富士宮市の歩く博物館の紹介をしています。歩くルートをデジタルのマップで見ることができます。パンフレットとガイドブックを参考にしています",
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
        <p>（全24コース中 {courses.length}コースのみ）</p>
        <p>（今後さらに追加する予定です。）</p>
      </div>
      <CourseList courses={courses}></CourseList>
    </div>
  );
};

export default Course;
