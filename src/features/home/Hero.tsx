import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import Typewriter from "./Typewriter";

/**
 * 메인 헤더 — 사용자가 유지하기로 한 블록.
 * <leunsoo> 태그 감싸기 + 타이핑 + 깜빡이는 커서는 여기서만 씀
 * (시스템 나머지에는 코드 느낌 / 커서 모티프를 쓰지 않음).
 */
export default async function Hero() {
  const t = await getTranslations("hero");

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
          <span className="sr-only">{t("srHeading")}</span>
        </h1>

        <div className="mt-block flex flex-col gap-1 text-pretty break-keep text-fg-soft">
          <p className="text-title">{t("headline")}</p>
          <p className="text-lede">{t("tagline")}</p>
          <div className="text-body py-1">
            <p>{t("body1")}</p>
            <p>{t("body2")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
