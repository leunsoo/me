import type { MDXComponents } from "mdx/types";
import { DesignSystemCatalog } from "./components/DesignSystemCatalog";

/**
 * 작업실 MDX 글에서 쓸 수 있는 커스텀 태그 등록.
 * h2/p/a/code/ul 같은 표준 마크다운 태그는 globals.css 의 .prose 가 스타일링하므로
 * 여기 등록할 필요 없음 — 여긴 순수 JSX 컴포넌트만.
 */
export const workshopMdxComponents: MDXComponents = {
  DesignSystemCatalog,
};
