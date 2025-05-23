"use client";
import { Col, Row } from "antd";

import type { Account } from "@/lib/types";
import AccountCard from "./AccountCard";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface AccountListProps {
  accounts: Account[];
}

const AccountList = ({ accounts }: AccountListProps) => {
  const user = useCurrentUser();

  if (user === null) {
    return <div>Loading your accounts…</div>;
  }

  // Filter accounts for current user only
  const userAccounts = accounts.filter(
    (account) => account.userId === user?.userId
  );

  return (
    <Row gutter={[16, 16]}>
      {userAccounts.map((account) => (
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          key={account.accountId}
          className="mb-4"
        >
          <AccountCard account={account} />
        </Col>
      ))}
    </Row>
  );
};

export default AccountList;
