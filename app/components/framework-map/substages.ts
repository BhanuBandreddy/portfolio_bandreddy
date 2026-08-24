import { deriveArchetype, deriveHeight, deriveSize, packLayout, type LayoutInput } from './core/geometry-layout'
import type { ArchEdge, ArchFlow, ArchNode, Group } from './core/types'

/**
 * The inner workflow of each of the seven framework stages — the same
 * isometric-blocks-and-connectors engine, one scene per stage, so each
 * top-level building gets its own supporting ecosystem rather than being
 * a flat card.
 *
 * Same measurement discipline as the top-level graph: geometry is derived
 * from real per-item text taken from the source document (word/character
 * count of the specific bullet, table row or mermaid node), not typed by
 * hand. Two stages — Engineer context and Institutionalise — reuse the
 * source document's *own* mermaid diagrams verbatim as their node/edge
 * set; nothing was invented there, only redrawn. The other five stages
 * are authored from their real tables and lists, chained in the order
 * the document itself presents them, which is the one sequence that is
 * genuinely traceable when the document doesn't supply a dependency graph
 * of its own.
 *
 * A handful of nodes get an authored archetype override to fin-row: where
 * the document itself frames something as an N-item collection (the
 * 9-field Outcome Charter, the 9-field functional spec, the 9-step
 * execution contract, the 10-row scoring table, the 10 critical metrics),
 * fin-row is what that collection *is*, not a stylistic choice.
 */

type Draft = Omit<ArchNode, 'archetype' | 'params' | 'height' | 'footprint'> & {
  measure: { chars: number; count?: number }
  archetypeOverride?: ArchNode['archetype']
}

const CHAR_SCALE = 10 // bridges a table-row/bullet's character count to the code-line calibration deriveHeight expects

function build(groups: Group[], drafts: Draft[]): { groups: readonly Group[]; nodes: readonly ArchNode[] } {
  const withGeometry = drafts.map((d) => {
    const measure = { loc: d.measure.chars * CHAR_SCALE, count: d.measure.count ?? 1 }
    const derived = deriveArchetype(measure)
    const archetype = d.archetypeOverride ?? derived.archetype
    const params = d.archetypeOverride ? (d.measure.count ? { count: d.measure.count } : undefined) : derived.params
    const height = deriveHeight(measure)
    const size = deriveSize(archetype, params, measure)
    return { ...d, archetype, params, height, size }
  })
  const inputs: LayoutInput<(typeof withGeometry)[number]>[] = withGeometry.map((n) => ({ item: n, group: n.group, size: n.size }))
  const footprints = packLayout(inputs, groups.map((g) => g.id))
  const nodes = withGeometry.map((n) => {
    const { measure, archetypeOverride, size, ...rest } = n
    void measure; void archetypeOverride; void size
    return { ...rest, footprint: footprints.get(n)! }
  })
  return { groups, nodes }
}

export type SubStage = {
  slug: string
  parentId: string
  title: string
  kicker: string
  intro: { title: string; lede: string; whatItDoes: string; howItsBuilt: string }
  groups: readonly Group[]
  nodes: readonly ArchNode[]
  edges: readonly ArchEdge[]
  flows: readonly ArchFlow[]
}

/* ---------------------------------------------------------------- 1. Establish */

