// components/AccountCard.tsx
"use client";
import { useEffect, useState } from "react";
import type { Account } from "@/lib/types";
import { Card, Spin } from "antd";
import Link from "next/link";
import { getAccountWithBalance } from "./utils/getAccountsWithBalance";

export default function AccountCard({ account }: { account: Account }) {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    getAccountWithBalance(account).then((bal) => {
      setBalance(bal.computedBalance);
    });
  }, [account.accountId]);

  return (
    <Link href={`/transactions?q=${account.accountId}`}>
      <Card
        className="background-color: var(--color-cyan-200)"
        title={account.name}
        extra={<span>{account.type}</span>}
      >
        {balance === null ? <Spin size="small" /> : <p>Balance: ${balance}</p>}
        <p>
          <strong>Account Number:</strong> {account.accountNumber}
        </p>
      </Card>
    </Link>
  );
}
