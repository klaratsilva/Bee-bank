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

  const curentUserId = "734f87b6-93ae-419d-b879-a6e4f6ae13b9";

  // Filter accounts for current user only
  const userAccounts = accounts.filter(
    (account) => account.userId === curentUserId
  );

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll;">
        <HeaderBox
          type="greeting"
          title="Welcome,"
          subtext={"Manage your accounts and transactions efficiently"}
        />
        <h2 className="text-xl font-bold  mb-5">Your Accounts: </h2>
        <AccountList accounts={userAccounts} />
      </div>
    </section>
  );
}
