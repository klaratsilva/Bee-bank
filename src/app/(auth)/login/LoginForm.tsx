"use client";
import { Form, Input, Button, Row, Col } from "antd";

import useLoginForm from "./useLoginForm";

export default function LoginForm() {
  const { handleLogin } = useLoginForm();

  return (
    <div className="p-20">
      <Row justify="center" align="middle" className="min-h-[80vh]">
        <Col xs={20} sm={16} md={12} lg={8} xl={6}>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-6">Login to BeeBank</h2>
            <Form
              name="login"
              onFinish={handleLogin}
              style={{ maxWidth: "100%" }}
              layout="vertical"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button className="mt-4" type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div className="mt-2.5">
              <span>Don't have an account? </span>
              <a href="/signup" className="no-underline text-[#007bff]">
                Sign Up
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
