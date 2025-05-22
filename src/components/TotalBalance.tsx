"use client";

import { TotlaBalanceBoxProps } from "@/lib/types";
import AnimatedCounter from "./AnimatedCounter";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getAccountWithBalance } from "@/lib/getAccountsWithBalance";
import { useEffect, useState } from "react";

const TotalBalanceBox = ({ accounts = [] }: TotlaBalanceBoxProps) => {
  const [totalCurrentBalance, setTotalCurrentBalance] = useState(0);

  const user = useCurrentUser();

  const userAccounts = accounts.filter(
    (account) => account.userId === user?.userId
  );

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const balances = await Promise.all(
          userAccounts.map((account) => getAccountWithBalance(account))
        );

        const total = balances.reduce((sum, b) => sum + b.computedBalance, 0);
        setTotalCurrentBalance(total);
      } catch (err) {
        console.error("Failed to fetch account balances:", err);
      }
    };

    if (userAccounts.length > 0) {
      fetchBalances();
    }
  }, [userAccounts]);

  return (
    <section className="flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 shadow-chart sm:gap-6 sm:p-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-18 font-semibold text-gray-900">
          Number of Bank Accounts: {userAccounts.length}
        </h2>

        <div className="flex flex-col gap-2">
          <p className="text-[14px] leading-[20px] font-medium text-gray-600">
            Total Current Balance
          </p>
          <div className="text-[54px] leading-[60px] lg:text-30 flex-1 font-semibold text-gray-900 flex-center gap-2">
            <AnimatedCounter totalCurrentBalance={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
