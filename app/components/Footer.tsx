const SOCIAL_LINKS = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-surface-variant">
      <div className="mx-auto flex w-full max-w-page flex-col items-center justify-between gap-4 px-gutter py-stack-md md:flex-row md:gap-0">
        <div className="font-display text-headline-md font-semibold text-ink-charcoal">
          LEUNSOO
        </div>
        <div className="text-body-md text-ink-charcoal/70">
          © {new Date().getFullYear()} LEUNSOO. Built with joy.
        </div>
        <div className="flex gap-4 font-mono text-label-mono font-medium text-ink-charcoal/70">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-ink-charcoal"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
