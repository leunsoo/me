import type { ReactNode } from "react";
import Button from "@/components/ui/Button";

// "디자인 시스템" 작업실 항목의 본문.
// 설명(.prose) + 살아있는 레퍼런스(색·타입·버튼·링크·간격).
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

export default function DesignSystem() {
  return (
    <>
      <div className="prose">
        <p>
          이 사이트의 색·타이포·간격은 컴포넌트에 값을 직접 박지 않고{" "}
          <strong>토큰</strong>으로 관리한다. 값 하나가 한 곳에만 존재하고,
          컴포넌트는 <strong>배경</strong>·<strong>강조</strong> 같은 역할만
          참조한다. 연결표만 바꾸면 전체가 따라온다.
        </p>

        <h2>3계층</h2>
        <ul>
          <li>
            <strong>원시 (primitive)</strong> — 의미 없는 원시 값. <code>--gray-950</code>,{" "}
            <code>--blue-500</code>. 거의 안 바뀐다.
          </li>
          <li>
            <strong>의미 (semantic)</strong> — 역할. <code>--color-bg</code>,{" "}
            <code>--color-accent</code>. primitive 를 참조하고, 라이트/다크가 여기서 갈린다.
          </li>
          <li>
            <strong>@theme</strong> — 의미 토큰을 Tailwind 유틸(<code>bg-bg</code>,{" "}
            <code>text-fg</code>)로 노출한다.
          </li>
        </ul>

        <h2>다크모드</h2>
        <p>
          <code>semantic.css</code> 에서{" "}
          <code>--color-bg: light-dark(var(--gray-50), var(--gray-950))</code> 한 줄.{" "}
          <code>color-scheme</code> 기준으로 자동 전환되고, <code>{"<html data-theme>"}</code>{" "}
          로 강제할 수 있다.
        </p>

        <h2>시그니처 규칙</h2>
        <p>
          강조색(파랑)은 오직 밑줄로만 쓴다 — 본문{" "}
          <a href="#link">링크</a>, 현재 메뉴, 포커스 링. 버튼 채우기나 아이콘엔 쓰지 않는다.
        </p>

        <p>아래는 살아있는 레퍼런스다.</p>
      </div>

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
        <p id="link" className="max-w-measure text-body text-fg">
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
    </>
  );
}
