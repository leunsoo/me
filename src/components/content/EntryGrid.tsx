import { Link } from "@/i18n/navigation";
import type { ResolvedEntry } from "@/lib/content";

/** /workshop 카드 그리드 — 제목만 보여주는 헤어라인 그리드. */
export function EntryGrid({ items }: { items: ResolvedEntry[] }) {
  if (items.length === 0) {
    return (
      <p className="mt-block text-body text-fg-soft">아직 글이 없습니다.</p>
    );
  }

  return (
    <div className="mt-block grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ entry }) => (
        <Link
          key={`${entry.collection}/${entry.slug}`}
          href={`/${entry.collection}/${entry.slug}`}
          className="group flex aspect-4/3 items-center border-r border-b border-line p-6 transition-colors hover:bg-bg-dim"
        >
          <span className="line-clamp-3 font-display text-heading font-semibold text-fg underline decoration-transparent decoration-2 underline-offset-4 transition-[text-underline-offset,text-decoration-color] group-hover:decoration-accent group-hover:underline-offset-[6px]">
            {entry.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
