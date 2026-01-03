import { Header, Logo } from "@/components/layout/Header";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100dvh] flex flex-col relative">
      <div className="p-2 top-0 left-0 absolute z-50 sm:static max-w-[768px] mx-auto w-full">
        <Header></Header>
      </div>
      <div className="flex flex-grow w-full flex-col sm:flex-row-reverse overflow-hidden">
        {children}
      </div>
    </div>
  );
}
