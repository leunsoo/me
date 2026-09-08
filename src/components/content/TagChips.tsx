import { Link } from "@/i18n/navigation";

/** 태그 목록 → /tags/<tag> 로 가는 작은 칩들. */
export function TagChips({
  tags,
  className = "",
}: {
  tags: string[];
  className?: string;
}) {
  if (tags.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/tags/${encodeURIComponent(tag)}`}
            className="inline-block rounded-full border border-line px-2.5 py-0.5 text-caption text-fg-soft transition-colors hover:border-fg-soft hover:text-fg"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
