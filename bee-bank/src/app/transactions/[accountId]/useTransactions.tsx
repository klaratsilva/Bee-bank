import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type { Transaction, TransactionWithoutId } from "@/lib/types";
import { BASE_URL } from "@/server/const";

export default function useTransactions(accountId: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/transactions?accountId=${accountId}`
        );
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    if (accountId) fetchTransactions();
  }, [accountId]);

  const addTransaction = async (newTransaction: TransactionWithoutId) => {
    const fullTx: Transaction = { ...newTransaction, id: uuidv4(), accountId };

    try {
      const res = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullTx),
      });

      if (!res.ok) throw new Error("Failed to add transaction");

      setTransactions((prev) => [...prev, fullTx]);
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  return { transactions, addTransaction, loading };
}
