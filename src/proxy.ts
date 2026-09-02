import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next 16 의 proxy(구 middleware). 렌더 전에 실행.
 * - 로케일 없는 요청(/ , /about)을 Accept-Language + NEXT_LOCALE 쿠키로 판별해 /ko·/en 으로 리다이렉트
 * - 언어 전환 시 선택을 쿠키에 저장
 */
export default createMiddleware(routing);

export const config = {
  // _next 내부 경로, 파일 확장자 있는 요청(정적 파일)은 제외
  matcher: "/((?!_next|_vercel|.*\\..*).*)",
};
