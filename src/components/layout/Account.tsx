import { signIn, signOut } from "@/auth";
import { unstable_noStore as noStore } from "next/cache";

import { MdOutlineAccountCircle } from "react-icons/md";
import { GetUser } from "@/actions/user";
import { NavItem } from "./Nav";
export async function AccountMenu() {
  noStore();
  const user = await GetUser();
  console.log(user);

  return (
    <NavItem
      href="/account"
      icon={<MdOutlineAccountCircle className="h-[1.25em] w-[1.25em]" />}
      label="アカウント"
    >
      {!user?.id ? (
        <>
          <form
            action={async () => {
              "use server";
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
              "use server";
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
          <p>{user.name}</p>
          <form
            action={async () => {
              "use server";
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
