"use client";
import Link from "next/link";
import ArchitectureMap from "./components/ArchitectureMap";
import "./components/keyframes.css";
import { SUB_STAGES, type SubStage } from "./substages";

// top:66 (not 16) deliberately clears the skill's own in-flow header, which
// spans the full width at top:0..56px — a fixed overlay at top:16 sat right
// on top of it.
const backLink = {
  position: "fixed", zIndex: 40, left: 12, top: 66,
  display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px",
  border: "1px solid var(--line)", borderRadius: 999, background: "rgba(255,255,255,.92)",
  backdropFilter: "blur(8px)", color: "var(--muted)", textDecoration: "none",
  fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.08em",
  textTransform: "uppercase", boxShadow: "0 6px 16px -10px rgba(31,35,40,.25)",
} as const;

const stepper = {
  position: "fixed", zIndex: 40, right: 12, top: 66,
  display: "flex", alignItems: "center", gap: 8, padding: "5px 10px",
  border: "1px solid var(--line)", borderRadius: 999, background: "rgba(255,255,255,.92)",
  backdropFilter: "blur(8px)", boxShadow: "0 6px 16px -10px rgba(31,35,40,.25)",
  fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.06em",
} as const;

export function SubStagePageView({ stage }: { stage: SubStage }) {
  const idx = SUB_STAGES.findIndex((s) => s.slug === stage.slug);
  const prev = SUB_STAGES[(idx - 1 + SUB_STAGES.length) % SUB_STAGES.length];
  const next = SUB_STAGES[(idx + 1) % SUB_STAGES.length];
  const data = {
    groups: stage.groups, nodes: stage.nodes, edges: stage.edges, flows: stage.flows,
    intro: stage.intro, unmapped: [] as string[], repo: `${stage.kicker} — ${stage.title}`,
  };
  return (
    <div style={{ position: "relative" }}>
      <Link href="/approach/framework" style={backLink}>← Full framework</Link>
      <nav style={stepper} aria-label="Adjacent stages">
        <Link href={`/approach/framework/${prev.slug}`} style={{ color: "var(--muted)", textDecoration: "none" }}>← {prev.kicker}</Link>
        <span style={{ color: "var(--line)" }}>·</span>
        <Link href={`/approach/framework/${next.slug}`} style={{ color: "var(--muted)", textDecoration: "none" }}>{next.kicker} →</Link>
      </nav>
      <ArchitectureMap data={data} />
    </div>
  );
}
