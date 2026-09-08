import type { Entry } from "@/lib/content";

type TocItem = { title: string; url: string; items?: TocItem[] };

function TocNodes({ items }: { items: TocItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            className="block text-caption text-fg-soft transition-colors hover:text-fg"
          >
            {item.title}
          </a>
          {item.items && item.items.length > 0 && (
            <div className="mt-2 border-l border-line pl-3">
              <TocNodes items={item.items} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

/** 목차 — velite s.toc() 결과. 헤딩 id 는 rehype-slug 가 부여. */
export function Toc({ entry }: { entry: Entry }) {
  const items = entry.toc as TocItem[];
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="목차" className="not-prose">
      <p className="text-label font-medium uppercase text-fg-soft">목차</p>
      <div className="mt-4">
        <TocNodes items={items} />
      </div>
    </nav>
  );
}
