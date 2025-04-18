"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AccountList from "./AccountList";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { BASE_URL } from "@/server/const";
import type { Account, Transaction } from "@/lib/types";

export default function Dashboard() {
  const currentUser = useCurrentUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountsResponse, transactionsResponse] = await Promise.all([
          fetch(`${BASE_URL}/accounts`),
          fetch(`${BASE_URL}/transactions`),
        ]);

        if (!accountsResponse.ok || !transactionsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const accountsData = await accountsResponse.json();
        const transactionsData = await transactionsResponse.json();

        setAccounts(accountsData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [router]);

  const handleAccountClick = (accountId: string) => {
    router.push(`/transactions/${accountId}`);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "50px auto", padding: "20px" }}>
      {currentUser ? (
        <h1>Welcome, {currentUser.name} 👋</h1>
      ) : (
        <p>Loading...</p>
      )}
      <h2>Your Accounts</h2>
      <AccountList
        accounts={accounts}
        transactions={transactions}
        onAccountClick={handleAccountClick}
      />
    </div>
  );
}
