import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface CreateTransactionData {
    description: string;
    amount: string;
    type: 'income' | 'outcome';
    category: string;
}

interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: 'income' | 'outcome';
    category: string;
    createdAt: string;
    updatedAt: string;
}

async function fetchTransactions(): Promise<Transaction[]> {
    const response = await fetch("/api/transactions");

    if (!response.ok) {
        throw new Error("Erro ao buscar transações");
    }

    return response.json();
}

async function createTransaction(data: CreateTransactionData): Promise<Transaction> {
    const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Erro ao criar transação");
    }

    return response.json();
}

export function useTransactions() {
    const queryClient = useQueryClient();

    const { data: transactions = [], isLoading } = useQuery({
        queryKey: ['transactions'],
        queryFn: fetchTransactions,
    });

    const { mutateAsync: createTransactionMutation, isPending: isCreating } = useMutation({
        mutationFn: createTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });

    return {
        transactions,
        isLoading,
        createTransaction: createTransactionMutation,
        isCreating,
    };
} 