import AccountList from "./AccountList";

import type { Account } from "@/lib/types";
import { BASE_URL } from "@/server/const";
import ProtectedRoute from "../../components/ProtectedRoute";
import CurrentUserHeading from "./CurrentUserHeading";
import HeaderBox from "@/components/HeaderBox";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default async function Accounts() {
  const accountsRes = await fetch(`${BASE_URL}/accounts`, {
    cache: "no-store",
  });

  if (!accountsRes.ok) {
    throw new Error("Failed to fetch accounts");
  }

  const accounts: Account[] = await accountsRes.json();

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll;">
        <HeaderBox
          title="Your accounts:"
          subtext={"See list of your accounts"}
        />

        <AccountList accounts={accounts} />
      </div>
    </section>
  );
}
