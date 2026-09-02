import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Container from "@/components/ui/Container";
import { readMdxDocument } from "@/lib/mdx";
import {
  EntryHeader,
  getAllWorkshopEntries,
  workshopMdxComponents,
  type WorkshopFrontmatter,
} from "@/features/workshop";

export function generateStaticParams() {
  return getAllWorkshopEntries().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/workshop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = readMdxDocument<WorkshopFrontmatter>("workshop", slug);
  if (!doc) return {};
  return { title: doc.frontmatter.title, description: doc.frontmatter.summary };
}

export default async function WorkshopEntryPage({
  params,
}: PageProps<"/[locale]/workshop/[slug]">) {
  const { slug } = await params;
  const doc = readMdxDocument<WorkshopFrontmatter>("workshop", slug);
  if (!doc) notFound();

  return (
    <Container className="py-section">
      <EntryHeader entry={{ slug: doc.slug, ...doc.frontmatter }} />
      <div className="prose mt-block">
        <MDXRemote
          source={doc.content}
          components={workshopMdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </Container>
  );
}
