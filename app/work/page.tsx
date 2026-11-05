import { PageShell } from "../components/SiteShell";
import { projects } from "../data";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Work: nine enterprise platform case studies | Bhanu Harish Bandreddy",
  description: "Nine case studies across CRM transformation, insurance distribution and compounding AI: the business problem, the architecture, and what was delivered.",
};

export default function WorkPage(){return <PageShell>
  <section className="page-hero"><h1>A portfolio spanning CRM transformation, insurance distribution and <em>Compounding AI.</em></h1><p>Each case identifies the business process, solution boundary, included capabilities, delivery status and my direct contribution. Working demonstrations are separated from live product platforms, client solution designs and founder-led MVPs.</p></section>
  <section className="work-directory">{projects.map(p=><a className="work-row" href={`/work/${p.slug}`} key={p.slug}><div><b>{p.status} · {p.category}</b><h2>{p.name}</h2><p>{p.summary}</p></div><div className="market">{p.market}</div><div className="work-thumb">{p.video?.poster&&<><img src={p.video.poster} alt={`Frame from the ${p.name} architecture walkthrough`} width={1280} height={720} loading="lazy"/><em>Watch walkthrough</em></>}</div><i>↗</i></a>)}</section>
  <section className="confidential-note"><h2>Scope of these case studies</h2><p>The pages identify the workflow, components and product decisions that can be shown publicly. Client names, commercial terms, production data and confidential implementation details are intentionally excluded.</p></section>
</PageShell>}
