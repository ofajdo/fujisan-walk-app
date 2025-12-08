//作る用

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 座標データをそのまま貼り付け
  const rawData = `
35.258084,138.553130
35.258124,138.553044
35.258141,138.552921
35.258157,138.552798
35.258176,138.552629
35.258200,138.552672
35.258181,138.552851
35.258159,138.552977
35.258058,138.553227
`;

  // 改行で分割して [lat, lng] の配列に変換
  const coordinates = rawData
    .trim()
    .split("\n")
    .map((line) => line.split(",").map((v) => v.trim()));

  const courseId = "s"; // 実際のcourseIdに置き換えてください
  const now = new Date("2025-12-07T21:20:43.034Z");

  const data = coordinates.map(([lat, lng], index) => ({
    latitude: lat,
    longitude: lng,
    courseId,
    display: true,
    sort: new Date(now.getTime() + index * 30), // 順番を保つ
  }));

  await prisma.route.createMany({
    data,
  });

  console.log("データ追加完了！");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
