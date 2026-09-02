import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as getRootLocale } from "next/root-params";
import { routing } from "./routing";

/**
 * 요청마다 실행 — [locale] 세그먼트를 next/root-params 로 읽어 해당 언어 메시지를 로드.
 * 헤더를 읽지 않으므로 페이지가 정적으로 프리렌더된다.
 * 서버에서만 돌아가므로 messages/*.json 은 클라이언트 번들에 안 들어감.
 */
export default getRequestConfig(async () => {
  const requested = await getRootLocale();
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
