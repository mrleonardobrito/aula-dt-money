"use client";
import { useTransactions } from "@/hooks/useTransactions";
import { Card } from "../Card";

export function CardContainer() {
  const { transactions } = useTransactions();

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const outcome = transactions
    .filter((transaction) => transaction.type === "outcome")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const total = income - outcome;

  return (
    <div className="flex justify-between">
      <Card title="Entradas" value={income} type="income" />
      <Card title="Saídas" value={outcome} type="outcome" />
      <Card title="Total" value={total} type="total" />
    </div>
  );
}
