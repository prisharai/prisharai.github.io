import { useCallback, useState } from "react";
import videoSrc from "../../reference_video.mp4";
import { ScrollScrubVideo } from "../components/ScrollScrubVideo";
import { ChapterLinks } from "../components/ChapterLinks";
import { identity } from "../data/site";

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const ramp = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);

export function Home() {
  const [progress, setProgress] = useState(0);
  const onProgress = useCallback((p: number) => setProgress(p), []);

  // The opening identity fades away as scrubbing begins.
  const introOpacity = 1 - ramp(progress, 0.05, 0.22);
  // The single sentence surfaces mid-sequence, then recedes.
  const lineOpacity =
    ramp(progress, 0.22, 0.4) * (1 - ramp(progress, 0.5, 0.62));
  // Chapter links arrive last, like closing titles.
  const chaptersReveal = ramp(progress, 0.58, 0.82);

  return (
    <ScrollScrubVideo src={videoSrc} scrollLength={4} onProgress={onProgress}>
      {/* Wordmark, tucked in a corner — no navbar. */}
      <div
        className="absolute left-6 top-6 sm:left-10 sm:top-8"
        style={{ opacity: clamp(introOpacity + 0.15, 0.2, 1) }}
      >
        <span className="font-serif text-lg tracking-[0.06em] text-ivory/90">
          {identity.wordmark}
        </span>
      </div>

      {/* Opening: minimal identity + tagline. */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity: introOpacity }}
      >
        <p className="max-w-xl text-sm leading-relaxed text-ivory/80 sm:text-base text-balance">
          {identity.tagline}
        </p>
        <div className="mt-10 flex flex-col items-center gap-2 text-ivory/50">
          <span className="text-[10px] uppercase tracking-[0.3em]">scroll</span>
          <span className="h-8 w-px animate-pulse bg-ivory/40" />
        </div>
      </div>

      {/* Mid-scroll sentence. */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
        style={{
          opacity: lineOpacity,
          transform: `translateY(${(1 - lineOpacity) * 16}px)`,
        }}
      >
        <p className="max-w-2xl text-center font-serif text-[clamp(1.3rem,3.4vw,2.2rem)] font-light leading-snug text-ivory text-balance">
          {identity.line}
        </p>
      </div>

      {/* Closing: chapter links. */}
      <ChapterLinks reveal={chaptersReveal} />
    </ScrollScrubVideo>
  );
}
