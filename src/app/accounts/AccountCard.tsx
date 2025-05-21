// components/AccountCard.tsx
import type { Account } from "@/lib/types";
import { Card } from "antd";
import Link from "next/link";
import { getAccountWithBalance } from "./utils/getAccountsWithBalance";

const AccountCard = async ({ account }: { account: Account }) => {
  const accountId = account.id;
  const { computedBalance } = await getAccountWithBalance(account);

  return (
    <Link href={`/accounts/${accountId}/transactions`}>
      <Card title={account.name} extra={<span>{account.type}</span>}>
        <p>Balance: ${computedBalance}</p>
        <p>
          <strong>Account Number:</strong> {account.accountNumber}
        </p>
      </Card>
    </Link>
  );
};

export default AccountCard;
