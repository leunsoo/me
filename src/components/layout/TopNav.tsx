"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { label: "작업실", href: "/workshop" },
  { label: "블로그", href: "/blog" },
  { label: "소개", href: "/about" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-heading font-bold">
          leunsoo
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={
                  "text-body transition-colors " +
                  (active
                    ? // 현재 위치 = 강조색 밑줄 (시그니처)
                      "text-fg underline decoration-accent decoration-2 underline-offset-[6px]"
                    : "text-fg-soft hover:text-fg")
                }
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <ThemeToggle />
      </Container>
    </header>
  );
}
