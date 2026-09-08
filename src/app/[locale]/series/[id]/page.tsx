import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/date";
import { allSeriesIds, seriesParts } from "@/lib/content";
import { routing, type Locale } from "@/i18n/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return allSeriesIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/series/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: `시리즈: ${id}`, description: `"${id}" 시리즈의 글 모음.` };
}

export default async function SeriesPage({
  params,
}: PageProps<"/[locale]/series/[id]">) {
  const { locale, id } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const parts = seriesParts(id, locale as Locale);
  if (parts.length === 0) notFound();

  return (
    <Container className="py-section">
      <p className="text-label font-medium uppercase text-fg-soft">시리즈</p>
      <h1 className="mt-2 font-display text-title font-semibold tracking-[-0.02em] text-fg">
        {id}
      </h1>
      <p className="mt-4 text-lede text-fg-soft">{parts.length}편</p>

      <ol className="mt-block border-t border-line">
        {parts.map(({ entry }, i) => (
          <li
            key={`${entry.collection}/${entry.slug}`}
            className="border-b border-line"
          >
            <Link
              href={`/${entry.collection}/${entry.slug}`}
              className="group flex items-baseline gap-4 py-6"
            >
              <span className="shrink-0 font-mono text-caption text-fg-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="block text-heading font-semibold text-fg underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent">
                  {entry.title}
                </span>
                <span className="mt-1 block text-body text-fg-soft">
                  {entry.summary}
                </span>
              </span>
              <time
                dateTime={entry.date}
                className="shrink-0 text-caption text-fg-soft"
              >
                {formatDate(entry.date)}
              </time>
            </Link>
          </li>
        ))}
      </ol>
    </Container>
  );
}
