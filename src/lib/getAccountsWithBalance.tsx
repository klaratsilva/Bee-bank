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
  console.log(transactions, "transactions");
  const filteredAccountTransactions = transactions.filter(
    (tx: Transaction) =>
      tx.senderAccountId === account.accountId ||
      tx.receiverAccountId === account.accountId
  );
  console.log(
    filteredAccountTransactions,
    "filteredAccountTransactions",
    account.accountId
  );
  const computedBalance = filteredAccountTransactions.reduce(
    (total, transaction) => {
      if (transaction.receiverAccountId === account.accountId) {
        return total + transaction.amount; // incoming: +
      } else if (transaction.senderAccountId === account.accountId) {
        return total - transaction.amount; // outgoing: -
      }
      return total; // fallback, shouldn't happen if filtered properly
    },
    0
  );
  return {
    computedBalance,
  };
}
