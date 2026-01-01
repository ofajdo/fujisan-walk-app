import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getRouteCsv() {
  const result = await prisma.route.findMany({
    where: {
      courseId: "",
      display: true,
    },
    orderBy: {
      sort: "asc",
    },
  });
  const convert = result.reduce((acc, cur) => {
    return `${acc}${cur.latitude}, ${cur.longitude}\n`;
  }, "");
  console.log(convert);
}

getRouteCsv();
