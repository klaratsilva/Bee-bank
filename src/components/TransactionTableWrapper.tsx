"use client";

import { Badge, Table } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import TransactionFilter from "./TransactionFilter";
import { Transaction } from "@/lib/types";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import type { ColumnsType } from "antd/es/table";
import { cn } from "@/lib/utils";

const AmountBadge = ({
  amount,
  isSenderCurrentUser,
}: {
  amount: number;
  isSenderCurrentUser: boolean;
}) => {
  const backgroundColor = isSenderCurrentUser
    ? "bg-red-100"
    : "bg-lightgreen-100";
  const textColor = isSenderCurrentUser ? "text-red-800" : "text-green-800";
  const borderColor = isSenderCurrentUser
    ? "border-red-300"
    : "border-green-400";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl text-[12px] px-2 py-[2px] font-medium border",
        backgroundColor,
        textColor,
        borderColor
      )}
    >
      {isSenderCurrentUser ? "-" : ""}${amount}
    </div>
  );
};

const TransactionTableWrapper = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUser = useCurrentUser(); // Get current user

  const filters = Object.fromEntries(searchParams.entries());

  const handleFiltersChange = (newFilters: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`?${params.toString()}`);
  };

  const filterUserTransactions = transactions.filter(
    (t) =>
      t.senderUserId === currentUser?.userId ||
      t.receiverUserId === currentUser?.userId
  );

  const filteredTransactions = filterUserTransactions.filter(
    (transaction) =>
      (!filters.filterDate || transaction.date === filters.filterDate) &&
      (!filters.filterAmount ||
        transaction.amount === Number(filters.filterAmount))
  );

  const columns: ColumnsType<Transaction> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_amount: number, record) => {
        const isSenderCurrentUser = record.senderUserId === currentUser?.userId;

        return (
          <AmountBadge
            amount={record.amount}
            isSenderCurrentUser={isSenderCurrentUser}
          />
        );
      },
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      key: "receiver",
    },
    {
      title: "Sender",
      dataIndex: "sender",
      key: "sender",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];

  return (
    <>
      <TransactionFilter
        filters={filters}
        onChangeFilters={handleFiltersChange}
      />
      <Table
        columns={columns}
        dataSource={filteredTransactions}
        rowKey="id"
        rowClassName={(record) =>
          record.senderUserId === currentUser?.userId
            ? "no-hover bg-[#fffafa]"
            : "no-hover bg-[#f7fef6]"
        }
        pagination={false}
      />
    </>
  );
};

export default TransactionTableWrapper;
