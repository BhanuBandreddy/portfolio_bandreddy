"use client";
import Link from "next/link";
import ArchitectureMap from "./components/ArchitectureMap";
import "./components/keyframes.css";
import { SUB_STAGES, type SubStage } from "./substages";

export function SubStagePageView({ stage }: { stage: SubStage }) {
  const idx = SUB_STAGES.findIndex((s) => s.slug === stage.slug);
  const prev = SUB_STAGES[(idx - 1 + SUB_STAGES.length) % SUB_STAGES.length];
  const next = SUB_STAGES[(idx + 1) % SUB_STAGES.length];
  const data = {
    groups: stage.groups, nodes: stage.nodes, edges: stage.edges, flows: stage.flows,
    intro: stage.intro, unmapped: [] as string[], repo: `${stage.kicker.replace("STAGE", "Stage")} · ${stage.title}`, nodeNoun: "Steps",
  };
  return (
    <>
      <div className="am-crumb">
        <Link href="/approach/framework">← Full framework</Link>
        <nav aria-label="Adjacent stages">
          <Link href={`/approach/framework/${prev.slug}`}>← {prev.kicker}</Link>
          <span aria-hidden="true">·</span>
          <Link href={`/approach/framework/${next.slug}`}>{next.kicker} →</Link>
        </nav>
      </div>
      <ArchitectureMap data={data} />
    </>
  );
}
