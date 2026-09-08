import { listEntries, type Collection } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const esc = (s: string) =>
  s.replace(
    /[<>&'"]/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[c]!,
  );

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const loc = routing.locales.includes(locale as (typeof routing.locales)[number])
    ? locale
    : routing.defaultLocale;

  const items = (["workshop", "blog"] as Collection[])
    .flatMap((c) => listEntries(c, loc as (typeof routing.locales)[number]))
    .sort((a, b) => b.entry.date.localeCompare(a.entry.date))
    .slice(0, 50);

  const self = `${SITE_URL}/${loc}/feed.xml`;
  const home = `${SITE_URL}/${loc}`;
  const lastBuild = items[0]?.entry.date ?? new Date().toISOString();

  const body = items
    .map(({ entry }) => {
      const link = `${SITE_URL}/${loc}/${entry.collection}/${entry.slug}`;
      const categories = entry.tags
        .map((t) => `\n      <category>${esc(t)}</category>`)
        .join("");
      return `    <item>
      <title>${esc(entry.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <description>${esc(entry.summary)}</description>${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_NAME)}${loc === "ko" ? "" : " (EN)"}</title>
    <link>${home}</link>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
    <description>${esc("공부한 내용과 만든 것들.")}</description>
    <language>${loc}</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
${body}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
