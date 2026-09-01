import Container from "./ui/Container";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line py-block">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="text-caption text-fg-soft">
          © {new Date().getFullYear()} leunsoo
        </p>
        <ul className="flex gap-5">
          {SOCIALS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="link text-caption text-fg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
