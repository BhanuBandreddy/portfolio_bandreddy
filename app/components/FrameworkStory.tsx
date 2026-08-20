"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import "./framework-story.css";

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

function Visual({ id }: { id: string }) {
  const box = { role: "img" } as const;
  switch (id) {
    case "compass":
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="An outcome compass reorienting from model names toward business outcomes">
          <circle className="d" data-w="0.12 0.34" pathLength={1} cx="450" cy="320" r="182" />
          <circle className="d dim" data-w="0.2 0.42" pathLength={1} cx="450" cy="320" r="120" />
          <path className="d dim" data-w="0.26 0.46" pathLength={1} d="M450 130V170M450 470V510M240 320H280M620 320H660" />
          {[["REVENUE", 450, 118], ["CUSTOMER EXPERIENCE", 690, 300], ["RISK", 690, 350], ["CYCLE TIME", 210, 300], ["COST", 210, 350]].map(([t, x, y]) => (
            <text key={t as string} className="lbl light" data-w="0.42 0.66" x={x as number} y={y as number} textAnchor="middle">{t}</text>
          ))}
          <line className="d amber" data-w="0.5 0.82" pathLength={1} x1="450" y1="320" x2="560" y2="222" />
          <circle className="nd amber" data-w="0.34 0.5" cx="450" cy="320" r="6" />
          <circle className="nd amber" data-w="0.72 0.86" cx="560" cy="222" r="7" />
          <text className="lbl" data-w="0.16 0.32" x="450" y="560" textAnchor="middle">NOT: MODEL · CHATBOT · AGENT</text>
        </svg>
      );
    case "xray":
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="A clean official process line with hidden real-work branches revealed beneath it">
          <path className="d green" data-w="0.12 0.32" pathLength={1} d="M110 250H790" />
          <text className="lbl light" data-w="0.16 0.34" x="110" y="232">OFFICIAL PROCESS</text>
          {[[230, "WORKAROUNDS"], [360, "MANUAL HANDOFF"], [490, "EXCEPTIONS"], [620, "SHADOW SHEETS"], [720, "TRIBAL RULES"]].map(([x, t], i) => (
            <g key={t as string}>
              <path className="d dim" data-w={`${0.34 + i * 0.06} ${0.6 + i * 0.05}`} pathLength={1} d={`M${x} 250 C${x} 320 ${(x as number) + 26} 360 ${(x as number) + 26} 420`} />
              <circle className="nd" data-w={`${0.5 + i * 0.05} ${0.66 + i * 0.05}`} cx={(x as number) + 26} cy="428" r="5" />
              <text className="lbl" data-w={`${0.52 + i * 0.05} ${0.74 + i * 0.04}`} x={(x as number) + 40} y="432">{t}</text>
            </g>
          ))}
          <text className="lbl amber" data-w="0.62 0.82" x="110" y="470">ACTUAL WORK</text>
        </svg>
      );
    case "chamber":
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="Work sorted into three lanes: rules, AI judgement and human accountability">
          {[["RULE", 150, "green"], ["AI JUDGEMENT", 300, ""], ["HUMAN", 450, "amber"]].map(([t, y], i) => (
            <g key={t as string}>
              <rect className={`d ${i === 0 ? "green" : ""}`} data-w={`${0.12 + i * 0.05} ${0.4 + i * 0.05}`} pathLength={1} x="330" y={(y as number) - 34} width="470" height="68" rx="10" />
              <text className="lbl light" data-w={`${0.16 + i * 0.05} ${0.4 + i * 0.05}`} x="352" y={(y as number) + 4}>{t}</text>
            </g>
          ))}
          {[[150, 0], [300, 1], [450, 2], [300, 3]].map(([y, i]) => (
            <g key={i as number}>
              <circle className="nd" data-w={`${0.42 + (i as number) * 0.06} ${0.6 + (i as number) * 0.05}`} cx="150" cy={110 + (i as number) * 120} r="9" />
              <path className="d dim" data-w={`${0.5 + (i as number) * 0.05} ${0.78 + (i as number) * 0.03}`} pathLength={1} d={`M162 ${110 + (i as number) * 120} C240 ${110 + (i as number) * 120} 250 ${y as number} 330 ${y as number}`} />
            </g>
          ))}
          <circle className="nd amber" data-w="0.6 0.78" cx="150" cy="470" r="9" />
        </svg>
      );
    case "constellation":
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="Enterprise sources connecting into an owned context hub, model-neutral">
          <ellipse className="wash" data-w="0.28 0.5" cx="430" cy="320" rx="250" ry="230" />
          <circle className="nd" data-w="0.3 0.48" cx="430" cy="320" r="26" />
          <circle className="nd amber" data-w="0.34 0.5" cx="430" cy="320" r="5" />
          <text className="lbl light" data-w="0.32 0.5" x="430" y="284" textAnchor="middle">CONTEXT</text>
          {[["SHAREPOINT", 160, 150], ["CRM", 700, 170], ["POSTGRES", 720, 470], ["TEAMS", 150, 470], ["DOCS & SOPs", 250, 300], ["POLICY", 620, 320]].map(([t, x, y], i) => (
            <g key={t as string}>
              <path className="d green" data-w={`${0.36 + i * 0.05} ${0.72 + i * 0.03}`} pathLength={1} d={`M${x} ${y} L430 320`} />
              <circle className="nd" data-w={`${0.4 + i * 0.05} ${0.6 + i * 0.04}`} cx={x as number} cy={y as number} r="6" />
              <text className="lbl" data-w={`${0.44 + i * 0.05} ${0.78 + i * 0.03}`} x={(x as number)} y={(y as number) - 14} textAnchor="middle">{t}</text>
            </g>
          ))}
          <path className="d amber dim" data-w="0.6 0.86" pathLength={1} d="M456 320H820" strokeDasharray="6 6" />
          <text className="lbl amber" data-w="0.66 0.86" x="700" y="304">MODEL — SWAPPABLE</text>
        </svg>
      );
    case "dial":
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="An autonomy dial filling stage by stage from sandbox to controlled autonomy">
          <path className="d dim" data-w="0.12 0.4" pathLength={1} d="M250 470 A200 200 0 1 1 650 470" />
          <path className="d amber" data-w="0.44 0.86" pathLength={1} d="M250 470 A200 200 0 0 1 450 172" />
          {[["SANDBOX", 250, 470], ["SHADOW", 300, 250], ["SUPERVISED", 600, 250], ["CONTROLLED", 650, 470]].map(([t, x, y], i) => (
            <g key={t as string}>
              <circle className={`nd ${i === 3 ? "amber" : ""}`} data-w={`${0.3 + i * 0.08} ${0.5 + i * 0.08}`} cx={x as number} cy={y as number} r="7" />
              <text className="lbl light" data-w={`${0.34 + i * 0.08} ${0.6 + i * 0.06}`} x={x as number} y={(y as number) + (i < 2 ? -18 : 34)} textAnchor="middle">{t}</text>
            </g>
          ))}
          <circle className="nd" data-w="0.34 0.5" cx="450" cy="380" r="20" />
          <path className="d amber" data-w="0.78 0.92" pathLength={1} d="M438 380 l9 10 l16 -20" />
        </svg>
      );
    case "balance":
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="Four evaluation gauges and a severity balance that outweighs harmless successes">
          <path className="d dim" data-w="0.14 0.34" pathLength={1} d="M150 470H760" />
          {[["ACCURACY", 220, 150], ["VALUE", 350, 110], ["RISK", 480, 220], ["ADOPTION", 610, 140]].map(([t, x, h], i) => (
            <g key={t as string}>
              <line className="d dim" data-w={`${0.2 + i * 0.05} ${0.4 + i * 0.05}`} pathLength={1} x1={x as number} y1="470" x2={x as number} y2="230" />
              <line className="d green" data-w={`${0.4 + i * 0.06} ${0.66 + i * 0.05}`} pathLength={1} x1={(x as number) - 16} y1={470 - (h as number)} x2={(x as number) + 16} y2={470 - (h as number)} />
              <text className="lbl" data-w={`${0.44 + i * 0.05} ${0.72 + i * 0.04}`} x={x as number} y="494" textAnchor="middle">{t}</text>
            </g>
          ))}
          <path className="d amber" data-w="0.6 0.8" pathLength={1} d="M690 200 L760 236 L620 236 Z" />
          <path className="d" data-w="0.66 0.86" pathLength={1} d="M560 150 H820" />
          <circle className="nd amber" data-w="0.74 0.9" cx="800" cy="150" r="10" />
          <text className="lbl amber" data-w="0.76 0.92" x="800" y="128" textAnchor="middle">ONE SEVERE FAILURE</text>
        </svg>
      );
    case "loop":
      return (
        <svg viewBox="0 0 900 640" {...box} aria-label="A closed learning loop of production, outcomes, feedback, evaluation and updates">
          <circle className="d green" data-w="0.12 0.5" pathLength={1} cx="450" cy="320" r="180" />
          {[["PRODUCTION", 450, 140], ["OUTCOMES", 630, 320], ["FEEDBACK", 450, 500], ["EVALUATIONS", 270, 320], ["UPDATES", 320, 190]].map(([t, x, y], i) => (
            <g key={t as string}>
              <circle className="nd" data-w={`${0.3 + i * 0.06} ${0.5 + i * 0.05}`} cx={x as number} cy={y as number} r="7" />
              <text className="lbl light" data-w={`${0.34 + i * 0.06} ${0.64 + i * 0.05}`} x={x as number} y={(y as number) - 16} textAnchor="middle">{t}</text>
            </g>
          ))}
          <path className="d amber" data-w="0.6 0.86" pathLength={1} d="M410 360 L450 320 L410 300" />
          <path className="d amber" data-w="0.62 0.9" pathLength={1} d="M470 360 v-70 M450 300 v-40" />
          <text className="lbl amber" data-w="0.7 0.9" x="450" y="336" textAnchor="middle">COMPOUNDING</text>
        </svg>
      );
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
