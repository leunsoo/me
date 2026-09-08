import { defineCollection, defineConfig, s } from "velite";
import rehypeSlug from "rehype-slug";

/* ------------------------------------------------------------------ *
 * 로케일 — src/i18n/routing.ts 와 일치해야 함 (config 는 그쪽을 import 할 수 없어 재선언).
 * ------------------------------------------------------------------ */
const LOCALES = ["ko", "en"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "ko";

type Ref = { slug: string; title: string; collection: string; locale: Locale };

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

/** `[[slug]]` · `[[slug#hash]]` · `[[slug|label]]` · `[[collection/slug]]` 매치 */
const WIKILINK = /\[\[([^\]|#]+?)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g;

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
      tags: s.array(s.string()).default([]),
      series: s.object({ id: s.string(), order: s.number() }).optional(),
      /** 명시적 관련 글 (slug 또는 collection/slug) */
      related: s.array(s.string()).default([]),
      // ---- 계산 필드 ----
      path: s.path(),
      raw: s.raw(),
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
        // prepare() 에서 채움 — 타입 안정성 위해 여기서 선언
        prev: null as Ref | null,
        next: null as Ref | null,
        relatedDocs: [] as Ref[],
        backlinks: [] as Ref[],
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
  mdx: {
    remarkPlugins: [remarkWikiLink],
    rehypePlugins: [rehypeSlug],
  },
  prepare: (collections) => {
    const { workshop, blog } = collections as {
      workshop: DocLike[];
      blog: DocLike[];
    };
    const isProd = process.env.NODE_ENV === "production";

    for (const arr of [workshop, blog]) {
      if (isProd) {
        const kept = arr.filter((d) => !d.draft);
        arr.length = 0;
        arr.push(...kept);
      }
    }

    const all: DocLike[] = [...workshop, ...blog];
    const ref = (d: DocLike): Ref => ({
      slug: d.slug,
      title: d.title,
      collection: d.collection,
      locale: d.locale,
    });
    const key = (collection: string, locale: string, slug: string) =>
      `${collection}:${locale}:${slug}`;
    const byKey = new Map(all.map((d) => [key(d.collection, d.locale, d.slug), d]));

    // prev / next — (collection, locale) 안에서 날짜 내림차순
    const groups = new Map<string, DocLike[]>();
    for (const d of all) {
      const k = `${d.collection}:${d.locale}`;
      const g = groups.get(k);
      if (g) g.push(d);
      else groups.set(k, [d]);
    }
    for (const g of groups.values()) {
      g.sort((a, b) => b.date.localeCompare(a.date));
      g.forEach((d, i) => {
        d.next = i > 0 ? ref(g[i - 1]) : null; // 더 최신
        d.prev = i < g.length - 1 ? ref(g[i + 1]) : null; // 더 과거
      });
    }

    // related — 같은 (collection, locale). 같은 시리즈 +3, 공유 태그당 +2, 명시적 related +10. 상위 3
    for (const d of all) {
      const scored = all
        .filter(
          (o) =>
            o !== d && o.collection === d.collection && o.locale === d.locale,
        )
        .map((o) => {
          let score = 0;
          if (d.series && o.series && d.series.id === o.series.id) score += 3;
          score += o.tags.filter((t) => d.tags.includes(t)).length * 2;
          if (d.related.includes(o.slug)) score += 10;
          return { o, score };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
      d.relatedDocs = scored.map((x) => ref(x.o));
    }

    // backlinks — 명시적 related + 본문 [[wikilink]] 를 역방향으로
    const resolve = (from: DocLike, target: string): DocLike | undefined => {
      const parts = target.split("/");
      const col = parts.length > 1 ? parts[0] : from.collection;
      const slug = parts.length > 1 ? parts.slice(1).join("/") : target;
      return byKey.get(key(col, from.locale, slug));
    };
    for (const d of all) {
      const outbound = new Set<string>(d.related);
      for (const m of d.raw.matchAll(WIKILINK)) outbound.add(m[1].trim());
      for (const target of outbound) {
        const hit = resolve(d, target);
        if (hit && hit !== d) hit.backlinks.push(ref(d));
      }
    }
  },
});

/* ------------------------------------------------------------------ *
 * `[[wikilink]]` → 링크 노드로 치환하는 미니 remark 플러그인.
 * unist-util-visit 의존 없이 직접 순회 (config 에서 해당 패키지 해석이 불안정).
 * ------------------------------------------------------------------ */
type MdNode = {
  type: string;
  value?: string;
  url?: string;
  children?: MdNode[];
};

function remarkWikiLink() {
  return (tree: MdNode, file: { path?: string }) => {
    const segs = String(file.path ?? "").split(/[/\\]/);
    const fileName = segs.pop() ?? "";
    const collection = segs.pop() ?? "workshop";
    const locale =
      fileName.match(/\.([a-z]{2})\.mdx$/)?.[1] ?? DEFAULT_LOCALE;

    const walk = (node: MdNode) => {
      if (!node.children) return;
      const next: MdNode[] = [];
      for (const child of node.children) {
        if (child.type !== "text" || !child.value || !child.value.includes("[[")) {
          walk(child);
          next.push(child);
          continue;
        }
        const value = child.value;
        WIKILINK.lastIndex = 0;
        let last = 0;
        let m: RegExpExecArray | null;
        let matched = false;
        while ((m = WIKILINK.exec(value))) {
          matched = true;
          if (m.index > last)
            next.push({ type: "text", value: value.slice(last, m.index) });
          const [full, targetRaw, hash, label] = m;
          const parts = targetRaw.split("/");
          const col = parts.length > 1 ? parts[0] : collection;
          const slug = parts.length > 1 ? parts.slice(1).join("/") : targetRaw;
          next.push({
            type: "link",
            url: `/${locale}/${col}/${slug}${hash ? `#${hash}` : ""}`,
            children: [{ type: "text", value: label ?? slug }],
          });
          last = m.index + full.length;
        }
        if (!matched) {
          next.push(child);
          continue;
        }
        if (last < value.length)
          next.push({ type: "text", value: value.slice(last) });
      }
      node.children = next;
    };

    walk(tree);
  };
}

// prepare() 콜백 인자 타입 — 스키마 출력의 최소 형태
type DocLike = {
  slug: string;
  title: string;
  collection: string;
  locale: Locale;
  date: string;
  draft: boolean;
  tags: string[];
  series?: { id: string; order: number };
  related: string[];
  raw: string;
  prev: Ref | null;
  next: Ref | null;
  relatedDocs: Ref[];
  backlinks: Ref[];
};
