"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * 언어 전환 — 지구본 아이콘 + 현재 로케일 코드.
 * 로케일이 2개뿐이라 클릭 = 반대 언어로 토글. 같은 경로를 유지하고
 * next-intl 이 NEXT_LOCALE 쿠키에 선택을 저장한다.
 */
export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("a11y");

  const next =
    routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: next })}
      aria-label={t("switchLanguage")}
      title={`${t("switchLanguage")} — ${next.toUpperCase()}`}
      className="flex items-center gap-1.5 text-label font-medium uppercase text-fg-soft transition-colors hover:text-fg"
    >
      <GlobeIcon />
      {locale}
    </button>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
