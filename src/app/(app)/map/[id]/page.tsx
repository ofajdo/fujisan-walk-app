import { CoursesGet } from "@/data/courses";

import type { Prisma } from "@prisma/client";

import { Metadata } from "next";
import { CourseMap } from "@/components/map/CourseMap";
import { notFound } from "next/navigation";

export const revalidate = 30000;

const courses = await CoursesGet();

type Props = {
  params: Promise<{ id: string }>;
};

export const generateStaticParams = () => {
  return courses.map((c) => ({
    id: c.id,
  }));
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);
  if (course) {
    return {
      title: `${course?.name} ${course?.title} - 富士宮市歩く博物館デジタル`,
      description: `${course?.districts}地区 - ${course?.description}`,
    };
  } else {
    return {
      title: `お探しのコースは見つかりませんでした - 富士宮市歩く博物館デジタル`,
      description: `お探しのコースは見つかりませんでした。`,
    };
  }
}

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

export default async function Course({ params }: Props) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  if (!course) return null;
  return <CourseMap course={course}></CourseMap>;
}
