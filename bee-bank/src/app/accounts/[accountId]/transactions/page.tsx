import { Transaction } from "@/lib/types";
import { BASE_URL } from "@/server/const";
import { Button, Flex } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { notFound } from "next/navigation";
import TransactionTableWrapper from "./TransactionTableWrapper";

type Params = {
  params: {
    accountId: string;
  };
  searchParams: {
    filterDate?: string;
    filterAmount?: string;
  };
};

interface TransactionsPageProps {
  transactions: Transaction[];
}

// Define the columns with SSR rendering logic
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
  },
  {
    title: "Sender / Receiver",
    dataIndex: "senderReceiver",
    key: "senderReceiver",
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
  },
];

export default async function TransactionsPage({
  params,
  searchParams,
}: Params) {
  const { accountId } = await params;
  const { filterDate, filterAmount } = await searchParams;

  let query = `${BASE_URL}/transactions?accountId=${accountId}`;

  if (filterDate) query += `&date=${filterDate}`;
  if (filterAmount) query += `&amount=${filterAmount}`;

  const res = await fetch(query, { cache: "no-store" });

  if (!res.ok) return notFound();

  const transactions = await res.json();

  return (
    <div className="p-6">
      <Flex vertical gap="3">
        <Flex justify="space-between">
          <h1 className="text-2xl p-4">Transactions for account {accountId}</h1>
          <Button type="primary">
            <Link href={`/accounts/${accountId}/new`}>New Transaction</Link>
          </Button>
        </Flex>
        <TransactionTableWrapper transactions={transactions} />
      </Flex>
    </div>
  );
}