const establish = (() => {
  const groups: Group[] = [
    { id: 'ask', label: 'Ask before you build' },
    { id: 'define', label: 'Define the charter' },
  ]
  const drafts: Draft[] = [
    { id: 'q-result', code: 'Q1', name: 'The business result', role: 'question one', group: 'ask', measure: { chars: 36 },
      whatItDoes: 'What business result must improve. Not a system, not a feature — a number that is currently wrong: too slow, too costly, too error-prone, too often escalated.',
      howItsBuilt: 'Asked before anything else in the document, because every weak objective in the reframing table starts from skipping exactly this question.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:40'] },
    { id: 'q-owner', code: 'Q2', name: 'The owner', role: 'question two', group: 'ask', measure: { chars: 23 },
      whatItDoes: 'Who owns that result. A named accountable person, not a department — the same person who signs the go/no-go decision later.',
      howItsBuilt: 'Kept separate from "the business result" on purpose: a result with no owner is a wish, not a charter line.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:41'] },
    { id: 'q-baseline', code: 'Q3', name: 'The current baseline', role: 'question three', group: 'ask', measure: { chars: 31 },
      whatItDoes: 'What is the current baseline. Underwriting prep at 45 minutes, escalation at 60%, whatever the number is today — measured before the project starts, not estimated after.',
      howItsBuilt: 'This is the number the [[go/no-go criteria]] gets compared against at the end, so it has to be captured now, while it is still uncontaminated by the pilot.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:42'] },
    { id: 'q-cause', code: 'Q4', name: 'The cause', role: 'question four', group: 'ask', measure: { chars: 47 },
      whatItDoes: 'What decision or activity actually causes the problem — the specific step in the specific workflow, not "the process is slow" in general.',
      howItsBuilt: 'This is what turns a vague complaint into something Navigate the real work can go and observe directly in the next stage.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:43'] },
    { id: 'q-success', code: 'Q5', name: 'The success measure', role: 'question five', group: 'ask', measure: { chars: 43 },
      whatItDoes: 'What would constitute measurable success — stated as a number and a direction before the model exists, so success cannot be redefined after the fact to match whatever was built.',
      howItsBuilt: 'The last of the five questions, and the one the reframing table is really about: "reduce prep time 45→15 minutes" is this question answered; "build a copilot" is this question skipped.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:44'] },
    { id: 'charter', code: 'CH', name: 'AI Outcome Charter', role: 'the required deliverable', group: 'define', measure: { chars: 44, count: 9 }, archetypeOverride: 'fin-row',
      whatItDoes: 'Nine fields: business problem, process owner, users affected, current baseline, target outcome, financial or operational value, risk boundary, pilot duration, go/no-go criteria.',
      howItsBuilt: 'Nine fields because that is what the five questions expand into once ownership, users, value and a pilot boundary are added — not a template invented separately from the questions.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:53-63'], stack: ['AI Outcome Charter'] },
    { id: 'reframe', code: 'RF', name: 'Reframe the objective', role: 'the test', group: 'define', measure: { chars: 94 },
      whatItDoes: '"Build an underwriting copilot" becomes "reduce underwriting preparation time from 45 to 15 minutes." Four such pairs sit side by side in the source document as the test for whether a charter is real.',
      howItsBuilt: 'Every weak objective in the pairing names a technology; every correct one names a number and a direction — the tell used to check a charter before it is approved.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:46-51'] },
  ]
  const { groups: g, nodes } = build(groups, drafts)
  const edges: ArchEdge[] = [
    { id: 'e-q1-q2', from: 'q-result', to: 'q-owner', kind: 'data', label: 'the result, named', flowIds: ['charter'] },
    { id: 'e-q2-q3', from: 'q-owner', to: 'q-baseline', kind: 'data', label: 'an accountable owner', flowIds: ['charter'] },
    { id: 'e-q3-q4', from: 'q-baseline', to: 'q-cause', kind: 'data', label: 'a measured baseline', flowIds: ['charter'] },
    { id: 'e-q4-q5', from: 'q-cause', to: 'q-success', kind: 'data', label: 'the causing decision', flowIds: ['charter'] },
    { id: 'e-q5-charter', from: 'q-success', to: 'charter', kind: 'call', label: 'a target, stated as a number', flowIds: ['charter'] },
    { id: 'e-charter-reframe', from: 'charter', to: 'reframe', kind: 'call', label: 'the drafted charter', flowIds: ['charter'] },
  ]
  const flows: ArchFlow[] = [
    { id: 'charter', name: 'Draft the charter', payload: 'an answer', summary: 'The five questions, answered in order, become the nine-field charter, then get tested against the reframing pairs.', route: edges.map((e) => e.id) },
  ]
  return { slug: 'establish', parentId: 'establish', title: 'Establish the outcome', kicker: 'STAGE 01',
    intro: { title: 'Establish the outcome', lede: 'Five questions, answered before anything is built.',
      whatItDoes: 'The stage that keeps the model out of the room until a result, an owner, a baseline and a success measure exist on paper.',
      howItsBuilt: 'The AI Outcome Charter is not a separate template — it is what the five questions look like once they are written down and signed.' },
    groups: g, nodes, edges, flows }
})()

/* ---------------------------------------------------------------- 2. Navigate */

