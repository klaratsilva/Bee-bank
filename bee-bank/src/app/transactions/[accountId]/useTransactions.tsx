import { useEffect, useState } from 'react';
import { Transaction } from "@/lib/types";
import { v4 as uuidv4 } from 'uuid';

import { BASE_URL } from '@/server/const';

export default function useTransactions(accountId: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/transactions?accountId=${accountId}`);
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    if (accountId) fetchTransactions();
  }, [accountId]);

  const addTransaction = async (newTx: Omit<Transaction, 'id'>) => {
    const fullTx: Transaction = { ...newTx, id: uuidv4(), accountId };

    try {
      const res = await fetch(`${BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullTx),
      });

      if (!res.ok) throw new Error('Failed to add transaction');

      setTransactions((prev) => [...prev, fullTx]);
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  return { transactions, addTransaction };
}
