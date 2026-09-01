import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import {
  EntryHeader,
  getEntry,
  WORKSHOP_CONTENT,
  WORKSHOP_ENTRIES,
} from "@/features/workshop";

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
  const Content = WORKSHOP_CONTENT[slug];
  if (!entry || !Content) notFound();

  return (
    <Container className="py-section">
      <EntryHeader entry={entry} />
      <div className="mt-block">
        <Content />
      </div>
    </Container>
  );
}
