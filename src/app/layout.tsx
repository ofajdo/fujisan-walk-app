import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { SyncUserLocation } from "@/components/Sync";
import { Analytics } from "@vercel/analytics/next";
import { AuthSessionProvider } from "@/components/SessionProvider";
import { auth } from "@/auth";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "富士宮市歩く博物館デジタル",
  description:
    "富士宮市歩く博物館をデジタル化したものです。富士宮市の歩く博物館の紹介をしています。",
  verification: {
    google: "pN0H3UKaXSIYAoZW9gR1IEyLjFql2k2mErkNYOn9Rbc",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="ja">
      <body suppressHydrationWarning className={notoSansJP.className}>
        <SyncUserLocation>
          <AuthSessionProvider session={session}>
            {children}
          </AuthSessionProvider>
        </SyncUserLocation>
        <Analytics />
      </body>
    </html>
  );
}
