/*
AI向けのプロンプト

以下のURL（またはPDF）からウォーキングコースの情報を取得し、Prismaのシードスクリプト（seed.ts）を作成してください。

資料URL: 【ここにURLやPDFのリンクを入力】
対象コースのアルファベット: 【コースのアルファベットを入力（例: a）】

【厳守事項】
以下のルールに必ず従ってデータを作成してください。特に文章の抽出においては、AIによる要約や改変を一切行わず、資料のテキストを一言一句そのまま使用してください。

1. 文章の抽出（絶対に改変しないこと）
- `Course.description`、`Location.title`、`Location.description` などのテキストデータは、資料から一言一句違わずそのまま抜き出してください。

2. IDと名前の命名規則
- `Course.id`: 対象コースの小文字アルファベット1文字（例: a）
- `Course.name`: 対象コースの大文字アルファベット1文字（例: A）
- `Location.id`: コースのid(小文字) ＋ 番号（例: a1, a2, a3...）
- `Course.originalURL`: /pdf/ + コースのid(大文字) + .pdf

3. データの加工ルール
- `Course.title`: サブタイトルなどを省き、「〇〇を歩くコース」のように短く設定すること。
- `Course.districts`: 「地区」という文字が含まれている場合は削除すること（例：「富士根北地区」→「富士根北」）。
- `Course.time`: 資料に「分」で記載されている場合も、「時」に変換してFloat型で設定すること（例：120分 → 2.0）。
- `Course.distance`: Float型で設定すること（例：5.0）。
- `StartingPoint.address`: 資料の住所の先頭に、該当地域の正しい郵便番号を調べて追記すること。また、住所に「静岡県」、「富士宮市」、「富士宮」が含まれている場合は必ず省略して出力すること（例：「静岡県富士宮市粟倉347-1」→「〒418-0011 粟倉347-1」）。
- `StartingPoint.google`: 資料にURLの記載がない場合は空文字 `''` とすること。

4. スクリプトの構成
- `StartingPoint` → `Course` の順で作成する。
- その後、抽出した `Location` のデータを配列にまとめ、forループを使って `a1`, `a2` のように順番に `Location` テーブルへ投入する処理を書くこと。
- 余計な解説は最小限にし、TypeScriptのコードブロックを出力すること。

【Prismaスキーマ情報】
...
*/

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. StartingPointの作成
  // 住所から「静岡県富士宮市」を省略し、正しい郵便番号を追記
  const startingPoint = await prisma.startingPoint.create({
    data: {
      name: "富士宮市役所",
      address: "〒418-8601 弓沢町150",
      google: "",
    },
  });

  // 2. Courseの作成
  // districtsから「地区」を削除、timeを分から時(Float)に変換
  const course = await prisma.course.create({
    data: {
      id: "he",
      name: "HE",
      title: "旧大宮町東を歩くコース",
      description:
        "市街地中心部は、江戸時代には「大宮町」として栄え、今も寺社や石造物など歴史をしのばせるものが数多く残る。市街地に大宮町の歴史をたどる。",
      districts: "大宮東",
      distance: 5.0,
      time: 2.0,
      originalPDF: "/pdf/HE.pdf",
      startingPointId: startingPoint.id,
    },
  });

  // 3. Locationデータの定義
  const locations = [
    {
      id: "he1",
      number: 1,
      title: "「大宮町鉄道馬車会社発着所」の碑",
      description:
        "富士馬車鉄道大宮町発着所跡である。富士馬車鉄道は、明治23年(1890)東海道線鈴川駅(現JR吉原駅)~大宮町間に開通し、大正末年まで運行した。",
    },
    {
      id: "he2",
      number: 2,
      title: "矢立池の碑",
      description:
        "富士の巻狩のおり、源頼朝が矢を射立てた所から泉が湧き出したという伝説から「矢立池」と呼ばれる。現在、池はない。",
    },
    {
      id: "he3",
      number: 3,
      title: "悪王子神社",
      description:
        "富士山の噴火を鎮める火之御子神を祀る。阿幸地地区の氏神で、「悪」は「強い」を意味する。",
    },
    {
      id: "he4",
      number: 4,
      title: "二つ石",
      description:
        "富士の巻狩のおり、源頼朝が馬に乗るときに踏み台にした石だという。",
    },
    {
      id: "he5",
      number: 5,
      title: "横道観音",
      description:
        "地元では「よこみち観音」と呼ぶ。富士横道観音霊場巡りのひとつだと考えられるが、現存する『富士横道観音御詠歌』には歌われていない。",
    },
    {
      id: "he6",
      number: 6,
      title: "宗心寺",
      description:
        "富士山より降臨したという伝承を持つ阿弥陀三尊像を本尊とする。富士横道観音霊場巡りの第一番札所「宗心寺観音堂」がある。",
    },
    {
      id: "he7",
      number: 7,
      title: "平等寺",
      description:
        "ここには、大宮小学校の前身である「岳麓洞」が最初に置かれた。",
    },
    {
      id: "he8",
      number: 8,
      title: "大頂寺",
      description:
        "廃仏毀釈により富士山頂上から降ろされたとされる大日如来坐像が伝わっている。また、幕末に万野原の開発などを行った角田桜岳(佐野与市)の記念碑がある。",
    },
    {
      id: "he9",
      number: 9,
      title: "馬車道",
      description:
        "明治から昭和初期に市中心部~市北部間に運行した馬車鉄道「富士軌道」の軌道敷跡である。",
    },
    {
      id: "he10",
      number: 10,
      title: "若之宮浅間神社",
      description: "浅間大社祭神の第一御子神(若宮)を祀る。",
    },
    {
      id: "he11",
      number: 11,
      title: "大宮縄状溶岩",
      description:
        "市指定天然記念物。溶岩が冷えて収縮する際、縄のような形になったものである。",
    },
    {
      id: "he12",
      number: 12,
      title: "御神幸道三丁目の碑",
      description:
        "かつて浅間大社と山宮浅間神社を祭神が往復する「山宮御神幸」が行われ、その道筋には浅間大社から1丁 (約109m) 毎に「丁目石」が置かれた。",
    },
    {
      id: "he13",
      number: 13,
      title: "福石神社",
      description:
        "毎年7月末日に「茅の輪くぐり」が行われ、「わくぐりさん」と呼ばれている。",
    },
    {
      id: "he14",
      number: 14,
      title: "蔵屋敷稲荷",
      description:
        "戦国時代、浅間神社(現富士山本宮浅間大社)大宮司富士氏居館の蔵屋敷に祀られていた稲荷社だといわれている。",
    },
    {
      id: "he15",
      number: 15,
      title: "神田市神社",
      description:
        "「市神さん」と呼ばれる商いの神様で、大正11年(1922)、商店街の発展を願って現在地に祠がつくられた。",
    },
    {
      id: "he16",
      number: 16,
      title: "中央町のカヤ",
      description:
        "市指定天然記念物。江戸時代初期に植えられたというカヤの大樹である。",
    },
  ];

  // 4. Locationデータの投入 (forループ)
  for (const loc of locations) {
    await prisma.location.create({
      data: {
        id: loc.id,
        number: loc.number,
        title: loc.title,
        description: loc.description,
        courseId: course.id,
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
