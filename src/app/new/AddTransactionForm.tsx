"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Account, TransactionWithoutId, User } from "@/lib/types";
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

export default function AddTransactionForm() {
  const [form] = Form.useForm();
  const [users, setUsers] = useState<User[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [usersRes, accountsRes] = await Promise.all([
          fetch(`${BASE_URL}/users`),
          fetch(`${BASE_URL}/accounts`, { cache: "no-store" }),
        ]);

        if (!accountsRes.ok) throw new Error("Failed to fetch accounts");

        const usersData = await usersRes.json();
        const accountsData = await accountsRes.json();

        setUsers(usersData);
        setAccounts(accountsData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchInitialData();
  }, []);

  // Sender accounts: only current user's
  const senderAccounts = accounts.filter(
    (acct) => acct.userId === user?.userId
  );

  // Users excluding current
  const receiverUsers = users.filter((u) => u.userId !== user?.userId);

  // Selected receiver to get their accounts
  const selectedReceiverId = form.getFieldValue("receiverUserId");
  const receiverAccounts = accounts.filter(
    (acct) => acct.userId === selectedReceiverId
  );

  const handleSubmit = async (values: {
    senderAccountId: string;
    receiver: string;
    receiverAccountId: string;
    amount: number;
    date: dayjs;
    message: string;
  }) => {
    const newTransaction: TransactionWithoutId = {
      senderAccountId: values.senderAccountId,
      senderUserId: user!.userId,
      sender: user!.name,
      receiverUserId: "d4e3f2a1b0",
      receiver: values.receiver,
      receiverAccountId: values.receiverAccountId,
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
      if (!res.ok) throw new Error("Failed to create transaction");

      message.success("Transaction added!");
      router.push(`/accounts/${values.senderAccountId}/transactions`);
    } catch (error) {
      console.error(error);
      message.error("Error adding transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      onValuesChange={() => {
        form.validateFields(["receiverAccountId"]);
      }}
    >
      <Form.Item
        label="Sender Account"
        name="senderAccountId"
        rules={[{ required: true, message: "Select your account" }]}
      >
        <Select placeholder="Select sender account">
          {senderAccounts.map((acct) => (
            <Option key={acct.accountId} value={acct.accountId}>
              {acct.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Receiver Name"
        name="receiver"
        rules={[{ required: true, message: "Enter message" }]}
      >
        <Input className="w-full" />
      </Form.Item>

      <Form.Item
        label="Receiver Account Number"
        name="receiverAccountId"
        rules={[{ required: true, message: "Enter message" }]}
      >
        <Input className="w-full" />
      </Form.Item>

      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, message: "Enter amount" }]}
      >
        <InputNumber className="w-full" min={1} />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Select date" }]}
      >
        <DatePicker className="w-full" format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        label="Message"
        name="message"
        rules={[{ required: true, message: "Enter message" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading}>
        Add Transaction
      </Button>
    </Form>
  );
}
