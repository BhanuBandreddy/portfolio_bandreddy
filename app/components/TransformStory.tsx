"use client";
import { useEffect, useRef } from "react";
import "./transform-story.css";

// Author's exact markup (unchanged). Rendered verbatim so the design, copy and
// SVG are byte-for-byte identical to the supplied file.
const MARKUP = `
<section class="story" id="transformation-story" aria-label="Enterprise AI transformation framework story">
<div class="stage">
  <div class="masthead">Enterprise AI transformation framework</div>
  <div class="copy-deck">
    <article class="copy" data-copy="0"><p class="chapter">00 · The mandate</p><h1>We turn critical enterprise workflows into governed AI operating systems.</h1><p>Not another isolated pilot. We begin where enterprise value is won or lost: <strong>inside the work itself.</strong></p><span class="principle">Rent the intelligence. Own the context.</span></article>
    <article class="copy" data-copy="1"><p class="chapter">01 · Real work</p><h2>Enterprise work rarely arrives as a clean problem.</h2><p>It is distributed across people, systems, documents, policies and exceptions. Before automating anything, we <strong>observe how decisions are actually made.</strong></p></article>
    <article class="copy" data-copy="2"><p class="chapter">02 · Enterprise context</p><h2>We make the work legible to people and machines.</h2><p>Process discovery becomes a durable context layer: connected knowledge, operational memory, evidence and rules assembled around the job.</p></article>
    <article class="copy" data-copy="3"><p class="chapter">03 · Governed intelligence</p><h2>Intelligence acts only inside accountable boundaries.</h2><p>Models, agents and tools are orchestrated with evaluation, human authority and auditability built into every consequential action.</p></article>
    <article class="copy" data-copy="4"><p class="chapter">04 · Compounding value</p><h2>The system proves value and learns.</h2><p>Cycle time, quality, adoption and economics become visible. Every release creates evidence for the next, turning AI capability into an <strong>institutional advantage.</strong></p><a class="cta" href="#framework-path">Explore the delivery framework <span aria-hidden="true">↗</span></a></article>
  </div>

  <svg class="visual" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" role="img" aria-labelledby="visual-title visual-desc">
    <title id="visual-title">One line transforming into an accountable AI operating system</title><desc id="visual-desc">Fragmented enterprise inputs converge into context, pass through governance and resolve into measurable business value.</desc>
    <path id="motion" class="journey" d="M28 720H320C390 720 416 586 480 586H812H918C946 586 954 560 982 560H1034C1062 560 1070 586 1098 586H1180C1240 586 1270 535 1312 476"/>
    <g><path class="draw" data-draw="foundation" pathLength="1" d="M28 720H320"/><path class="draw dim" data-draw="foundation" pathLength="1" d="M320 720C390 720 416 586 480 586"/><circle class="node amber" data-fade="source" cx="108" cy="720" r="5"/><text class="label amber" data-fade="source-label" x="126" y="748">THE WORK ENTERS HERE</text></g>
    <g>
      <path class="draw" data-draw="fragment" pathLength="1" d="M480 586L525 526H660"/><path class="draw" data-draw="fragment" pathLength="1" d="M480 586H690"/><path class="draw" data-draw="fragment" pathLength="1" d="M480 586L525 646H650"/><path class="draw dim" data-draw="fragment" pathLength="1" d="M584 526L610 474H716"/><path class="draw dim" data-draw="fragment" pathLength="1" d="M604 646L635 698H735"/>
      <circle class="node" data-fade="fragment" cx="670" cy="526" r="6"/><circle class="node" data-fade="fragment" cx="700" cy="586" r="6"/><circle class="node" data-fade="fragment" cx="660" cy="646" r="6"/><circle class="node" data-fade="fragment" cx="726" cy="474" r="6"/><circle class="node" data-fade="fragment" cx="745" cy="698" r="6"/>
      <text class="label" data-fade="fragment" x="682" y="521">PEOPLE</text><text class="label" data-fade="fragment" x="712" y="581">SYSTEMS</text><text class="label" data-fade="fragment" x="672" y="641">DOCUMENTS</text><text class="label" data-fade="fragment" x="738" y="469">POLICY</text><text class="label" data-fade="fragment" x="757" y="693">EXCEPTIONS</text><text class="label light" data-fade="discovery" x="510" y="746">PROCESS DISCOVERY · SERVICE DESIGN · DOMAIN EXPERTISE</text>
    </g>
    <path class="draw green" data-draw="spine" pathLength="1" d="M690 586H918"/>
    <g>
      <rect class="wash" data-fade="context-wash" x="742" y="404" width="318" height="364" rx="158"/>
      <path class="draw green" data-draw="context" pathLength="1" d="M670 526C732 526 730 586 790 586"/><path class="draw green" data-draw="context" pathLength="1" d="M700 586H790"/><path class="draw green" data-draw="context" pathLength="1" d="M660 646C732 646 730 586 790 586"/><path class="draw green" data-draw="context" pathLength="1" d="M726 474C770 474 760 586 812 586"/><path class="draw green" data-draw="context" pathLength="1" d="M745 698C780 698 770 586 812 586"/>
      <circle class="node" data-fade="context" cx="812" cy="586" r="17"/><circle class="node amber" data-fade="context" cx="812" cy="586" r="4"/><path class="draw dim" data-draw="context" pathLength="1" d="M812 569V504M812 603V668M795 586H738M829 586H884"/><text class="label light" data-fade="context" x="770" y="448">ENTERPRISE CONTEXT</text><text class="label" data-fade="context" x="753" y="730">CONNECTORS · KNOWLEDGE GRAPH · RAG · VECTOR SEARCH</text>
    </g>
    <g>
      <rect class="wash" data-fade="governance-fill" x="882" y="440" width="252" height="292" rx="24"/><rect class="draw" data-draw="boundary" pathLength="1" x="882" y="440" width="252" height="292" rx="24"/><path class="draw green" data-draw="boundary" pathLength="1" d="M812 586H918C946 586 954 560 982 560H1034C1062 560 1070 586 1098 586H1180"/>
      <circle class="node" data-fade="governance" cx="968" cy="560" r="24"/><circle class="node" data-fade="governance" cx="1048" cy="560" r="24"/><path class="draw dim" data-draw="governance-inner" pathLength="1" d="M956 560h24M968 548v24M1038 554l10 12 12-18"/><path class="draw dim" data-draw="governance-inner" pathLength="1" d="M918 630H1098M918 664H1098"/>
      <circle class="node amber" data-fade="approval" cx="930" cy="630" r="4"/><circle class="node amber" data-fade="approval" cx="1008" cy="630" r="4"/><circle class="node amber" data-fade="approval" cx="1086" cy="630" r="4"/><text class="label light" data-fade="governance" x="900" y="416">ACCOUNTABLE BOUNDARY</text><text class="label" data-fade="governance" x="940" y="516">MODELS</text><text class="label" data-fade="governance" x="1025" y="516">AGENTS</text><text class="label" data-fade="governance" x="909" y="694">EVALS · HUMAN APPROVAL · AUDIT</text>
    </g>
    <g>
      <path class="draw" data-draw="value-line" pathLength="1" d="M1134 586H1180C1240 586 1270 535 1312 476"/><path class="draw dim" data-draw="value-axis" pathLength="1" d="M1168 660H1354M1180 660V454"/><polyline class="draw green" data-draw="value-chart" pathLength="1" points="1180,636 1216,618 1254,624 1290,578 1320,550 1354,470"/><circle class="node amber" data-fade="value" cx="1354" cy="470" r="5"/><text class="label" data-fade="value" x="1182" y="686" text-anchor="start" style="font-size:9px;letter-spacing:1.1px">CYCLE TIME</text><text class="label" data-fade="value" x="1270" y="686" text-anchor="middle" style="font-size:9px;letter-spacing:1.1px">QUALITY</text><text class="label" data-fade="value" x="1354" y="686" text-anchor="end" style="font-size:9px;letter-spacing:1.1px">VALUE</text><text class="label light" data-fade="value" x="1360" y="430" text-anchor="end">MEASURABLE. REPEATABLE. COMPOUNDING.</text><circle class="pulse" data-fade="pulse" cx="1354" cy="470" r="14"/><circle class="pulse" data-fade="pulse" cx="1354" cy="470" r="26"/>
    </g>
    <circle id="dot" class="dot" cx="28" cy="720" r="5"/>
  </svg>

  <div class="cue">Scroll to transform</div>
  <ol class="rail" id="framework-path" aria-label="Seven stages of the AI transformation framework"><li><b>01</b>Establish<br>the outcome</li><li><b>02</b>Navigate<br>real work</li><li><b>03</b>Transform<br>the workflow</li><li><b>04</b>Engineer enterprise<br>context</li><li><b>05</b>Release<br>safely</li><li><b>06</b>Prove<br>value</li><li><b>07</b>Institutionalise<br>learning</li></ol>
  <div class="footer" aria-hidden="true"><span class="progress-name">00 · The mandate</span><div class="ticks"></div></div>
</div>
</section>`;

