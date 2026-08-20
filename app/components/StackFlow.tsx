import Link from "next/link";

// The 7-step ENTERPRISE AI Transformation framework (Bhanu's own methodology).
// Home section shows the spine + essence only; full detail lives on
// /approach/framework.
type Step = { n: string; name: string; essence: string; color: string };

const STEPS: Step[] = [
  { n: "01", name: "Establish outcome", essence: "Start with the business result, not the model.", color: "#0969da" },
  { n: "02", name: "Navigate real work", essence: "Map the actual process — exceptions, workarounds, tribal knowledge.", color: "#8250df" },
  { n: "03", name: "Transform workflow", essence: "Split work into deterministic, AI-judgement and human zones.", color: "#1a7f37" },
  { n: "04", name: "Engineer context", essence: "Rent the intelligence. Own the context.", color: "#bc4c00" },
  { n: "05", name: "Release safely", essence: "Grant autonomy action by action: sandbox → shadow → supervised.", color: "#cf222e" },
  { n: "06", name: "Prove value", essence: "Evaluate accuracy, value, risk and adoption — never one number.", color: "#0a7ea4" },
  { n: "07", name: "Institutionalise", essence: "Turn every production outcome into organisational learning.", color: "#1f2328" },
];

export function StackFlow() {
  return (
    <section className="stack-flow">
      <div className="flow-head">
        <span className="section-index">DELIVERY FRAMEWORK · HOW I TRANSFORM ENTERPRISE WORKFLOWS</span>
        <h2>Seven steps from a business outcome<br />to governed, evaluated AI.</h2>
        <p>I don&rsquo;t install AI tools — I redesign critical workflows around governed intelligence: domain context, deterministic systems, specialised agents and accountable human decisions.</p>
      </div>

      <div className="flow-rail flow-rail-7">
        {STEPS.map((s, i) => (
          <div className="flow-stage" style={{ ["--catcolor" as string]: s.color }} key={s.n}>
            <div className="flow-node">
              <span>{s.n}</span>
              <h3>{s.name}</h3>
            </div>
            <p className="flow-essence">{s.essence}</p>
            {i < STEPS.length - 1 && <i className="flow-arrow" aria-hidden="true">→</i>}
          </div>
        ))}
      </div>

      <div className="flow-loop">
        <span aria-hidden="true">↺</span>
        Learning, evaluation and feedback loop back into the workflow — not merely the prompt
      </div>

      <Link className="arrow-link flow-cta" href="/approach/framework">
        Read the full delivery framework<span>↗</span>
      </Link>
    </section>
  );
}
