import AccountList from "./AccountList";

import type { Account } from "@/lib/types";
import { BASE_URL } from "@/server/const";
import ProtectedRoute from "../components/ProtectedRoute";
import CurrentUserHeading from "./CurrentUserHeading";

export default async function Accounts() {
  const accountsRes = await fetch(`${BASE_URL}/accounts`, {
    cache: "no-store",
  });

  if (!accountsRes.ok) {
    throw new Error("Failed to fetch accounts");
  }

  const accounts: Account[] = await accountsRes.json();

  return (
    <ProtectedRoute>
      <div style={{ maxWidth: 1200, margin: "50px auto", padding: "20px" }}>
        <CurrentUserHeading />
        <h2 className="text-xl font-bold  mb-5">Your Accounts: </h2>
        <AccountList accounts={accounts} />
      </div>
    </ProtectedRoute>
  );
}
