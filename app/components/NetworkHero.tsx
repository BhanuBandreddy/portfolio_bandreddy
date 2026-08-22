"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import "./network-hero.css";
import { STAGES } from "./framework/stages";

type Pulse = { from: number; to: number; t: number; speed: number };

const N = STAGES.length;
const TWO_PI = Math.PI * 2;

export function NetworkHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(-Math.PI / 2);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0.0009);
  const pulses = useRef<Pulse[]>([]);
  const positions = useRef<{ x: number; y: number }[]>(Array(N).fill({ x: 0, y: 0 }));
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const runningRef = useRef(true);

  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  const fireePulse = useCallback((idx: number) => {
    pulses.current.push({ from: idx, to: (idx + 1) % N, t: 0, speed: 0.022 });
    pulses.current.push({ from: idx, to: (idx - 1 + N) % N, t: 0, speed: 0.022 });
  }, []);

  const selectNode = useCallback((idx: number) => {
    setSelected(idx);
    fireePulse(idx);
  }, [fireePulse]);

  useEffect(() => {
    const canvas = canvasRef.current, wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const DUST_N = 70;
    const dust = Array.from({ length: DUST_N }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + 0.4,
      phase: Math.random() * TWO_PI, speed: Math.random() * 0.15 + 0.05,
      vx: (Math.random() - 0.5) * 0.00006, vy: (Math.random() - 0.5) * 0.00006,
    }));

    let W = 0, H = 0, raf = 0, looping = false;
    const t0 = performance.now();

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const layout = () => {
      const cx = W * 0.5, cy = H * 0.5;
      const R = Math.min(W, H) * 0.34;
      for (let i = 0; i < N; i++) {
        const a = angleRef.current + (i / N) * TWO_PI;
        positions.current[i] = { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
      }
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = positions.current[i];
        el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
      });
      return { cx, cy };
    };

    const draw = (t: number) => {
      const { cx, cy } = layout();
      ctx.clearRect(0, 0, W, H);

      // ambient dust
      dust.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
        const tw = 0.35 + 0.35 * Math.sin(t * 0.001 * d.speed + d.phase);
        ctx.beginPath();
        ctx.arc(d.x * W, d.y * H, d.r, 0, TWO_PI);
        ctx.fillStyle = `rgba(180,235,200,${(0.14 + tw * 0.22).toFixed(3)})`;
        ctx.fill();
      });

      // hub
      ctx.beginPath();
      ctx.arc(cx, cy, 3.2, 0, TWO_PI);
      ctx.fillStyle = "rgba(120,220,160,0.85)";
      ctx.fill();

      // ring connections + hub spokes
      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++) {
        const p = positions.current[i];
        const q = positions.current[(i + 1) % N];
        const active = i === selected || (i + 1) % N === selected;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = active ? "rgba(120,220,160,0.5)" : "rgba(120,220,160,0.14)";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = i === selected ? "rgba(120,220,160,0.4)" : "rgba(120,220,160,0.08)";
        ctx.stroke();
      }

      // pulses
      pulses.current = pulses.current.filter((pu) => pu.t < 1);
      pulses.current.forEach((pu) => {
        pu.t += pu.speed;
        const a = positions.current[pu.from], b = positions.current[pu.to];
        const x = a.x + (b.x - a.x) * pu.t, y = a.y + (b.y - a.y) * pu.t;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 7);
        grad.addColorStop(0, "rgba(180,255,210,0.95)");
        grad.addColorStop(1, "rgba(180,255,210,0)");
        ctx.beginPath(); ctx.arc(x, y, 7, 0, TWO_PI);
        ctx.fillStyle = grad; ctx.fill();
      });

      // node glow (canvas halo behind DOM buttons)
      for (let i = 0; i < N; i++) {
        const p = positions.current[i];
        const on = i === selected;
        const r = on ? 15 : 8;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        grad.addColorStop(0, on ? "rgba(120,220,160,0.55)" : "rgba(120,220,160,0.28)");
        grad.addColorStop(1, "rgba(120,220,160,0)");
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, TWO_PI);
        ctx.fillStyle = grad; ctx.fill();
      }
    };

    const frame = (now: number) => {
      if (!paused && !dragging.current) angleRef.current += velocity.current;
      draw(now - t0);
      if (runningRef.current) {
        raf = requestAnimationFrame(frame);
      } else {
        looping = false;
      }
    };
    const startLoop = () => {
      if (looping) return;
      looping = true;
      raf = requestAnimationFrame(frame);
    };

    resize();
    if (reduce) {
      draw(0);
    } else {
      startLoop();
    }
    setReady(true);

    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(0); });
    ro.observe(wrap);

    let io: IntersectionObserver | null = null;
    if (!reduce) {
      io = new IntersectionObserver((es) => es.forEach((e) => {
        runningRef.current = e.isIntersecting;
        if (e.isIntersecting) startLoop();
      }), { threshold: 0.05 });
      io.observe(wrap);
    }

    const onDown = (e: PointerEvent) => { dragging.current = true; lastX.current = e.clientX; };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      angleRef.current += dx * 0.004;
    };
    const onUp = () => { dragging.current = false; };
    wrap.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      wrap.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [paused, selected]);

  const stage = STAGES[selected];

  return (
    <section className="nh">
      <div className="nh-copy">
        <span className="section-index">SEVEN STAGES · ONE GOVERNED NETWORK</span>
        <h2>Every stage feeds the next — <em>and feeds back.</em></h2>
        <p>AI transformation isn&rsquo;t seven separate steps. It&rsquo;s one system: each stage informs the next, and the learning loop returns to strengthen the whole network.</p>
      </div>

      <div className="nh-viz" ref={wrapRef}>
        <canvas ref={canvasRef} aria-hidden="true" />
        {STAGES.map((s, i) => (
          <button
            key={s.number}
            ref={(el) => { nodeRefs.current[i] = el; }}
            type="button"
            className={`nh-node${i === selected ? " on" : ""}`}
            onClick={() => selectNode(i)}
            style={{ opacity: ready ? 1 : 0 }}
          >
            <span className="nh-node-n">{s.number}</span>
            <span className="nh-node-lab">{s.titleHighlight}</span>
          </button>
        ))}

        <div className="nh-panel" aria-live="polite">
          <span className="nh-panel-n">{stage.number}</span>
          <h3><em>{stage.titleHighlight}</em> {stage.title}</h3>
          <p>{stage.body}</p>
          <div className="nh-tags">{stage.tags.map((t) => <span key={t}>{t}</span>)}</div>
        </div>

        <div className="nh-controls">
          <button type="button" onClick={() => setPaused((p) => !p)}>{paused ? "▶ Resume" : "⏸ Pause"}</button>
          <span className="nh-hint">Drag to rotate · Click a stage</span>
        </div>
      </div>

      <div className="nh-cta">
        <Link className="arrow-link" href="/approach/framework">Explore the delivery framework<span>↗</span></Link>
      </div>
    </section>
  );
}
