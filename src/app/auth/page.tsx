import { H1 } from "@/components/base/heading";
import Link from "next/link";

export default function Auth() {
  return (
    <div>
      <ul></ul>
      <li>
        <Link href="/auth/login">ログインはコチラ</Link>
      </li>
      <li>
        <Link href="/auth/register">アカウント登録はコチラから</Link>
      </li>
    </div>
  );
}
