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
    const newTransaction: TransactionWithoutId = {
      senderAccountId: data.senderAccountId,
      senderUserId: user!.userId,
      sender: user!.name,
      receiverUserId: "d4e3f2a1b0", // hardcoded — you can make this dynamic
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
      router.push(`/accounts/${data.senderAccountId}/transactions`);
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
        <Input
          {...register("receiver", { required: "Receiver name is required" })}
          className="w-full border rounded px-3 py-2"
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
        <Input
          {...register("receiverAccountId", {
            required: "Receiver account number is required",
          })}
          className="w-full border rounded px-3 py-2"
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
        <Input
          type="number"
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
            min: { value: 1, message: "Minimum amount is 1" },
          })}
          className="w-full border rounded px-3 py-2"
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
        <Input.TextArea
          rows={3}
          {...register("message", { required: "Message is required" })}
          className="w-full border rounded px-3 py-2"
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
