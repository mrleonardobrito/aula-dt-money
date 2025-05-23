"use client";
import { useTransactions } from "../../hooks/useTransactions";

export function TransactionsTable() {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <div className="mt-16 w-full text-center text-gray-400">
        Carregando transações...
      </div>
    );
  }

  return (
    <div className="mt-16 w-full">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead className="text-gray-400">
          <tr>
            <th className="font-light text-type-2 pb-5 pl-8">Título</th>
            <th className="font-light text-type-2 pb-5">Preço</th>
            <th className="font-light text-type-2 pb-5">Categoria</th>
            <th className="font-light text-type-2 pb-5 pr-8">Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="h-16">
              <td className="bg-white rounded-l-sm pl-8 text-type-1 font-light">
                {transaction.description}
              </td>
              <td
                className={`bg-white whitespace-nowrap text-lg font-extralight border-b border-[#F0F2F5] ${
                  transaction.type === "income"
                    ? "text-[#33CC95]"
                    : "text-[#E52E4D]"
                }`}
              >
                {transaction.type === "outcome" ? "- " : ""}R${" "}
                {transaction.amount.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td className="bg-white text-gray-400 font-extralight">
                {transaction.category}
              </td>
              <td className="bg-white text-gray-400 font-extralight">
                {new Date(transaction.createdAt).toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
