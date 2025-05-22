import { Account, Transaction } from "@/lib/types";
import { BASE_URL } from "@/server/const";

export async function getAccountWithBalance(account: Account) {
  const transactionsRes = await fetch(`${BASE_URL}/transactions`);
  if (!transactionsRes.ok) {
    throw new Error(
      `Failed to fetch transactions for account: ${account.name}`
    );
  }

  const transactions: Transaction[] = await transactionsRes.json();

  const filteredAccountTransactions = transactions.filter(
    (tx: Transaction) =>
      tx.senderAccountId === account.accountId ||
      tx.receiverAccountId === account.accountId
  );

  const computedBalance = filteredAccountTransactions.reduce(
    (total, transaction) => {
      return total + transaction.amount;
    },
    0
  );
  return {
    computedBalance,
  };
}
