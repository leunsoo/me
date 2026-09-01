import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "블로그",
  description: "공부한 내용과 개인적인 생각을 정리하는 곳.",
};

export default function BlogPage() {
  return (
    <Container className="py-section">
      <h1 className="font-display text-title font-semibold tracking-[-0.02em] text-fg">
        블로그
      </h1>
      <p className="mt-4 max-w-measure text-lede text-fg-soft">
        공부한 내용과 개인적인 생각을 정리하는 곳. 곧 채워집니다.
      </p>
    </Container>
  );
}
