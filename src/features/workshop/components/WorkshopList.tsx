import Link from "next/link";
import { formatDate } from "@/lib/date";
import { sortedEntries } from "../entries";

/** /workshop 리스트 — 항목 전체를 최신순으로. */
export function WorkshopList() {
  const entries = sortedEntries();

  return (
    <ul className="mt-block border-t border-line">
      {entries.map((entry) => (
        <li key={entry.slug} className="border-b border-line">
          <Link
            href={`/workshop/${entry.slug}`}
            className="group flex flex-col gap-1 py-6"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-heading font-semibold text-fg underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent">
                {entry.title}
              </span>
              <time
                dateTime={entry.date}
                className="shrink-0 text-caption text-fg-soft"
              >
                {formatDate(entry.date)}
              </time>
            </div>
            <span className="text-body text-fg-soft">{entry.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