export function TransformStory() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- Author's core story choreography (verbatim math; returns cleanup) ---
    const cleanup1 = (() => {
      const story=document.querySelector('.story') as HTMLElement,copies=[...document.querySelectorAll('.copy')] as HTMLElement[],cue=document.querySelector('.cue') as HTMLElement,name=document.querySelector('.progress-name') as HTMLElement,ticksBox=document.querySelector('.ticks') as HTMLElement,rail=document.querySelector('.rail') as HTMLElement,motion=document.getElementById('motion') as unknown as SVGPathElement,dot=document.getElementById('dot') as unknown as SVGCircleElement,reduced=matchMedia('(prefers-reduced-motion: reduce)'),names=['00 · The mandate','01 · Real work','02 · Enterprise context','03 · Governed intelligence','04 · Compounding value'];
      if(!story)return;
      for(let i=0;i<31;i++)ticksBox.appendChild(document.createElement('i'));
      const ticks=[...ticksBox.children] as HTMLElement[],clamp=(v:number,a=0,b=1)=>Math.min(b,Math.max(a,v)),smooth=(v:number)=>{const x=clamp(v);return x*x*(3-2*x)},range=(p:number,a:number,b:number)=>smooth((p-a)/(b-a));
      function draw(key:string,n:number,fade=n){document.querySelectorAll(`[data-draw="${key}"]`).forEach(el=>{const v=clamp(n);(el as HTMLElement).style.strokeDashoffset=String(1-v);(el as HTMLElement).style.opacity=String(clamp(fade))})}
      function fade(key:string,n:number){document.querySelectorAll(`[data-fade="${key}"]`).forEach(el=>(el as HTMLElement).style.opacity=String(clamp(n)))}
      function copyOpacity(p:number,i:number){const c=[.04,.24,.47,.69,.91][i];return clamp(1-Math.abs(p-c)/.115)}
      function render(){if(reduced.matches)return;const rect=story.getBoundingClientRect(),p=clamp(-rect.top/Math.max(story.offsetHeight-innerHeight,1)),scene=Math.min(4,Math.floor(p*5)),centers=[.04,.24,.47,.69,.91];name.textContent=names[scene];copies.forEach((el,i)=>{const o=copyOpacity(p,i);el.style.opacity=String(o);el.style.transform=`translateY(${((p-centers[i])*-42).toFixed(1)}px)`;el.style.setProperty('--chapter',String(o));el.classList.toggle('current',i===scene)});cue.style.opacity=String(1-range(p,.04,.12));const railIn=range(p,.84,.94);rail.style.opacity=String(railIn);rail.style.transform=`translateY(${(1-railIn)*8}px)`;draw('foundation',range(p,0,.13));fade('source',range(p,.02,.08));fade('source-label',range(p,.05,.12)*(1-range(p,.2,.27)));const fragments=range(p,.12,.28);draw('fragment',fragments);fade('fragment',fragments*(1-range(p,.45,.55)*.55));fade('discovery',range(p,.18,.29)*(1-range(p,.38,.48)));const context=range(p,.33,.54);draw('context',context);fade('context',context*(1-range(p,.75,.84)*.42));fade('context-wash',context*.8);const boundary=range(p,.53,.69);draw('boundary',boundary);fade('governance-fill',boundary*.75);fade('governance',range(p,.57,.71));draw('governance-inner',range(p,.61,.74));fade('approval',range(p,.66,.76));draw('value-line',range(p,.72,.84));draw('value-axis',range(p,.77,.87));draw('value-chart',range(p,.81,.96));fade('value',range(p,.84,.95));fade('pulse',range(p,.91,.98)*(.45+Math.sin(p*60)*.16));const length=motion.getTotalLength(),point=motion.getPointAtLength(length*clamp(p*1.06));dot.setAttribute('cx',point.x.toFixed(2));dot.setAttribute('cy',point.y.toFixed(2));const active=Math.round(p*(ticks.length-1));ticks.forEach((tick,i)=>{tick.classList.toggle('past',i<active);tick.classList.toggle('active',i===active)})}
      let ticking=false;
      function request(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{render();ticking=false})}
      addEventListener('scroll',request,{passive:true});addEventListener('resize',request);reduced.addEventListener?.('change',request);render();
      return ()=>{removeEventListener('scroll',request);removeEventListener('resize',request);reduced.removeEventListener?.('change',request);};
    })();

    // --- Author's final-scene hygiene choreography (verbatim; returns cleanup) ---
    const cleanup2 = (() => {
      const story=document.querySelector('.story') as HTMLElement,rail=document.querySelector('.rail') as HTMLElement,clamp=(v:number,a=0,b=1)=>Math.min(b,Math.max(a,v)),smooth=(v:number)=>{const x=clamp(v);return x*x*(3-2*x)},range=(p:number,a:number,b:number)=>smooth((p-a)/(b-a));
      if(!story)return;
      function opacity(selector:string,value:number){document.querySelectorAll(selector).forEach(el=>(el as HTMLElement).style.opacity=String(clamp(value)))}
      function stroke(selector:string,amount:number,value:number){document.querySelectorAll(selector).forEach(el=>{(el as HTMLElement).style.strokeDashoffset=String(1-clamp(amount));(el as HTMLElement).style.opacity=String(clamp(value))})}
      function renderHygiene(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const rect=story.getBoundingClientRect(),p=clamp(-rect.top/Math.max(story.offsetHeight-innerHeight,1));const fragmentIn=range(p,.12,.28),fragmentOut=1-range(p,.66,.86);opacity('.label[data-fade="fragment"]',fragmentIn*fragmentOut);opacity('.node[data-fade="fragment"]',fragmentIn*(.22+.78*fragmentOut));stroke('[data-draw="fragment"]',fragmentIn,fragmentIn*(.16+.84*fragmentOut));const contextIn=range(p,.33,.54),contextOut=1-range(p,.76,.91);opacity('.label[data-fade="context"]',contextIn*contextOut);opacity('.node[data-fade="context"]',contextIn*(.38+.62*contextOut));stroke('[data-draw="context"]',contextIn,contextIn*(.32+.68*contextOut));opacity('[data-fade="context-wash"]',contextIn*.68*(.2+.8*contextOut));const governanceIn=range(p,.57,.71),governanceOut=1-range(p,.86,.97);opacity('.label[data-fade="governance"]',governanceIn*(.36+.64*governanceOut));opacity('.node[data-fade="governance"]',governanceIn*(.62+.38*governanceOut));opacity('[data-fade="approval"]',range(p,.66,.76)*(.56+.44*governanceOut));stroke('[data-draw="governance-inner"]',range(p,.61,.74),range(p,.61,.74)*(.48+.52*governanceOut));opacity('[data-fade="governance-fill"]',range(p,.53,.69)*.62*(.58+.42*governanceOut));const spine=range(p,.25,.62);stroke('[data-draw="spine"]',spine,spine*(.62+.38*(1-range(p,.9,.99))));const railIn=range(p,.90,.98);rail.style.opacity=String(railIn);rail.style.transform=`translateY(${(1-railIn)*10}px)`}
      let busy=false;
      function request(){if(busy)return;busy=true;requestAnimationFrame(()=>{renderHygiene();busy=false})}
      addEventListener('scroll',request,{passive:true});addEventListener('resize',request);renderHygiene();
      return ()=>{removeEventListener('scroll',request);removeEventListener('resize',request);};
    })();

    return () => { cleanup1?.(); cleanup2?.(); };
  }, []);

  return <div className="tstory" ref={ref} dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
