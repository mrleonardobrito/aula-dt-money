const { PrismaClient } = require("../src/generated/prisma");
const prisma = new PrismaClient();

async function main() {
  const existingTransactions = await prisma.transaction.findMany();

  if (existingTransactions.length > 0) {
    console.log("Seed já foi executado anteriormente. Pulando...");
    return;
  }

  await prisma.transaction.createMany({
    data: [
      {
        description: "Desenvolvimento de site",
        amount: 12000,
        type: "income",
        category: "Vendas",
      },
      {
        description: "Hamburguer",
        amount: 59,
        type: "outcome",
        category: "Alimentação",
      },
      {
        description: "Aluguel do apartamento",
        amount: 1200,
        type: "outcome",
        category: "Casa",
      },
      {
        description: "Computador",
        amount: 5400,
        type: "income",
        category: "Vendas",
      },
    ],
  });

  console.log("Seed executado com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