const navigate = (() => {
  const groups: Group[] = [
    { id: 'discover', label: 'Discover the real work' },
    { id: 'score', label: 'Score and select' },
  ]
  const drafts: Draft[] = [
    { id: 'official', code: 'OF', name: 'Official process', role: 'what the SOP says', group: 'discover', measure: { chars: 18 },
      whatItDoes: 'The documented process — the SOP, the training slide, the org chart version of how the work happens.',
      howItsBuilt: 'Named first in the document deliberately, so its gap from the next node is the whole point of the stage rather than an afterthought.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:71'] },
    { id: 'actual', code: 'AC', name: 'Actual process, exceptions, tribal knowledge', role: 'what people really do', group: 'discover', measure: { chars: 120, count: 9 }, archetypeOverride: 'fin-row',
      whatItDoes: 'The actual process, exceptions, workarounds, tribal knowledge, approvals, unwritten decision rules, systems and data used, and failure and escalation paths — nine things found only by interviewing the people who do, review and approve the work.',
      howItsBuilt: 'Not senior management. The document is explicit that this list is discovered from the people performing the work, because the official process rarely explains the exceptions that actually consume the time.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:69-81'] },
    { id: 'scoring', code: 'SC', name: 'Workflow scoring', role: 'the 1–5 rubric', group: 'score', measure: { chars: 89, count: 10 }, archetypeOverride: 'fin-row',
      whatItDoes: 'Ten criteria, scored 1–5 each: business impact, volume, manual effort, repeatability, data readiness, rule clarity, AI suitability, integration readiness, risk, adoption readiness.',
      howItsBuilt: 'A comparable score across candidates, not a ranked gut feeling — the ten columns exist so two very different workflows can be placed on the same scale.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:87-98'] },
    { id: 'register', code: 'RG', name: 'Prioritised use-case register', role: 'the required deliverable', group: 'score', measure: { chars: 16 },
      whatItDoes: 'The output of scoring: workflows ranked by high value, sufficient repeatability, accessible data and manageable risk — the shortlist Transform the workflow actually starts from.',
      howItsBuilt: 'Sits alongside five other required deliverables — as-is workflow, exception catalogue, decision inventory, systems and data map, baseline performance — as the concrete artefact this stage has to produce.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:102-109'] },
  ]
  const { groups: g, nodes } = build(groups, drafts)
  const edges: ArchEdge[] = [
    { id: 'e-of-ac', from: 'official', to: 'actual', kind: 'data', label: 'the documented process', flowIds: ['select'] },
    { id: 'e-ac-sc', from: 'actual', to: 'scoring', kind: 'call', label: 'exceptions and tribal knowledge', flowIds: ['select'] },
    { id: 'e-sc-rg', from: 'scoring', to: 'register', kind: 'call', label: 'ten scores', flowIds: ['select'] },
  ]
  const flows: ArchFlow[] = [
    { id: 'select', name: 'Select the workflow', payload: 'a candidate workflow', summary: 'What the SOP says gets compared against what people actually do, then scored, then shortlisted.', route: edges.map((e) => e.id) },
  ]
  return { slug: 'navigate', parentId: 'navigate', title: 'Navigate the real work', kicker: 'STAGE 02',
    intro: { title: 'Navigate the real work', lede: 'The SOP is not the process. Find the one people actually run.',
      whatItDoes: 'Discovers the gap between the documented process and the real one, then scores every candidate workflow on the same ten-point rubric.',
      howItsBuilt: 'The register at the end is a ranked shortlist, not a wishlist — every entry has survived business impact, data readiness and risk scoring first.' },
    groups: g, nodes, edges, flows }
})()

/* ---------------------------------------------------------------- 3. Transform */

