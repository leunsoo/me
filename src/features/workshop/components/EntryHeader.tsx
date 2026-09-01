import Link from "next/link";
import { formatDate } from "@/lib/date";
import type { WorkshopEntry } from "../entries";

/** /workshop/[slug] 상단 — 뒤로가기 + 제목 + 날짜 + 요약. */
export function EntryHeader({ entry }: { entry: WorkshopEntry }) {
  return (
    <header>
      <Link href="/workshop" className="link text-caption text-fg-soft">
        ← 작업실
      </Link>

      <h1 className="mt-6 font-display text-title font-semibold tracking-[-0.02em] text-fg">
        {entry.title}
      </h1>
      <time
        dateTime={entry.date}
        className="mt-3 block text-caption text-fg-soft"
      >
        {formatDate(entry.date)}
      </time>
      <p className="mt-6 text-lede text-fg-soft">
        {entry.summary}
      </p>
    </header>
  );
}
