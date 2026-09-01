import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import ThemeToggle from "../components/ui/ThemeToggle";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

// 이 페이지에 늘어놓은 것이 곧 디자인 시스템의 "계약서".
// 새 토큰·컴포넌트는 여기에 등록해야 유지된다.
// Tailwind 는 소스에서 "리터럴" 클래스 문자열만 스캔하므로
// 아래 클래스들은 절대 문자열 보간(`bg-${x}`)으로 만들지 않는다.

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-block">
      <h2 className="mb-6 text-label font-medium uppercase text-fg-soft">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Swatch({ box, name }: { box: string; name: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`size-12 shrink-0 rounded-md border border-line ${box}`} />
      <div className="min-w-0">
        <p className="truncate text-body text-fg">{name}</p>
        <p className="truncate text-caption text-fg-soft">var(--color-{name})</p>
      </div>
    </div>
  );
}

const COLORS: { box: string; name: string }[] = [
  { box: "bg-bg", name: "bg" },
  { box: "bg-bg-dim", name: "bg-dim" },
  { box: "bg-fg", name: "fg" },
  { box: "bg-fg-soft", name: "fg-soft" },
  { box: "bg-fg-onfill", name: "fg-onfill" },
  { box: "bg-line", name: "line" },
  { box: "bg-fill", name: "fill" },
  { box: "bg-fill-hover", name: "fill-hover" },
  { box: "bg-accent", name: "accent" },
  { box: "bg-accent-soft", name: "accent-soft" },
];

const TYPE: { cls: string; label: string; sample: string }[] = [
  { cls: "text-display", label: "text-display", sample: "Display" },
  { cls: "text-title", label: "text-title", sample: "Title — 섹션 헤더" },
  { cls: "text-heading", label: "text-heading", sample: "Heading — 카드 제목" },
  {
    cls: "text-lede",
    label: "text-lede",
    sample: "Lede — 인트로 문단에 쓰는 조금 큰 본문",
  },
  {
    cls: "text-body",
    label: "text-body",
    sample: "Body — 기본 본문. 읽기 편한 행간.",
  },
  { cls: "text-label", label: "text-label", sample: "LABEL — EYEBROW" },
  { cls: "text-caption", label: "text-caption", sample: "Caption — 잔글씨" },
];

const SPACES: { cls: string; name: string }[] = [
  { cls: "w-[var(--spacing-gutter)]", name: "gutter" },
  { cls: "w-[var(--spacing-block)]", name: "block" },
  { cls: "w-[var(--spacing-section)]", name: "section" },
];

export default function StyleguidePage() {
  return (
    <Container className="py-block">
      <header className="flex items-baseline justify-between border-b border-line pb-6">
        <h1 className="font-display text-title font-semibold tracking-[-0.02em]">
          Styleguide
        </h1>
        <ThemeToggle />
      </header>

      <Section title="Color / 역할 토큰">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {COLORS.map((c) => (
            <Swatch key={c.name} box={c.box} name={c.name} />
          ))}
        </div>
      </Section>

      <Section title="Type / 타입 스케일">
        <div className="space-y-4">
          {TYPE.map(({ cls, label, sample }) => (
            <div
              key={label}
              className="flex flex-col gap-1 border-b border-line pb-4 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <code className="w-32 shrink-0 font-mono text-caption text-fg-soft">
                {label}
              </code>
              <p className={`${cls} font-display text-fg`}>{sample}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Button">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" size="md">
            Primary md
          </Button>
          <Button variant="primary" size="sm">
            Primary sm
          </Button>
          <Button variant="secondary" size="md">
            Secondary md
          </Button>
          <Button variant="secondary" size="sm">
            Secondary sm
          </Button>
          <Button variant="primary" size="md" disabled>
            Disabled
          </Button>
        </div>
      </Section>

      <Section title="Link / 시그니처 규칙">
        <p className="max-w-measure text-body text-fg">
          본문 안의{" "}
          <a href="#" className="link">
            텍스트 링크
          </a>
          는 강조색 밑줄을 두른다. 버튼·아이콘에는 강조색을 쓰지 않는다. 포커스
          링도 같은 강조색.
        </p>
      </Section>

      <Section title="Spacing / 레이아웃 리듬">
        <div className="space-y-3">
          {SPACES.map(({ cls, name }) => (
            <div key={name} className="flex items-center gap-4">
              <code className="w-20 shrink-0 font-mono text-caption text-fg-soft">
                {name}
              </code>
              <div className={`h-4 bg-accent-soft ${cls}`} />
            </div>
          ))}
        </div>
      </Section>
    </Container>
  );
}
