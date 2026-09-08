import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { EntryList } from "@/components/content/EntryList";
import { allTags, entriesByTag } from "@/lib/content";
import { routing, type Locale } from "@/i18n/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return allTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `"${tag}" 태그가 붙은 글.`,
  };
}

export default async function TagPage({
  params,
}: PageProps<"/[locale]/tags/[tag]">) {
  const { locale, tag } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const items = entriesByTag(tag, locale as Locale);
  if (items.length === 0) notFound();

  return (
    <Container className="py-section">
      <Link href="/tags" className="link text-caption text-fg-soft">
        ← 태그
      </Link>
      <h1 className="mt-6 font-display text-title font-semibold tracking-[-0.02em] text-fg">
        #{tag}
      </h1>
      <p className="mt-4 text-lede text-fg-soft">
        {items.length}개의 글
      </p>

      <EntryList items={items} />
    </Container>
  );
}
