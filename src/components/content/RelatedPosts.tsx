import { Link } from "@/i18n/navigation";
import type { Entry } from "@/lib/content";

/** 관련 글 — velite prepare 가 (같은 시리즈 / 공유 태그 / 명시적 related) 로 점수화해 상위 3개. */
export function RelatedPosts({ entry }: { entry: Entry }) {
  if (entry.relatedDocs.length === 0) return null;

  return (
    <section
      aria-label="관련 글"
      className="not-prose mt-block border-t border-line pt-block"
    >
      <h2 className="text-label font-medium uppercase text-fg-soft">관련 글</h2>
      <ul className="mt-4 space-y-2">
        {entry.relatedDocs.map((r) => (
          <li key={`${r.collection}/${r.slug}`}>
            <Link
              href={`/${r.collection}/${r.slug}`}
              className="text-body text-fg underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {r.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
