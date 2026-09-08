import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { EntryList } from "@/components/content/EntryList";
import { listEntries } from "@/lib/content";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "블로그",
  description: "공부한 내용과 개인적인 생각을 정리하는 곳.",
};

export default async function BlogPage({
  params,
}: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <Container className="py-section">
      <h1 className="font-display text-title font-semibold tracking-[-0.02em] text-fg">
        블로그
      </h1>
      <p className="mt-4 text-lede text-fg-soft">
        공부한 내용과 개인적인 생각을 정리하는 곳.
      </p>

      <EntryList items={listEntries("blog", locale)} />
    </Container>
  );
}
