import { Col, Row } from "antd";

import type { Account } from "@/lib/types";
import AccountCard from "./AccountCard";

interface AccountListProps {
  accounts: Account[];
}

const AccountList = ({ accounts }: AccountListProps) => {
  return (
    <Row gutter={[16, 16]}>
      {accounts.map((account) => (
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          key={account.id}
          className="mb-4"
        >
          <AccountCard account={account} />
        </Col>
      ))}
    </Row>
  );
};

export default AccountList;
