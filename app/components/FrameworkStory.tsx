"use client";
import { useEffect, useRef, Fragment } from "react";
import Link from "next/link";
import "./framework-story.css";
import { cubeEdges, cubeTopCenter, project, windows, type Pt3 } from "./iso";

type Stage = {
  id: string; n: string; kicker: string; title: string; exec: string; explain: string;
  activities: string[]; tools: string[]; deliverable: string; gate: string; visual: string;
};

const STAGES: Stage[] = [
  { id: "f1", n: "01", kicker: "Establish", title: "Start with the business result — not the model.", exec: "Rent the intelligence. Own the outcome.", explain: "Define the measurable result, its accountable owner, the current baseline and the risk boundary before any model, chatbot or agent is chosen.", activities: ["Define outcome & owner", "Establish baseline", "Risk boundary", "Go / no-go criteria"], tools: ["AI Outcome Charter", "Value hypothesis"], deliverable: "AI Outcome Charter", gate: "Is there a measurable business problem with an accountable owner?", visual: "compass" },
  { id: "f2", n: "02", kicker: "Navigate", title: "Map how work actually happens.", exec: "The SOP is not the process.", explain: "Interview the people who perform, review and approve the work. Surface workarounds, exceptions, tribal knowledge and the unwritten decision rules.", activities: ["Interview performers", "Exception catalogue", "Decision inventory", "Systems & data map"], tools: ["Process observation", "As-is mapping"], deliverable: "As-is workflow & baseline", gate: "Do we understand normal work, exceptional work and the people performing it?", visual: "xray" },
  { id: "f3", n: "03", kicker: "Transform", title: "Give each kind of work to the right system.", exec: "Deterministic · AI judgement · Human accountability.", explain: "Split the workflow into rules that must be enforced, judgement that AI can support, and material decisions that a named human owns.", activities: ["Separate the three zones", "Functional specification", "Exception design"], tools: ["Rules & decision tables", "User-action / system-reaction SRS"], deliverable: "To-be workflow & SRS", gate: "Are rules, AI responsibilities, human decisions and exceptions explicitly separated?", visual: "chamber" },
  { id: "f4", n: "04", kicker: "Engineer context", title: "Rent the intelligence. Own the context.", exec: "The model may change. The context must not.", explain: "Enterprise knowledge, evidence, relationships and decisions stay owned by the organisation — permissioned, inspectable, auditable, portable and model-neutral.", activities: ["Canonical data model", "Domain ontology", "Retrieval architecture", "Permission model"], tools: ["Connectors · knowledge graph", "RAG · vector search"], deliverable: "Context layer & integration map", gate: "Is enterprise context traceable, permissioned, portable and model-neutral?", visual: "constellation" },
  { id: "f5", n: "05", kicker: "Release safely", title: "Autonomy is earned action by action.", exec: "Sandbox → Shadow → Supervised → Controlled.", explain: "Move from experimentation to production one authorised action at a time. Every action is observed, verified, reversible and escalatable.", activities: ["Action permission matrix", "Human approval design", "Escalation paths", "Rollback procedure"], tools: ["Agent execution contract", "Structured JSON actions"], deliverable: "Action permission matrix", gate: "Can every action be authorised, observed, verified, reversed or escalated?", visual: "dial" },
  { id: "f6", n: "06", kicker: "Prove value", title: "Evaluation proves reliability.", exec: "Never accept one generic accuracy number.", explain: "Measure accuracy, business value, risk and adoption as separate dimensions against a golden dataset — a severe failure outweighs many harmless successes.", activities: ["Golden evaluation dataset", "Acceptance thresholds", "Adversarial & risk evals"], tools: ["Automated graders", "Traces · audit logs"], deliverable: "Evaluation & readiness report", gate: "Has the workflow shown sufficient value and acceptable severity-weighted risk?", visual: "balance" },
  { id: "f7", n: "07", kicker: "Institutionalise", title: "Improve the operating system — not the prompt.", exec: "Every outcome becomes organisational learning.", explain: "Production outcomes, overrides, exceptions and human corrections feed back into the workflow, rules, context and evaluations — compounding advantage over time.", activities: ["Feedback taxonomy", "Evaluation-update process", "Model & prompt versioning", "Operational review cadence"], tools: ["Improvement backlog", "Observability"], deliverable: "Institutional learning loop", gate: "Can production outcomes be converted into controlled organisational learning?", visual: "loop" },
];

