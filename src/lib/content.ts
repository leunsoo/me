import { workshop, blog, type Workshop, type Blog } from "#velite";
import { routing, type Locale } from "@/i18n/routing";

/* ------------------------------------------------------------------ *
 * Velite 가 생성한 콘텐츠 데이터(#velite) 위의 얇은 조회 레이어.
 * - 로케일 폴백: 요청 로케일 글이 없으면 기본 로케일(ko) 글로 대체
 * - draft 제외
 * ------------------------------------------------------------------ */

export type Collection = "workshop" | "blog";
export type Entry = Workshop | Blog;

/** getEntry 결과 — 폴백 여부와 요청 로케일을 함께 실어 보낸다. */
export type ResolvedEntry = {
  entry: Entry;
  /** 요청 로케일 글이 없어 기본 로케일로 대체됐는가 */
  isFallback: boolean;
  /** 사용자가 실제로 요청한 로케일 */
  requestedLocale: Locale;
};

const COLLECTIONS: Record<Collection, Entry[]> = {
  workshop: workshop as Entry[],
  blog: blog as Entry[],
};

const isPublished = (e: Entry) => !e.draft;

function pool(collection: Collection): Entry[] {
  return COLLECTIONS[collection].filter(isPublished);
}

/** 컬렉션 안 모든 (로케일 무관) 고유 slug */
export function allSlugs(collection: Collection): string[] {
  return [...new Set(pool(collection).map((e) => e.slug))];
}

function find(
  collection: Collection,
  slug: string,
  locale: string,
): Entry | undefined {
  return pool(collection).find((e) => e.slug === slug && e.locale === locale);
}

/**
 * 한 편의 글을 로케일 폴백과 함께 해석한다.
 *  1. (slug, locale) 그대로
 *  2. 없으면 (slug, 기본 로케일)  → isFallback: true
 *  3. 그것도 없으면 undefined
 */
export function getEntry(
  collection: Collection,
  slug: string,
  locale: Locale,
): ResolvedEntry | undefined {
  const exact = find(collection, slug, locale);
  if (exact) return { entry: exact, isFallback: false, requestedLocale: locale };

  const fallback = find(collection, slug, routing.defaultLocale);
  if (fallback)
    return { entry: fallback, isFallback: true, requestedLocale: locale };

  return undefined;
}

/** 요청 로케일 기준 글 목록 (없는 건 기본 로케일로 채움). 최신순. */
export function listEntries(
  collection: Collection,
  locale: Locale,
): ResolvedEntry[] {
  return allSlugs(collection)
    .map((slug) => getEntry(collection, slug, locale))
    .filter((r): r is ResolvedEntry => r != null)
    .sort((a, b) => b.entry.date.localeCompare(a.entry.date));
}

/** 이 글에 실제로 존재하는 번역 로케일들 (hreflang 용) */
export function availableLocales(
  collection: Collection,
  slug: string,
): Locale[] {
  return routing.locales.filter((l) => find(collection, slug, l) != null);
}
