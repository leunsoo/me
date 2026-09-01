import type { ComponentType } from "react";
import DesignSystem from "@/content/workshop/design-system";

/** slug → 본문 컴포넌트. 새 작업실 항목 추가 시 entries.ts 와 함께 여기에 한 줄. */
export const WORKSHOP_CONTENT: Record<string, ComponentType> = {
  "design-system": DesignSystem,
};
