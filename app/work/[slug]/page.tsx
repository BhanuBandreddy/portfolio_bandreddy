import { notFound } from "next/navigation";
import { ArrowLink, PageShell } from "../../components/SiteShell";
import { projects } from "../../data";
import { ProjectVideo } from "../../components/ProjectVideo";

export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const project=projects.find(p=>p.slug===slug); if(!project)notFound();
  const index=projects.findIndex(p=>p.slug===slug); const next=projects[(index+1)%projects.length];
  return <PageShell>
    <section className="case-hero"><div><span className="kicker">CASE STUDY · {String(index+1).padStart(2,"0")}</span><h1>{project.name}</h1></div><div className="case-meta"><span><b>Status</b>{project.status}</span><span><b>Domain</b>{project.category}</span><span><b>Market</b>{project.market}</span></div><p>{project.summary}</p></section>
    {project.video&&<ProjectVideo video={project.video}/>}
    <section className="case-body">
      <article><span className="section-index">01 · PROBLEM TO RESOLVE</span><h2>What prevented the workflow from operating as a single case.</h2><p>{project.challenge}</p></article>
      <article><span className="section-index">02 · SOLUTION BOUNDARY</span><h2>What the product or architecture was designed to control.</h2><p>{project.response}</p></article>
    </section>
    <section className="capability-section"><div><span className="section-index">03 · INCLUDED CAPABILITIES</span><h2>The capabilities included in the solution.</h2></div><div className="capability-grid">{project.capabilities.map((c,i)=><span key={c}><b>0{i+1}</b>{c}</span>)}</div></section>
    <section className="contribution-section"><div><span className="section-index">04 · MY CONTRIBUTION</span><h2>Where I was directly involved.</h2></div><ol>{project.contribution.map(x=><li key={x}>{x}</li>)}</ol></section>
    <section className="outcome-section"><span className="section-index">05 · WHAT WAS PRODUCED</span><blockquote>{project.outcome}</blockquote></section>
    <section className="next-case"><span>Next case study</span><ArrowLink href={`/work/${next.slug}`}>{next.name}</ArrowLink></section>
  </PageShell>
}
