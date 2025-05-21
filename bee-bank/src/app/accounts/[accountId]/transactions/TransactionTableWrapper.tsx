"use client";

import { Table } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import TransactionFilter from "./TransactionFilter";
import { Transaction } from "@/lib/types";

const TransactionTableWrapper = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Convert URLSearchParams to plain object filters
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

  const filteredTransactions = transactions.filter(
    (transaction) =>
      (!filters.filterDate || transaction.date === filters.filterDate) &&
      (!filters.filterAmount ||
        transaction.amount === Number(filters.filterAmount))
  );

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
      title: "Sender / Receiver",
      dataIndex: "senderReceiver",
      key: "senderReceiver",
    },
    { title: "Message", dataIndex: "message", key: "message" },
  ];

  return (
    <>
      <TransactionFilter
        filters={filters}
        onChangeFilters={handleFiltersChange}
      />
      <Table columns={columns} dataSource={filteredTransactions} rowKey="id" />
    </>
  );
};

export default TransactionTableWrapper;