const DOCTRINE = [
  "Start with a business outcome, not an AI use case.",
  "Study actual work, including exceptions and tribal knowledge.",
  "Redesign the complete workflow — not one isolated AI task.",
  "Use deterministic software for rules and calculations.",
  "Use AI for ambiguity, interpretation and generation.",
  "Keep humans accountable for material decisions.",
  "Rent model intelligence but own enterprise context.",
  "Require evidence, evaluations and auditability.",
  "Increase autonomy gradually on demonstrated performance.",
  "Turn every production outcome into organisational learning.",
];

// ---------------------------------------------------------------------------
// Shared isometric wireframe primitives — every milestone visual is composed
// from the same three atoms (cube / dot / line) so the page reads as one
// coherent instrument system rather than seven unrelated diagrams.
// ---------------------------------------------------------------------------
type CubeTone = { top?: string; vert?: string; bottom?: string };

function Cube({ gx, gy, gz, s, sy, sz, scale, ox, oy, base, span = 0.34, dur = 0.26, tone = {} }: {
  gx: number; gy: number; gz: number; s: number; sy?: number; sz?: number; scale: number; ox: number; oy: number;
  base: number; span?: number; dur?: number; tone?: CubeTone;
}) {
  const edges = cubeEdges(gx, gy, gz, s, sy, sz);
  const ws = windows(12, base, span, dur);
  return (
    <>
      {edges.map((e, i) => {
        const [x1, y1] = project(e.a, scale, ox, oy);
        const [x2, y2] = project(e.b, scale, ox, oy);
        const cls = e.tier === "top" ? `d ${tone.top ?? ""}` : e.tier === "vert" ? `d ${tone.vert ?? ""}` : `d dim ${tone.bottom ?? ""}`;
        const [w0, w1] = ws[i];
        return <line key={i} className={cls} pathLength={1} data-w={`${w0} ${w1}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
    </>
  );
}

function Dot({ p, scale, ox, oy, r = 5, w, cls = "nd" }: { p: Pt3; scale: number; ox: number; oy: number; r?: number; w: [number, number]; cls?: string }) {
  const [x, y] = project(p, scale, ox, oy);
  return <circle className={cls} data-w={`${w[0]} ${w[1]}`} cx={x} cy={y} r={r} />;
}

function Line3({ a, b, scale, ox, oy, w, cls = "d dim" }: { a: Pt3; b: Pt3; scale: number; ox: number; oy: number; w: [number, number]; cls?: string }) {
  const [x1, y1] = project(a, scale, ox, oy);
  const [x2, y2] = project(b, scale, ox, oy);
  return <line className={cls} pathLength={1} data-w={`${w[0]} ${w[1]}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
}

function Cap({ p, scale, ox, oy, w, text, cls = "lbl", dy = -14, anchor = "middle" as const }: {
  p: Pt3; scale: number; ox: number; oy: number; w: [number, number]; text: string; cls?: string; dy?: number; anchor?: "start" | "middle" | "end";
}) {
  const [x, y] = project(p, scale, ox, oy);
  return <text className={cls} data-w={`${w[0]} ${w[1]}`} x={x} y={y + dy} textAnchor={anchor}>{text}</text>;
}

function Visual({ id }: { id: string }) {
  const box = { role: "img" } as const;
  switch (id) {

    // 01 — scattered fragments of intent converge and resolve into one solid,
    // measurable cube.
    case "compass": {
      const scale = 76, ox = 430, oy = 430;
      const target: Pt3 = [-0.7, 0, -0.7];
      const outcomeTop = cubeTopCenter(target[0], target[1], target[2], 1.4);
      const frags: Pt3[] = [[-3.2, 0, -1.2], [-2.4, 0, 2.0], [-0.4, 0, -3.0], [2.6, 0, -2.0], [3.2, 0, 1.2], [0.6, 0, 3.0]];
      const dw = windows(frags.length, 0.03, 0.22, 0.2);
      const lw = windows(frags.length, 0.24, 0.24, 0.24);
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="Scattered objectives converging into one measurable outcome cube">
          {frags.map((f, i) => <Line3 key={`l${i}`} a={f} b={outcomeTop} scale={scale} ox={ox} oy={oy} w={lw[i]} cls="d dim" />)}
          {frags.map((f, i) => <Dot key={`d${i}`} p={f} scale={scale} ox={ox} oy={oy} r={4} w={dw[i]} cls="nd" />)}
          <Cube gx={target[0]} gy={target[1]} gz={target[2]} s={1.4} scale={scale} ox={ox} oy={oy} base={0.5} span={0.3} dur={0.24} tone={{ top: "amber" }} />
          <Dot p={outcomeTop} scale={scale} ox={ox} oy={oy} r={5} w={[0.82, 0.92]} cls="nd amber" />
          <Cap p={outcomeTop} scale={scale} ox={ox} oy={oy} w={[0.86, 0.98]} text="ONE MEASURABLE OUTCOME" cls="lbl amber" dy={-24} />
          <Cap p={[0, 0, -3.6]} scale={scale} ox={ox} oy={oy} w={[0.06, 0.2]} text="NOT: MODEL · CHATBOT · AGENT" cls="lbl" dy={40} />
        </svg>
      );
    }

    // 02 — a clean row of process-cubes on the surface; the real work
    // (exceptions, workarounds) sits as smaller, dimmer cubes underneath.
    case "xray": {
      const scale = 66, ox = 210, oy = 300;
      const steps = [0, 1.7, 3.4, 5.1];
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="A clean official process with hidden real work revealed beneath it">
          <Line3 a={[-0.6, 0, 0]} b={[6.4, 0, 0]} scale={scale} ox={ox} oy={oy} w={[0.02, 0.14]} cls="d green" />
          <Cap p={[0, 0, 0]} scale={scale} ox={ox} oy={oy} w={[0.06, 0.18]} text="OFFICIAL PROCESS" cls="lbl light" dy={-16} anchor="start" />
          {steps.map((gx, i) => (
            <Cube key={i} gx={gx} gy={0} gz={0} s={0.9} scale={scale} ox={ox} oy={oy} base={0.16 + i * 0.05} span={0.16} dur={0.18} tone={{}} />
          ))}
          {steps.map((gx, i) => {
            const under: Pt3 = [gx + 0.45, -1.35, 1.7 + (i % 2) * 0.4];
            const from: Pt3 = [gx + 0.45, 0, 0.9];
            return (
              <Fragment key={`u${i}`}>
                <Line3 a={from} b={under} scale={scale} ox={ox} oy={oy} w={[0.42 + i * 0.06, 0.62 + i * 0.06]} cls="d dim" />
                <Dot p={under} scale={scale} ox={ox} oy={oy} r={4} w={[0.5 + i * 0.06, 0.68 + i * 0.06]} cls="nd" />
              </Fragment>
            );
          })}
          <Cap p={[2.6, -1.35, 2.6]} scale={scale} ox={ox} oy={oy} w={[0.66, 0.82]} text="EXCEPTIONS · WORKAROUNDS · TRIBAL RULES" cls="lbl amber" dy={22} />
        </svg>
      );
    }

    // 03 — a single source resolving into three distinct cubes: rule,
    // AI judgement, human accountability.
    case "chamber": {
      const scale = 78, ox = 200, oy = 470;
      const source: Pt3 = [0, 0, 0];
      const lanes: { p: Pt3; label: string; tone: CubeTone }[] = [
        { p: [2, 0, -2.1], label: "RULE", tone: { top: "green" } },
        { p: [3.2, 0, 0], label: "AI JUDGEMENT", tone: {} },
        { p: [2, 0, 2.1], label: "HUMAN", tone: { top: "amber" } },
      ];
      const lw = windows(3, 0.32, 0.26, 0.22);
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="Work sorting from one source into rule, AI judgement and human lanes">
          <Dot p={source} scale={scale} ox={ox} oy={oy} r={7} w={[0.02, 0.14]} cls="nd" />
          {lanes.map((l, i) => (
            <Fragment key={l.label}>
              <Line3 a={source} b={cubeTopCenter(l.p[0], l.p[1], l.p[2], 1.1)} scale={scale} ox={ox} oy={oy} w={lw[i]} cls="d dim" />
              <Cube gx={l.p[0]} gy={l.p[1]} gz={l.p[2]} s={1.1} scale={scale} ox={ox} oy={oy} base={0.4 + i * 0.1} span={0.2} dur={0.2} tone={l.tone} />
              <Cap p={cubeTopCenter(l.p[0], l.p[1], l.p[2], 1.1)} scale={scale} ox={ox} oy={oy} w={[0.68 + i * 0.06, 0.84 + i * 0.06]} text={l.label} cls={`lbl ${l.tone.top === "amber" ? "amber" : l.tone.top === "green" ? "" : "light"}`} dy={-16} />
            </Fragment>
          ))}
        </svg>
      );
    }

    // 04 — enterprise sources wiring into one owned context cube; the model
    // sits outside, connected only by a dashed line — swappable.
    case "constellation": {
      const scale = 62, ox = 430, oy = 420;
      const hub: Pt3 = [0, 0, 0];
      const hubS = 1.6;
      const hubTop = cubeTopCenter(0, 0, 0, hubS);
      const sources: { p: Pt3; label: string }[] = [
        { p: [-3.4, 0, -1.2], label: "SHAREPOINT" }, { p: [-2.6, 0, 2.6], label: "TEAMS" },
        { p: [1.4, 0, -3.4], label: "CRM" }, { p: [3.2, 0, -0.6], label: "POSTGRES" },
        { p: [2.2, 0, 2.8], label: "DOCS · SOPs" },
      ];
      const dw = windows(sources.length, 0.34, 0.24, 0.2);
      // Model sits as a genuine sixth satellite: same connector treatment as the
      // five sources, precisely anchored so the line visibly meets its cube.
      const modelPos: Pt3 = [4.0, 0.9, -3.4];
      const modelS = 0.75;
      const modelAnchor = cubeTopCenter(modelPos[0], modelPos[1], modelPos[2], modelS);
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="Enterprise sources connecting into an owned context cube, model kept swappable">
          {/* connectors painted first so the hub cube's wireframe — including its
              base diamond — reads clearly on top of the crossing lines */}
          {sources.map((s, i) => (
            <Fragment key={s.label}>
              <Dot p={s.p} scale={scale} ox={ox} oy={oy} r={4.5} w={[0.3 + i * 0.04, 0.44 + i * 0.04]} cls="nd" />
              <Line3 a={s.p} b={hubTop} scale={scale} ox={ox} oy={oy} w={dw[i]} cls="d green" />
              <Cap p={s.p} scale={scale} ox={ox} oy={oy} w={[0.5 + i * 0.05, 0.66 + i * 0.05]} text={s.label} cls="lbl" dy={-12} />
            </Fragment>
          ))}
          <Line3 a={hubTop} b={modelAnchor} scale={scale} ox={ox} oy={oy} w={[0.66, 0.84]} cls="d amber" />
          <Cube gx={hub[0] - hubS / 2} gy={0} gz={hub[2] - hubS / 2} s={hubS} scale={scale} ox={ox} oy={oy} base={0.04} span={0.22} dur={0.22} tone={{ bottom: "strong" }} />
          <Dot p={hubTop} scale={scale} ox={ox} oy={oy} r={5} w={[0.5, 0.62]} cls="nd amber" />
          <Cap p={hubTop} scale={scale} ox={ox} oy={oy} w={[0.54, 0.68]} text="CONTEXT" cls="lbl light" dy={-16} />
          <Cube gx={modelPos[0] - modelS / 2} gy={modelPos[1]} gz={modelPos[2] - modelS / 2} s={modelS} scale={scale} ox={ox} oy={oy} base={0.82} span={0.14} dur={0.16} tone={{ top: "amber" }} />
          <Dot p={modelAnchor} scale={scale} ox={ox} oy={oy} r={4} w={[0.92, 1]} cls="nd amber" />
          <Cap p={modelAnchor} scale={scale} ox={ox} oy={oy} w={[0.9, 1]} text="MODEL — SWAPPABLE" cls="lbl amber" dy={-16} />
        </svg>
      );
    }

    // 05 — four cubes ascending like a staircase; each stage larger and
    // brighter than the last, ending in a solid, amber-lit "controlled" cube.
    case "dial": {
      const scale = 62, ox = 170, oy = 490;
      const stages: { p: Pt3; s: number; label: string; tone: CubeTone }[] = [
        { p: [0, 0, 0], s: 0.85, label: "SANDBOX", tone: {} },
        { p: [2.2, 0.9, 0], s: 1.0, label: "SHADOW", tone: {} },
        { p: [4.6, 2.0, 0], s: 1.2, label: "SUPERVISED", tone: { top: "green" } },
        { p: [7.2, 3.3, 0], s: 1.45, label: "CONTROLLED", tone: { top: "amber" } },
      ];
      const sandboxAnchor = cubeTopCenter(stages[0].p[0], stages[0].p[1], stages[0].p[2], stages[0].s);
      const candidates: Pt3[] = [[-1.7, 0, -1.15], [-1.95, 0, 0.65], [-1.05, 0, 1.75]];
      const cdw = windows(candidates.length, 0, 0.1, 0.1);
      const clw = windows(candidates.length, 0.02, 0.12, 0.12);
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="Candidate actions converging into a staircase of cubes ascending from sandbox to controlled autonomy">
          {candidates.map((c, i) => (
            <Fragment key={`cand${i}`}>
              <Line3 a={c} b={sandboxAnchor} scale={scale} ox={ox} oy={oy} w={clw[i]} cls="d dim" />
              <Dot p={c} scale={scale} ox={ox} oy={oy} r={3.5} w={cdw[i]} cls="nd" />
            </Fragment>
          ))}
          <Cap p={candidates[1]} scale={scale} ox={ox} oy={oy} w={[0.06, 0.18]} text="CANDIDATE ACTIONS" cls="lbl" dy={-14} anchor="middle" />
          {stages.slice(0, -1).map((s, i) => (
            <Line3 key={i} a={cubeTopCenter(s.p[0], s.p[1], s.p[2], s.s)} b={cubeTopCenter(stages[i + 1].p[0], stages[i + 1].p[1], stages[i + 1].p[2], stages[i + 1].s)} scale={scale} ox={ox} oy={oy} w={[0.22 + i * 0.16, 0.4 + i * 0.16]} cls="d dim" />
          ))}
          {stages.map((s, i) => (
            <Fragment key={s.label}>
              <Cube gx={s.p[0]} gy={s.p[1]} gz={s.p[2]} s={s.s} scale={scale} ox={ox} oy={oy} base={0.03 + i * 0.19} span={0.16} dur={0.18} tone={s.tone} />
              <Cap p={s.p} scale={scale} ox={ox} oy={oy} w={[0.16 + i * 0.19, 0.3 + i * 0.19]} text={s.label} cls={`lbl ${s.tone.top === "amber" ? "amber" : "light"}`} dy={26} />
            </Fragment>
          ))}
          <Dot p={cubeTopCenter(5.3, 2.1, 0, 1.3)} scale={scale} ox={ox} oy={oy} r={5} w={[0.86, 0.96]} cls="nd amber" />
        </svg>
      );
    }

    // 06 — four bar-cubes of rising height (accuracy · value · risk ·
    // adoption); a tilted beam shows one severe failure outweighing many
    // harmless successes.
    case "balance": {
      const scale = 68, ox = 220, oy = 460;
      const bars: { gx: number; h: number; label: string; tone: CubeTone }[] = [
        { gx: 0, h: 0.9, label: "ACCURACY", tone: {} },
        { gx: 1.55, h: 1.6, label: "VALUE", tone: {} },
        { gx: 3.1, h: 0.6, label: "RISK", tone: {} },
        { gx: 4.65, h: 2.3, label: "ADOPTION", tone: { top: "green" } },
      ];
      const foot = 0.82;
      const accuracyAnchor = cubeTopCenter(bars[0].gx, 0, 0, foot, bars[0].h, foot);
      const signals: Pt3[] = [[-1.4, 1.6, -1.0], [-1.7, 1.0, 0.6], [-0.9, 2.1, 1.3]];
      const sdw = windows(signals.length, 0, 0.1, 0.1);
      const slw = windows(signals.length, 0.02, 0.12, 0.12);
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="Evaluation signals converging into four measures of evaluated value, and a fulcrum where one severe failure outweighs many harmless successes">
          {signals.map((sg, i) => (
            <Fragment key={`sig${i}`}>
              <Line3 a={sg} b={accuracyAnchor} scale={scale} ox={ox} oy={oy} w={slw[i]} cls="d dim" />
              <Dot p={sg} scale={scale} ox={ox} oy={oy} r={3.5} w={sdw[i]} cls="nd" />
            </Fragment>
          ))}
          <Cap p={signals[1]} scale={scale} ox={ox} oy={oy} w={[0.06, 0.18]} text="EVALUATION SIGNALS" cls="lbl" dy={-14} anchor="middle" />
          <Line3 a={[-0.7, 0, 0]} b={[6.1, 0, 0]} scale={scale} ox={ox} oy={oy} w={[0.1, 0.2]} cls="d dim" />
          {bars.map((b, i) => (
            <Fragment key={b.label}>
              <Cube gx={b.gx} gy={0} gz={0} s={foot} sy={b.h} scale={scale} ox={ox} oy={oy} base={0.16 + i * 0.1} span={0.18} dur={0.2} tone={b.tone} />
              <Cap p={[b.gx + foot / 2, 0, 0]} scale={scale} ox={ox} oy={oy} w={[0.32 + i * 0.1, 0.46 + i * 0.1]} text={b.label} cls="lbl" dy={30} anchor="middle" />
            </Fragment>
          ))}
          {/* fulcrum: a tilted beam — one heavy amber weight outweighs three light ones */}
          <Line3 a={[7.0, 3.55, 0]} b={[7.9, 3.9, 0]} scale={scale} ox={ox} oy={oy} w={[0.58, 0.7]} cls="d" />
          <Line3 a={[7.9, 3.9, 0]} b={[9.2, 2.55, 0]} scale={scale} ox={ox} oy={oy} w={[0.62, 0.76]} cls="d amber" />
          <Line3 a={[7.9, 3.9, 0]} b={[7.9, 2.9, 0]} scale={scale} ox={ox} oy={oy} w={[0.66, 0.78]} cls="d dim" />
          <Dot p={[7.9, 3.9, 0]} scale={scale} ox={ox} oy={oy} r={4} w={[0.6, 0.72]} cls="nd" />
          <Dot p={[9.2, 2.55, 0]} scale={scale} ox={ox} oy={oy} r={8} w={[0.78, 0.9]} cls="nd amber" />
          <Dot p={[6.85, 3.62, 0]} scale={scale} ox={ox} oy={oy} r={3} w={[0.6, 0.7]} cls="nd" />
          <Dot p={[6.65, 3.72, 0]} scale={scale} ox={ox} oy={oy} r={3} w={[0.62, 0.72]} cls="nd" />
          <Dot p={[6.45, 3.82, 0]} scale={scale} ox={ox} oy={oy} r={3} w={[0.64, 0.74]} cls="nd" />
          <Cap p={[9.2, 2.55, 0]} scale={scale} ox={ox} oy={oy} w={[0.84, 0.98]} text="ONE SEVERE FAILURE" cls="lbl amber" dy={-16} anchor="middle" />
          <Cap p={[6.65, 3.72, 0]} scale={scale} ox={ox} oy={oy} w={[0.6, 0.72]} text="MANY HARMLESS SUCCESSES" cls="lbl" dy={-14} anchor="middle" />
        </svg>
      );
    }

    // 07 — a closed ring of cubes and nodes: production feeds outcomes,
    // feedback, evaluation and updates — which return to production.
    case "loop": {
      const scale = 60, ox = 430, oy = 380;
      const n = 6, R = 3.1;
      const names = ["PRODUCTION", "OUTCOMES", "FEEDBACK", "EVALUATIONS", "UPDATES", "CONTEXT"];
      const nodes: Pt3[] = Array.from({ length: n }, (_, i) => {
        const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
        return [Math.cos(a) * R, 0, Math.sin(a) * R];
      });
      const lw = windows(n, 0.06, 0.5, 0.14);
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="A closed loop of production, outcomes, feedback, evaluation and updates">
          {nodes.map((p, i) => {
            const q = nodes[(i + 1) % n];
            return <Line3 key={i} a={p} b={q} scale={scale} ox={ox} oy={oy} w={lw[i]} cls="d green" />;
          })}
          {nodes.map((p, i) => (
            i % 2 === 0 ? (
              <Cube key={i} gx={p[0] - 0.5} gy={p[1]} gz={p[2] - 0.5} s={1} scale={scale} ox={ox} oy={oy} base={0.5 + i * 0.06} span={0.16} dur={0.18} tone={i === 0 ? { top: "amber" } : {}} />
            ) : (
              <Dot key={i} p={p} scale={scale} ox={ox} oy={oy} r={7} w={[0.5 + i * 0.06, 0.66 + i * 0.06]} cls="nd" />
            )
          ))}
          {nodes.map((p, i) => (
            <Cap key={`c${i}`} p={p} scale={scale} ox={ox} oy={oy} w={[0.62 + i * 0.05, 0.78 + i * 0.05]} text={names[i]} cls={i === 0 ? "lbl amber" : "lbl light"} dy={i === 0 ? -30 : 22} />
          ))}
          <Cap p={[0, 0, 0]} scale={scale} ox={ox} oy={oy} w={[0.86, 1]} text="COMPOUNDING" cls="lbl amber" dy={4} />
        </svg>
      );
    }

    default:
      return null;
  }
}

