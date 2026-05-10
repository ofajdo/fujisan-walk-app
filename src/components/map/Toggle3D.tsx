"use client";
import React from "react";

type Toggle3DProps = {
  is3D: boolean;
  onChange: (checked: boolean) => void;
};

export default function Toggle3D({ is3D, onChange }: Toggle3DProps) {
  return (
    <>
      <label className="flex items-center cursor-pointer gap-3">
        <div
          className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
            is3D ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
              is3D ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>

        <input
          type="checkbox"
          checked={is3D}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />

        <span className="text-sm text-gray-800">
          {is3D ? "3D： オン" : "3D地形: オフ"}
        </span>
      </label>
      {is3D && (
        <span className="font-bold text-sm text-red-600 text-center ">
          ※3D表示はバッテリーを多く消費します。
          <br />
          ※動作が重いときはオフにしてください。
          <br />
          ※歩くときはオフを推奨します。
        </span>
      )}
    </>
  );
}
