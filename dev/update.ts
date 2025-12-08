import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.route.updateMany({
    data: {
      display: true,
    },
  });

  console.log(`Updated ${result.count} records.`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
