export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100dvh] items-center justify-center bg-blue-100 p-3">
      <div className="p-3 max-w-[768px] w-full bg-white rounded-2xl">
        {children}
      </div>
    </div>
  );
}
