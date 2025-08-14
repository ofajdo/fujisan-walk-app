"use client";

interface Point {
  id: String;
  title: String;
}

interface Course {
  id: String;
  name: String;
  title: String;
  description: String;
  districts: String;
  distance: Number;
  time: Number;
  points: { point: Point }[];
}

import { FaWalking } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

import { useState } from "react";
import Link from "next/link";

export function CourseList({ courses }: { courses: Course[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ol className="w-full">
      {courses?.map((course: Course, index) => {
        return (
          <li
            className="w-full p-4 bg-gray-100 flex flex-col sm:flex-row rounded-xl shadow-md"
            key={index}
          >
            <div className="text-blue-500 text-3xl sm:text-5xl font-bold px-2 grid place-items-center">
              <span className="">{course.name}</span>
            </div>
            <div className="flex-grow px-1">
              <h2 className="text-2xl text-center font-medium cursor-pointer hover:underline text-balance">
                <Link href={`course/${course.id}`}>{course.title}</Link>
              </h2>
              <div className="p-2">
                <p
                  className="text-xs text-gray-700 line-clamp-1 cursor-pointer hover:underline"
                  onClick={() => setIsOpen(true)}
                >
                  {course.description}
                </p>
              </div>
              <div className="p-2 flex">
                <div className="w-[50%] flex justify-center items-center">
                  <FaWalking className="h-[1.25rem] w-[1.25rem]" />
                  {`約${course.distance}km`}
                </div>
                <div className="w-[50%] flex justify-center items-center">
                  <IoMdTime className="h-[1.25rem] w-[1.25rem]" />
                  {`約${course.time}時間`}
                </div>
              </div>
              <div>
                <ul></ul>
              </div>
            </div>
            {/* モーダル */}
            {isOpen && (
              <div
                className="fixed p-4 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={() => setIsOpen(false)}
              >
                <div
                  className="bg-white p-4 rounded-2xl max-w-lg w-full shadow-lg flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="mb-1 p-1 text-center font-medium text-blue-900 text-xl">
                    見どころ
                  </h3>
                  <p className="text-sm text-gray-800">{course.description}</p>
                  <div className="flex py-3 content-center justify-around">
                    <h4 className="m-2 font-bold text-gray-700 text-sm">
                      ポイント
                    </h4>
                    <ul className="flex justify-around">
                      {course.points.map(({ point }, index) => {
                        return (
                          <li
                            className="py-2 px-3 bg-gray-200 rounded-full text-sm"
                            key={index}
                          >
                            {point.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
