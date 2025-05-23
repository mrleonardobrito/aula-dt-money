"use client";
import Image from "next/image";
import { useState } from "react";
import { TransactionModal } from "../TransactionModal";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <header className="bg-header overflow-hidden w-full h-[212px]">
      <div className="max-w-[1120px] mx-auto flex row justify-between pt-8">
        <Image src="/logo.png" width={172} height={40} alt="Logo Image" />
        <button
          className="bg-button text-white px-8 py-3 rounded-md hover:opacity-80"
          onClick={() => setIsModalOpen(true)}
        >
          {" "}
          Nova transação{" "}
        </button>
      </div>
      <TransactionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
}
