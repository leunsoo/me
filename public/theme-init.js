// 첫 페인트 전 실행 — 저장된 테마를 <html data-theme> 로 복원해 깜빡임 방지.
// layout.tsx 에서 동기 <script src> 로 로드(파싱 차단). 외부 파일이라
// 클라이언트 리렌더(로케일 전환 등) 때 React 가 인라인 <script> 를 재조정하지 않음.
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t === "dark" || t === "light") {
      document.documentElement.dataset.theme = t;
    }
  } catch {}
})();
