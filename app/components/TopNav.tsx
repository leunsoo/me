import Link from "next/link";

const NAV_LINKS = [
  { label: "실험실", href: "#lab" },
  { label: "블로그", href: "#blog" },
  { label: "소개", href: "#about", active: true },
];

export default function TopNav() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-surface-container-lowest/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-page items-center justify-between px-gutter py-4">
        <Link
          href="/"
          className="font-display text-headline-md font-bold text-ink-charcoal"
        >
          LEUNSOO
        </Link>

        <div className="hidden gap-8 md:flex">
          {NAV_LINKS.map(({ label, href, active }) => (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "border-b-2 border-ink-charcoal pb-1 text-body-md text-ink-charcoal"
                  : "text-body-md text-ink-charcoal/70 transition-colors duration-200 hover:text-ink-charcoal"
              }
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="rounded-full px-4 py-2 text-body-md text-ink-charcoal transition-colors duration-200 hover:bg-surface-variant"
        >
          채팅하기
        </button>
      </div>
    </nav>
  );
}
