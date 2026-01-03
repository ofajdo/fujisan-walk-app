// components/AccountMenu.tsx (Server Component)
import { auth } from "@/auth";
import { AccountMenuClient } from "./Account.client";

export async function AccountMenu() {
  const session = await auth(); // ← SSGでも「値として渡すだけ」

  return <AccountMenuClient session={session} />;
}
