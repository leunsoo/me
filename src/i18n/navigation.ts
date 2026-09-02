import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * 로케일을 자동으로 붙여주는 내비게이션 API.
 * next/link · next/navigation 대신 이걸 쓰면 href="/workshop" → /ko/workshop.
 * usePathname 은 반대로 로케일 접두사를 뗀 경로를 돌려줌(활성 링크 판별에 편함).
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
