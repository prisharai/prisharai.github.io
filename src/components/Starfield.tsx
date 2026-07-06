import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number; // depth 0..1 → size + drift speed + brightness
  tw: number; // twinkle phase
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  len: number;
};

/**
 * Ambient background that carries the flower sequence's mood into the
 * interior pages: a slow field of warm drifting embers with the occasional
 * shooting star. Painted to a single fixed canvas, driven by rAF, and fully
 * disabled under prefers-reduced-motion.
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
    let particles: Particle[] = [];
    const shooters: Shooter[] = [];

    const seed = () => {
      const density = Math.round((w * h) / 14000);
      particles = new Array(Math.min(Math.max(density, 40), 180))
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

    const spawnShooter = () => {
      // Diagonal streaks drifting down-right, echoing the video's particles.
      const fromTop = Math.random() > 0.5;
      const x = fromTop ? Math.random() * w * 0.6 : -40;
      const y = fromTop ? -40 : Math.random() * h * 0.5;
      const speed = 5 + Math.random() * 4;
      const angle = (18 + Math.random() * 16) * (Math.PI / 180);
      shooters.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        max: 70 + Math.random() * 40,
        len: 90 + Math.random() * 120,
      });
    };

    let t = 0;
    let rafId = 0;
    let nextShooter = 120 + Math.random() * 180;

    const render = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      // Drifting embers.
      for (const p of particles) {
        p.y += 0.06 + p.z * 0.22;
        p.x += Math.sin((t + p.tw * 60) * 0.002) * 0.12;
        if (p.y > h + 4) {
          p.y = -4;
          p.x = Math.random() * w;
        }
        const twinkle = 0.55 + 0.45 * Math.sin(t * 0.02 + p.tw);
        const r = 0.5 + p.z * 1.6;
        const a = (0.12 + p.z * 0.45) * twinkle;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${245 - p.z * 40}, ${225 - p.z * 60}, ${
          220 - p.z * 40
        }, ${a})`;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shooting stars.
      if (--nextShooter <= 0) {
        spawnShooter();
        nextShooter = 200 + Math.random() * 320;
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.life += 1;
        s.x += s.vx;
        s.y += s.vy;
        const fade =
          Math.sin((s.life / s.max) * Math.PI) * 0.9; // ease in and out
        if (s.life >= s.max || s.x > w + 60 || s.y > h + 60) {
          shooters.splice(i, 1);
          continue;
        }
        const tx = s.x - (s.vx / Math.hypot(s.vx, s.vy)) * s.len;
        const ty = s.y - (s.vy / Math.hypot(s.vx, s.vy)) * s.len;
        const grad = ctx.createLinearGradient(s.x, s.y, tx, ty);
        grad.addColorStop(0, `rgba(245, 232, 224, ${0.9 * fade})`);
        grad.addColorStop(0.4, `rgba(200, 138, 160, ${0.35 * fade})`);
        grad.addColorStop(1, "rgba(200, 138, 160, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        // Bright head.
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 246, 240, ${fade})`;
        ctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      // Paint a single quiet frame of embers, no motion.
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(245, 232, 224, ${0.1 + p.z * 0.25})`;
        ctx.arc(p.x, p.y, 0.5 + p.z * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
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
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-soft-black"
    >
      {/* Warm depth wash so the field reads as atmosphere, not a flat black. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% -10%, rgba(120,60,80,0.22), transparent 55%), radial-gradient(110% 80% at 10% 108%, rgba(60,50,70,0.28), transparent 55%)",
        }}
      />
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
