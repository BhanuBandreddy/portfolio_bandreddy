import { PageShell } from "../components/SiteShell";
import { projects } from "../data";

export default function WorkPage(){return <PageShell>
  <section className="page-hero"><span className="kicker">ENTERPRISE PRODUCTS · AI SOLUTIONS · WORKING PROTOTYPES</span><h1>A portfolio spanning CRM transformation, insurance distribution and <em>Compounding AI.</em></h1><p>Each case identifies the business process, solution boundary, included capabilities, delivery status and my direct contribution. Working demonstrations are separated from live product platforms, client solution designs and founder-led MVPs.</p></section>
  <section className="work-directory">{projects.map((p,i)=><a className="work-row" href={`/work/${p.slug}`} key={p.slug}><span>0{i+1}</span><div><b>{p.status} · {p.category}</b><h2>{p.name}</h2><p>{p.summary}</p></div><div className="market">{p.market}</div><i>↗</i></a>)}</section>
  <section className="confidential-note"><span className="section-index">SCOPE OF THESE CASE STUDIES</span><p>The pages identify the workflow, components and product decisions that can be shown publicly. Client names, commercial terms, production data and confidential implementation details are intentionally excluded.</p></section>
</PageShell>}
