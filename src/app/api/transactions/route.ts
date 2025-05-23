import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { description, amount, type, category } = body

        const transaction = await prisma.transaction.create({
            data: {
                description,
                amount: Number(amount),
                type,
                category,
            },
        })

        return NextResponse.json(transaction)
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao criar transação', message: error },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const transactions = await prisma.transaction.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(transactions)
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao buscar transações", message: error },
            { status: 500 }
        );
    }
}