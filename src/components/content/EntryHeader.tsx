import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/date";
import type { Entry, Collection } from "@/lib/content";
import { TagChips } from "./TagChips";

const BACK_LABEL: Record<Collection, string> = {
  workshop: "← 작업실",
  blog: "← 블로그",
};

/** /workshop/[slug] · /blog/[slug] 상단 — 뒤로가기 + 제목 + 메타 + 요약. */
export function EntryHeader({ entry }: { entry: Entry }) {
  const collection = entry.collection as Collection;
  return (
    <header>
      <Link href={`/${collection}`} className="link text-caption text-fg-soft">
        {BACK_LABEL[collection]}
      </Link>

      <h1 className="mt-6 font-display text-title font-semibold tracking-[-0.02em] text-fg">
        {entry.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-fg-soft">
        <time dateTime={entry.date}>{formatDate(entry.date)}</time>
        <span aria-hidden>·</span>
        <span>{entry.metadata.readingTime}분 읽기</span>
        {entry.series && (
          <>
            <span aria-hidden>·</span>
            <Link
              href={`/series/${encodeURIComponent(entry.series.id)}`}
              className="link"
            >
              시리즈: {entry.series.id} ({entry.series.order}편)
            </Link>
          </>
        )}
      </div>

      <p className="mt-6 whitespace-pre-line text-lede text-fg-soft">
        {entry.summary}
      </p>

      <TagChips tags={entry.tags} className="mt-5" />
    </header>
  );
}
