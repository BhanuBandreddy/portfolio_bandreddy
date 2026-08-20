"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLink } from "./SiteShell";

type Cap = { id: string; n: string; label: string; msg: string; tools: string[] };

const CAPS: Cap[] = [
  { id: "workflow", n: "01", label: "Workflow transformation", msg: "We redesign the work before we automate it.", tools: ["Process discovery", "BRD / SRS", "Decision mapping", "Service design"] },
  { id: "context", n: "02", label: "Enterprise context", msg: "We connect the knowledge AI needs to operate accurately.", tools: ["SharePoint · OneDrive", "Outlook · Teams", "CRM", "Databases · repositories"] },
  { id: "deterministic", n: "03", label: "Deterministic engineering", msg: "Rules and calculations stay controlled and testable.", tools: ["Node.js · APIs", "Rules engines", "PostgreSQL · MongoDB", "Integration services"] },
  { id: "intelligence", n: "04", label: "Governed intelligence", msg: "Models and agents interpret, recommend and act within boundaries.", tools: ["Model routing", "Specialised agents", "Structured actions", "Human approvals"] },
  { id: "evaluation", n: "05", label: "Evaluation & control", msg: "Every material output must be measurable and defensible.", tools: ["Golden datasets", "Traces · audit logs", "Security tests", "Adversarial evals"] },
  { id: "operations", n: "06", label: "Production operations", msg: "We release gradually and improve from real outcomes.", tools: ["Cloud / on-prem", "CI / CD", "Monitoring · cost", "Feedback loops"] },
];

const cv = (o: Record<string, string | number>) => o as CSSProperties;

