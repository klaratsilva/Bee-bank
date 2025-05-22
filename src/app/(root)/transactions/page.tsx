import HeaderBox from "@/components/HeaderBox";
import TransactionTableWrapper from "@/components/TransactionTableWrapper";
import { Transaction } from "@/lib/types";
import { BASE_URL } from "@/server/const";
import { notFound } from "next/navigation";

type Params = {
  params: {
    accountId: string;
  };
  searchParams: {
    filterDate?: string;
    filterAmount?: string;
    q?: string;
  };
};

const Transactions = async ({ searchParams }: Params) => {
  const { q } = await searchParams;

  let query = `${BASE_URL}/transactions?q=${q}`;

  const res = await fetch(query, { cache: "no-store" });

  if (!res.ok) return notFound();

  const transactions = await res.json();

  const sortedTransactions = transactions
    .slice()
    .sort(
      (a: Transaction, b: Transaction) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const filteredAccountTransactions = sortedTransactions.filter(
    (tx: Transaction) => tx.senderAccountId === q || tx.receiverAccountId === q
  );

  return (
    <div>
      <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
        <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll;">
          <HeaderBox
            title={`Recent Transactions ${q ? q : ""}`}
            subtext="Manage your accounts and transactions efficiently"
          />
          <TransactionTableWrapper
            transactions={q ? filteredAccountTransactions : sortedTransactions}
          />
        </div>
      </section>
    </div>
  );
};

export default Transactions;
