"use client";
import Link from "next/link";
import ArchitectureMap from "./components/ArchitectureMap";
import "./components/keyframes.css";
import { GROUPS, NODES, EDGES, FLOWS, INTRO, UNMAPPED, REPO } from "./graph";
import { useMapView } from "./stores/useMapView";
import { getSubStage } from "./substages";

const DATA = { groups: GROUPS, nodes: NODES, edges: EDGES, flows: FLOWS, intro: INTRO, unmapped: UNMAPPED, repo: REPO, nodeNoun: "Stages" };

function DrillDownLink() {
  // Reads the skill's own selection store directly, from outside its copied
  // components, so the drill-down affordance needs zero edits to skill-owned
  // files — the store is already a public module singleton.
  const { selection } = useMapView();
  const stage = selection?.kind === "node" ? getSubStage(selection.id) : undefined;
  if (!stage) return null;
  return (
    <Link
      href={`/approach/framework/${stage.slug}`}
      style={{
        position: "fixed", zIndex: 41, left: "50%", bottom: 22, transform: "translateX(-50%)",
        display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 18px",
        border: "1px solid var(--acid)", borderRadius: 999, background: "var(--acid)",
        color: "#fff", textDecoration: "none", fontFamily: "var(--font-geist-mono), monospace",
        fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
        boxShadow: "0 10px 28px -10px rgba(26,127,55,.55)",
      }}
    >
      Look inside {stage.kicker} ↗
    </Link>
  );
}

export function FrameworkArchitecturePage() {
  return (
    <>
      <div className="am-crumb">
        <Link href="/approach">← Approach</Link>
        <span style={{ color: "var(--muted)" }}>{NODES.length} stages · 1 feedback loop</span>
      </div>
      <ArchitectureMap data={DATA} />
      <DrillDownLink />
    </>
  );
}
