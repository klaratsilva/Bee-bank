"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { TransactionWithoutId, User } from "@/lib/types";
import { BASE_URL } from "@/server/const";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Option } = Select;

interface Props {
  accountId: string;
}

export default function AddTransactionForm({ accountId }: Props) {
  const [form] = Form.useForm();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useCurrentUser();
  const router = useRouter();

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

  const filteredUsers = users.filter(
    (user) => user.userId !== currentUser?.userId
  );

  const handleSubmit = async (values: TransactionWithoutId) => {
    const newTransaction = {
      accountId,
      senderReceiver: values.senderReceiver,
      amount: values.amount,
      date: dayjs(values.date).format("YYYY-MM-DD"),
      message: values.message,
    };

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      if (!res.ok) {
        throw new Error("Failed to create transaction");
      }

      const createdTransaction = await res.json();
      message.success("Transaction added!");
      router.push(`/accounts/${accountId}/transactions`);
    } catch (error) {
      console.error(error);
      message.error("Error adding transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item
        label="Receiver"
        name="senderReceiver"
        rules={[{ required: true, message: "Please select a receiver" }]}
      >
        <Select placeholder="Select Sender/Receiver">
          {filteredUsers.map((user) => (
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
        <InputNumber className="w-full" placeholder="Enter amount" min={1} />
      </Form.Item>

      <Form.Item
        label="Transaction Date"
        name="date"
        rules={[{ required: true, message: "Please select a date" }]}
      >
        <DatePicker
          className="w-full"
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

      <Button type="primary" htmlType="submit" loading={loading}>
        Add Transaction
      </Button>
    </Form>
  );
}
