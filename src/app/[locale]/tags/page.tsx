import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { tagCounts } from "@/lib/content";
import { routing, type Locale } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "태그",
  description: "주제별로 모아 보는 글.",
};

export default async function TagsIndexPage({
  params,
}: PageProps<"/[locale]/tags">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const tags = tagCounts(locale as Locale);

  return (
    <Container className="py-section">
      <h1 className="font-display text-title font-semibold tracking-[-0.02em] text-fg">
        태그
      </h1>
      <p className="mt-4 text-lede text-fg-soft">주제별로 모아 보는 글.</p>

      {tags.length === 0 ? (
        <p className="mt-block text-body text-fg-soft">아직 태그가 없습니다.</p>
      ) : (
        <ul className="mt-block flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <Link
                href={`/tags/${encodeURIComponent(tag)}`}
                className="inline-flex items-baseline gap-2 rounded-full border border-line px-3 py-1 text-body text-fg-soft transition-colors hover:border-fg-soft hover:text-fg"
              >
                {tag}
                <span className="text-caption text-fg-soft">{count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
