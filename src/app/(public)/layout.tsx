import Image from "next/image";
import Link from "next/link";

import logoImg from "../../assets/logo.svg";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FaRoute } from "react-icons/fa";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="justify-center w-full p-2 max-w-[768px] m-auto">
      <div className="sm:sticky py-2 top-2">
        <div className="backdrop-blur-md bg-opacity-50 bg-gray-300 flex justify-around items-center shadow-md z-[2000] flex-wrap p-2 rounded-full bg-[url(/header_back.svg)]  bg-[center_bottom]  bg-contain bg-no-repeat">
          <div className="max-w-56 w-full">
            <h1>
              <Link href="/">
                <Image src={logoImg} alt="富士宮歩く博物館" />
              </Link>
            </h1>
          </div>
          <div className="flex justify-around flex-wrap flex-grow font-medium items-center">
            <div className="p-1 flex-1 text-center">
              <Link
                href="/course"
                className="flex justify-center items-center hover:underline gap-1"
              >
                <FaRoute className="h-[1.25em] w-[1.25em]" />
                コース一覧
              </Link>
            </div>
            {/*
            <div className="p-1 flex-1 text-center">
              <Link
                href="/auth"
                className="flex justify-center items-center hover:underline gap-1"
              >
                <MdOutlineAccountCircle className="h-[1.25em] w-[1.25em]" />
                アカウント
              </Link>
            </div>
            <div className="p-1 flex-1 text-center">
              <Link
                href="/course"
                className="flex justify-center items-center hover:underline gap-1"
              >
                <IoSearchSharp className="h-[1.25em] w-[1.25em]" />
              </Link>
              検索
            </div>
            */}
          </div>
        </div>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
}
