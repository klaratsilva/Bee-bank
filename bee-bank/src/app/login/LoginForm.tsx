"use client";
import { Form, Input, Button, Row, Col } from "antd";

import useLoginForm from "./useLoginForm";

export default function LoginForm() {
  const { handleLogin } = useLoginForm();

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center" align="middle" style={{ minHeight: "80vh" }}>
        <Col xs={20} sm={16} md={12} lg={8} xl={6}>
          <div style={{ textAlign: "center" }}>
            <h2>Login to BeeBank</h2>
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
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div style={{ marginTop: "10px" }}>
              <span>Don't have an account? </span>
              <a
                href="/signup"
                style={{ color: "#007bff", textDecoration: "none" }}
              >
                Sign Up
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
