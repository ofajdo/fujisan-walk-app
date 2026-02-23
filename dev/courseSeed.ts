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
  console.log("🌱 Kコースのデータ投入を開始します...");

  // 1. 出発地 (StartingPoint) の作成
  const startingPoint = await prisma.startingPoint.create({
    data: {
      name: "富士宮市役所 白糸出張所",
      address: "〒418-0112 原1113", // 富士宮市原の郵便番号
      google: "",
    },
  });

  // 2. コース (Course) の作成
  const courseId = "k";
  const course = await prisma.course.create({
    data: {
      id: courseId,
      name: "K",
      title: "昔話の里を歩くコース",
      description:
        "芝川に沿う山間の里には、「鬼のいない村」や「おめん淵」などの昔話が残されている。語り伝えられてきた昔話の舞台を歩く。",
      districts: "白糸",
      distance: 5.0,
      time: 2.0,
      startingPointId: startingPoint.id,
    },
  });

  // 3. 各スポット (Location) のデータを配列で定義
  const locationsData = [
    {
      title: "神代杉資料館",
      description:
        "市内佐折地区で発掘された樹齢約600年の神代杉を展示している。",
    },
    {
      title: "横手沢分流ゲート",
      description:
        "芝川が増水した際、下流域の農地被害を防ぐため、分流ゲートで分水し大倉川農地防災ダムに増水した水を流す。また、ゲート上流には芝川を水源とする北山用水・万野用水の取入れ口がある。",
    },
    {
      title: "鬼のいない村",
      description:
        "この辺りは昔話「鬼のいない村」の舞台である。「鬼橋」は鬼が鉄砲で撃たれた場所であり、「足形」は撃たれた鬼の足跡がついた場所であるという。この足形とは、水の作用により小石が川底の岩をえぐって作ったくぼみ(ポットホール)である。",
    },
    {
      title: "内野北谷戸の道祖神",
      description:
        "明和8年(1771)造立の双体道祖神で、隣に石祠がある。白糸地区では隣に石祠を伴う道祖神が多く見られる。",
    },
    {
      title: "内野の発電所",
      description:
        "芝川の水を利用した水力発電所で、大正7年(1918)に発電を開始し、現在も稼動している。芝川水系には他にも足形や猪之頭などに水力発電所があり、現在も稼働している。",
    },
    {
      title: "内野神社",
      description:
        "地域の5つの神社を合祀して昭和46年(1971)に創建された。境内の灯籠や幟杭に旧神社名を知ることができる。また、この地域の内野集落と足形集落には市指定無形民俗文化財「火伏念仏」が伝承されている。",
    },
    {
      title: "佐折の石幢",
      description:
        "不動橋西側に、高さ187cmの石幢や双体道祖神などがある。石幢とは、六角柱や八角柱の幢身(胴体)に経文や仏像を刻んだ石塔である。少し離れた北西の辻には、江戸時代に造られた甲子や馬頭観音が並んでいる。",
    },
    {
      title: "上半野の道祖神",
      description:
        "天明2年(1782)の造立で、仲良く腕を組んでいる双体道祖神である。",
    },
    {
      title: "文殊堂",
      description:
        "地域では「文珠堂」と呼ばれ、文殊菩薩が祀られている。堂の前には19世紀に造立された石灯籠がある。毎年8月19日に行われる祭りでは近年手筒花火が奉納されている。",
    },
  ];

  // 4. Locationを順番に作成 (IDは k1, k2, k3...)
  for (let i = 0; i < locationsData.length; i++) {
    const loc = locationsData[i];
    const number = i + 1;
    const locationId = `${courseId}${number}`;

    const createdLocation = await prisma.location.create({
      data: {
        id: locationId,
        number: number,
        title: loc.title,
        description: loc.description,
        courseId: course.id,
      },
    });
    console.log(
      `✅ Location 作成完了: [${createdLocation.id}] ${createdLocation.title}`,
    );
  }

  console.log("🎉 データ投入が完了しました！");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
