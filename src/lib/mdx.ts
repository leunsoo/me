import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "src/content");

export type MdxDocument<Frontmatter> = {
  slug: string;
  frontmatter: Frontmatter;
  /** 컴파일 전 원본 MDX 본문 — <MDXRemote source={content} /> 에 그대로 넘긴다 */
  content: string;
};

/**
 * src/content/<collection>/*.mdx 를 전부 읽어 프론트매터 + 본문으로 반환.
 * 파일명(확장자 제외)이 곧 slug. Node fs 라 서버(빌드 타임 포함)에서만 호출할 것 —
 * 클라이언트 컴포넌트에서 import 하면 안 됨.
 */
export function readMdxCollection<Frontmatter>(
  collection: string,
): MdxDocument<Frontmatter>[] {
  const dir = path.join(CONTENT_ROOT, collection);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      frontmatter: data as Frontmatter,
      content,
    };
  });
}

export function readMdxDocument<Frontmatter>(
  collection: string,
  slug: string,
): MdxDocument<Frontmatter> | undefined {
  return readMdxCollection<Frontmatter>(collection).find(
    (doc) => doc.slug === slug,
  );
}
