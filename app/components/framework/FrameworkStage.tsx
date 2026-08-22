"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { Stage } from "./stages";

export function FrameworkStage({ stage, index, onEnter }: { stage: Stage; index: number; onEnter?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    if (inView) onEnter?.();
  }, [inView, onEnter]);

  return (
    <section className={`sfw-stage${index % 2 === 1 ? " reverse" : ""}`} id={`stage-${stage.number}`} ref={ref}>
      <div className="sfw-imgwrap">
        {/* 1. Dock-in: drops from y:-80 with opacity 0->1 once the stage enters view */}
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setDocked(true)}
        >
          {/* 2. Idle float — zero-gravity bob, starts once docked */}
          <div className={docked ? "sfw-float" : undefined}>
            {/* 3. Glow pulse — CSS box-shadow keyframe, starts once docked */}
            <div className={`sfw-frame${docked ? " glow" : ""}`}>
              <Image
                src={stage.image}
                alt={`${stage.titleHighlight} ${stage.title} — exploded module diagram`}
                width={896}
                height={1200}
                sizes="(max-width: 900px) 340px, 460px"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="sfw-copy">
        <div className="sfw-num">{stage.number}</div>
        <h2><em>{stage.titleHighlight}</em> {stage.title}</h2>
        <p>{stage.body}</p>
        <div className="sfw-tags">{stage.tags.map((t) => <span key={t}>{t}</span>)}</div>
      </div>
    </section>
  );
}
