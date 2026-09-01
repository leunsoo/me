/** "2026-09-01" → "2026.09.01" (타임존 이슈 없이 순수 문자열 변환) */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}
