import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { EntryGrid } from "@/components/content/EntryGrid";
import { listEntries } from "@/lib/content";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "작업실",
  description: "재미로 구현한 기능들 — 만든 것 하나하나와 그 설명.",
};

export default async function WorkshopPage({
  params,
}: PageProps<"/[locale]/workshop">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <Container className="py-section">
      <h1 className="font-display text-title font-semibold tracking-[-0.02em] text-fg">
        작업실
      </h1>
      <p className="mt-4 text-lede text-fg-soft">
        재미로 구현한 기능들. 하나씩, 만든 것과 그 설명.
      </p>

      <EntryGrid items={listEntries("workshop", locale)} />
    </Container>
  );
}
