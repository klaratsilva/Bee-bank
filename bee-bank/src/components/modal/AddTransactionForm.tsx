"use client";
import { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  FormInstance,
} from "antd";

import { BASE_URL } from "@/server/const";
import type { User, TransactionWithoutId } from "@/lib/types";

const { Option } = Select;

interface Props {
  form: FormInstance;
  onFinish: (values: TransactionWithoutId) => void;
}

export default function AddTransactionForm({ form, onFinish }: Props) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        label="Receiver"
        name="senderReceiver"
        rules={[{ required: true, message: "Please select a receiver" }]}
      >
        <Select placeholder="Select Sender/Receiver">
          {users.map((user) => (
            <Option key={user.userId} value={user.name}>
              {user.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          { required: true, message: "Please enter an amount" },
          { type: "number", min: 1, message: "Amount must be greater than 0" },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter amount"
          min={1}
        />
      </Form.Item>

      <Form.Item
        label="Transaction Date"
        name="date"
        rules={[{ required: true, message: "Please select a date" }]}
      >
        <DatePicker
          style={{ width: "100%" }}
          placeholder="Select date"
          format="YYYY-MM-DD"
        />
      </Form.Item>

      <Form.Item
        label="Message"
        name="message"
        rules={[{ required: true, message: "Please enter a message" }]}
      >
        <Input.TextArea rows={3} placeholder="Enter transaction message" />
      </Form.Item>
    </Form>
  );
}
