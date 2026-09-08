import { Link } from "@/i18n/navigation";
import type { Entry } from "@/lib/content";

/** 글 하단 이전/다음(더 과거 / 더 최신) 네비게이션. 같은 컬렉션·로케일 기준. */
export function EntryNav({ entry }: { entry: Entry }) {
  const { prev, next } = entry;
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="이전 다음 글"
      className="not-prose mt-block grid grid-cols-2 gap-4 border-t border-line pt-block"
    >
      <div>
        {prev && (
          <Link
            href={`/${prev.collection}/${prev.slug}`}
            className="group block"
          >
            <span className="text-caption text-fg-soft">이전 글</span>
            <span className="mt-1 block text-body text-fg underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent">
              {prev.title}
            </span>
          </Link>
        )}
      </div>
      <div className="text-right">
        {next && (
          <Link
            href={`/${next.collection}/${next.slug}`}
            className="group block"
          >
            <span className="text-caption text-fg-soft">다음 글</span>
            <span className="mt-1 block text-body text-fg underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