const transform = (() => {
  const groups: Group[] = [
    { id: 'zones', label: 'The three zones' },
    { id: 'spec', label: 'The functional spec' },
  ]
  const drafts: Draft[] = [
    { id: 'zone-det', code: 'DT', name: 'Deterministic', role: 'zone one', group: 'zones', measure: { chars: 124 },
      whatItDoes: 'Calculations, eligibility, validation and mandatory rules — executed by APIs, rule engines and conventional software, never by a model.',
      howItsBuilt: 'Listed first of the three zones because it is the one most often skipped: work that should be a deterministic rule, handed to a model instead.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:119'] },
    { id: 'zone-ai', code: 'AI', name: 'AI judgement', role: 'zone two', group: 'zones', measure: { chars: 121 },
      whatItDoes: 'Extraction, classification, summarisation, recommendation and drafting — executed by models and specialised agents, where ambiguity is the point, not a defect.',
      howItsBuilt: 'The document is symmetric about this: rigid software should not be forced to handle ambiguous language any more than a model should be asked to reason through a rule.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:120'] },
    { id: 'zone-human', code: 'HM', name: 'Human accountability', role: 'zone three', group: 'zones', measure: { chars: 115 },
      whatItDoes: 'High-risk approval, overrides, exceptions and regulated decisions — assigned to a named human approver, not a queue.',
      howItsBuilt: '"Named" is the operative word: an approval step with no accountable person attached is not a control, it is a formality.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:121'] },
    { id: 'spec', code: 'FS', name: 'Functional specification', role: 'the extended SRS', group: 'spec', measure: { chars: 36, count: 9 }, archetypeOverride: 'fin-row',
      whatItDoes: 'Nine fields per workflow step: user action, system reaction, AI responsibility, deterministic rule, evidence required, exception, human approval, audit event, success measure.',
      howItsBuilt: 'Deliberately an extension of the plain User Action → System Reaction spec, not a replacement for it — the smallest change that gives the three zones somewhere to be written down together.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:125-139'], stack: ['User Action / System Reaction SRS'] },
  ]
  const { groups: g, nodes } = build(groups, drafts)
  const edges: ArchEdge[] = [
    { id: 'e-det-ai', from: 'zone-det', to: 'zone-ai', kind: 'support', label: 'what is not ambiguous', flowIds: ['assign'] },
    { id: 'e-ai-human', from: 'zone-ai', to: 'zone-human', kind: 'support', label: 'what is not low-risk', flowIds: ['assign'] },
    { id: 'e-human-spec', from: 'zone-human', to: 'spec', kind: 'call', label: 'a zoned task', flowIds: ['assign'] },
  ]
  const flows: ArchFlow[] = [
    { id: 'assign', name: 'Assign the work', payload: 'one task', summary: 'Every task in the workflow lands in exactly one of the three zones, then gets written into the nine-field spec.', route: edges.map((e) => e.id) },
  ]
  return { slug: 'transform', parentId: 'transform', title: 'Transform the workflow', kicker: 'STAGE 03',
    intro: { title: 'Transform the workflow', lede: 'Three zones. Every task gets exactly one.',
      whatItDoes: 'Splits the shortlisted workflow into deterministic rules, AI judgement and human accountability, then specifies each step across nine fields.',
      howItsBuilt: 'Nothing here is a fourth zone or a fuzzy middle ground — the document is strict that a task belongs to one zone, decided by what kind of uncertainty it contains.' },
    groups: g, nodes, edges, flows }
})()

/* ---------------------------------------------------------------- 4. Engineer context — the document's own diagram, redrawn */

