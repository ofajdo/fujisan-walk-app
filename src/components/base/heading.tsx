"use client";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function H1({ children, className }: Props) {
  return (
    <h1
      className={
        "text-2xl font-bold py-1 px-2 text-center text-blue-800 border-b-2 border-b-slate-400 " +
        className
      }
    >
      {children}
    </h1>
  );
}
