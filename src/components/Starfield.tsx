import { useEffect, useRef } from "react";

type Mote = {
  x: number;
  y: number;
  z: number; // depth 0..1 → size + drift speed + opacity
  tw: number; // sway phase
};

/**
 * Interior-page atmosphere. Where the landing sequence is cinematic and dark,
 * the pages are a calm sheet of warm light — so this is deliberately quiet:
 * a soft warm wash plus a sparse field of slow, barely-there blush motes that
 * echo the drifting petals without ever competing with the content. Fully
 * still under prefers-reduced-motion.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let motes: Mote[] = [];

    const seed = () => {
      // Sparse on purpose — spa-quiet, never a busy field.
      const density = Math.round((w * h) / 46000);
      motes = new Array(Math.min(Math.max(density, 14), 46))
        .fill(0)
        .map(() => ({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random(),
          tw: Math.random() * Math.PI * 2,
        }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const paintMote = (m: Mote, moving: boolean) => {
      const sway = moving ? 0.75 + 0.25 * Math.sin(m.tw) : 1;
      const r = 0.8 + m.z * 2.2;
      const a = (0.04 + m.z * 0.09) * sway;
      // Soft mauve motes, keyed to the palette accent.
      ctx.beginPath();
      ctx.fillStyle = `rgba(202, 177, 187, ${a})`;
      ctx.arc(m.x, m.y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    let t = 0;
    let rafId = 0;
    const render = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.y -= 0.04 + m.z * 0.12; // slow, gentle rise
        m.x += Math.sin((t + m.tw * 40) * 0.0016) * 0.08;
        m.tw += 0.004;
        if (m.y < -6) {
          m.y = h + 6;
          m.x = Math.random() * w;
        }
        paintMote(m, true);
      }
      rafId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      for (const m of motes) paintMote(m, false);
    } else {
      rafId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bone"
    >
      {/* Warm light wash — the page reads as a lit room, not flat paper. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 82% -8%, rgba(202,177,187,0.16), transparent 52%), radial-gradient(120% 90% at 6% 106%, rgba(21,31,49,0.05), transparent 52%)",
        }}
      />
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
