import Typewriter from "./Typewriter";

export default function Hero() {
  return (
    <main className="relative flex flex-grow items-center justify-center overflow-hidden px-gutter py-stack-xl">
      {/* Decorative background */}
      <div className="blob-bg -left-24 top-12 h-80 w-80 bg-soft-mint" aria-hidden="true" />
      <div
        className="blob-bg -right-16 bottom-8 h-96 w-96 bg-lavender-mist"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-page">
        {/* Typographic hero */}
        <div className="mb-stack-md">
          <h1
            className="font-display text-headline-lg-mobile font-extrabold text-ink-charcoal md:text-display"
            aria-label="leunsoo, frontend developer"
          >
            <span aria-hidden="true" className="mb-2 block text-headline-lg-mobile font-bold opacity-70">
              &lt;leunsoo&gt;
            </span>
            <span aria-hidden="true" className="typing-container ml-4 md:ml-8">
              <Typewriter />
            </span>
            <span aria-hidden="true" className="mt-2 block text-headline-lg-mobile font-bold opacity-70">
              &lt;/leunsoo&gt;
            </span>
          </h1>
        </div>

        {/* Intro */}
        <p className="mb-stack-md max-w-2xl text-body-lg leading-relaxed text-ink-charcoal/80">
          감각적인 웹 경험을 설계하고 구현하는 프론트엔드 개발자입니다. 복잡한
          문제를 단순하고 우아한 코드로 풀어내는 과정을 즐깁니다.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#lab"
            className="inline-flex items-center justify-center rounded-full bg-ink-charcoal px-8 py-4 font-display text-headline-md font-semibold text-white transition-transform duration-200 hover:-translate-y-1"
          >
            실험실 탐색
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-charcoal px-8 py-4 font-display text-headline-md font-semibold text-ink-charcoal transition-colors duration-200 hover:bg-surface-variant"
          >
            <CodeIcon />
            GitHub 보기
          </a>
        </div>
      </div>
    </main>
  );
}

function CodeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}
