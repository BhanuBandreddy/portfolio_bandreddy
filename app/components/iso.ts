// Minimal isometric-projection helpers for wireframe "data cube" motifs.
// True-isometric axes: X and Z on the ground plane (30°), Y is vertical.
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);

export type Pt3 = [number, number, number];
export type Edge = { a: Pt3; b: Pt3; tier: "top" | "vert" | "bottom" };

export function project([x, y, z]: Pt3, scale: number, ox: number, oy: number): [number, number] {
  return [ox + (x - z) * COS30 * scale, oy + (x + z) * SIN30 * scale - y * scale];
}

// Wireframe edges of a box occupying [gx,gx+sx] x [gy,gy+sy] x [gz,gz+sz].
// Pass a single `s` for a cube, or (sx,sy,sz) for an anisotropic block (bars).
export function cubeEdges(gx: number, gy: number, gz: number, sx: number, sy = sx, sz = sx): Edge[] {
  const c = (bx: 0 | 1, by: 0 | 1, bz: 0 | 1): Pt3 => [gx + bx * sx, gy + by * sy, gz + bz * sz];
  const bottom: [Pt3, Pt3][] = [
    [c(0, 0, 0), c(1, 0, 0)], [c(1, 0, 0), c(1, 0, 1)], [c(1, 0, 1), c(0, 0, 1)], [c(0, 0, 1), c(0, 0, 0)],
  ];
  const top: [Pt3, Pt3][] = [
    [c(0, 1, 0), c(1, 1, 0)], [c(1, 1, 0), c(1, 1, 1)], [c(1, 1, 1), c(0, 1, 1)], [c(0, 1, 1), c(0, 1, 0)],
  ];
  const vert: [Pt3, Pt3][] = [
    [c(0, 0, 0), c(0, 1, 0)], [c(1, 0, 0), c(1, 1, 0)], [c(1, 0, 1), c(1, 1, 1)], [c(0, 0, 1), c(0, 1, 1)],
  ];
  return [
    ...top.map(([a, b]) => ({ a, b, tier: "top" as const })),
    ...vert.map(([a, b]) => ({ a, b, tier: "vert" as const })),
    ...bottom.map(([a, b]) => ({ a, b, tier: "bottom" as const })),
  ];
}

export function cubeTopCenter(gx: number, gy: number, gz: number, sx: number, sy = sx, sz = sx): Pt3 {
  return [gx + sx / 2, gy + sy, gz + sz / 2];
}

// Even, non-overlapping [start,end] scroll-reveal windows for N staggered elements.
export function windows(n: number, base = 0.04, span = 0.62, dur = 0.3): [number, number][] {
  return Array.from({ length: n }, (_, i) => {
    const start = base + (n <= 1 ? 0 : (i / (n - 1)) * span);
    return [Number(start.toFixed(3)), Number((start + dur).toFixed(3))];
  });
}
