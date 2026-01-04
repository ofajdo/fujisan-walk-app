import { CourseGetById, CoursesGet } from "@/data/courses";
import React from "react";
import type { Prisma } from "@prisma/client";
import { toLngLat } from "@/components/map/Map";
import { Metadata } from "next";
import { CourseItem } from "@/components/course/CourseItem";
import LocationList from "@/components/map/locationList";
import { CourseMap } from "@/components/map/CourseMap";

export const revalidate = 60;

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

  return {
    title: `${course?.name} ${course?.title} - 富士宮市歩く博物館デジタル`,
    description: `${course?.districts}地区 - ${course?.description}`,
  };
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

  if (!course) return null;
  return <CourseMap course={course}></CourseMap>;
}
