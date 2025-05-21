import { Card, Col, Row } from "antd";
import Skeleton from "@/components/Skeleton";

const AccountListSkeleton = () => {
  const accounts = [1, 2];
  return (
    <Row gutter={[16, 16]}>
      {accounts.map((account) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={6} className="mb-16">
          <Card>
            <Skeleton />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default AccountListSkeleton;
