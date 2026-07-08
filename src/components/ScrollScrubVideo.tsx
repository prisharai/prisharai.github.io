import { useEffect, useRef, useState, type ReactNode } from "react";

const FRAME_COUNT = 181;

const framePath = (i: number) => {
  const base = import.meta.env.BASE_URL || "/";
  const n = String(i).padStart(3, "0");
  return `${base}frames/f_${n}.jpg`;
};

type ScrollScrubVideoProps = {
  /** Height of the scroll track as a multiple of the viewport height. */
  scrollLength?: number;
  /** Called with scrub progress (0..1) whenever it changes. */
  onProgress?: (progress: number) => void;
  /** Overlay content rendered inside the sticky viewport, above the canvas. */
  children?: ReactNode;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

/**
 * Scroll-scrubbed cinematic sequence. Instead of seeking an <video> element
 * (which stutters because each seek decodes from a keyframe), we decode the
 * clip once into image frames and paint them to a canvas. Scrubbing forward
 * and backward is then just an array index — perfectly smooth in both
 * directions, driven by requestAnimationFrame with easing.
 */
export function ScrollScrubVideo({
  scrollLength = 4,
  onProgress,
  children,
}: ScrollScrubVideoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const ready: boolean[] = new Array(FRAME_COUNT).fill(false);
    let loadedCount = 0;

    // Preload every frame. Frame 0 first so something paints immediately.
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      img.onload = () => {
        ready[i - 1] = true;
        loadedCount++;
        setLoaded(loadedCount);
        if (i === 1) drawFrame(0);
      };
      images[i - 1] = img;
    }

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cw = 0;
    let ch = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Setting canvas.width/height resets context state — re-apply smoothing.
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      drawFrame(Math.round(currentFrame), true);
    };

    // Find the nearest already-loaded frame so we never paint blank.
    const nearestReady = (idx: number) => {
      if (ready[idx]) return idx;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (idx - d >= 0 && ready[idx - d]) return idx - d;
        if (idx + d < FRAME_COUNT && ready[idx + d]) return idx + d;
      }
      return -1;
    };

    // Skip repainting when the frame to show hasn't actually changed — this is
    // the single biggest scroll-smoothness win, since the easing loop ticks
    // every rAF but the integer frame only changes a fraction of the time.
    let lastDrawnUse = -1;
    const drawFrame = (idx: number, force = false) => {
      const use = nearestReady(clamp(idx, 0, FRAME_COUNT - 1));
      if (use < 0) return;
      if (use === lastDrawnUse && !force) return;
      lastDrawnUse = use;
      const img = images[use];
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    let targetFrame = 0;
    let currentFrame = 0;
    let lastProgress = -1;

    const computeProgress = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrub = section.offsetHeight - window.innerHeight;
      if (scrub <= 0) return 0;
      return clamp((window.scrollY - sectionTop) / scrub, 0, 1);
    };

    const onScroll = () => {
      const p = computeProgress();
      if (p !== lastProgress) {
        lastProgress = p;
        onProgress?.(p);
      }
      targetFrame = p * (FRAME_COUNT - 1);
      if (reduceMotion) {
        currentFrame = targetFrame;
        drawFrame(Math.round(currentFrame));
      }
    };

    let rafId = 0;
    const tick = () => {
      if (!reduceMotion) {
        const diff = targetFrame - currentFrame;
        if (Math.abs(diff) > 0.01) {
          currentFrame += diff * 0.18;
          drawFrame(Math.round(currentFrame));
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    resize();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    if (!reduceMotion) rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      images.forEach((img) => (img.onload = null));
    };
  }, [onProgress]);

  const booting = loaded < 2;

  return (
    <div
      ref={sectionRef}
      style={{ height: `${scrollLength * 100}vh` }}
      className="relative bg-soft-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" />
        {/* Soft vignette for legibility only — kept light so the frame stays crisp. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(140% 110% at 50% 32%, transparent 60%, rgba(21,31,49,0.5) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-soft-black transition-opacity duration-700"
          style={{ opacity: booting ? 1 : 0 }}
        />
        {children}
      </div>
    </div>
  );
}
