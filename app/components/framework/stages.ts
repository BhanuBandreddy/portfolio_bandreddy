export type Stage = {
  number: string;
  titleHighlight: string;
  title: string;
  body: string;
  tags: string[];
  image: string;
};

export const STAGES: Stage[] = [
  {
    number: "01",
    titleHighlight: "Establish",
    title: "The Outcome",
    body: "Start with the business result that must improve — not the model, chatbot or agent. Define the baseline, owner, success metric and risk boundary before anything else.",
    tags: ["Outcome Charter", "Baseline", "Risk Boundary", "Go/No-Go"],
    image: "/framework/stage-1.jpg",
  },
  {
    number: "02",
    titleHighlight: "Navigate",
    title: "The Real Work",
    body: "Enterprise processes rarely operate as documented. Discover the official process, the actual process, and the tribal knowledge that lives between them.",
    tags: ["As-Is Workflow", "Exception Catalogue", "Decision Inventory", "Systems Map"],
    image: "/framework/stage-2.jpg",
  },
  {
    number: "03",
    titleHighlight: "Transform",
    title: "The Workflow",
    body: "Redesign every workflow into three zones: deterministic rules, AI judgement, and human accountability. Never ask AI to do what software should handle.",
    tags: ["Deterministic Rules", "AI Judgement", "Human Accountability", "Functional Spec"],
    image: "/framework/stage-3.jpg",
  },
  {
    number: "04",
    titleHighlight: "Engineer",
    title: "Enterprise Context",
    body: "Rent the intelligence. Own the context. Build the layer that connects users, orchestration, knowledge, entities, audit and systems of record.",
    tags: ["Context Layer", "Knowledge Graph", "Model Router", "Audit & Lineage"],
    image: "/framework/stage-4.jpg",
  },
  {
    number: "05",
    titleHighlight: "Release",
    title: "Controlled Autonomy",
    body: "Never move directly from prototype to autonomous production. Progress through Sandbox → Shadow → Supervised → Controlled Autonomy, action by action.",
    tags: ["Sandbox", "Shadow Mode", "Supervised", "Autonomy Gates"],
    image: "/framework/stage-5.jpg",
  },
  {
    number: "06",
    titleHighlight: "Prove",
    title: "Accuracy & Business Value",
    body: "A demonstration shows AI can work. An evaluation proves it works reliably enough. Measure accuracy, business value, risk and adoption against a golden dataset.",
    tags: ["Golden Dataset", "Accuracy Metrics", "Risk & Control", "Adoption Rate"],
    image: "/framework/stage-6.jpg",
  },
  {
    number: "07",
    titleHighlight: "Institutionalise",
    title: "The Learning Loop",
    body: "The durable advantage is not the model — it is the organisation's growing knowledge of how to operate AI successfully. Every outcome feeds the next cycle.",
    tags: ["Feedback Loop", "Workflow Updates", "Evaluations", "Continuous Learning"],
    image: "/framework/stage-7.jpg",
  },
];
