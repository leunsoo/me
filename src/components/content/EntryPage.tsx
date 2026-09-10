import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { MDXContent } from "@/components/mdx/MDXContent";
import {
  availableLocales,
  type Collection,
  type ResolvedEntry,
} from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { EntryHeader } from "./EntryHeader";
import { Toc } from "./Toc";
import { FallbackNotice } from "./FallbackNotice";

/** 작업실/블로그 글 상세 — 공통 레이아웃. */
export function EntryPage({ resolved }: { resolved: ResolvedEntry }) {
  const { entry, isFallback, requestedLocale } = resolved;

  return (
    <Container className="py-section">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
        <article className="min-w-0">
          {isFallback && <FallbackNotice requestedLocale={requestedLocale} />}
          <EntryHeader entry={entry} />
          <div className="prose mt-block">
            <MDXContent code={entry.body} />
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Toc entry={entry} />
          </div>
        </aside>
      </div>
    </Container>
  );
}

/** 글 상세 페이지 메타데이터 — 폴백 페이지는 noindex, hreflang 은 실제 번역만. */
export function entryMetadata(
  resolved: ResolvedEntry,
  collection: Collection,
): Metadata {
  const { entry, isFallback } = resolved;

  const languages = Object.fromEntries(
    availableLocales(collection, entry.slug).map((l) => [
      l,
      `/${l}/${collection}/${entry.slug}`,
    ]),
  ) as Record<Locale, string>;

  return {
    title: entry.title,
    description: entry.summary,
    alternates: {
      // 폴백 페이지의 canonical 은 실제 원문 로케일을 가리킨다.
      canonical: `/${entry.locale}/${collection}/${entry.slug}`,
      languages,
    },
    robots: isFallback ? { index: false, follow: true } : undefined,
  };
}