const context = (() => {
  const groups: Group[] = [
    { id: 'entry', label: 'Users & orchestration' },
    { id: 'context', label: 'The context layer' },
    { id: 'models', label: 'Models' },
  ]
  const drafts: Draft[] = [
    { id: 'users', code: 'US', name: 'Users and channels', role: 'where a request starts', group: 'entry', measure: { chars: 69 },
      whatItDoes: 'Every entry point a request can arrive through — the first node in the source document\'s own architecture diagram.',
      howItsBuilt: 'Drawn exactly as the document draws it: users and channels feed the orchestrator, nothing else.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:151'] },
    { id: 'orchestration', code: 'OR', name: 'Workflow and agent orchestration', role: 'the dispatcher', group: 'entry', measure: { chars: 69 },
      whatItDoes: 'Coordinates steps, tools and agents, and decides whether a request needs the context layer, the model router, or both.',
      howItsBuilt: 'One capability boundary the document states outright: the orchestrator should not bypass enterprise controls, even though it has the reach to.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:151-153', 'Enterprise_AI_Transformation_Delivery_Framework.md:195'] },
    { id: 'contextlayer', code: 'CX', name: 'Enterprise context layer', role: 'what the org keeps', group: 'context', measure: { chars: 39 },
      whatItDoes: 'Canonical entities, domain ontology, historical decisions, evidence lineage, permissions and agent memory — [[owned]] by the organisation, independent of which model is in use.',
      howItsBuilt: '"Rent the intelligence, own the context" is the one line the whole stage exists to justify — this node is the "own the context" half made concrete.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:145', 'Enterprise_AI_Transformation_Delivery_Framework.md:152'] },
    { id: 'systems', code: 'SY', name: 'Systems of record', role: 'the source of truth', group: 'context', measure: { chars: 32 },
      whatItDoes: 'SharePoint, CRM, PostgreSQL, MongoDB, core insurance systems — the operational systems the context layer reads from, never replaces.',
      howItsBuilt: 'The document states a model should not become the system of record; this node is drawn as a leaf specifically to keep that boundary visible.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:154', 'Enterprise_AI_Transformation_Delivery_Framework.md:194'] },
    { id: 'knowledge', code: 'KN', name: 'Knowledge and ontology', role: 'how entities relate', group: 'context', measure: { chars: 37 },
      whatItDoes: 'The domain ontology and the context graph — what connects entities, events, evidence and decisions to each other, which retrieval alone does not preserve.',
      howItsBuilt: 'RAG retrieves relevant information but, per the document\'s own capability table, does not automatically preserve relationships — this is the node that does.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:155', 'Enterprise_AI_Transformation_Delivery_Framework.md:192-193'] },
    { id: 'evidence', code: 'EV', name: 'Evidence and audit', role: 'what proves a decision', group: 'context', measure: { chars: 33 },
      whatItDoes: 'Complete audit traces and evidence lineage — the record that lets a claims or underwriting decision be reconstructed later.',
      howItsBuilt: 'Context must be permissioned, inspectable, auditable, portable and model-neutral; this node is where "inspectable" and "auditable" actually live.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:156', 'Enterprise_AI_Transformation_Delivery_Framework.md:197'] },
    { id: 'modelrouter', code: 'MR', name: 'Model router', role: 'the swap point', group: 'models', measure: { chars: 27 },
      whatItDoes: 'Routes a prompt to the right model — cloud, local or specialist — without the context layer knowing or caring which one answered.',
      howItsBuilt: 'This is the node that makes "rent the intelligence" literal: it is the only thing that changes when a model is swapped.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:153'] },
    { id: 'models', code: 'ML', name: 'Cloud, local or specialist models', role: 'rented, not owned', group: 'models', measure: { chars: 48 },
      whatItDoes: 'The models themselves — interpreting, reasoning and generating, replaceable at any time because nothing durable is stored here.',
      howItsBuilt: 'The last node in the document\'s own diagram, drawn as a leaf on purpose: nothing points out of it back into the context layer.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:157'] },
  ]
  const { groups: g, nodes } = build(groups, drafts)
  const edges: ArchEdge[] = [
    { id: 'e-us-or', from: 'users', to: 'orchestration', kind: 'call', label: 'a request', flowIds: ['route-context'] },
    { id: 'e-or-cx', from: 'orchestration', to: 'contextlayer', kind: 'call', label: 'a request needing context', flowIds: ['route-context'] },
    { id: 'e-or-mr', from: 'orchestration', to: 'modelrouter', kind: 'call', label: 'a prompt', flowIds: ['route-model'] },
    { id: 'e-cx-sy', from: 'contextlayer', to: 'systems', kind: 'data', label: 'a lookup', flowIds: ['route-context'] },
    { id: 'e-cx-kn', from: 'contextlayer', to: 'knowledge', kind: 'data', label: 'an entity relationship', flowIds: [] },
    { id: 'e-cx-ev', from: 'contextlayer', to: 'evidence', kind: 'data', label: 'an audit trace', flowIds: [] },
    { id: 'e-mr-ml', from: 'modelrouter', to: 'models', kind: 'call', label: 'the routed prompt', flowIds: ['route-model'] },
  ]
  const flows: ArchFlow[] = [
    { id: 'route-context', name: 'Answer from context', payload: 'a request', summary: 'A request is orchestrated into the context layer and resolved against systems of record.', route: ['e-us-or', 'e-or-cx', 'e-cx-sy'] },
    { id: 'route-model', name: 'Route to a model', payload: 'a prompt', summary: 'The orchestrator sends a prompt through the model router to whichever model is currently assigned.', route: ['e-or-mr', 'e-mr-ml'] },
  ]
  return { slug: 'context', parentId: 'context', title: 'Engineer enterprise context', kicker: 'STAGE 04',
    intro: { title: 'Engineer enterprise context', lede: 'Rent the intelligence. Own the context.',
      whatItDoes: 'Redrawn directly from the source document\'s own architecture diagram: users and orchestration on one side, the owned context layer in the middle, models on the other — swappable without disturbing anything else.',
      howItsBuilt: 'The only sub-workflow of the seven where every node and edge is taken verbatim from a diagram the document itself already drew.' },
    groups: g, nodes, edges, flows }
})()

/* ---------------------------------------------------------------- 5. Release safely */

