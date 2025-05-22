import AccountList from "./AccountList";

import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalance";
import type { Account } from "@/lib/types";
import { BASE_URL } from "@/server/const";

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
          type="greeting"
          title="Welcome,"
          subtext={"Manage your accounts and transactions efficiently"}
        />
        <div>
          <TotalBalanceBox accounts={accounts} />
        </div>
        <AccountList accounts={accounts} />
      </div>
    </section>
  );
}
