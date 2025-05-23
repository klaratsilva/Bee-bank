"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Account, TransactionWithoutId, User } from "@/lib/types";
import { BASE_URL } from "@/server/const";
import { useForm, Controller } from "react-hook-form";
import { DatePicker, Select, message, Input } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Option } = Select;

type FormValues = {
  senderAccountId: string;
  receiver: string;
  receiverAccountId: string;
  amount: number;
  date: dayjs.Dayjs;
  message: string;
};

export default function AddTransactionForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const user = useCurrentUser();
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);

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

  const senderAccounts = accounts.filter(
    (acct) => acct.userId === user?.userId
  );

  const onSubmit = async (data: FormValues) => {
    const receiverUser = users.find(
      (u) => u.name.toLowerCase() === data.receiver.toLowerCase()
    );

    if (!receiverUser) {
      message.error("Receiver not found.");
      setLoading(false);
      return;
    }

    const newTransaction: TransactionWithoutId = {
      senderAccountId: data.senderAccountId,
      senderUserId: user!.userId,
      sender: user!.name,
      receiverUserId: receiverUser.userId, // hardcoded — you can make this dynamic
      receiver: data.receiver,
      receiverAccountId: data.receiverAccountId,
      amount: data.amount,
      date: data.date.format("YYYY-MM-DD"),
      message: data.message,
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
      router.push(`/transactions`);
    } catch (error) {
      console.error(error);
      message.error("Error adding transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Sender Account
        </label>
        <Controller
          name="senderAccountId"
          control={control}
          rules={{ required: "Select your account" }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Select sender account"
              className="w-full"
            >
              {senderAccounts.map((acct) => (
                <Option key={acct.accountId} value={acct.accountId}>
                  {acct.name}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors.senderAccountId && (
          <span className="text-red-500">{errors.senderAccountId.message}</span>
        )}
      </div>
      {/* Receiver Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Receiver Name
        </label>
        <Controller
          name="receiver"
          control={control}
          rules={{ required: "Receiver name is required" }}
          render={({ field }) => (
            <Input
              {...field}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter receiver name"
            />
          )}
        />
        {errors.receiver && (
          <span className="text-red-500">{errors.receiver.message}</span>
        )}
      </div>

      {/* Receiver Account Number Input */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Receiver Account Number
        </label>
        <Controller
          name="receiverAccountId"
          control={control}
          rules={{ required: "Receiver account number is required" }}
          render={({ field }) => (
            <Input
              {...field}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter receiver account number"
            />
          )}
        />
        {errors.receiverAccountId && (
          <span className="text-red-500">
            {errors.receiverAccountId.message}
          </span>
        )}
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Amount
        </label>
        <Controller
          name="amount"
          control={control}
          rules={{
            required: "Amount is required",
            min: { value: 1, message: "Minimum amount is 1" },
            validate: (value) =>
              (typeof value === "number" && !isNaN(value)) ||
              "Amount must be a number",
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter amount"
              onChange={(e) =>
                field.onChange(e.target.value ? Number(e.target.value) : "")
              }
            />
          )}
        />
        {errors.amount && (
          <span className="text-red-500">{errors.amount.message}</span>
        )}
      </div>

      {/* Date Picker with Controller */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Date
        </label>
        <Controller
          name="date"
          control={control}
          rules={{ required: "Date is required" }}
          render={({ field }) => (
            <DatePicker
              {...field}
              className="w-full"
              format="YYYY-MM-DD"
              onChange={(date) => field.onChange(date)}
              value={field.value}
            />
          )}
        />
        {errors.date && (
          <span className="text-red-500">{errors.date.message}</span>
        )}
      </div>
      {/* Message Textarea */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Message
        </label>
        <Controller
          name="message"
          control={control}
          rules={{ required: "Message is required" }}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              rows={3}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter message"
            />
          )}
        />
        {errors.message && (
          <span className="text-red-500">{errors.message.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
}