const release = (() => {
  const groups: Group[] = [
    { id: 'ladder', label: 'The autonomy ladder' },
    { id: 'contract', label: 'The execution contract' },
  ]
  const drafts: Draft[] = [
    { id: 'sandbox', code: 'SB', name: 'Sandbox', role: 'rung one', group: 'ladder', measure: { chars: 76 },
      whatItDoes: 'Works with test or synthetic data while experts assess feasibility — nothing here touches a real customer or a real case.',
      howItsBuilt: 'The floor of the ladder: no autonomy is granted from any other rung until sandbox has actually been run, not skipped.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:207'] },
    { id: 'shadow', code: 'SH', name: 'Shadow', role: 'rung two', group: 'ladder', measure: { chars: 96 },
      whatItDoes: 'Processes real cases without affecting operations, so the AI\'s answer can be compared against what actually happened — silently, with no one downstream seeing the output yet.',
      howItsBuilt: 'The comparison this rung produces is what the Prove accuracy stage later turns into evidence-grounded accuracy and override-rate numbers.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:208'] },
    { id: 'supervised', code: 'SU', name: 'Supervised', role: 'rung three', group: 'ladder', measure: { chars: 78 },
      whatItDoes: 'Recommends or drafts actions that a human reviews before execution — the AI has an opinion now, but no unilateral authority.',
      howItsBuilt: 'This is the rung the sales-agent example lives on: draft a recommendation, yes; change a premium calculation, never.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:209', 'Enterprise_AI_Transformation_Delivery_Framework.md:214-221'] },
    { id: 'controlled', code: 'CA', name: 'Controlled autonomy', role: 'rung four', group: 'ladder', measure: { chars: 103 },
      whatItDoes: 'Executes approved low-risk actions on its own, while humans monitor exceptions and thresholds rather than every individual case.',
      howItsBuilt: 'Granted action by action, not agent by agent — the same agent can sit on this rung for one action type and rung three for another, simultaneously.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:210', 'Enterprise_AI_Transformation_Delivery_Framework.md:212'] },
    { id: 'contract', code: 'EC', name: 'Agent execution contract', role: 'what every action must do', group: 'contract', measure: { chars: 32, count: 9 }, archetypeOverride: 'fin-row',
      whatItDoes: 'Nine steps every agent action runs through: observe, retrieve context, produce a structured action, validate, execute via an authorised service, verify, record, escalate exceptions, capture corrections.',
      howItsBuilt: 'Ends on "capture human corrections" on purpose — the contract is what feeds the learning loop in stage seven, not a one-off safety checklist.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:225-236'], stack: ['Structured JSON actions'] },
  ]
  const { groups: g, nodes } = build(groups, drafts)
  const edges: ArchEdge[] = [
    { id: 'e-sb-sh', from: 'sandbox', to: 'shadow', kind: 'call', label: 'feasibility, confirmed', flowIds: ['climb'] },
    { id: 'e-sh-su', from: 'shadow', to: 'supervised', kind: 'call', label: 'accuracy, compared', flowIds: ['climb'] },
    { id: 'e-su-ca', from: 'supervised', to: 'controlled', kind: 'call', label: 'a reviewed recommendation', flowIds: ['climb'] },
    { id: 'e-ca-ec', from: 'controlled', to: 'contract', kind: 'support', label: 'an authorised action', flowIds: ['climb'] },
  ]
  const flows: ArchFlow[] = [
    { id: 'climb', name: 'Earn autonomy', payload: 'one action type', summary: 'An action moves up the ladder one rung at a time, then runs inside the nine-step execution contract once it arrives.', route: edges.map((e) => e.id) },
  ]
  return { slug: 'release', parentId: 'release', title: 'Release through controlled autonomy', kicker: 'STAGE 05',
    intro: { title: 'Release through controlled autonomy', lede: 'Autonomy is earned action by action, not agent by agent.',
      whatItDoes: 'Moves each action type up a four-rung ladder — sandbox, shadow, supervised, controlled — and specifies the nine steps every authorised action must run through once it arrives.',
      howItsBuilt: 'The same agent can occupy two different rungs at once, because the document grants autonomy per action, never per agent as a whole.' },
    groups: g, nodes, edges, flows }
})()

/* ---------------------------------------------------------------- 6. Prove value */

