import { defineCollection, defineConfig, s } from "velite";
import rehypeSlug from "rehype-slug";

/* ------------------------------------------------------------------ *
 * 로케일 — src/i18n/routing.ts 와 일치해야 함 (config 는 그쪽을 import 할 수 없어 재선언).
 * ------------------------------------------------------------------ */
const LOCALES = ["ko", "en"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "ko";

/** "workshop/design-system.ko" → { slug: "design-system", locale: "ko" } */
function parseStem(flatPath: string): { slug: string; locale: Locale } {
  const stem = flatPath.split("/").pop() ?? flatPath;
  const m = stem.match(/^(.+)\.([a-z]{2})$/);
  const locale =
    m && (LOCALES as readonly string[]).includes(m[2])
      ? (m[2] as Locale)
      : DEFAULT_LOCALE;
  return { slug: m ? m[1] : stem, locale };
}

/* ------------------------------------------------------------------ *
 * 컬렉션 — workshop / blog 은 스키마가 같다.
 * ------------------------------------------------------------------ */
function docSchema(collection: "workshop" | "blog") {
  return s
    .object({
      title: s.string().max(120),
      summary: s.string().max(300).optional(),
      date: s.isodate(),
      draft: s.boolean().default(false),
      // ---- 계산 필드 ----
      path: s.path(),
      body: s.mdx(),
      excerpt: s.excerpt({ length: 200 }),
      metadata: s.metadata(),
      toc: s.toc(),
    })
    .transform((data) => {
      const { slug, locale } = parseStem(data.path);
      return {
        ...data,
        collection,
        slug,
        locale,
        summary: data.summary ?? data.excerpt,
        url: `/${locale}/${collection}/${slug}`,
      };
    });
}

const workshop = defineCollection({
  name: "Workshop",
  pattern: "workshop/**/*.mdx",
  schema: docSchema("workshop"),
});

const blog = defineCollection({
  name: "Blog",
  pattern: "blog/**/*.mdx",
  schema: docSchema("blog"),
});

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { workshop, blog },
  mdx: { rehypePlugins: [rehypeSlug] },
  // 프로덕션 빌드에서는 draft 글을 아예 생성물에서 뺀다 (dev 는 그대로 두고 앱 레이어가 거른다).
  prepare: ({ workshop, blog }) => {
    if (process.env.NODE_ENV !== "production") return;
    for (const arr of [workshop, blog]) {
      const kept = arr.filter((d) => !d.draft);
      arr.length = 0;
      arr.push(...kept);
    }
  },
});
