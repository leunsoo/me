import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/ui/Container";
import { formatDate } from "../lib/date";
import { sortedEntries } from "./entries";

export const metadata: Metadata = {
  title: "작업실",
  description: "재미로 구현한 기능들 — 만든 것 하나하나와 그 설명.",
};

export default function WorkshopPage() {
  const entries = sortedEntries();

  return (
    <Container className="py-section">
      <h1 className="font-display text-title font-semibold tracking-[-0.02em] text-fg">
        작업실
      </h1>
      <p className="mt-4 max-w-measure text-lede text-fg-soft">
        재미로 구현한 기능들. 하나씩, 만든 것과 그 설명.
      </p>

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
    </Container>
  );
}
