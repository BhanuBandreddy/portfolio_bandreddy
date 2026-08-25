"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import "./network-hero.css";
import { STAGES } from "./framework/stages";

const N = STAGES.length;
const ACID = new THREE.Color(0x2fbf5f);   // site green, boosted for additive glow
const ACID_SOFT = new THREE.Color(0x8fe0ab);
const PULSE_SLOTS = 4;

// Node/edge vertex shader: gentle twinkle + pulse-boosted size, no external
// noise dependency — kept deliberately simple and robust (a hand-authored
// noise-displacement pipeline is hard to debug blind).
const nodeVert = `
attribute float aSize;
attribute float aPhase;
attribute vec3 aColor;
varying vec3 vColor;
varying float vPulse;
uniform float uTime;
uniform vec3 uPulseOrigin[${PULSE_SLOTS}];
uniform float uPulseTime[${PULSE_SLOTS}];
uniform float uPulseSpeed;

void main() {
  vec3 wp = (modelMatrix * vec4(position, 1.0)).xyz;
  float pulse = 0.0;
  for (int i = 0; i < ${PULSE_SLOTS}; i++) {
    float dt = uTime - uPulseTime[i];
    if (uPulseTime[i] > 0.0 && dt > 0.0 && dt < 2.6) {
      float front = dt * uPulseSpeed;
      float d = distance(wp, uPulseOrigin[i]);
      pulse += smoothstep(2.4, 0.0, abs(d - front)) * smoothstep(2.6, 0.0, dt);
    }
  }
  vPulse = min(pulse, 1.0);
  vColor = aColor;
  float tw = 0.75 + 0.25 * sin(uTime * 0.6 + aPhase);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * tw * (1.0 + vPulse * 2.2) * (300.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const nodeFrag = `
varying vec3 vColor;
varying float vPulse;
void main() {
  vec2 c = gl_PointCoord * 2.0 - 1.0;
  float d = length(c);
  if (d > 1.0) discard;
  float glow = pow(1.0 - d, 1.6);
  vec3 col = mix(vColor, vec3(1.0), vPulse * 0.6);
  gl_FragColor = vec4(col * (1.0 + vPulse), glow * (0.75 + vPulse * 0.25));
}`;

const lineVert = `
attribute float aStrength;
attribute vec3 aColor;
varying vec3 vColor;
varying float vStrength;
varying float vPulse;
uniform float uTime;
uniform vec3 uPulseOrigin[${PULSE_SLOTS}];
uniform float uPulseTime[${PULSE_SLOTS}];
uniform float uPulseSpeed;
void main() {
  vec3 wp = (modelMatrix * vec4(position, 1.0)).xyz;
  float pulse = 0.0;
  for (int i = 0; i < ${PULSE_SLOTS}; i++) {
    float dt = uTime - uPulseTime[i];
    if (uPulseTime[i] > 0.0 && dt > 0.0 && dt < 2.6) {
      float front = dt * uPulseSpeed;
      float d = distance(wp, uPulseOrigin[i]);
      pulse += smoothstep(3.2, 0.0, abs(d - front)) * smoothstep(2.6, 0.0, dt);
    }
  }
  vPulse = min(pulse, 1.0);
  vColor = aColor;
  vStrength = aStrength;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const lineFrag = `
varying vec3 vColor;
varying float vStrength;
varying float vPulse;
void main() {
  vec3 col = mix(vColor, vec3(1.0), vPulse * 0.5);
  float a = vStrength * (0.35 + vPulse * 0.65);
  gl_FragColor = vec4(col, a);
}`;

type StageNode = { pos: THREE.Vector3; stage: number };

function buildNetwork() {
  const stageNodes: StageNode[] = [];
  const nodePos: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0)]; // index 0 = hub
  const nodeIsStage: number[] = [-1];
  const nodeSize: number[] = [2.2];
  const edges: [number, number, number][] = []; // a, b, strength

  const armLen = 4, spread = 2.4;
  const tipIndex: number[] = [];
  for (let s = 0; s < N; s++) {
    const phi = Math.acos(1 - (2 * (s + 0.5)) / N);
    const theta = Math.PI * (1 + Math.sqrt(5)) * s;
    const dir = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.sin(phi) * Math.sin(theta),
      Math.cos(phi)
    );
    let prev = 0;
    for (let i = 1; i <= armLen; i++) {
      const r = spread * i;
      const p = dir.clone().multiplyScalar(r);
      p.x += (Math.random() - 0.5) * 0.4;
      p.y += (Math.random() - 0.5) * 0.4;
      p.z += (Math.random() - 0.5) * 0.4;
      nodePos.push(p);
      const isTip = i === armLen;
      nodeIsStage.push(isTip ? s : -1);
      nodeSize.push(isTip ? 1.7 : 1.0);
      const idx = nodePos.length - 1;
      edges.push([prev, idx, isTip ? 0.85 : 0.55]);
      if (isTip) { tipIndex.push(idx); stageNodes.push({ pos: p, stage: s }); }
      prev = idx;
    }
  }
  // learning-loop ring connecting stage tips in sequence
  for (let s = 0; s < N; s++) edges.push([tipIndex[s], tipIndex[(s + 1) % N], 0.4]);

  // ambient field
  const cloudN = 90;
  for (let i = 0; i < cloudN; i++) {
    const r = 3 + Math.random() * 13;
    const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(r);
    nodePos.push(v);
    nodeIsStage.push(-1);
    nodeSize.push(0.5 + Math.random() * 0.5);
    // link to a random nearby node for texture, not semantically meaningful
    if (i > 0 && Math.random() < 0.5) {
      const target = nodePos.length - 2 - Math.floor(Math.random() * Math.min(6, nodePos.length - 1));
      if (target >= 0) edges.push([nodePos.length - 1, target, 0.14]);
    }
  }

  return { nodePos, nodeIsStage, nodeSize, edges, stageNodes };
}

