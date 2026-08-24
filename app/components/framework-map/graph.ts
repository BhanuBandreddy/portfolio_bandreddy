import { deriveArchetype, deriveHeight, deriveSize, packLayout, type LayoutInput } from './core/geometry-layout'
import type { ArchEdge, ArchFlow, ArchNode, Group } from './core/types'

/**
 * Enterprise AI Transformation Delivery Framework, mapped with the
 * architecture-map engine.
 *
 * This is a repurposing, not a codebase map: there is no source tree to
 * scan, so the "measured" half of the skill's rule is drawn from the
 * framework document itself — line span and checklist-item count per
 * numbered section, computed by script, not typed by hand. See the
 * comment on RAW below for exactly how.
 *
 * `deriveHeight`/`deriveArchetype` are the skill's own functions, run
 * unmodified. Their formulas were calibrated for source-code line counts;
 * a markdown section is ~15-30 lines where a real module is hundreds, so
 * every stage bottomed out at the same floor archetype when fed raw. The
 * fix is one disclosed constant (LOC_SCALE) that maps prose-line-count
 * into the range the formula expects — not per-node fudging. One node
 * (Transform) gets an authored archetype override, exactly as the skill's
 * own authoring guide allows ("override only when the derivation is
 * clearly wrong about a module you know well") — its section is 100%
 * tables and 0% bullets, which the fin-row/tower/cube vocabulary has no
 * slot for; slab-stack (layered, structured) is what it actually is.
 */

// lines = section length in the source doc, bounded by the next `## ` heading.
// count = bullet lines + non-separator table rows in that section.
// Computed 2026-08 via a one-off script over
// Enterprise_AI_Transformation_Delivery_Framework.md — see PR description
// for the script; re-run it if the source document changes.
const RAW: Record<string, { loc: number; count: number }> = {
  establish: { loc: 33, count: 19 },
  navigate: { loc: 46, count: 26 },
  transform: { loc: 30, count: 14 },
  context: { loc: 58, count: 27 },
  release: { loc: 40, count: 11 },
  prove: { loc: 43, count: 25 },
  institutionalise: { loc: 28, count: 8 },
}

const LOC_SCALE = 25 // bridges markdown-line calibration to the code-line calibration the formula expects

function measureOf(key: keyof typeof RAW) {
  const raw = RAW[key]
  return { loc: raw.loc * LOC_SCALE, count: raw.count }
}

export const GROUPS: readonly Group[] = [
  { id: 'discover', label: 'Discover & define' },
  { id: 'design', label: 'Design the system' },
  { id: 'release', label: 'Release & prove' },
  { id: 'institutionalise', label: 'Institutionalise' },
]

type Draft = Omit<ArchNode, 'archetype' | 'params' | 'height' | 'footprint'> & { measureKey: keyof typeof RAW; archetypeOverride?: ArchNode['archetype'] }

