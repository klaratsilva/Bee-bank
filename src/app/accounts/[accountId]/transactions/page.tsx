import { Transaction } from "@/lib/types";
import { BASE_URL } from "@/server/const";
import { Button, Flex } from "antd";
import Link from "next/link";
import { notFound } from "next/navigation";
import TransactionTableWrapper from "../../../../components/TransactionTableWrapper";

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

export default async function TransactionsPage({
  params,
  searchParams,
}: Params) {
  const { accountId } = await params;
  const { filterDate, filterAmount } = await searchParams;

  let query = `${BASE_URL}/transactions?q=${accountId}`;

  if (filterDate) query += `&date=${filterDate}`;
  if (filterAmount) query += `&amount=${filterAmount}`;

  console.log(query, "query");
  const res = await fetch(query, { cache: "no-store" });

  if (!res.ok) return notFound();

  const transactions = await res.json();

  const filteredAccountTransactions = transactions.filter(
    (tx: Transaction) =>
      tx.senderAccountId === accountId || tx.receiverAccountId === accountId
  );

  console.log(transactions, "transactions");
  console.log(filteredAccountTransactions, "filteredAccountTransactions");

  return (
    <div className="p-6">
      <Flex vertical gap="3">
        <Flex justify="space-between">
          <h1 className="text-2xl p-4">Transactions for account {accountId}</h1>
          <Button type="primary">
            <Link href={`/accounts/${accountId}/new`}>New Transaction</Link>
          </Button>
        </Flex>
        <TransactionTableWrapper transactions={filteredAccountTransactions} />
      </Flex>
    </div>
  );
}
