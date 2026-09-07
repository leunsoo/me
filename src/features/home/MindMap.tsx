"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Background,
  Controls,
  Handle,
  Panel,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/**
 * React Flow 라이브러리 테스트용 — 편집 기능 없이 고정된 트리를 방사형으로 배치하고,
 * 노드를 클릭하면 그 노드를 중심으로 확대/이동만 한다.
 */

type Rank = "root" | "branch" | "leaf";

const CENTER_SIZE = 96;
const BRANCH_SIZE = 76;
const LEAF_SIZE = 60;
const RADIUS_BRANCH = 220;
const RADIUS_LEAF = 120;

const SIZE: Record<Rank, number> = {
  root: CENTER_SIZE,
  branch: BRANCH_SIZE,
  leaf: LEAF_SIZE,
};

const TREE: { label: string; children: string[] }[] = [
  { label: "Frontend", children: ["React", "Next.js"] },
  { label: "Design", children: ["UI / UX", "Motion"] },
  { label: "Tooling", children: ["TypeScript", "Playwright"] },
  { label: "Creative Code", children: ["Canvas", "WebGL"] },
];

function buildGraph(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  nodes.push({
    id: "root",
    type: "mindNode",
    position: { x: 0, y: 0 },
    data: { label: "leunsoo", rank: "root" as Rank },
    draggable: false,
    connectable: false,
  });

  const branchCount = TREE.length;
  const branchStep = (Math.PI * 2) / branchCount;

  TREE.forEach((branch, i) => {
    const angle = i * branchStep - Math.PI / 2;
    const branchId = `branch-${i}`;
    const bx = Math.cos(angle) * RADIUS_BRANCH;
    const by = Math.sin(angle) * RADIUS_BRANCH;

    nodes.push({
      id: branchId,
      type: "mindNode",
      position: { x: bx, y: by },
      data: { label: branch.label, rank: "branch" as Rank },
      draggable: false,
      connectable: false,
    });
    edges.push({
      id: `root-${branchId}`,
      source: "root",
      target: branchId,
      type: "straight",
    });

    const leafSpread = branchStep * 0.35;
    branch.children.forEach((leaf, j) => {
      const leafAngle =
        angle + (j - (branch.children.length - 1) / 2) * leafSpread;
      const leafId = `${branchId}-leaf-${j}`;
      const lx = bx + Math.cos(leafAngle) * RADIUS_LEAF;
      const ly = by + Math.sin(leafAngle) * RADIUS_LEAF;

      nodes.push({
        id: leafId,
        type: "mindNode",
        position: { x: lx, y: ly },
        data: { label: leaf, rank: "leaf" as Rank },
        draggable: false,
        connectable: false,
      });
      edges.push({
        id: `${branchId}-${leafId}`,
        source: branchId,
        target: leafId,
        type: "straight",
      });
    });
  });

  return { nodes, edges };
}

/* 방사형 레이아웃이라 엣지는 각 노드의 중심에서 중심으로 곧게 이어야 자연스럽다.
 * source/target 핸들을 둘 다 노드 중앙에 겹쳐 숨겨두면, "straight" 엣지가
 * 원 뒤로 파고드는 형태로 그려져 마인드맵다운 연결선이 나온다. */
const CENTER_HANDLE_STYLE: React.CSSProperties = {
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  transform: "translate(-50%, -50%)",
  width: 1,
  height: 1,
  minWidth: 0,
  minHeight: 0,
  border: "none",
  background: "transparent",
};

function CenterHandles() {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
        style={CENTER_HANDLE_STYLE}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        style={CENTER_HANDLE_STYLE}
      />
    </>
  );
}

function MindNode({ data }: { data: { label: string; rank: Rank } }) {
  const size = SIZE[data.rank];

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center rounded-full border text-center text-pretty break-keep transition-colors duration-(--dur) ${
        data.rank === "root"
          ? "border-fg bg-fill text-fg-onfill text-body font-medium"
          : data.rank === "branch"
            ? "border-line bg-bg text-fg text-sm font-medium hover:border-accent"
            : "border-line bg-bg-dim text-fg-soft text-xs hover:border-accent hover:text-fg"
      }`}
    >
      <CenterHandles />
      <span className="px-2">{data.label}</span>
    </div>
  );
}

const nodeTypes: NodeTypes = { mindNode: MindNode };

function MindMapCanvas() {
  const { nodes, edges } = useMemo(() => buildGraph(), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { setCenter, fitView } = useReactFlow();

  const focusNode = useCallback(
    (node: Node) => {
      const size = SIZE[node.data.rank as Rank];
      setCenter(node.position.x + size / 2, node.position.y + size / 2, {
        zoom: node.id === "root" ? 1 : 1.6,
        duration: 500,
      });
    },
    [setCenter],
  );

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      setSelectedId(node.id);
      focusNode(node);
    },
    [focusNode],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodeClick={handleNodeClick}
      onPaneClick={() => setSelectedId(null)}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable
      fitView
      proOptions={{ hideAttribution: true }}
    >
      <Background gap={24} className="!bg-bg" color="var(--color-line)" />
      <Controls showInteractive={false} />
      <Panel position="top-right">
        <button
          type="button"
          onClick={() => {
            setSelectedId(null);
            fitView({ duration: 500 });
          }}
          className="rounded-full border border-line bg-bg px-3 py-1.5 text-xs text-fg-soft transition-colors duration-(--dur) hover:border-accent hover:text-fg"
        >
          전체 보기
        </button>
      </Panel>
      {selectedId && (
        <Panel
          position="bottom-left"
          className="!m-4 rounded-full border border-line bg-bg px-3 py-1.5 text-xs text-fg-soft"
        >
          선택: {selectedId}
        </Panel>
      )}
    </ReactFlow>
  );
}

export default function MindMap() {
  return (
    <div
      className="h-[480px] w-full overflow-hidden rounded-2xl border border-line"
      style={
        {
          "--xy-background-color-default": "var(--color-bg)",
          "--xy-background-pattern-color-default": "var(--color-line)",
          "--xy-edge-stroke-default": "var(--color-line)",
          "--xy-controls-button-background-color-default": "var(--color-bg)",
          "--xy-controls-button-background-color-hover-default":
            "var(--color-bg-dim)",
          "--xy-controls-button-border-color-default": "var(--color-line)",
          "--xy-controls-button-color-default": "var(--color-fg-soft)",
          "--xy-controls-button-color-hover-default": "var(--color-fg)",
        } as React.CSSProperties
      }
    >
      <ReactFlowProvider>
        <MindMapCanvas />
      </ReactFlowProvider>
    </div>
  );
}
