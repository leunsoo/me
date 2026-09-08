import { Link } from "@/i18n/navigation";
import type { Entry } from "@/lib/content";

/** 이 글을 가리키는 다른 글들 — velite prepare 가 명시적 related + 본문 [[wikilink]] 를 역방향 집계. */
export function Backlinks({ entry }: { entry: Entry }) {
  if (entry.backlinks.length === 0) return null;

  return (
    <section
      aria-label="이 글을 참고한 글"
      className="not-prose mt-block border-t border-line pt-block"
    >
      <h2 className="text-label font-medium uppercase text-fg-soft">
        이 글을 참고한 글
      </h2>
      <ul className="mt-4 space-y-2">
        {entry.backlinks.map((r) => (
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
