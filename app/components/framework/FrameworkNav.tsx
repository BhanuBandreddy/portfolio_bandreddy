"use client";
import { STAGES } from "./stages";

export function FrameworkNav({ active }: { active: string | null }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  return (
    <nav className="sfw-nav" aria-label="Framework stages">
      {STAGES.map((s) => {
        const id = `stage-${s.number}`;
        const on = active === id;
        return (
          <button key={id} type="button" className={on ? "on" : undefined} onClick={() => scrollTo(id)} aria-current={on || undefined}>
            <span className="lab">{s.number} {s.titleHighlight}</span>
            <span className="dot" />
          </button>
        );
      })}
    </nav>
  );
}
