"use client";
import { useEffect, useRef, useState } from "react";
import type { ProjectVideo as ProjectVideoType } from "../data";

// Uplifting I–V–vi–IV progression (C, G, Am, F) synthesized with Web Audio —
// keeps the bundle free of audio files and licensing concerns.
const CHORDS = [
  [261.63, 329.63, 392.0, 523.25],
  [196.0, 246.94, 392.0, 587.33],
  [220.0, 261.63, 329.63, 440.0],
  [174.61, 220.0, 349.23, 440.0],
];

class MusicEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private nextTime = 0;
  private step = 0;

  private note(freq: number, at: number, dur: number, peak: number, type: OscillatorType) {
    if (!this.ctx || !this.master) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(peak, at + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, at + dur);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(at);
    osc.stop(at + dur + 0.05);
  }

  start() {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.14;
      this.master.connect(this.ctx.destination);
    }
    void this.ctx.resume();
    if (this.timer !== null) return;
    this.nextTime = this.ctx.currentTime + 0.1;
    this.timer = window.setInterval(() => {
      if (!this.ctx) return;
      while (this.nextTime < this.ctx.currentTime + 0.4) {
        const chord = CHORDS[Math.floor(this.step / 8) % CHORDS.length];
        const idx = this.step % 8;
        if (idx === 0) for (const f of chord) this.note(f / 2, this.nextTime, 2.2, 0.05, "sine");
        this.note(chord[idx % chord.length] * (idx >= 4 ? 2 : 1), this.nextTime, 0.6, 0.09, "triangle");
        this.nextTime += 0.28;
        this.step++;
      }
    }, 120);
  }

  stop() {
    if (this.timer !== null) { window.clearInterval(this.timer); this.timer = null; }
    if (this.ctx) void this.ctx.suspend();
  }

  dispose() {
    this.stop();
    if (this.ctx) void this.ctx.close();
    this.ctx = null;
    this.master = null;
  }
}

export function ProjectVideo({video}:{video:ProjectVideoType}){
  const engine = useRef<MusicEngine | null>(null);
  const playing = useRef(false);
  const [musicOn, setMusicOn] = useState(true);

  useEffect(() => () => engine.current?.dispose(), []);

  const startMusic = () => { (engine.current ??= new MusicEngine()).start(); };
  const onPlay = () => { playing.current = true; if (musicOn) startMusic(); };
  const onStop = () => { playing.current = false; engine.current?.stop(); };
  const toggleMusic = () => setMusicOn(on => {
    const next = !on;
    if (!next) engine.current?.stop();
    else if (playing.current) startMusic();
    return next;
  });

  return <section className="video-evidence">
    <div className="video-heading"><div><span className="section-index">WORKING DEMONSTRATION</span><h2>{video.title}</h2><p>{video.caption}</p></div><span className="video-length">PLAY / EXPAND FULLSCREEN<button type="button" onClick={toggleMusic} aria-pressed={musicOn} style={{display:"block",marginTop:"0.5rem",background:"none",border:"1px solid currentColor",borderRadius:"999px",padding:"0.2rem 0.7rem",font:"inherit",color:"inherit",cursor:"pointer",opacity:musicOn?1:0.5}}>{musicOn?"♪ MUSIC ON":"♪ MUSIC OFF"}</button></span></div>
    <video controls playsInline preload="metadata" poster={video.poster} aria-label={video.title} onPlay={onPlay} onPause={onStop} onEnded={onStop}><source src={video.src} type="video/mp4"/>Your browser does not support embedded MP4 video.</video>
    <div className="video-steps">{video.steps.map((step,i)=><article key={step}><b>0{i+1}</b><p>{step}</p></article>)}</div>
  </section>
}
