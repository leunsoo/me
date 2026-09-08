/**
 * 사이트 절대 URL — RSS·sitemap 등 절대 경로가 필요한 곳에서 사용.
 * 배포 도메인이 정해지면 NEXT_PUBLIC_SITE_URL 환경변수로 덮어쓴다.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://leunsoo.kr"
).replace(/\/$/, "");

export const SITE_NAME = "leunsoo";
