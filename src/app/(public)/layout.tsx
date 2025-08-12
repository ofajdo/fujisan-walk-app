import Image from "next/image";
import Link from "next/link";

import logoImg from "../../assets/logo.svg";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="justify-center w-full p-2 max-w-[768px] m-auto">
      <div className="sm:sticky py-2 top-2">
        <div className="backdrop-blur-md bg-opacity-50 bg-gray-300 flex justify-around items-center shadow-md z-50 flex-wrap p-2 rounded-full bg-[url(/header_back.svg)]  bg-[center_bottom]  bg-contain bg-no-repeat">
          <div className="max-w-56 w-full">
            <h1>
              <Image src={logoImg} alt="富士宮歩く博物館" />
            </h1>
          </div>
          <div className="flex justify-around flex-wrap gap-1 flex-grow font-medium">
            <div className="px-4 py-2 flex-1 text-center">
              <Link href="/course">コース</Link>
            </div>
            <div className="px-4 py-2 flex-1 text-center">
              <Link href="/course">場所検索</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
}
