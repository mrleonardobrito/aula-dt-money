import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import React, { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { toast } from "react-toastify";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
}

type TransactionType = "income" | "outcome" | null;

export function TransactionModal({ open, onClose }: TransactionModalProps) {
  const [type, setType] = useState<TransactionType>(null);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const { createTransaction, isLoading } = useTransactions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!type) {
      toast.error("Selecione o tipo de transação");
      return;
    }

    await createTransaction({
      description,
      amount,
      type,
      category,
    });

    setDescription("");
    setAmount("");
    setCategory("");
    setType(null);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-md shadow-lg w-full max-w-lg p-10 relative animate-fade-in">
        <button
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 text-4xl "
          onClick={onClose}
          aria-label="Fechar modal"
        >
          &times;
        </button>
        <h2 className="text-2xl mt-8 text-gray-600 font-semibold text-type-1 mb-8 text-left">
          Cadastrar transação
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-[#F0F2F5] px-6 py-4 text-type-2 placeholder:text-gray-400 focus:outline-none"
            required
          />
          <input
            type="number"
            placeholder="Preço"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-[#F0F2F5] px-6 py-4 text-type-2 placeholder:text-gray-400 focus:outline-none"
            required
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType("income")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md border ${
                type === "income"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-[#F0F2F5]"
              } py-4 text-type-2 text-green-600 font-normal hover:bg-green-50`}
            >
              <ArrowUpCircle />
              Entrada
            </button>
            <button
              type="button"
              onClick={() => setType("outcome")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md border ${
                type === "outcome"
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-[#F0F2F5]"
              } py-4 text-type-2 text-red-600 font-normal hover:bg-red-50`}
            >
              <ArrowDownCircle />
              Saída
            </button>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-[#F0F2F5] px-6 py-4 text-type-2 placeholder:text-gray-400 focus:outline-none"
            required
          >
            <option value="" disabled>
              Selecione uma categoria
            </option>
            <option value="Vendas">Vendas</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Casa">Casa</option>
          </select>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 rounded-md bg-[#33CC95] text-white py-4 font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
