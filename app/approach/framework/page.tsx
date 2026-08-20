import { Fragment } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Enterprise AI Transformation Delivery Framework — Bhanu Harish Bandreddy",
  description:
    "A repeatable framework, toolset and operating process for delivering accurate, governed enterprise AI transformation — from business outcome to evaluated production.",
};

const STEPS: [string, string, string][] = [
  ["01", "Establish the business outcome", "Start with the business result, its owner and a measurable baseline — not the model, chatbot or agent."],
  ["02", "Navigate the real work", "Discover the actual process: exceptions, workarounds, tribal knowledge, approvals and failure paths."],
  ["03", "Transform the workflow", "Split every workflow into deterministic, AI-judgement and human-accountability zones."],
  ["04", "Engineer enterprise context", "Rent the intelligence; own the context, evidence, decisions and audit."],
  ["05", "Release through controlled autonomy", "Grant autonomy action by action: sandbox, shadow, supervised, controlled."],
  ["06", "Prove accuracy and business value", "Evaluate accuracy, value, risk and adoption — never one generic accuracy number."],
  ["07", "Institutionalise the learning loop", "Turn every production outcome into durable organisational knowledge."],
];

const OBJECTIVES: [string, string][] = [
  ["Build an underwriting copilot", "Reduce underwriting preparation from 45 to 15 minutes"],
  ["Implement an AI chatbot", "Resolve 40% of product questions without escalation"],
  ["Automate proposal generation", "Generate compliant proposals in under five minutes"],
  ["Use agents for sales", "Improve needs-analysis completion and conversion rates"],
];

const ZONES: [string, string, string][] = [
  ["Deterministic", "Calculations, eligibility, validation and mandatory rules", "APIs, rule engines and conventional software"],
  ["AI judgement", "Extraction, classification, summarisation, recommendation and drafting", "Models and specialised agents"],
  ["Human accountability", "High-risk approval, overrides, exceptions and regulated decisions", "Named human approver"],
];

const AUTONOMY: [string, string, string][] = [
  ["Sandbox", "Works with test or synthetic data", "Experts assess feasibility"],
  ["Shadow", "Processes real cases without affecting operations", "Compare AI with actual outcomes"],
  ["Supervised", "Recommends or drafts actions", "Human reviews before execution"],
  ["Controlled autonomy", "Executes approved low-risk actions", "Humans monitor exceptions and thresholds"],
];

const CONTRACT = [
  "Observe the authorised state.",
  "Retrieve relevant context and evidence.",
  "Produce a structured action.",
  "Validate rules, permissions and safety.",
  "Execute through an authorised enterprise service.",
  "Verify the result.",
  "Record evidence, cost and outcome.",
  "Escalate exceptions.",
  "Capture human corrections.",
];

const TOOLSET: [string, string][] = [
  ["Discovery", "Interviews, process observation, Miro/FigJam and process-mining tools"],
  ["Requirements", "BRD, User Action / System Reaction SRS and decision tables"],
  ["Knowledge ingestion", "Microsoft Graph and SharePoint / OneDrive / Outlook / Teams connectors"],
  ["Operational data", "PostgreSQL, MongoDB and CRM / core-system APIs"],
  ["Context retrieval", "Vector search, metadata filtering and hybrid retrieval"],
  ["Enterprise relationships", "Canonical data model, ontology and context graph"],
  ["Model access", "Model gateway / router across cloud, local and specialist models"],
  ["Orchestration", "Node.js services, workflow engines or agent frameworks"],
  ["Deterministic controls", "Rules engine, schemas, validators and API policies"],
  ["Evaluation", "Golden datasets, automated graders and human review"],
  ["Observability", "Traces, prompts, evidence, actions, latency and cost"],
  ["Security", "IAM, role-based access, secrets management, encryption and DLP"],
  ["Delivery", "GitHub, CI/CD, infrastructure as code and isolated environments"],
  ["Business monitoring", "BI dashboards linked to operational outcomes"],
];

const GATES: [string, string][] = [
  ["Outcome gate", "Is there a measurable business problem with an accountable owner?"],
  ["Design gate", "Are workflow, rules, exceptions and responsibilities documented?"],
  ["Data gate", "Is the context authorised, traceable, sufficient and permission-controlled?"],
  ["Accuracy gate", "Has the solution passed functional, adversarial and domain evaluations?"],
  ["Production gate", "Are monitoring, rollback, human escalation and ownership operational?"],
];

const TEAM = [
  "Executive / business sponsor", "Product or transformation owner", "Domain / process expert",
  "Business analyst", "AI deployment architect", "Full-stack / AI engineers",
  "Data / integration engineer", "Security / compliance representative",
  "QA and evaluation owner", "Change / adoption lead",
];

