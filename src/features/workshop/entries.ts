export type WorkshopEntry = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date, "YYYY-MM-DD" */
  date: string;
};

/**
 * 작업실 항목 매니페스트 — 메타데이터만.
 * 실제 본문은 app/workshop/_content/<slug>.tsx 에 있음. (나중에 MDX 로 이동 가능)
 */
export const WORKSHOP_ENTRIES: WorkshopEntry[] = [
  {
    slug: "design-system",
    title: "디자인 시스템",
    summary:
      "원시 값 → 역할 토큰 → Tailwind 유틸 3계층. light-dark() 로 다크모드, 강조색은 밑줄로만.",
    date: "2026-09-01",
  },
];

export function getEntry(slug: string): WorkshopEntry | undefined {
  return WORKSHOP_ENTRIES.find((e) => e.slug === slug);
}

/** 최신순 */
export function sortedEntries(): WorkshopEntry[] {
  return [...WORKSHOP_ENTRIES].sort((a, b) => b.date.localeCompare(a.date));
}
