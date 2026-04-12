"use client";

import Link from "next/link";
import { FaRoute } from "react-icons/fa";
import { Prisma } from "@prisma/client";
import { usePathname } from "next/navigation";

type Course = Prisma.CourseGetPayload<{
  include: {
    startingPoint: {
      include: {
        place: true;
      };
    };
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

export function NavItem({
  href,
  icon,
  label,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="flex-1 text-center relative" key={pathname}>
      <Link
        href={href}
        className="peer flex justify-center items-center hover:underline gap-1 text-nowrap"
      >
        {icon}
        {label}
      </Link>
      {children && (
        <div className="hidden hover:flex peer-hover:flex absolute pt-3 w-full flex-col items-center content-center">
          <div className="max-w-96 max-h-[85svh] overflow-y-scroll scroll p-2 bg-gray-100 rounded backdrop-blur-md bg-opacity-90 shadow flex flex-col gap-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export function CourseMenu({ courses }: { courses: Course[] }) {
  if (!courses) return null;
  return (
    <NavItem
      href="/course"
      icon={<FaRoute className="h-[1.25em] w-[1.25em]" />}
      label="コース"
    >
      {courses.map((course) => (
        <div key={course.id} className="text-sm font-normal">
          <Link
            href={`/map/${course.id}`}
            className="hover:underline line-clamp-1"
          >
            <span className="p-1 font-medium font-mono text-base">
              {course.name}
            </span>
            {course.title}
          </Link>
        </div>
      ))}
    </NavItem>
  );
}