const CADENCE: [string, string, string[]][] = [
  ["Weeks 1–2", "Discover", ["Define the outcome", "Map the actual workflow", "Establish the baseline", "Identify data and risks", "Select one bounded workflow"]],
  ["Weeks 3–4", "Design", ["Redesign the workflow", "Separate AI, deterministic and human work", "Define context and integrations", "Build the evaluation dataset", "Agree acceptance thresholds"]],
  ["Weeks 5–8", "Build & Prove", ["Build the smallest end-to-end workflow", "Test with real cases", "Conduct shadow processing", "Measure accuracy, value, latency, cost", "Resolve exceptions"]],
  ["Weeks 9–12", "Supervised Production", ["Release to a controlled group", "Require approval for material actions", "Monitor failures and overrides", "Train users", "Establish production ownership"]],
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
  "Increase autonomy gradually based on demonstrated performance.",
  "Turn every production outcome into organisational learning.",
];

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="fw-table-wrap">
      <table className="fw-table">
        <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function FrameworkPage() {
  return (
    <PageShell>
      <section className="page-hero fw-hero">
        <Link className="fw-back" href="/approach">← Back to approach</Link>
        <span className="kicker">DELIVERY FRAMEWORK</span>
        <h1>Enterprise AI Transformation <em>Delivery Framework.</em></h1>
        <p>Successful enterprise AI transformation is not about installing an AI tool. It is about redesigning a measurable business workflow around AI — while retaining human accountability, enterprise context, security and control. This is my repeatable framework, toolset and operating process for delivering it.</p>
      </section>

      <section className="fw-section">
        <span className="fw-step">THE ENTERPRISE AI FRAMEWORK</span>
        <h2>Seven steps, one continuous loop.</h2>
        <div className="fw-diagram">
          {STEPS.map(([n, name], i) => (
            <Fragment key={n}>
              <div className="fw-chip">{n} · {name}</div>
              {i < STEPS.length - 1 && <i>→</i>}
            </Fragment>
          ))}
          <div className="loop">↺ Step 7 and evaluation feed back into step 3 — the workflow keeps improving</div>
        </div>
        <ol className="fw-ol">
          {STEPS.map(([, name, essence]) => <li key={name}><strong>{name}.</strong> {essence}</li>)}
        </ol>
      </section>

      <section className="fw-section alt">
        <span className="fw-step">STEP 1 · ESTABLISH THE OUTCOME</span>
        <h2>Do not begin with the model. Begin with the business result.</h2>
        <p>What must improve, who owns it, what is the current baseline, what decision causes the problem, and what would constitute measurable success?</p>
        <Table head={["Weak AI objective", "Correct transformation objective"]} rows={OBJECTIVES} />
        <h3>Required deliverable — AI Outcome Charter</h3>
        <ul className="fw-list">
          {["Business problem", "Process owner", "Users affected", "Current baseline", "Target outcome", "Financial / operational value", "Risk boundary", "Pilot duration", "Go / no-go criteria"].map((x) => <li key={x}>{x}</li>)}
        </ul>
      </section>

      <section className="fw-section">
        <span className="fw-step">STEP 2 · NAVIGATE THE REAL WORK</span>
        <h2>Enterprise processes rarely run as the SOP describes.</h2>
        <p>Interview the people who perform, review and approve the work — not only senior management. Score candidate workflows on impact, volume, manual effort, repeatability, data readiness, rule clarity, AI suitability, integration readiness, risk and adoption. Prioritise high value, sufficient repeatability, accessible data and manageable risk.</p>
        <ul className="fw-list">
          {["As-is workflow", "Exception catalogue", "Decision inventory", "Systems & data map", "Baseline performance", "Prioritised use-case register"].map((x) => <li key={x}>{x}</li>)}
        </ul>
      </section>

      <section className="fw-section alt">
        <span className="fw-step">STEP 3 · TRANSFORM THE WORKFLOW</span>
        <h2>Three execution zones — never blur them.</h2>
        <p>AI should not reason through something that should be a deterministic rule. Equally, rigid software should not be forced to handle ambiguous language, documents or conversations.</p>
        <Table head={["Zone", "What belongs here", "Execution method"]} rows={ZONES} />
        <h3>Functional specification extends User Action → System Reaction</h3>
        <ul className="fw-list">
          {["User action", "System reaction", "AI responsibility", "Deterministic rule", "Evidence required", "Exception", "Human approval", "Audit event", "Success measure"].map((x) => <li key={x}>{x}</li>)}
        </ul>
      </section>

      <section className="fw-section">
        <span className="fw-step">STEP 4 · ENGINEER ENTERPRISE CONTEXT</span>
        <h2>Rent the intelligence. Own the context.</h2>
        <p>The model may change. Enterprise knowledge, decisions, relationships, operating history and evidence must remain owned by the organisation — permissioned, inspectable, auditable, portable and model-neutral.</p>
        <div className="fw-diagram">
          <div className="fw-chip">Users & channels</div><i>→</i>
          <div className="fw-chip" style={{ ["--catcolor" as string]: "#8250df" }}>Workflow & agent orchestration</div><i>→</i>
          <div className="fw-chip" style={{ ["--catcolor" as string]: "#bc4c00" }}>Enterprise context layer</div><i>→</i>
          <div className="fw-chip">Systems of record</div>
          <i>+</i><div className="fw-chip" style={{ ["--catcolor" as string]: "#1a7f37" }}>Model router</div><i>→</i>
          <div className="fw-chip">Cloud · local · specialist models</div>
          <div className="loop">Context layer also holds knowledge & ontology, and evidence & audit</div>
        </div>
        <Table
          head={["Capability", "What it does", "What it does not do"]}
          rows={[
            ["API / MCP", "Connects agents to tools and systems", "Does not create organisational memory"],
            ["RAG", "Retrieves relevant information", "Does not preserve relationships or decision history"],
            ["Context graph", "Connects entities, events, evidence and decisions", "Does not replace operational systems"],
            ["Model", "Interprets, reasons and generates", "Should not become the system of record"],
            ["Orchestrator", "Coordinates steps, tools and agents", "Should not bypass enterprise controls"],
          ]}
        />
      </section>

      <section className="fw-section alt">
        <span className="fw-step">STEP 5 · RELEASE THROUGH CONTROLLED AUTONOMY</span>
        <h2>Grant autonomy action by action — not agent by agent.</h2>
        <Table head={["Stage", "AI behaviour", "Human role"]} rows={AUTONOMY} />
        <h3>Agent execution contract — every action</h3>
        <ol className="fw-ol">{CONTRACT.map((c) => <li key={c}>{c}</li>)}</ol>
        <p>Prefer controlled JSON actions over unrestricted natural-language instructions for system execution.</p>
      </section>

      <section className="fw-section">
        <span className="fw-step">STEP 6 · PROVE ACCURACY & VALUE</span>
        <h2>A demonstration shows AI can work. An evaluation proves it works reliably enough.</h2>
        <p>Build a golden dataset — normal cases, complex cases, historical failures, missing-data, contradictory evidence, multilingual, permission tests, prompt-injection attempts, policy edge cases and out-of-scope requests. Do not accept a single generic accuracy percentage.</p>
        <ul className="fw-list">
          {["Task success rate", "Evidence-grounded accuracy", "Unsupported-answer rate", "Human acceptance rate", "Override rate", "Exception rate", "End-to-end completion time", "Cost per completed workflow", "Business outcome improvement", "Severity-weighted failure rate"].map((x) => <li key={x}>{x}</li>)}
        </ul>
      </section>

      <section className="fw-section alt">
        <span className="fw-step">STEP 7 · INSTITUTIONALISE THE LEARNING LOOP</span>
        <h2>The durable advantage is the organisation&rsquo;s growing knowledge of how to operate AI.</h2>
        <div className="fw-diagram">
          <div className="fw-chip">Production work</div><i>→</i>
          <div className="fw-chip">Outcomes</div><i>→</i>
          <div className="fw-chip">Human feedback</div><i>→</i>
          <div className="fw-chip">Evaluations</div><i>→</i>
          <div className="fw-chip">Workflow & context updates</div>
          <div className="loop">↺ …which feed straight back into production work</div>
        </div>
        <p>Update the workflow, rules, context and evaluations — not merely the prompt.</p>
      </section>

      <section className="fw-section">
        <span className="fw-step">ENTERPRISE AI TOOLSET</span>
        <h2>Tools are replaceable components — not the strategy.</h2>
        <p>Avoid selecting an agent framework, vector database or model before the workflow and control requirements are known.</p>
        <Table head={["Capability", "Suitable tool category"]} rows={TOOLSET} />
      </section>

      <section className="fw-section alt">
        <span className="fw-step">DELIVERY GOVERNANCE</span>
        <h2>Five gates. No gate approved by the AI team alone.</h2>
        <p>Business, technology, security, risk / compliance and operational users share accountability.</p>
        <Table head={["Gate", "Approval question"]} rows={GATES} />
        <h3>Recommended transformation team</h3>
        <ul className="fw-list">{TEAM.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>

      <section className="fw-section">
        <span className="fw-step">12-WEEK OPERATING CADENCE</span>
        <h2>From discovery to supervised production in one quarter.</h2>
        <div className="fw-cadence">
          {CADENCE.map(([weeks, title, items]) => (
            <article key={weeks}>
              <span>{weeks}</span>
              <h3>{title}</h3>
              <ul>{items.map((it) => <li key={it}>{it}</li>)}</ul>
            </article>
          ))}
        </div>
        <p>Scale only when the workflow demonstrates measurable value, acceptable risk, repeatable performance, reliable integration, user adoption and sustainable unit economics.</p>
      </section>

      <section className="fw-doctrine">
        <span className="section-index">TRANSFORMATION DOCTRINE</span>
        <h2>Ten principles that survive every model release.</h2>
        <ol>{DOCTRINE.map((d) => <li key={d}>{d}</li>)}</ol>
      </section>

      <section className="fw-quote">
        <span className="section-index">POSITIONING</span>
        <blockquote>We do not sell generic AI tools. We redesign critical enterprise workflows around <em>governed intelligence</em> — connecting domain context, deterministic systems, specialised agents and accountable human decisions.</blockquote>
      </section>
    </PageShell>
  );
}
