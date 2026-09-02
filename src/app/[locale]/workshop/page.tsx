import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { WorkshopList } from "@/features/workshop";

export const metadata: Metadata = {
  title: "작업실",
  description: "재미로 구현한 기능들 — 만든 것 하나하나와 그 설명.",
};

export default function WorkshopPage() {
  return (
    <Container className="py-section">
      <h1 className="font-display text-title font-semibold tracking-[-0.02em] text-fg">
        작업실
      </h1>
      <p className="mt-4 text-lede text-fg-soft">
        재미로 구현한 기능들. 하나씩, 만든 것과 그 설명.
      </p>

      <WorkshopList />
    </Container>
  );
}
