import type { Locale } from "@/i18n/routing";

/**
 * 요청 로케일 번역이 없어 기본 로케일(한국어) 원문으로 대체됐을 때 본문 위에 뜨는 알림.
 * 문구는 항상 폴백 언어(한국어)로 — 지원하지 않는 언어로 안내해봐야 소용없다.
 */

const LOCALE_LABEL_KO: Record<Locale, string> = {
  ko: "한국어",
  en: "영어",
};

export function FallbackNotice({ requestedLocale }: { requestedLocale: Locale }) {
  return (
    <div
      role="note"
      className="not-prose mb-block rounded-md border border-line bg-bg-dim px-4 py-3 text-caption text-fg-soft"
    >
      아직 {LOCALE_LABEL_KO[requestedLocale] ?? requestedLocale} 번역이 없는
      글입니다. 한국어 원문으로 표시합니다.
    </div>
  );
}
