// components/AccountCard.tsx
import { Card } from "antd";

import type { Account } from "@/lib/types";

interface AccountCardProps {
  account: Account;
  balance: number;
  onClick: () => void;
}

const AccountCard = ({ account, balance, onClick }: AccountCardProps) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      title={account.name}
      extra={<span>{account.type}</span>}
      style={{ cursor: "pointer" }}
    >
      <p>
        <strong>Balance:</strong> ${balance.toLocaleString()}
      </p>
      <p>
        <strong>Account Number:</strong> {account.accountNumber}
      </p>
    </Card>
  );
};

export default AccountCard;