const DRAFTS: Draft[] = [
  {
    id: 'establish',
    code: 'ES',
    name: 'Establish the outcome',
    role: 'the outcome gate',
    group: 'discover',
    measureKey: 'establish',
    whatItDoes:
      'Defines the business result that must improve before any model, chatbot or agent gets chosen — the owner, the current baseline, and what would count as [[measurable success]].',
    howItsBuilt:
      'Deliberately excludes the solution. The required output is an AI Outcome Charter — problem, owner, baseline, target, risk boundary, go/no-go criteria — with no field for which model or vendor to use.',
    files: ['Enterprise_AI_Transformation_Delivery_Framework.md — §1', 'app/components/framework/stages.ts:11-18'],
    stack: ['AI Outcome Charter', 'Weak-vs-correct objective table'],
  },
  {
    id: 'navigate',
    code: 'NV',
    name: 'Navigate the real work',
    role: 'the reality check',
    group: 'discover',
    measureKey: 'navigate',
    whatItDoes:
      'Discovers how the work actually happens versus how the SOP says it happens — exceptions, workarounds, tribal knowledge — by interviewing the people who perform the work, not only management.',
    howItsBuilt:
      'Scores every candidate workflow on ten criteria — impact, volume, repeatability, data readiness, risk, adoption — before anything is built, so prioritisation is a comparable [[score]] rather than whoever asked loudest.',
    files: ['Enterprise_AI_Transformation_Delivery_Framework.md — §2', 'app/components/framework/stages.ts:19-26'],
    stack: ['Workflow scoring (1–5)', 'Exception catalogue', 'Decision inventory'],
  },
  {
    id: 'transform',
    code: 'TR',
    name: 'Transform the workflow',
    role: 'the three-zone split',
    group: 'design',
    measureKey: 'transform',
    archetypeOverride: 'slab-stack',
    whatItDoes:
      'Splits every workflow into three zones — deterministic rules, AI judgement, human accountability — and assigns each its own execution method instead of letting one blur into the others.',
    howItsBuilt:
      'Extends the plain User Action → System Reaction spec with extra columns — AI responsibility, deterministic rule, evidence, exception, human approval, audit event — rather than inventing a new spec format. The smallest change that closes the gap.',
    files: ['Enterprise_AI_Transformation_Delivery_Framework.md — §3', 'app/components/framework/stages.ts:27-34'],
    stack: ['Deterministic / AI-judgement / human-accountability matrix', 'Functional specification (9 fields)'],
  },
  {
    id: 'context',
    code: 'EC',
    name: 'Engineer enterprise context',
    role: 'the owned layer',
    group: 'design',
    measureKey: 'context',
    whatItDoes:
      'Builds the layer the organisation keeps even when the model changes — canonical entities, ontology, evidence lineage, permissions, agent memory — connected to sources like SharePoint, CRM and Postgres.',
    howItsBuilt:
      'States what each capability does and does not do: RAG retrieves, but does not preserve relationships; a model reasons, but should not become the [[system of record]] — because that boundary is where architectures quietly go wrong.',
    files: ['Enterprise_AI_Transformation_Delivery_Framework.md — §4', 'app/components/framework/stages.ts:35-42'],
    stack: ['Context layer', 'Knowledge graph', 'Model router', 'RAG / vector search'],
  },
  {
    id: 'release',
    code: 'RS',
    name: 'Release through controlled autonomy',
    role: 'the autonomy ladder',
    group: 'release',
    measureKey: 'release',
    whatItDoes:
      'Moves an agent from sandbox to controlled production one authorised action at a time — never the whole agent at once — through sandbox, shadow, supervised and controlled-autonomy stages.',
    howItsBuilt:
      'The same agent can read approved information automatically while being permanently blocked from changing a premium calculation. Autonomy is granted [[per action]], not per agent — why the execution contract runs nine steps ending in "capture human corrections."',
    files: ['Enterprise_AI_Transformation_Delivery_Framework.md — §5', 'app/components/framework/stages.ts:43-50'],
    stack: ['Sandbox → Shadow → Supervised → Controlled', 'Agent execution contract', 'Structured JSON actions'],
  },
  {
    id: 'prove',
    code: 'PV',
    name: 'Prove accuracy and business value',
    role: 'the evaluation gate',
    group: 'release',
    measureKey: 'prove',
    whatItDoes:
      'Separates a demonstration from an evaluation: measures accuracy, business value, risk and adoption independently, against a golden dataset built from real, adversarial and edge cases.',
    howItsBuilt:
      'Refuses a single accuracy percentage on principle. A harmless formatting slip and a wrong product recommendation are different failures, so [[severity-weighted failure rate]] is its own tracked metric, not folded into "accuracy."',
    files: ['Enterprise_AI_Transformation_Delivery_Framework.md — §6', 'app/components/framework/stages.ts:51-58'],
    stack: ['Golden dataset', 'Severity-weighted failure rate', 'Human acceptance / override rate'],
  },
  {
    id: 'institutionalise',
    code: 'IN',
    name: 'Institutionalise the learning loop',
    role: 'the loop that closes',
    group: 'institutionalise',
    measureKey: 'institutionalise',
    whatItDoes:
      'Turns every production outcome — accepted or rejected, exception or clean run — back into an update to the workflow, the rules, the context and the evaluations themselves.',
    howItsBuilt:
      'Loops back to Transform, not to the start — the document’s own diagram draws the return edge there. Institutional [[learning]] changes how work is split across the three zones, not just the outcome statement.',
    files: ['Enterprise_AI_Transformation_Delivery_Framework.md — §7', 'app/components/framework/stages.ts:59-66'],
    stack: ['Feedback taxonomy', 'Evaluation-update process', 'Observability'],
  },
]

