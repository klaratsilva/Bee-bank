import { Account, Transaction } from "@/lib/types";
import { BASE_URL } from "@/server/const";

export async function getAccountWithBalance(account: Account) {
  const transactionsRes = await fetch(
    `${BASE_URL}/transactions?accountId=${account.id}`
  );
  if (!transactionsRes.ok) {
    throw new Error(
      `Failed to fetch transactions for account: ${account.name}`
    );
  }

  const transactions: Transaction[] = await transactionsRes.json();

  const computedBalance = transactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
  console.log(computedBalance, "computedBalance");

  return {
    computedBalance,
  };
}
