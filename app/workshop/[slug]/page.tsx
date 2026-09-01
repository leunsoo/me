import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "../../components/ui/Container";
import { formatDate } from "../../lib/date";
import { getEntry, WORKSHOP_ENTRIES } from "../entries";
import DesignSystem from "../_content/design-system";

// slug → 본문 컴포넌트. 항목 추가 시 여기에 한 줄.
const CONTENT: Record<string, ComponentType> = {
  "design-system": DesignSystem,
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WORKSHOP_ENTRIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.summary };
}

export default async function WorkshopEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntry(slug);
  const Content = CONTENT[slug];
  if (!entry || !Content) notFound();

  return (
    <Container className="py-section">
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
      <p className="mt-6 max-w-measure text-lede text-fg-soft">{entry.summary}</p>

      <div className="mt-block">
        <Content />
      </div>
    </Container>
  );
}
