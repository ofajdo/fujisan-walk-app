import Image from "next/image";
import Link from "next/link";

import logoImg from "../../assets/logo.svg";
import { FaHome } from "react-icons/fa";
import { NavItem, CourseMenu } from "./Nav";
import { AccountMenu } from "./Account";
import { CoursesGet } from "@/data/courses";

const courses = await CoursesGet();

export function Logo() {
  return (
    <div className="max-w-40 w-full">
      <h1>
        <Link href="/">
          <Image src={logoImg} alt="富士宮歩く博物館" />
        </Link>
      </h1>
    </div>
  );
}

export function Header() {
  return (
    <div className="sm:sticky py-2 top-2 z-20">
      <div className="backdrop-blur-md bg-opacity-50 bg-gray-300 flex justify-around items-center shadow-md flex-wrap p-2 rounded-full bg-[url(/header_back.svg)] bg-[center_bottom] bg-contain bg-no-repeat">
        <Logo />
        <div className="flex justify-around flex-wrap flex-grow font-medium items-center">
          <NavItem
            href="/"
            icon={<FaHome className="h-[1.25em] w-[1.25em]" />}
            label="トップ"
          />
          <CourseMenu courses={courses} />
          {/* <AccountMenu /> */}
        </div>
      </div>
    </div>
  );
}
