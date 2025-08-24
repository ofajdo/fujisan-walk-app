import type { Metadata } from "next";
import { Noto_Sans_JP, M_PLUS_1_Code } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "富士宮市歩く博物館デジタル",
  description:
    "非公式の富士宮市歩く博物館のデジタル版です。歩くルートをデジタルのマップで見ることができます。富士宮市教育委員会のパンフレットを参考にしています",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning className={notoSansJP.className}>
        {children}
      </body>
    </html>
  );
}