const prove = (() => {
  const groups: Group[] = [
    { id: 'dimensions', label: 'Four dimensions' },
    { id: 'evidence', label: 'The evaluation set' },
  ]
  const drafts: Draft[] = [
    { id: 'dim-accuracy', code: 'AC', name: 'Accuracy', role: 'dimension one', group: 'dimensions', measure: { chars: 80 },
      whatItDoes: 'Correct extraction, classification, recommendation or calculation — measured against a golden dataset, not a demo run.',
      howItsBuilt: 'The document is explicit that this is one of four dimensions, not the whole evaluation — accuracy alone is exactly the generic percentage it warns against.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:247'] },
    { id: 'dim-value', code: 'BV', name: 'Business value', role: 'dimension two', group: 'dimensions', measure: { chars: 83 },
      whatItDoes: 'Cycle time, cost per case, conversion, leakage or productivity — the numbers that connect back to the baseline set in Establish the outcome.',
      howItsBuilt: 'Deliberately measured independently of accuracy: a system can be accurate and still fail to move the number this stage exists to check.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:248'] },
    { id: 'dim-risk', code: 'RC', name: 'Risk and control', role: 'dimension three', group: 'dimensions', measure: { chars: 97 },
      whatItDoes: 'Unsupported claims, rule violations, privacy incidents or improper actions — failures that a raw accuracy score would not surface at all.',
      howItsBuilt: 'This is where a harmless formatting error and an incorrect product recommendation stop being the same kind of miss — severity, not just correctness.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:249', 'Enterprise_AI_Transformation_Delivery_Framework.md:280'] },
    { id: 'dim-adoption', code: 'AD', name: 'Adoption', role: 'dimension four', group: 'dimensions', measure: { chars: 83 },
      whatItDoes: 'Usage, acceptance rate, overrides, abandonment and user satisfaction — whether the people the system was built for actually use it.',
      howItsBuilt: 'The fourth dimension exists because the other three can all pass while the intended users quietly route around the system.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:250'] },
    { id: 'dataset', code: 'GD', name: 'Golden dataset', role: 'the minimum evaluation set', group: 'evidence', measure: { chars: 35, count: 10 }, archetypeOverride: 'fin-row',
      whatItDoes: 'Ten case types: normal, complex, historical failures, missing-data, contradictory evidence, multilingual, permission tests, prompt-injection attempts, policy edge cases, out-of-scope requests.',
      howItsBuilt: 'Adversarial cases sit in the same set as normal ones on purpose — a suite that only contains easy cases cannot produce a severity-weighted failure rate worth trusting.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:254-265'] },
    { id: 'metrics', code: 'MT', name: 'Critical metrics', role: 'what actually gets tracked', group: 'evidence', measure: { chars: 19, count: 10 }, archetypeOverride: 'fin-row',
      whatItDoes: 'Ten tracked metrics, from task success rate and evidence-grounded accuracy through to cost per completed workflow and severity-weighted failure rate.',
      howItsBuilt: 'A generic accuracy percentage is explicitly rejected in favour of this list — ten separate numbers instead of one that can hide the ones that matter.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:267-280'] },
  ]
  const { groups: g, nodes } = build(groups, drafts)
  const edges: ArchEdge[] = [
    { id: 'e-ac-bv', from: 'dim-accuracy', to: 'dim-value', kind: 'support', label: 'correctness alone is not enough', flowIds: ['evaluate'] },
    { id: 'e-bv-rc', from: 'dim-value', to: 'dim-risk', kind: 'support', label: 'value alone is not enough', flowIds: ['evaluate'] },
    { id: 'e-rc-ad', from: 'dim-risk', to: 'dim-adoption', kind: 'support', label: 'safety alone is not enough', flowIds: ['evaluate'] },
    { id: 'e-ad-gd', from: 'dim-adoption', to: 'dataset', kind: 'call', label: 'four dimensions to test', flowIds: ['evaluate'] },
    { id: 'e-gd-mt', from: 'dataset', to: 'metrics', kind: 'call', label: 'a test case', flowIds: ['evaluate'] },
  ]
  const flows: ArchFlow[] = [
    { id: 'evaluate', name: 'Evaluate the release', payload: 'a test case', summary: 'Each of the four dimensions runs against the golden dataset and produces its own tracked metric — never a single blended score.', route: edges.map((e) => e.id) },
  ]
  return { slug: 'prove', parentId: 'prove', title: 'Prove accuracy and business value', kicker: 'STAGE 06',
    intro: { title: 'Prove accuracy and business value', lede: 'A demonstration shows it can work. An evaluation proves it works reliably enough.',
      whatItDoes: 'Measures accuracy, business value, risk and adoption independently against a ten-case golden dataset, and tracks ten separate metrics rather than one blended score.',
      howItsBuilt: 'The dataset includes adversarial and out-of-scope cases on purpose, so severity-weighted failure rate has something real to weight.' },
    groups: g, nodes, edges, flows }
})()

/* ---------------------------------------------------------------- 7. Institutionalise — the document's own diagram, redrawn */

