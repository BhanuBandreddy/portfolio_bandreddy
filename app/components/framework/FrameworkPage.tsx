"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import "./framework.css";
import { STAGES } from "./stages";
import { FrameworkHero } from "./FrameworkHero";
import { FrameworkStage } from "./FrameworkStage";
import { FrameworkFinale } from "./FrameworkFinale";
import { FrameworkNav } from "./FrameworkNav";

export function FrameworkPage() {
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const markVisited = useCallback((number: string) => {
    setVisited((prev) => (prev.has(number) ? prev : new Set(prev).add(number)));
  }, []);

  // Tracks which stage section is most visible right now, for the dot nav.
  useEffect(() => {
    const sections = STAGES.map((s) => document.getElementById(`stage-${s.number}`)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        let bestId: string | null = null;
        let bestRatio = 0;
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > bestRatio) { bestRatio = e.intersectionRatio; bestId = e.target.id; }
        });
        if (bestId) setActive(bestId);
      },
      { threshold: [0.3, 0.5, 0.7] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const assembled = visited.size === STAGES.length;

  return (
    <div className="sfw" ref={rootRef}>
      <FrameworkNav active={active} />
      <FrameworkHero assembled={assembled} />
      {STAGES.map((stage, i) => (
        <FrameworkStage key={stage.number} stage={stage} index={i} onEnter={() => markVisited(stage.number)} />
      ))}
      <FrameworkFinale />
    </div>
  );
}
