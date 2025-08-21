import logoImg from "../../assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100dvh] flex flex-col">
      <div className="backdrop-blur-md bg-opacity-50 bg-gray-300 flex justify-around items-center z-[2000] flex-wrap p-2 bg-[url(/header_back.svg)] bg-[center_bottom] bg-contain bg-no-repeat">
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
      <div className="flex flex-grow w-full flex-col sm:flex-row">
        {children}
      </div>
    </div>
  );
}
