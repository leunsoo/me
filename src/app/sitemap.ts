import type { MetadataRoute } from "next";
import {
  allSeriesIds,
  allSlugs,
  allTags,
  availableLocales,
  getEntry,
  type Collection,
} from "@/lib/content";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

const abs = (locale: string, path = "") => `${SITE_URL}/${locale}${path}`;

/** ko/en 둘 다 존재하는 경로 → 로케일 대체 링크 묶음 */
function bothLocales(path: string) {
  return Object.fromEntries(
    routing.locales.map((l) => [l, abs(l, path)]),
  ) as Record<string, string>;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/workshop", "/blog", "/tags", "/about"];
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: abs(routing.defaultLocale, path),
    alternates: { languages: bothLocales(path) },
  }));

  const contentEntries: MetadataRoute.Sitemap = (
    ["workshop", "blog"] as Collection[]
  ).flatMap((collection) =>
    allSlugs(collection).map((slug) => {
      const locales = availableLocales(collection, slug);
      const canonical = locales[0] ?? routing.defaultLocale;
      const path = `/${collection}/${slug}`;
      const ref = getEntry(collection, slug, canonical);
      return {
        url: abs(canonical, path),
        lastModified: ref ? new Date(ref.entry.date) : undefined,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, abs(l, path)]),
          ) as Record<string, string>,
        },
      };
    }),
  );

  const taxonomyEntries: MetadataRoute.Sitemap = [
    ...allTags().map((tag) => `/tags/${encodeURIComponent(tag)}`),
    ...allSeriesIds().map((id) => `/series/${encodeURIComponent(id)}`),
  ].map((path) => ({
    url: abs(routing.defaultLocale, path),
    alternates: { languages: bothLocales(path) },
  }));

  return [...staticEntries, ...contentEntries, ...taxonomyEntries];
}
