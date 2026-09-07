import { readMdxCollection } from "@/lib/mdx";

export type WorkshopFrontmatter = {
  title: string;
  summary: string;
  /** ISO date, "YYYY-MM-DD" */
  date: string;
  /** true = 목록·빌드에서 제외. next dev 에서는 계속 보임(작성 중 프리뷰). */
  draft?: boolean;
};

export type WorkshopEntry = WorkshopFrontmatter & { slug: string };

// 프로덕션 빌드에선 draft 를 숨기고, 개발 서버에선 보여준다(작성 중 프리뷰).
const SHOW_DRAFTS = process.env.NODE_ENV === "development";

/** src/content/workshop/*.mdx 의 프론트매터를 전부 읽어온다. 손으로 등록할 목록 없음. */
export function getAllWorkshopEntries(): WorkshopEntry[] {
  return readMdxCollection<WorkshopFrontmatter>("workshop")
    .map(({ slug, frontmatter }) => ({ slug, ...frontmatter }))
    .filter((e) => SHOW_DRAFTS || !e.draft);
}

export function getEntry(slug: string): WorkshopEntry | undefined {
  return getAllWorkshopEntries().find((e) => e.slug === slug);
}

/** 최신순 */
export function sortedEntries(): WorkshopEntry[] {
  return getAllWorkshopEntries().sort((a, b) => b.date.localeCompare(a.date));
}
