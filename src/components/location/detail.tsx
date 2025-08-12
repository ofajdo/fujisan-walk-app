"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Overview } from "./overview";

export function Detail({ location }: { location: any }) {
  return (
    <div className="flex flex-col gap-3">
      <Overview location={location} />
      <p className="p-2 text-gray-700 text-sm">{location?.description}</p>
    </div>
  );
}
