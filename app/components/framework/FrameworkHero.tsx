"use client";
import Image from "next/image";

export function FrameworkHero({ assembled }: { assembled: boolean }) {
  return (
    <section className="sfw-hero">
      <div className="frame" style={{ opacity: assembled ? 1 : 0.2, transition: "opacity 1.1s ease" }}>
        <div className={`sfw-frame${assembled ? " glow" : ""}`}>
          <Image src="/framework/full-ship.jpg" alt="Enterprise AI Transformation Framework — full vessel, exploded module view" width={864} height={1536} priority sizes="60vw" />
        </div>
      </div>
      <span className="sfw-kicker">Enterprise AI Delivery Framework</span>
      <h1>Seven modules. <em>One governed vessel.</em></h1>
      <p>AI transformation succeeds when a measurable workflow, trusted enterprise context, deterministic controls, specialised intelligence and accountable human decisions dock together as one system.</p>
      <span className="sfw-cue">Scroll to assemble</span>
    </section>
  );
}
