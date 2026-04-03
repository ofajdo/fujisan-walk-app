// app/not-found.tsx または app/(main)/not-found.tsx
import Link from "next/link";
import { TbMapSearch } from "react-icons/tb";
import { Header } from "@/components/Header/Header"; // ← 出したいヘッダーを直接インポート
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `お探しのページは見つかりませんでした - 富士宮市歩く博物館デジタル`,
    description: `404 NOT FOUND`,
  };
}
export default function NotFound() {
  return (
    // 【重要】 fixed inset-0 z-[9999] bg-white で親レイアウトを完全に覆い隠す
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col overflow-y-auto">
      <div className="justify-center w-full p-2 max-w-[768px] m-auto">
        <Header></Header>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <TbMapSearch className="w-24 h-24 mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Not Found
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          お探しのページやコースは見つかりませんでした。
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}