export function TransformEngine() {
  const [active, setActive] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDrawn(true); return; }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { setDrawn(true); io.disconnect(); } }),
      { threshold: 0.3 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const replay = () => { setDrawn(false); requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true))); };
  const cur = CAPS.find((c) => c.id === active) || null;
  const zc = (id: string) => `z z-${id}${active ? (active === id ? " active" : " dim") : ""}`;

  return (
    <section className="engine-hero" ref={ref} aria-labelledby="engine-h">
      <div className="engine-copy">
        <span className="section-index">ENTERPRISE AI TRANSFORMATION · FROM WORKFLOW TO OPERATING INTELLIGENCE</span>
        <h2 id="engine-h">We turn critical enterprise workflows into <em>governed AI operating systems.</em></h2>
        <p>We combine business transformation, domain knowledge, enterprise context, deterministic engineering, specialised AI agents and measurable governance — so AI performs real work without separating intelligence from accountability.</p>
        <p className="engine-position">Rent the intelligence. Own the context.</p>
      </div>

      <div className={`engine-stage${drawn ? " is-drawn" : ""}`}>
        <svg className="engine-svg" viewBox="0 0 1180 440" role="img"
          aria-label="An enterprise workflow moving through five layers: fragmented work becomes connected context, then governed intelligence, then accountable execution, producing measurable value that feeds back into the workflow." data-sel={active ?? undefined}>
          <title>Enterprise AI transformation engine</title>

          {/* connectors */}
          <line className="draw" pathLength={1} style={cv({ "--d": "0s" })} x1="205" y1="200" x2="255" y2="196" />
          <line className="draw" pathLength={1} style={cv({ "--d": ".05s" })} x1="435" y1="160" x2="520" y2="150" />
          <line className="draw" pathLength={1} style={cv({ "--d": ".1s" })} x1="435" y1="250" x2="520" y2="258" />
          <line className="draw" pathLength={1} style={cv({ "--d": ".35s" })} x1="700" y1="150" x2="800" y2="180" />
          <line className="draw" pathLength={1} style={cv({ "--d": ".4s" })} x1="700" y1="258" x2="800" y2="228" />
          <line className="draw" pathLength={1} style={cv({ "--d": ".6s" })} x1="930" y1="204" x2="988" y2="250" />
          {/* feedback loop */}
          <path className="draw loopline" pathLength={1} style={cv({ "--d": ".9s" })} d="M1070 120 C1070 46 900 40 660 40 C470 40 360 46 345 92" strokeDasharray="1" />

          {/* 01 workflow — fragmented then settled */}
          <g className={zc("workflow")} style={cv({ "--accent": "#1f2328" })}>
            <rect className="frag" x="60" y="112" width="104" height="24" rx="3" style={cv({ "--dx": "-26px", "--dy": "-30px", "--r": "-8deg", "--d": "0s" })} />
            <rect className="frag" x="60" y="148" width="104" height="24" rx="3" style={cv({ "--dx": "34px", "--dy": "-14px", "--r": "6deg", "--d": ".05s" })} />
            <rect className="frag" x="60" y="184" width="104" height="24" rx="3" style={cv({ "--dx": "-18px", "--dy": "10px", "--r": "4deg", "--d": ".1s" })} />
            <rect className="frag" x="60" y="220" width="104" height="24" rx="3" style={cv({ "--dx": "30px", "--dy": "24px", "--r": "-6deg", "--d": ".15s" })} />
            <rect className="frag" x="60" y="256" width="104" height="24" rx="3" style={cv({ "--dx": "-30px", "--dy": "34px", "--r": "9deg", "--d": ".2s" })} />
          </g>

          {/* 02 context layer */}
          <g className={zc("context")} style={cv({ "--accent": "#c07a33" })}>
            <rect className="draw" pathLength={1} style={cv({ "--d": ".15s" })} x="255" y="96" width="180" height="208" rx="10" />
            <line className="draw" pathLength={1} style={cv({ "--d": ".2s" })} x1="278" y1="132" x2="412" y2="132" />
            <line className="draw" pathLength={1} style={cv({ "--d": ".24s" })} x1="278" y1="168" x2="412" y2="168" />
            <line className="draw" pathLength={1} style={cv({ "--d": ".28s" })} x1="278" y1="204" x2="412" y2="204" />
            <line className="draw" pathLength={1} style={cv({ "--d": ".32s" })} x1="278" y1="240" x2="412" y2="240" />
            <circle className="draw" pathLength={1} style={cv({ "--d": ".34s" })} cx="278" cy="132" r="3.5" />
            <circle className="draw" pathLength={1} style={cv({ "--d": ".36s" })} cx="278" cy="204" r="3.5" />
            <circle className="draw" pathLength={1} style={cv({ "--d": ".38s" })} cx="412" cy="168" r="3.5" />
          </g>

          {/* 03 deterministic rule */}
          <g className={zc("deterministic")} style={cv({ "--accent": "#1a7f37" })}>
            <rect className="draw" pathLength={1} style={cv({ "--d": ".22s" })} x="520" y="116" width="180" height="66" rx="8" />
            <line className="draw" pathLength={1} style={cv({ "--d": ".26s" })} x1="544" y1="149" x2="620" y2="149" />
            <path className="draw" pathLength={1} style={cv({ "--d": ".3s" })} d="M636 140 l10 10 l18 -20" />
          </g>

          {/* 04 agent (governed intelligence) */}
          <g className={zc("intelligence")} style={cv({ "--accent": "#c07a33" })}>
            <rect className="draw" pathLength={1} style={cv({ "--d": ".26s" })} x="520" y="226" width="180" height="66" rx="8" />
            <circle className="draw" pathLength={1} style={cv({ "--d": ".3s" })} cx="556" cy="259" r="12" />
            <line className="draw" pathLength={1} style={cv({ "--d": ".33s" })} x1="584" y1="252" x2="668" y2="252" />
            <line className="draw" pathLength={1} style={cv({ "--d": ".35s" })} x1="584" y1="266" x2="648" y2="266" />
          </g>

          {/* 05 governance gate + human (accountable execution) */}
          <g className={zc("evaluation")} style={cv({ "--accent": "#1a7f37" })}>
            <path className="draw" pathLength={1} style={cv({ "--d": ".42s" })} d="M812 132 h-20 v144 h20" />
            <path className="draw" pathLength={1} style={cv({ "--d": ".44s" })} d="M888 132 h20 v144 h-20" />
            <path className="draw check" pathLength={1} style={cv({ "--d": ".62s" })} d="M836 206 l14 15 l26 -34" />
            <circle className="draw" pathLength={1} style={cv({ "--d": ".5s" })} cx="850" cy="112" r="9" />
          </g>

          {/* 06 measurable value + operations */}
          <g className={zc("operations")} style={cv({ "--accent": "#1a7f37" })}>
            <line className="draw" pathLength={1} style={cv({ "--d": ".55s" })} x1="988" y1="300" x2="1150" y2="300" />
            <rect className="bar" x="1000" y="250" width="26" height="50" style={cv({ "--d": ".7s" })} />
            <rect className="bar" x="1040" y="214" width="26" height="86" style={cv({ "--d": ".78s" })} />
            <rect className="bar" x="1080" y="176" width="26" height="124" style={cv({ "--d": ".86s" })} />
            <rect className="bar" x="1120" y="138" width="26" height="162" style={cv({ "--d": ".94s" })} />
          </g>
        </svg>

        <div className="engine-captions">
          <span>Fragmented work</span><span>Connected context</span><span>Governed intelligence</span><span>Accountable execution</span><span>Measurable value</span>
        </div>
        <button type="button" className="engine-replay" onClick={replay}>↺ Replay transformation</button>
      </div>

      <div className="engine-controls">
        <div className="cap-list" role="tablist" aria-label="Capabilities">
          {CAPS.map((c) => (
            <button key={c.id} type="button" role="tab" aria-selected={active === c.id}
              className={`cap${active === c.id ? " on" : ""}`} onClick={() => setActive(active === c.id ? null : c.id)}>
              <span>{c.n}</span>{c.label}
            </button>
          ))}
        </div>
        <div className="cap-detail" role="region" aria-live="polite">
          {cur ? (
            <>
              <p className="cap-msg">{cur.msg}</p>
              <ul>{cur.tools.map((t) => <li key={t}>{t}</li>)}</ul>
            </>
          ) : (
            <p className="cap-msg cap-overview">Fragmented work becomes connected context, then governed intelligence, then accountable execution — producing measurable value that loops back into the workflow. Select a capability to see how each layer is engineered.</p>
          )}
        </div>
      </div>

      <div className="engine-cta">
        <ArrowLink href="/approach/framework">Explore the delivery framework</ArrowLink>
        <ArrowLink href="mailto:hareesh.b3@gmail.com">Discuss a workflow</ArrowLink>
      </div>
    </section>
  );
}
