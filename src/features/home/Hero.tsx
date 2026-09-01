import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
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
          <span aria-hidden className="block text-title font-medium text-fg-soft">
            &lt;leunsoo&gt;
          </span>
          <span aria-hidden className="my-1 block font-bold">
            <Typewriter />
          </span>
          <span aria-hidden className="block text-title font-medium text-fg-soft">
            &lt;/leunsoo&gt;
          </span>
          <span className="sr-only">leunsoo — 프론트엔드 개발자</span>
        </h1>

        <p className="mt-block max-w-measure text-lede text-fg-soft">
          감각적인 웹 경험을 설계하고 구현하는 프론트엔드 개발자입니다. 복잡한
          문제를 단순하고 우아한 코드로 풀어내는 과정을 즐깁니다.
        </p>

        <div className="mt-block flex flex-col gap-3 sm:flex-row">
          <Button href="/workshop" variant="primary">
            작업실 보기
          </Button>
          <Button
            href="https://github.com"
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub 보기
          </Button>
        </div>
      </Container>
    </section>
  );
}
