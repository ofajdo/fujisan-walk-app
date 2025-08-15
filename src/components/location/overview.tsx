"use client";

import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

export function Overview({ location }: { location: any }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-wrap">
      <div
        className="w-36 max-w-[30%] flex items-center"
        onClick={() => setIsOpen(true)}
      >
        {location?.image && (
          <Image
            src={location.image}
            alt={`${location.title}｜${location.description}`}
            width={240}
            height={240}
            className="rounded-lg"
          />
        )}
      </div>
      <div className="flex-1 p-1 flex flex-col justify-around gap-2">
        <p className="text-center text-xs md:text-sm">
          <span className="text-sm font-bold pr-2 font-mono">
            {location?.course.name}-{location?.number}
          </span>
          {location?.course.title}
        </p>
        <h2 className="font-medium text-lg md:text-2xl text-center text-balance cursor-pointer hover:underline">
          <Link href={`/location/${location?.id}`}>{location?.title}</Link>
        </h2>
        <div className="flex justify-center flex-wrap">
          <a
            target="_brank"
            // href={`https://maps.google.co.jp/maps?ll=${location?.place?.latitude},${location?.place?.longitude}`}
            className="text-center px-2 py-1.5 md:px-4 md:py-2 bg-blue-500 text-white rounded-full text-xs flex items-center"
          >
            <FaMapMarkerAlt className="h-[1.25em] w-[1.25em]" />
            Google Maps で開く
          </a>
        </div>
      </div>
      {/* モーダル */}
      {isOpen && (
        <div
          className="fixed p-4 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-2 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={location.image}
              alt={`${location.title}｜${location.description}`}
              width={240}
              height={240}
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
