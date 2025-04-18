"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Table, Button } from "antd";
import dayjs from "dayjs";

import AddModal from "@/components/modal/AddTransactionModal";
import useTransactions from "./useTransactions";
import TransactionFilter from "./TransactionFilter";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) => dayjs(date).format("MMM DD, YYYY"),
  },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  {
    title: "Sender / Receiver",
    dataIndex: "senderReceiver",
    key: "senderReceiver",
  },
  { title: "Message", dataIndex: "message", key: "message" },
];

export default function TransactionsPage() {
  const params = useParams();
  const accountId = params.accountId as string;
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [filterAmount, setFilterAmount] = useState<number | null>(null);

  const { transactions, addTransaction, loading } = useTransactions(accountId);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (t.accountId !== accountId) return false;
      if (filterDate && t.date !== filterDate) return false;
      if (filterAmount && t.amount !== filterAmount) return false;
      return true;
    });
  }, [transactions, accountId, filterDate, filterAmount]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <p>Loading transactions...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "50px auto", padding: "10px" }}>
      <Button onClick={() => router.back()} style={{ marginBottom: 20 }}>
        ← Back
      </Button>

      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ float: "right" }}
      >
        + Add Transaction
      </Button>

      <h2>Transactions</h2>

      <TransactionFilter
        setFilterDate={setFilterDate}
        setFilterAmount={setFilterAmount}
      />

      <Table
        columns={columns}
        dataSource={filteredTransactions}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <AddModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTransaction}
        accountId={accountId}
      />
    </div>
  );
}
