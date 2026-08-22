"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export function FrameworkFinale() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [docked, setDocked] = useState(false);

  return (
    <section className="sfw-finale" ref={ref}>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => setDocked(true)}
        className="frame"
      >
        <div className={docked ? "sfw-float" : undefined}>
          <div className={`sfw-frame${docked ? " glow" : ""}`}>
            <Image src="/framework/full-ship.jpg" alt="Complete vessel assembly — the full Enterprise AI Transformation Framework" width={864} height={1536} sizes="64vw" />
          </div>
        </div>
      </motion.div>
      <h2>Complete vessel <em>assembly.</em></h2>
      <p>Models will keep changing. The durable enterprise advantage is the workflow, domain context, integration, governance and learning system built around them.</p>
      <a className="sfw-cta" href="mailto:hareesh.b3@gmail.com">Discuss a workflow <span aria-hidden="true">↗</span></a>
    </section>
  );
}
