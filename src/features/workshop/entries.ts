import { readMdxCollection } from "@/lib/mdx";

export type WorkshopFrontmatter = {
  title: string;
  summary: string;
  /** ISO date, "YYYY-MM-DD" */
  date: string;
};

export type WorkshopEntry = WorkshopFrontmatter & { slug: string };

/** src/content/workshop/*.mdx 의 프론트매터를 전부 읽어온다. 손으로 등록할 목록 없음. */
export function getAllWorkshopEntries(): WorkshopEntry[] {
  return readMdxCollection<WorkshopFrontmatter>("workshop").map(
    ({ slug, frontmatter }) => ({ slug, ...frontmatter }),
  );
}

export function getEntry(slug: string): WorkshopEntry | undefined {
  return getAllWorkshopEntries().find((e) => e.slug === slug);
}

/** 최신순 */
export function sortedEntries(): WorkshopEntry[] {
  return getAllWorkshopEntries().sort((a, b) => b.date.localeCompare(a.date));
}