const institutionalise = (() => {
  const groups: Group[] = [
    { id: 'loop', label: 'The learning loop' },
    { id: 'capture', label: 'What gets captured' },
  ]
  const drafts: Draft[] = [
    { id: 'production', code: 'PR', name: 'Production work', role: 'where the loop starts', group: 'loop', measure: { chars: 42 },
      whatItDoes: 'A real case, handled by the system that Release through controlled autonomy authorised — the first node in the document\'s own feedback diagram.',
      howItsBuilt: 'Drawn as the loop\'s start and its return point both, because the fifth node in this diagram feeds back here, not to the beginning of the framework.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:290'] },
    { id: 'outcomes', code: 'OU', name: 'Outcomes', role: 'what actually happened', group: 'loop', measure: { chars: 42 },
      whatItDoes: 'What the case actually resolved to — accepted, rejected, escalated, overridden — the raw fact before anyone interprets it.',
      howItsBuilt: 'Kept separate from human feedback in the next node: an outcome is a fact, feedback is a judgement about the fact.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:290'] },
    { id: 'feedback', code: 'FB', name: 'Human feedback', role: 'why it was accepted or not', group: 'loop', measure: { chars: 29 },
      whatItDoes: 'Why users accepted or rejected the recommendation, which retrieved evidence was useful, and which exceptions occurred.',
      howItsBuilt: 'The document lists this as the first thing to capture, ahead of anything about cost or latency — the loop starts with the human, not the metric.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:291', 'Enterprise_AI_Transformation_Delivery_Framework.md:299-301'] },
    { id: 'evaluations', code: 'EV', name: 'Evaluations', role: 'where feedback becomes evidence', group: 'loop', measure: { chars: 26 },
      whatItDoes: 'Feedback and outcomes turned into the same critical metrics stage six tracks — this is where the loop rejoins the evaluation discipline rather than reinventing one.',
      howItsBuilt: 'Explicitly connects back to Prove accuracy and business value: the golden dataset this stage updates is the one that stage already built.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:292'] },
    { id: 'updates', code: 'UP', name: 'Workflow and context updates', role: 'what actually changes', group: 'loop', measure: { chars: 43 },
      whatItDoes: 'The workflow, the rules, the context and the evaluations get updated — not merely the prompt, which the document calls out as the mistake this node exists to prevent.',
      howItsBuilt: 'This is the node the loop-back edge leaves from, and it returns to Transform the workflow, not to Establish the outcome — an updated rule changes how work is zoned, not what the business result is.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:293', 'Enterprise_AI_Transformation_Delivery_Framework.md:308'] },
    { id: 'capture', code: 'CP', name: 'What gets captured', role: 'the eight-item checklist', group: 'capture', measure: { chars: 48, count: 8 }, archetypeOverride: 'fin-row',
      whatItDoes: 'Eight things captured during feedback and evaluation: why recommendations were accepted or rejected, which evidence was useful, which exceptions occurred, where policy was ambiguous, which model or prompt performed best, cost and latency, where humans kept correcting the system, whether the business outcome actually moved.',
      howItsBuilt: 'This is the checklist that keeps "institutional learning" from being a slogan — each item is something a specific person has to write down after a specific case.',
      files: ['Enterprise_AI_Transformation_Delivery_Framework.md:297-306'] },
  ]
  const { groups: g, nodes } = build(groups, drafts)
  const edges: ArchEdge[] = [
    { id: 'e-pr-ou', from: 'production', to: 'outcomes', kind: 'call', label: 'a resolved case', flowIds: ['close'] },
    { id: 'e-ou-fb', from: 'outcomes', to: 'feedback', kind: 'data', label: 'what happened', flowIds: ['close'] },
    { id: 'e-fb-ev', from: 'feedback', to: 'evaluations', kind: 'data', label: 'a judgement', flowIds: ['close'] },
    { id: 'e-ev-up', from: 'evaluations', to: 'updates', kind: 'call', label: 'evidence', flowIds: ['close'] },
    { id: 'e-up-pr', from: 'updates', to: 'production', kind: 'retry', label: 'an updated workflow', flowIds: ['close'] },
    { id: 'e-fb-cp', from: 'feedback', to: 'capture', kind: 'data', label: 'why it was accepted', flowIds: [] },
    { id: 'e-ev-cp', from: 'evaluations', to: 'capture', kind: 'data', label: 'where it failed', flowIds: [] },
  ]
  const flows: ArchFlow[] = [
    { id: 'close', name: 'Close the loop', payload: 'a production outcome', summary: 'The document\'s own diagram: production work becomes outcomes, feedback and evaluations, then an update that returns to production — closing on itself, not on stage one.', route: ['e-pr-ou', 'e-ou-fb', 'e-fb-ev', 'e-ev-up', 'e-up-pr'] },
  ]
  return { slug: 'institutionalise', parentId: 'institutionalise', title: 'Institutionalise the learning loop', kicker: 'STAGE 07',
    intro: { title: 'Institutionalise the learning loop', lede: 'The durable advantage is not the model. It is what the organisation learns to do with it.',
      whatItDoes: 'Redrawn directly from the source document\'s own diagram: production work becomes outcomes, feedback and evaluations, then an update to the workflow itself — which loops back into production, not back to the start.',
      howItsBuilt: 'The eight-item capture checklist sits beside the loop rather than inside it: it is what feedback and evaluations actually collect, not a sixth step in the sequence.' },
    groups: g, nodes, edges, flows }
})()

export const SUB_STAGES: readonly SubStage[] = [establish, navigate, transform, context, release, prove, institutionalise]

export function getSubStage(slug: string): SubStage | undefined {
  return SUB_STAGES.find((s) => s.slug === slug)
}
