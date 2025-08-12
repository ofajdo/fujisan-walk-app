"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Overview({ location }: { location: any }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center flex-wrap">
      <div className="w-36 max-w-[30%]" onClick={() => setIsOpen(true)}>
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
          <span className="text-base font-medium pr-2">
            {location?.course.name}
          </span>
          {location?.course.title}
        </p>
        <h2 className="font-medium text-xl md:text-2xl text-center text-balance">
          <span className="font-mono">{location?.number}.</span>
          {location?.title}
        </h2>
        <div className="flex justify-center flex-wrap">
          <a
            target="_brank"
            href={location?.google}
            className="text-center px-2 py-1 bg-blue-500 text-white rounded-full text-sm"
          >
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
