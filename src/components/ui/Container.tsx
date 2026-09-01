import type { ReactNode } from "react";

/** 페이지 최대 폭 + 좌우 거터. 모든 섹션이 이걸로 정렬을 맞춘다. */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-page px-gutter ${className}`}>
      {children}
    </div>
  );
}
