import { useEffect, useRef, type ReactNode } from "react";

type ScrollScrubVideoProps = {
  src: string;
  /** Height of the scroll track as a multiple of the viewport height. */
  scrollLength?: number;
  /** Called with scrub progress (0..1) on every frame it changes. */
  onProgress?: (progress: number) => void;
  /** Overlay content rendered inside the sticky viewport, above the video. */
  children?: ReactNode;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function ScrollScrubVideo({
  src,
  scrollLength = 3,
  onProgress,
  children,
}: ScrollScrubVideoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let duration = 0;
    let targetTime = 0;
    let currentProgress = -1;
    let rafId = 0;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const computeProgress = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrubDistance = section.offsetHeight - window.innerHeight;
      if (scrubDistance <= 0) return 0;
      return clamp((window.scrollY - sectionTop) / scrubDistance, 0, 1);
    };

    const onScroll = () => {
      const progress = computeProgress();
      if (progress !== currentProgress) {
        currentProgress = progress;
        onProgress?.(progress);
      }
      if (duration > 0) {
        targetTime = progress * duration;
      }
    };

    // Smoothly ease the video's currentTime toward the scroll-derived target.
    const tick = () => {
      if (duration > 0) {
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.01) {
          const ease = reduceMotion ? 1 : 0.12;
          const next = video.currentTime + diff * ease;
          try {
            video.currentTime = next;
          } catch {
            /* seeking not ready yet */
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const onMetadata = () => {
      duration = video.duration || 0;
      video.pause();
      onScroll();
    };

    if (video.readyState >= 1 && video.duration) {
      onMetadata();
    } else {
      video.addEventListener("loadedmetadata", onMetadata);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("loadedmetadata", onMetadata);
    };
  }, [onProgress]);

  return (
    <div
      ref={sectionRef}
      style={{ height: `${scrollLength * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
        {/* Soft edge vignette only — keeps the video fully visible. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 35%, transparent 55%, rgba(20,16,15,0.45) 100%)",
          }}
        />
        {children}
      </div>
    </div>
  );
}
