"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/**
 * 라이트/다크 토글.
 * 진실의 원천은 <html data-theme> (없으면 OS 설정).
 * toggle 은 그 속성만 바꾸고, MutationObserver 가 감지해 리렌더.
 * 첫 페인트 전 적용은 layout.tsx 인라인 스크립트가 담당(깜빡임 방지).
 */

function getSnapshot(): Theme {
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
    observer.disconnect();
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // 프라이빗 모드 등 — 저장 실패는 무시
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      suppressHydrationWarning
      aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="text-label font-medium uppercase text-fg-soft transition-colors hover:text-fg"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
