import Container from "@/components/ui/Container";
import Typewriter from "./Typewriter";

/**
 * 메인 헤더 — 사용자가 유지하기로 한 블록.
 * <leunsoo> 태그 감싸기 + 타이핑 + 깜빡이는 커서는 여기서만 씀
 * (시스템 나머지에는 코드 느낌 / 커서 모티프를 쓰지 않음).
 */
export default function Hero() {
  return (
    <section className="py-section">
      <Container>
        <h1 className="font-display text-display tracking-[-0.03em] text-fg">
          <span
            aria-hidden
            className="block text-title font-medium text-fg-soft"
          >
            &lt;leunsoo&gt;
          </span>
          {/* 태그 안 콘텐츠 */}
          <span aria-hidden className="my-1 block pl-8 font-bold sm:pl-12">
            <Typewriter />
          </span>
          <span
            aria-hidden
            className="block text-title font-medium text-fg-soft"
          >
            &lt;/leunsoo&gt;
          </span>
          {/* 스크린 리더용 실제 제목 — 위 span 들은 aria-hidden */}
          <span className="sr-only">이은수 — 프론트엔드 개발자</span>
        </h1>

        <div className="mt-block text-pretty break-keep text-fg-soft flex flex-col gap-1">
          <p className="text-title">코드 강박</p>
          <p className="text-lede">최고를 추구하며 최선을 탐색합니다.</p>
          <div className="text-body py-1">
            <p>
              특정 직무에 종속되지 않고, 끝없는 사고와 문제 해결과 같이
              개발이라는 행위 자체를 즐깁니다.
            </p>
            <p>
              현재 주 역량은 프론트엔드 개발이며, 사용자에게 시각적 즐거움을
              선사하는 것과 컴포넌트 설계에 재미를 느끼고 있습니다.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
