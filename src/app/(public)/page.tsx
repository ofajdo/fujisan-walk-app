import { CoursesGet } from "@/data/courses";
import { CourseList } from "@/components/course/CourseList";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { MapCourseList } from "@/components/map/ReactMapGl/MapCourseList";

export const revalidate = 30000;

type Course = Prisma.CourseGetPayload<{
  include: {
    startingPoint: {
      include: {
        place: true;
      };
    };
    routes: true;
    points: {
      include: {
        point: true;
      };
    };
    locations: {
      include: {
        course: true;
        place: true;
      };
    };
  };
}>;

export const dynamic = "force-static";

const Home = async () => {
  const courses: Course[] = await CoursesGet().catch(() => []);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">
          富士宮市歩く博物館デジタルへようこそ
        </h2>
        <p className="text-center">
          富士宮市の「歩く博物館」をデジタル化しています
          <br />
          富士宮市の「歩く博物館」をもっと多くの人に歩いてもらいたいと思い、個人が独自に作成・運営しているサイトです。
        </p>
        <div>
          <h3 className="mb-1 p-1 text-center font-medium text-blue-900 text-xl">
            出典
          </h3>
          <p className="text-sm p-2 line-height">
            本サイトは、富士宮市発行の「歩く博物館パンフレット」および「歩く博物館ガイドブック訂正版」をもとに作成・転載しています。
            <br />
            <a
              href="https://www.city.fujinomiya.lg.jp/3010400000/p001925.html"
              className="p-3 w-full block text-center bg-gray-100 text-base font-medium my-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              歩く博物館｜静岡県富士宮市
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="mb-1 p-1 text-center font-medium text-blue-900 text-xl">
              コース一覧
            </h3>
            <p className="text-center">（全{courses.length}コース）</p>
          </div>
          <Link
            href="/course"
            className="p-3 w-full block text-center bg-gray-100 text-base font-medium"
          >
            コース一覧
          </Link>
          <div className="w-full h-96">
            <MapCourseList
              courses={courses}
              center={[138.621, 35.222]}
            ></MapCourseList>
          </div>
          <CourseList courses={courses}></CourseList>
        </div>
      </div>
    </div>
  );
};

export default Home;
