/** ISO 문자열("2026-09-01" 또는 "2026-09-01T00:00:00.000Z") → "2026.09.01" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${y}.${m}.${d}`;
}
