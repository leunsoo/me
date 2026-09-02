import { defineRouting } from "next-intl/routing";

/**
 * 지원 언어 + 라우팅 규칙. 한 곳에서 정의하고 proxy·navigation·request 가 공유.
 * localePrefix: "always" → /ko/…, /en/… 둘 다 접두사. 루트 /는 proxy 가 리다이렉트.
 */
export const routing = defineRouting({
  locales: ["ko", "en"],
  defaultLocale: "ko",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
