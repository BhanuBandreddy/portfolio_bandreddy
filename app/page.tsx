import { ArrowLink, PageShell } from "./components/SiteShell";
import { WindHero } from "./components/WindHero";
import { projects, strengths } from "./data";

export default function Home() {
  return <PageShell>
    <section className="home-hero">
      <div className="hero-copy">
        <span className="kicker">ENTERPRISE PRODUCT INNOVATION · AI-LED TRANSFORMATION</span>
        <h1>I architect and scale AI-enabled platforms for <em>financial-services transformation.</em></h1>
        <p>Bhanu Harish Bandreddy — Vice President, Product Innovation & AI Solutions. I lead product lifecycle management, solution architecture and cross-functional execution across enterprise CRM, insurance distribution and agentic AI—from pre-sales and RFPs through delivery, UAT and release.</p>
        <div className="hero-actions"><ArrowLink href="/work">Explore selected work</ArrowLink><ArrowLink href="/about">My experience</ArrowLink></div>
      </div>
      <WindHero/>
      <div className="hero-facts"><span><b>15+</b> years across banking, technology and entrepreneurship</span><span><b>05</b> live CRM markets across Africa and Asia</span><span><b>60%</b> improvement in user engagement through targeted AI deployment</span></div>
    </section>

    <section className="giant-mark">
      <span className="section-index">VP · PRODUCT INNOVATION &amp; AI SOLUTIONS</span>
      <div className="giant-word">BANDR<i className="giant-bars" aria-hidden="true"><b/><b/></i>DDY</div>
      <div className="giant-foot"><span>ENTERPRISE PRODUCT</span><span>SOLUTION ARCHITECTURE</span><span>APPLIED AI</span></div>
    </section>

    <section className="metaphor-section">
      <div><span className="section-index">01 · WHY THE SHUTTLECOCK</span><h2>A stable result comes from<br/>the structure of the system.</h2></div>
      <div className="metaphor-copy"><p>The cork is the leading mass. The feather skirt sits behind it and creates greater aerodynamic drag. When the shuttlecock is disturbed, that drag rotates the cork back toward the direction of travel.</p><p>In my work, the equivalent structure is a clear case model, defined ownership, explicit integration boundaries, approved business rules and checkpoints from requirements through UAT. These controls help delivery recover when requirements, dependencies or client priorities change.</p></div>
      <div className="physics-steps"><article><b>01</b><h3>External force</h3><p>New regulation, market variation, legacy APIs and changing delivery priorities alter the planned path.</p></article><article><b>02</b><h3>Stable centre</h3><p>The product boundary, domain model and measurable business outcome remain explicit.</p></article><article><b>03</b><h3>Controlled response</h3><p>Owners, rules, APIs, exceptions and acceptance criteria determine how the system reacts.</p></article><article><b>04</b><h3>Reusable learning</h3><p>Configuration and shared modules carry validated decisions into the next implementation.</p></article></div>
    </section>

    <section className="delivered-media">
      <div className="section-heading"><div><span className="section-index">02 · DELIVERED DEMONSTRATIONS</span><h2>Three architectures, each shown<br/>as a complete working flow.</h2></div><p>These videos are the actual animated solution walkthroughs—not representative stock footage.</p></div>
      <div className="media-grid">{projects.filter(p=>p.video).map((p,i)=><article className="media-card" key={p.slug}><div><span>0{i+1} · {p.status}</span><h3>{p.name}</h3><p>{p.video!.caption}</p></div><video controls playsInline preload="metadata" poster={p.video!.poster} aria-label={p.video!.title}><source src={p.video!.src} type="video/mp4"/></video><a href={`/work/${p.slug}`}>Read the architecture and my contribution <b>↗</b></a></article>)}</div>
    </section>

    <section className="selected-work">
      <div className="section-heading"><div><span className="section-index">03 · PRODUCT PORTFOLIO</span><h2>Enterprise CRM, distribution<br/>and operational platforms.</h2></div><ArrowLink href="/work">View all nine projects</ArrowLink></div>
      <div className="project-grid">{projects.slice(3,7).map((p,i)=><a className="project-card" href={`/work/${p.slug}`} key={p.slug}><div><span>0{i+1} · {p.market}</span><b>{p.status}</b></div><h3>{p.name}</h3><p>{p.summary}</p><i>Read case study ↗</i></a>)}</div>
    </section>

    <section className="role-section">
      <div className="role-intro"><span className="section-index">04 · EXECUTIVE AND DELIVERY MANDATE</span><h2>I align commercial commitments, product strategy and delivery governance.</h2><p>My remit combines pre-sales, delivery costing, RFP responses, product ownership, solution architecture, cloud and infrastructure discussions, AI governance and PMO oversight. I translate client demand into a scalable base product, align analysts and engineers, and remain accountable through UAT and release planning.</p></div>
      <div className="strength-list">{strengths.map(([title,text],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="belief"><span className="kicker">HOW I DECIDE WHERE AI BELONGS</span><blockquote>Use AI for interpretation, extraction and generation. Keep eligibility, pricing, approval and financial rules deterministic, source-backed and testable.</blockquote><ArrowLink href="/approach">See the complete method</ArrowLink></section>
  </PageShell>;
}
