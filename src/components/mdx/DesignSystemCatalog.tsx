import type { ReactNode } from "react";
import Button from "@/components/ui/Button";

// "디자인 시스템" MDX 본문 안에 <DesignSystemCatalog /> 로 임베드되는 살아있는 레퍼런스.
// .not-prose 로 감싸서 globals.css 의 .prose 스타일(폭 제한·폰트 등)이 안 새어들게 함.
// Tailwind 는 리터럴 클래스 문자열만 스캔하므로 아래 클래스는 절대 보간하지 않는다.

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

export function DesignSystemCatalog() {
  return (
    <div className="not-prose">
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
        <p id="link" className="text-body text-fg">
          본문 안의{" "}
          <a href="#link" className="link">
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
    </div>
  );
}
