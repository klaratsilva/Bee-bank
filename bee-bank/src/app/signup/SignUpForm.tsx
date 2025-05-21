"use client";

import { Form, Input, Button } from "antd";
import useSignUpForm from "./useSignUpForm";

export default function SignUpForm() {
  const { loading, handleSignup } = useSignUpForm();

  return (
    <div className="max-w-[400px] mx-auto text-center p-5">
      <h2>Sign Up for BeeBank</h2>
      <Form
        layout="vertical"
        onFinish={handleSignup}
        initialValues={{ username: "", password: "", name: "" }}
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password should be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
