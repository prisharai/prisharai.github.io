import { useEffect, useRef } from "react";

type Mote = {
  x: number;
  y: number;
  z: number;
  phase: number;
  tone: number;
};

const asset = (name: string) => `${import.meta.env.BASE_URL || "/"}${name}`;

/** A dark, living continuation of the landing flower's world. */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let time = 0;
    let motes: Mote[] = [];

    const seed = () => {
      const count = Math.min(70, Math.max(28, Math.round((width * height) / 26000)));
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        phase: Math.random() * Math.PI * 2,
        tone: Math.random(),
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const paint = (moving = true) => {
      ctx.clearRect(0, 0, width, height);
      for (const mote of motes) {
        if (moving) {
          mote.y -= 0.035 + mote.z * 0.08;
          mote.x += Math.sin(time * 0.002 + mote.phase) * 0.025;
          if (mote.y < -8) {
            mote.y = height + 8;
            mote.x = Math.random() * width;
          }
        }

        const pulse = moving ? 0.7 + Math.sin(time * 0.01 + mote.phase) * 0.3 : 0.8;
        const radius = 0.45 + mote.z * 1.35;
        const alpha = (0.08 + mote.z * 0.22) * pulse;
        ctx.beginPath();
        ctx.shadowBlur = radius * 7;
        ctx.shadowColor = mote.tone > 0.7 ? "rgba(230,175,200,.5)" : "rgba(184,210,235,.45)";
        ctx.fillStyle = mote.tone > 0.7
          ? `rgba(230, 188, 207, ${alpha})`
          : `rgba(198, 218, 237, ${alpha})`;
        ctx.arc(mote.x, mote.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const render = () => {
      time += 1;
      paint(true);
      raf = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduceMotion) paint(false);
    else raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bone">
      <div className="fine-grid absolute inset-0 opacity-80" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 44% at 72% 18%, rgba(134,166,199,.14), transparent 72%), radial-gradient(48% 38% at 0% 92%, rgba(190,128,164,.09), transparent 76%), linear-gradient(125deg, #060b13 0%, #091424 54%, #080e19 100%)",
        }}
      />
      <img
        src={asset("media/flower-frames/f_001.jpg")}
        alt=""
        className="masked-bloom absolute -right-[23vw] -top-[23vw] w-[92vw] max-w-none opacity-[0.20] mix-blend-screen saturate-[.75] sm:-right-[13vw] sm:-top-[18vw] sm:w-[76vw]"
        style={{ animation: "drift-bloom 18s ease-in-out infinite" }}
      />
      <div className="absolute right-[6vw] top-[9vh] h-[38vw] w-[38vw] rounded-full border border-bloom-blue/[0.08]" />
      <div className="absolute right-[12vw] top-[15vh] h-[26vw] w-[26vw] rounded-full border border-rose-muted/[0.07]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-bone/75 to-transparent" />
    </div>
  );
}
