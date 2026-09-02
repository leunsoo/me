import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { routing } from "@/i18n/routing";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";

// 제목·본문 공용 — 한글+라틴 한 몸. next/font/google 에 없어 로컬 woff2 를 self-host.
const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
  // 2MB 가변 폰트라 preload 는 끔. swap 으로 시스템 고딕 먼저 → 로드되면 교체.
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

// 빌드 때 두 언어 HTML 을 미리 생성.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: { default: t("defaultTitle"), template: t("titleTemplate") },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${pretendard.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-body text-fg">
        {/* 저장된 테마 복원(깜빡임 방지). async + src 라 React 19 가 <head> 로
            hoist 하고 재조정에서 제외 → 로케일 전환 리렌더 시 경고 없음. */}
        <script src="/theme-init.js" async />
        <NextIntlClientProvider>
          <TopNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