function buildNodes(): ArchNode[] {
  const withGeometry = DRAFTS.map((d) => {
    const measure = measureOf(d.measureKey)
    const derived = deriveArchetype(measure)
    const archetype = d.archetypeOverride ?? derived.archetype
    const params = d.archetypeOverride ? undefined : derived.params
    const height = deriveHeight(measure)
    const size = deriveSize(archetype, params, measure)
    return { ...d, archetype, params, height, size, measure }
  })

  const inputs: LayoutInput<(typeof withGeometry)[number]>[] = withGeometry.map((n) => ({
    item: n,
    group: n.group,
    size: n.size,
  }))
  const footprints = packLayout(inputs, GROUPS.map((g) => g.id))

  return withGeometry.map((n) => {
    const { measureKey, archetypeOverride, size, measure, ...rest } = n
    void measureKey; void archetypeOverride; void size; void measure
    return { ...rest, footprint: footprints.get(n)! }
  })
}

export const NODES: readonly ArchNode[] = buildNodes()

export const EDGES: readonly ArchEdge[] = [
  { id: 'e-es-nv', from: 'establish', to: 'navigate', kind: 'call', label: 'prioritised use case', flowIds: ['deliver'] },
  { id: 'e-nv-tr', from: 'navigate', to: 'transform', kind: 'call', label: 'as-is workflow', flowIds: ['deliver'] },
  { id: 'e-tr-ec', from: 'transform', to: 'context', kind: 'call', label: 'zoned workflow', flowIds: ['deliver'] },
  { id: 'e-ec-rs', from: 'context', to: 'release', kind: 'call', label: 'context-ready workflow', flowIds: ['deliver'] },
  { id: 'e-rs-pv', from: 'release', to: 'prove', kind: 'call', label: 'approved release', flowIds: ['deliver'] },
  { id: 'e-pv-in', from: 'prove', to: 'institutionalise', kind: 'call', label: 'evaluated outcome', flowIds: ['deliver', 'loop'] },
  { id: 'e-in-tr', from: 'institutionalise', to: 'transform', kind: 'retry', label: 'updated rules & context', flowIds: ['loop'] },
]

export const FLOWS: readonly ArchFlow[] = [
  {
    id: 'deliver',
    name: 'Deliver the initiative',
    payload: 'the initiative',
    summary: 'One workflow moving from a stated business outcome through to a controlled, evaluated release.',
    route: ['e-es-nv', 'e-nv-tr', 'e-tr-ec', 'e-ec-rs', 'e-rs-pv', 'e-pv-in'],
  },
  {
    id: 'loop',
    name: 'Close the loop',
    payload: 'institutional learning',
    summary: 'Production outcomes become an update to the workflow itself — the document’s own return edge, not a generic feedback arrow.',
    route: ['e-pv-in', 'e-in-tr'],
  },
]

export const INTRO = {
  title: 'The Enterprise AI Delivery Framework',
  lede: 'Seven stages, mapped like a system — because it is one.',
  whatItDoes:
    'AI transformation is not seven separate steps. It is one system: a workflow that starts at a business outcome, gets redesigned around deterministic rules, AI judgement and human accountability, and only then meets governed intelligence — released gradually, evaluated honestly, and improved by its own production history.',
  howItsBuilt:
    'This map uses the architecture-map skill’s own isometric rendering engine, repurposed: buildings sized by the framework document’s real, measured specification depth rather than lines of code, edges limited to the two the source document itself draws, and prose written from the document, not generated.',
}

export const UNMAPPED: readonly string[] = []
export const REPO = 'Enterprise_AI_Transformation_Delivery_Framework.md'
