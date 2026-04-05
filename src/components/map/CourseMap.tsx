"use client";

import { useState } from "react";
import LocationList from "./locationList";
import Map, { toLngLat } from "./Map";
import { CourseItem } from "../course/CourseItem";
import { Prisma } from "@prisma/client";
import Footer from "../footer/Footer";

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

export function CourseMap({ course }: { course: Course }) {
  const [center, setCenter] = useState<number[]>(
    toLngLat(course.startingPoint.place),
  );
  const [isOpen, setIsOpen] = useState(false);

  const SetCenter = (center: number[]) => {
    setCenter(center);
  };

  return (
    <>
      <Map course={course!} center={center}>
        <div className="p-1">
          {course && <CourseItem course={course} />}
          <a
            href={course.startingPoint.google}
            className="flex py-1 content-center justify-around items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="mb-1 p-1 text-center font-medium text-blue-900 text-xl">
              <span className="text-nowrap">スタート</span>&
              <span className="text-nowrap">ゴール</span>
            </h3>
            <div className="flex py-1 content-center justify-around flex-wrap items-center gap-1">
              <h4 className="font-bold text-gray-700 text-sm">
                {course.startingPoint.name}
              </h4>
              <div className="py-1 px-3 bg-gray-200 rounded-full text-sm">
                {course.startingPoint.address}
              </div>
            </div>
          </a>
        </div>
        {course.originalPDF && (
          <>
            <div className="flex justify-center p-1">
              <button
                onClick={() => setIsOpen(true)}
                className="w-full bg-gray-100 p-2 font-bold rounded-full"
              >
                元PDFを表示する
              </button>
            </div>
            {/* モーダル */}
            {isOpen && (
              <div
                className="fixed p-8 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={() => setIsOpen(false)}
              >
                <div
                  className="bg-white p-2 max-w-lg w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full h-[80vh] flex flex-col">
                    <embed
                      type="application/pdf"
                      src={course.originalPDF}
                      className="w-full flex-1 rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="w-full max-w-4xl mx-auto mb-2 text-right">
                    <a
                      href={course.originalPDF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      PDFを別画面で開く / 保存する
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <LocationList
          course={course}
          onWalked={(location: any) => {
            if (location) {
              console.log("aa");
            }
          }}
        />
        <Footer />
      </Map>
    </>
  );
}
