import { Row, Col } from "antd";

import type { Transaction, Account } from "@/lib/types";
import AccountCard from "./AccountCard";

interface AccountListProps {
  accounts: Account[];
  transactions: Transaction[];
  onAccountClick: (accountId: string) => void;
}

const AccountList = ({
  accounts,
  transactions,
  onAccountClick,
}: AccountListProps) => {
  const calculateBalance = (accountId: string) => {
    const filteredAccount = transactions.filter(
      (transaction) => transaction.accountId === accountId
    );
    const balance = filteredAccount.reduce(
      (acc: number, transaction: Transaction) => {
        return acc + transaction.amount;
      },
      0
    );

    return balance;
  };

  return (
    <Row gutter={[16, 16]}>
      {accounts.map((account) => {
        const balance = calculateBalance(account.id);
        return (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            key={account.id}
            style={{ marginBottom: "16px" }}
          >
            <AccountCard
              account={account}
              balance={balance}
              onClick={() => onAccountClick(account.id)}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default AccountList;
