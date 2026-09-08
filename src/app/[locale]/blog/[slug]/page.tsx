import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { EntryPage, entryMetadata } from "@/components/content/EntryPage";
import { allSlugs, getEntry } from "@/lib/content";
import { routing } from "@/i18n/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return allSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const resolved = getEntry("blog", slug, locale);
  if (!resolved) return {};
  return entryMetadata(resolved, "blog");
}

export default async function BlogEntryPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const resolved = getEntry("blog", slug, locale);
  if (!resolved) notFound();

  return <EntryPage resolved={resolved} />;
}
