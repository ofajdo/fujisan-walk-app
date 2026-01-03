// components/AccountMenu.client.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { NavItem } from "./Nav";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export function AccountMenuClient({ session }: { session: Session | null }) {
  const router = useRouter();
  const { data: asession, status } = useSession();
  console.log(asession?.user, session?.user);

  return (
    <NavItem
      href="/account"
      icon={<MdOutlineAccountCircle className="h-[1.25em] w-[1.25em]" />}
      label="アカウント"
    >
      {!asession?.user ? (
        <>
          <form
            action={async () => {
              await signIn("google");
            }}
          >
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2 w-full"
            >
              Googleでログイン
            </button>
          </form>
          <form
            action={async () => {
              await signIn("line");
            }}
          >
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2 w-full"
            >
              Lineでログイン
            </button>
          </form>
        </>
      ) : (
        <>
          <p>{asession?.user.name}</p>
          <form
            action={async () => {
              await signOut();
            }}
          >
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2 w-full"
            >
              ログアウト
            </button>
          </form>
        </>
      )}
    </NavItem>
  );
}
