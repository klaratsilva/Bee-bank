"use client";

import { Badge, Table } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import TransactionFilter from "./TransactionFilter";
import { Transaction } from "@/lib/types";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import type { ColumnsType } from "antd/es/table";

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
          <Badge
            count={`${isSenderCurrentUser ? "-" : ""}$${record.amount}`}
            style={{
              backgroundColor: isSenderCurrentUser ? "#ffccc7" : "#42e873",
              color: "#000",
              fontSize: "12px",
              padding: "0 6px",
              borderRadius: "6px",
            }}
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
            ? "no-hover bg-[#fff1f0]"
            : "no-hover bg-[#e2fcde]"
        }
        pagination={false}
      />
    </>
  );
};

export default TransactionTableWrapper;
