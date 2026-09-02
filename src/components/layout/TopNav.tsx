"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";

// href 는 로케일 접두사 없는 경로. @/i18n/navigation 의 Link 가 자동으로 /ko·/en 을 붙인다.
const NAV_LINKS = [
  { key: "workshop", href: "/workshop" },
  { key: "blog", href: "/blog" },
  { key: "about", href: "/about" },
] as const;

export default function TopNav() {
  // usePathname 은 로케일 접두사를 뗀 경로("/workshop")를 돌려줘 활성 판별이 그대로 된다.
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-heading font-bold">
          leunsoo
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map(({ key, href }) => {
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
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
