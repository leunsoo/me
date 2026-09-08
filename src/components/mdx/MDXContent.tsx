import * as runtime from "react/jsx-runtime";
import type { ComponentType } from "react";
import { DesignSystemCatalog } from "./DesignSystemCatalog";

/* ------------------------------------------------------------------ *
 * Velite `s.mdx()` 는 MDX 를 "함수 본문 문자열" 로 컴파일한다.
 * new Function(code) 에 react/jsx-runtime 을 넘겨 컴포넌트로 되살린다.
 * 서버 컴포넌트에서 그대로 호출 (훅 없음, 상태 없음 → 매 렌더 재생성 무해).
 * ------------------------------------------------------------------ */

/** MDX 본문에서 태그로 바로 쓸 수 있는 컴포넌트. 표준 태그는 globals.css 의 .prose 가 담당. */
const sharedComponents: Record<string, ComponentType<unknown>> = {
  DesignSystemCatalog,
};

/** 같은 code 문자열이면 같은 컴포넌트 참조를 돌려줘 불필요한 재조정을 막는다. */
const cache = new Map<string, MdxComponent>();

type MdxComponent = ComponentType<{
  components?: Record<string, ComponentType<unknown>>;
}>;

function getMDXComponent(code: string): MdxComponent {
  const hit = cache.get(code);
  if (hit) return hit;
  const fn = new Function(code);
  const Component = fn({ ...runtime }).default as MdxComponent;
  cache.set(code, Component);
  return Component;
}

export function MDXContent({
  code,
  components,
}: {
  code: string;
  components?: Record<string, ComponentType<unknown>>;
}) {
  const Component = getMDXComponent(code);
  // eslint-disable-next-line react-hooks/static-components -- MDX 본문은 상태가 없는 서버 렌더 결과물이고, code 별로 캐시돼 참조가 안정적이다.
  return <Component components={{ ...sharedComponents, ...components }} />;
}
