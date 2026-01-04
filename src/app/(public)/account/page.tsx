import { auth, signIn, signOut } from "@/auth";
import { FaGoogle, FaLine } from "react-icons/fa";

export default async function AccountPage() {
  const session = await auth();
  return (
    <div className="p-2 text-center">
      <h2 className="text-2xl font-bold">マイページ</h2>
      <div>
        <div className="flex justify-around">
          {!!session?.user && <h3 className="text-3xl">{session.user.name}</h3>}
        </div>
        <div className="flex flex-wrap gap-4 p-4 justify-center">
          {!session?.user ? (
            <>
              <form
                className="flex-1"
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <button
                  type="submit"
                  className="p-2 border-2 border-gray-400 w-full rounded-lg inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <FaGoogle className="w-[1.25em] h-[1.25em]" />
                  Googleでログイン
                </button>
              </form>
              <form
                className="flex-1"
                action={async () => {
                  "use server";
                  await signIn("line");
                }}
              >
                <button
                  type="submit"
                  className="p-2 border-2 border-gray-400 w-full rounded-lg inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <FaLine className="w-[1.25em] h-[1.25em]" />
                  LINEでログイン
                </button>
              </form>
            </>
          ) : (
            <>
              <form
                className="flex-1"
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded py-2 px-6"
                >
                  ログアウト
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
