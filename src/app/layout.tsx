import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

// 본문 — 한글+라틴 한 몸. next/font/google 에 없어 로컬 woff2 를 self-host.
const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
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

export const metadata: Metadata = {
  title: {
    default: "leunsoo — Frontend Developer",
    template: "%s — leunsoo",
  },
  description:
    "감각적인 웹 경험을 설계하고 구현하는 프론트엔드 개발자, leunsoo의 포트폴리오.",
};

// 첫 페인트 전에 저장된 테마를 적용해 깜빡임 방지.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${bricolage.variable} ${pretendard.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-body text-fg">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <TopNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