export function NetworkHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const pulseFnRef = useRef<((worldPos: THREE.Vector3) => void) | null>(null);
  const stageNodesRef = useRef<StageNode[]>([]);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const { nodePos, nodeIsStage, nodeSize, edges, stageNodes } = buildNetwork();
    stageNodesRef.current = stageNodes;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070c1e, 0.012);

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);
    camera.position.set(0, 3, 32);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setClearColor(0x070c1e);
    wrap.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 14;
    controls.maxDistance = 60;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = 0.5;

    // starfield
    const starN = 600;
    const starPos = new Float32Array(starN * 3);
    const starColor = new Float32Array(starN * 3);
    for (let i = 0; i < starN; i++) {
      const r = 40 + Math.random() * 60;
      const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(r);
      starPos[i * 3] = v.x; starPos[i * 3 + 1] = v.y; starPos[i * 3 + 2] = v.z;
      const brightness = 0.55 + Math.random() * 0.45;
      starColor[i * 3] = brightness; starColor[i * 3 + 1] = brightness; starColor[i * 3 + 2] = brightness;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColor, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0xffffff, vertexColors: true, size: 0.4, sizeAttenuation: true,
      transparent: true, opacity: 0.85, depthWrite: false,
    }));
    scene.add(stars);

    // pulse uniforms shared by nodes + lines
    const uPulseOrigin = Array.from({ length: PULSE_SLOTS }, () => new THREE.Vector3(1e4, 1e4, 1e4));
    const uPulseTime = new Array(PULSE_SLOTS).fill(-1);
    let pulseCursor = 0;
    const sharedUniforms = {
      uTime: { value: 0 },
      uPulseOrigin: { value: uPulseOrigin },
      uPulseTime: { value: uPulseTime },
      uPulseSpeed: { value: 9.5 },
    };

    // nodes
    const nCount = nodePos.length;
    const posArr = new Float32Array(nCount * 3);
    const sizeArr = new Float32Array(nCount);
    const phaseArr = new Float32Array(nCount);
    const colorArr = new Float32Array(nCount * 3);
    for (let i = 0; i < nCount; i++) {
      posArr[i * 3] = nodePos[i].x; posArr[i * 3 + 1] = nodePos[i].y; posArr[i * 3 + 2] = nodePos[i].z;
      sizeArr[i] = nodeSize[i] * 3.4;
      phaseArr[i] = Math.random() * Math.PI * 2;
      const c = nodeIsStage[i] >= 0 ? ACID_SOFT : ACID;
      const dim = nodeIsStage[i] >= 0 ? 1 : 0.55 + Math.random() * 0.3;
      colorArr[i * 3] = c.r * dim; colorArr[i * 3 + 1] = c.g * dim; colorArr[i * 3 + 2] = c.b * dim;
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    nodeGeo.setAttribute("aSize", new THREE.BufferAttribute(sizeArr, 1));
    nodeGeo.setAttribute("aPhase", new THREE.BufferAttribute(phaseArr, 1));
    nodeGeo.setAttribute("aColor", new THREE.BufferAttribute(colorArr, 3));
    const nodeMat = new THREE.ShaderMaterial({
      uniforms: sharedUniforms, vertexShader: nodeVert, fragmentShader: nodeFrag,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodePoints);

    // lines
    const eCount = edges.length;
    const lPos = new Float32Array(eCount * 2 * 3);
    const lStrength = new Float32Array(eCount * 2);
    const lColor = new Float32Array(eCount * 2 * 3);
    edges.forEach(([a, b, s], i) => {
      const pa = nodePos[a], pb = nodePos[b];
      lPos[i * 6] = pa.x; lPos[i * 6 + 1] = pa.y; lPos[i * 6 + 2] = pa.z;
      lPos[i * 6 + 3] = pb.x; lPos[i * 6 + 4] = pb.y; lPos[i * 6 + 5] = pb.z;
      lStrength[i * 2] = s; lStrength[i * 2 + 1] = s;
      const c = ACID;
      lColor[i * 6] = c.r; lColor[i * 6 + 1] = c.g; lColor[i * 6 + 2] = c.b;
      lColor[i * 6 + 3] = c.r; lColor[i * 6 + 4] = c.g; lColor[i * 6 + 5] = c.b;
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));
    lineGeo.setAttribute("aStrength", new THREE.BufferAttribute(lStrength, 1));
    lineGeo.setAttribute("aColor", new THREE.BufferAttribute(lColor, 3));
    const lineMat = new THREE.ShaderMaterial({
      uniforms: sharedUniforms, vertexShader: lineVert, fragmentShader: lineFrag,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // postprocessing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.55, 0.35, 0.42);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const w = Math.max(1, r.width), h = Math.max(1, r.height);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h);
      composer.setSize(w, h);
      bloom.setSize(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const firePulse = (worldPos: THREE.Vector3) => {
      pulseCursor = (pulseCursor + 1) % PULSE_SLOTS;
      uPulseOrigin[pulseCursor].copy(worldPos);
      uPulseTime[pulseCursor] = clock.getElapsedTime();
    };
    pulseFnRef.current = firePulse;

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const onClick = (ev: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      ndc.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      raycaster.params.Points = { threshold: 1.2 };
      const hit = raycaster.intersectObject(nodePoints);
      if (hit.length) {
        const idx = hit[0].index ?? -1;
        const stage = idx >= 0 ? nodeIsStage[idx] : -1;
        const p = hit[0].point;
        firePulse(p);
        if (stage >= 0) setSelected(stage);
        else {
          // nearest stage tip to the click, so any click still feels connected
          let best = 0, bestD = Infinity;
          stageNodesRef.current.forEach((sn, i) => { const d = sn.pos.distanceTo(p); if (d < bestD) { bestD = d; best = i; } });
          setSelected(best);
        }
      }
    };
    let downX = 0, downY = 0;
    const onDown = (ev: PointerEvent) => { downX = ev.clientX; downY = ev.clientY; };
    const onUp = (ev: PointerEvent) => {
      if (Math.hypot(ev.clientX - downX, ev.clientY - downY) < 4) onClick(ev);
    };
    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointerup", onUp);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      sharedUniforms.uTime.value = t;
      if (!pausedRef.current) controls.update();
      composer.render();
    };

    let io: IntersectionObserver | null = null;
    if (reduce) {
      sharedUniforms.uTime.value = 0;
      controls.update();
      composer.render();
    } else {
      io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting && !raf) animate();
        else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
      }), { threshold: 0.05 });
      io.observe(wrap);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointerup", onUp);
      controls.dispose();
      renderer.dispose();
      nodeGeo.dispose(); nodeMat.dispose(); lineGeo.dispose(); lineMat.dispose(); starGeo.dispose();
      wrap.removeChild(renderer.domElement);
    };
  }, []);

  const stage = STAGES[selected];

  return (
    <section className="nh">
      <div className="nh-copy">
        <span className="section-index">SEVEN STAGES · ONE GOVERNED NETWORK</span>
        <h2>Every stage feeds the next — <em>and feeds back.</em></h2>
        <p>AI transformation isn&rsquo;t seven separate steps. It&rsquo;s one system: each stage informs the next, and the learning loop returns to strengthen the whole network.</p>
      </div>

      <div className="nh-viz" ref={wrapRef}>
        <div className="nh-panel" aria-live="polite">
          <span className="nh-panel-n">{stage.number}</span>
          <h3><em>{stage.titleHighlight}</em> {stage.title}</h3>
          <p>{stage.body}</p>
          <div className="nh-tags">{stage.tags.map((t) => <span key={t}>{t}</span>)}</div>
        </div>

        <div className="nh-controls">
          <button type="button" onClick={() => setPaused((p) => !p)}>{paused ? "▶ Resume" : "⏸ Pause"}</button>
          <span className="nh-hint">Drag to orbit · Click to pulse a stage</span>
        </div>
      </div>

      <div className="nh-cta">
        <Link className="arrow-link" href="/approach/framework">Explore the delivery framework<span>↗</span></Link>
      </div>
    </section>
  );
}
