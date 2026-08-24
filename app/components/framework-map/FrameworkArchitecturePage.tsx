"use client";
import Link from "next/link";
import ArchitectureMap from "./components/ArchitectureMap";
import "./components/keyframes.css";
import { GROUPS, NODES, EDGES, FLOWS, INTRO, UNMAPPED, REPO } from "./graph";

const DATA = { groups: GROUPS, nodes: NODES, edges: EDGES, flows: FLOWS, intro: INTRO, unmapped: UNMAPPED, repo: REPO };

export function FrameworkArchitecturePage() {
  return (
    <div style={{ position: "relative" }}>
      <Link
        href="/approach"
        style={{
          position: "fixed", zIndex: 40, left: "clamp(18px, 3vw, 40px)", top: 16,
          display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px",
          border: "1px solid var(--line)", borderRadius: 999, background: "rgba(255,255,255,.9)",
          backdropFilter: "blur(8px)", color: "var(--muted)", textDecoration: "none",
          fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em",
          textTransform: "uppercase", boxShadow: "0 6px 20px -10px rgba(31,35,40,.25)",
        }}
      >
        ← Back to approach
      </Link>
      <ArchitectureMap data={DATA} />
    </div>
  );
}
