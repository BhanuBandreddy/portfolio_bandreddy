"use client";
import { useEffect } from "react";

// Staggered scroll-reveal. Progressive enhancement: nothing is hidden until
// JS marks the document ready, so a failed/absent JS run leaves content visible.
const SLIDE = [
  ".metaphor-section > div", ".physics-steps article",
  ".section-heading", ".strength-list article", ".role-intro",
  ".belief > *", ".outcome-section > *", ".giant-mark > *",
  ".case-hero > *", ".case-body article", ".capability-section > div",
  ".contribution-section > *", ".timeline article", ".approach-principle > div",
  ".ai-principle > *", ".about-statement > *", ".expertise > *",
  ".confidential-note > *", ".video-heading", ".video-steps article",
  ".hero-copy > *", ".hero-facts", ".career-evidence article",
];
const FADE = [".media-card", ".project-card", ".work-row"];

export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("sr-ready");

    const mark = (sel: string, cls: string) => {
      const groups = new Map<Element | null, number>();
      document.querySelectorAll(sel).forEach((el) => {
        const p = el.parentElement;
        const n = groups.get(p) ?? 0;
        groups.set(p, n + 1);
        (el as HTMLElement).style.setProperty("--sr-i", String(Math.min(n, 6)));
        el.classList.add(cls);
      });
    };
    SLIDE.forEach((s) => mark(s, "sr-slide"));
    FADE.forEach((s) => mark(s, "sr-fade"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("sr-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".sr-slide, .sr-fade").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