export function FrameworkStory() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const smooth = (v: number) => { const x = clamp(v); return x * x * (3 - 2 * x); };
    const range = (p: number, a: number, b: number) => smooth((p - a) / (b - a));
    const chapters = [...root.querySelectorAll<HTMLElement>(".fchapter")];
    const rail = root.querySelector<HTMLElement>(".frail");
    const links = [...root.querySelectorAll<HTMLElement>(".frail a")];

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chapters.forEach((ch) => {
        ch.querySelectorAll<HTMLElement>("[data-w]").forEach((el) => {
          if (el.classList.contains("d")) el.style.strokeDashoffset = "0";
          el.style.opacity = el.classList.contains("lbl") ? "0.8" : el.classList.contains("wash") ? "0.6" : "1";
        });
        const c = ch.querySelector<HTMLElement>(".fcopy");
        if (c) { c.style.opacity = "1"; c.style.transform = "none"; }
      });
      return;
    }

    let activeIdx = -1;
    const frame = () => {
      let active = 0;
      chapters.forEach((ch, i) => {
        const r = ch.getBoundingClientRect();
        const p = clamp(-r.top / Math.max(ch.offsetHeight - innerHeight, 1));
        const copy = ch.querySelector<HTMLElement>(".fcopy");
        if (copy) {
          const cin = range(p, 0.02, 0.16), cout = 1 - range(p, 0.9, 1);
          copy.style.opacity = String(Math.min(cin, 0.12 + 0.88 * cout));
          copy.style.transform = `translateY(${((1 - cin) * 18).toFixed(1)}px)`;
        }
        ch.querySelectorAll<HTMLElement>("[data-w]").forEach((el) => {
          const w = el.getAttribute("data-w")!.split(" ").map(Number);
          const s = range(p, w[0], w[1]);
          if (el.classList.contains("d")) el.style.strokeDashoffset = String(1 - s);
          el.style.opacity = String(el.classList.contains("lbl") ? s * 0.8 : el.classList.contains("wash") ? s * 0.6 : s);
        });
        if (r.top <= innerHeight * 0.45 && r.bottom > innerHeight * 0.45) active = i;
      });
      if (active !== activeIdx) { activeIdx = active; links.forEach((a, i) => a.classList.toggle("on", i === active)); }
      if (rail && chapters[0] && chapters[chapters.length - 1]) {
        const first = chapters[0].getBoundingClientRect().top;
        const last = chapters[chapters.length - 1].getBoundingClientRect().bottom;
        rail.classList.toggle("show", first < innerHeight * 0.6 && last > innerHeight * 0.4);
      }
    };
    let busy = false;
    const req = () => { if (busy) return; busy = true; requestAnimationFrame(() => { frame(); busy = false; }); };
    addEventListener("scroll", req, { passive: true });
    addEventListener("resize", req);
    frame();
    return () => { removeEventListener("scroll", req); removeEventListener("resize", req); };
  }, []);

  return (
    <div className="fstory" ref={ref}>
      <section className="fhero">
        <Link className="fback" href="/approach">← Back to approach</Link>
        <span className="feyebrow">The Enterprise AI Delivery Framework</span>
        <h1>Seven stages from a business outcome to <em>governed, evaluated AI.</em></h1>
        <p>AI transformation succeeds when a measurable workflow, trusted enterprise context, deterministic controls, specialised intelligence and accountable human decisions operate as one system.</p>
        <span className="cue">Scroll to walk the framework</span>
      </section>

      {STAGES.map((s) => (
        <section className="fchapter" id={s.id} key={s.id}>
          <div className="fscene">
            <div className="fcopy">
              <p className="fchap">{s.n} · {s.kicker}</p>
              <h2>{s.title}</h2>
              <p className="fexec">{s.exec}</p>
              <p className="fexplain">{s.explain}</p>
              <div className="fmeta">
                <div className="frow"><span className="k">Key activities</span>{s.activities.map((a) => <span className="chip" key={a}>{a}</span>)}</div>
                <div className="frow"><span className="k">Tools &amp; services</span>{s.tools.map((t) => <span className="chip tool" key={t}>{t}</span>)}</div>
              </div>
              <div className="fgate"><b>Governance gate</b><span>{s.gate}</span></div>
              <p className="fdeliv">Deliverable — <i>{s.deliverable}</i></p>
            </div>
            <div className="fvisual"><Visual id={s.visual} /></div>
          </div>
        </section>
      ))}

      <nav className="frail" aria-label="Framework stages">
        {STAGES.map((s) => (
          <a href={`#${s.id}`} key={s.id}><span className="dot" /><span className="lab">{s.n} {s.kicker}</span></a>
        ))}
      </nav>

      <section className="fclose">
        <span className="feyebrow">Transformation doctrine</span>
        <h2>AI becomes transformational when it becomes <em>accountable work.</em></h2>
        <p>Models will keep changing. The durable enterprise advantage is the workflow, domain context, integration, governance and learning system built around them.</p>
        <ol className="fdoctrine">{DOCTRINE.map((d) => <li key={d}>{d}</li>)}</ol>
        <a className="fcta" href="mailto:hareesh.b3@gmail.com">Discuss a workflow <span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}
