import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "소개",
  description: "감각적인 웹 경험을 설계하고 구현하는 프론트엔드 개발자, leunsoo.",
};

export default function AboutPage() {
  return (
    <Container className="py-section">
      <h1 className="font-display text-title font-semibold tracking-[-0.02em] text-fg">
        소개
      </h1>
      <p className="mt-4 text-lede text-fg-soft">
        감각적인 웹 경험을 설계하고 구현하는 프론트엔드 개발자입니다. 곧 채워집니다.
      </p>
    </Container>
  );
}
