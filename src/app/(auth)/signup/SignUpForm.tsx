"use client";

import { Form, Input, Button, Col, Row } from "antd";
import useSignUpForm from "./useSignUpForm";

export default function SignUpForm() {
  const { loading, handleSignup } = useSignUpForm();

  return (
    <div className="p-20">
      <Row justify="center" align="middle" className="min-h-[80vh]">
        <Col xs={20} sm={16} md={12} lg={8} xl={6}>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-6">Sign Up for BeeBank</h2>

            <Form
              layout="vertical"
              onFinish={handleSignup}
              initialValues={{
                name: "",
                username: "",
                email: "",
                password: "",
              }}
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  { required: true, message: "Please input your full name!" },
                ]}
              >
                <Input placeholder="Full Name" />
              </Form.Item>

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
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
                <Input placeholder="Email Address" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 6,
                    message: "Password should be at least 6 characters",
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  className="mt-4"
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
            <div className="mt-2.5">
              <span>Have an account? </span>
              <a href="/login" className="no-underline text-[#007bff]">
                Log in
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
