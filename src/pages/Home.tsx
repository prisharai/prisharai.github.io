import { useCallback, useState } from "react";
import { ScrollScrubVideo } from "../components/ScrollScrubVideo";
import { ChapterLinks } from "../components/ChapterLinks";
import { identity } from "../data/site";

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const ramp = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);

/**
 * The name is revealed letter-by-letter as you scroll — each glyph rises,
 * unblurs and brightens in a staggered wave tied directly to scrub progress.
 */
function AnimatedName({ text, reveal }: { text: string; reveal: number }) {
  const chars = text.split("");
  const n = chars.length;
  return (
    <span aria-label={text} className="inline-block">
      {chars.map((ch, i) => {
        // Each letter opens across its own slice of the reveal window.
        const start = (i / n) * 0.55;
        const local = clamp((reveal - start) / 0.45, 0, 1);
        // Ease-out for a soft settle.
        const e = 1 - Math.pow(1 - local, 3);
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block"
            style={{
              opacity: e,
              transform: `translateY(${(1 - e) * 0.5}em)`,
              filter: `blur(${(1 - e) * 12}px)`,
              whiteSpace: "pre",
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}

export function Home() {
  const [progress, setProgress] = useState(0);
  const onProgress = useCallback((p: number) => setProgress(p), []);

  // 1) Opening: the flower alone, in full resolution. Only a scroll cue shows.
  const cueOpacity = 1 - ramp(progress, 0.0, 0.05);

  // 2) The name rises out of the flower, then holds on a long plateau — the
  //    text stays locked while the bloom keeps turning as you scroll — before
  //    it finally recedes.
  const nameReveal = ramp(progress, 0.04, 0.15);
  const nameOut = ramp(progress, 0.52, 0.62);
  const nameOpacity = nameReveal * (1 - nameOut);
  const nameLift = nameOut * -70;
  const nameBlur = nameOut * 10;

  // While the name is held, a quiet cue invites you to keep going.
  const keepScrolling =
    ramp(progress, 0.2, 0.28) * (1 - ramp(progress, 0.5, 0.58));

  // 3) Chapter links arrive last, like closing titles.
  const chaptersReveal = ramp(progress, 0.68, 0.9);

  return (
    <ScrollScrubVideo scrollLength={5} onProgress={onProgress}>
      {/* Small persistent wordmark — no navbar. */}
      <div
        className="absolute left-6 top-6 z-10 sm:left-10 sm:top-8"
        style={{ opacity: clamp(0.4 + nameOpacity * 0.5, 0.4, 0.9) }}
      >
        <span className="font-serif text-base tracking-[0.14em] text-ivory/85">
          {identity.wordmark}
        </span>
      </div>

      {/* Opening cue — just the flower, then an invitation to scroll. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-12 flex flex-col items-center gap-3 text-ivory/70"
        style={{ opacity: cueOpacity }}
      >
        <span className="text-[11px] uppercase tracking-[0.42em]">scroll</span>
        <span className="scroll-cue h-12 w-px bg-gradient-to-b from-ivory/70 to-transparent" />
      </div>

      {/* Soft scrim so text stays legible where it crosses the bright bloom. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: nameOpacity * 0.9,
          background:
            "radial-gradient(60% 42% at 50% 50%, rgba(21,31,49,0.74), rgba(21,31,49,0.34) 55%, transparent 78%)",
        }}
      />

      {/* The name, cinematic and scroll-revealed. */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{
          opacity: nameOpacity,
          transform: `translateY(${nameLift}px)`,
          filter: `blur(${nameBlur}px)`,
        }}
      >
        <p
          className="mb-8 text-[12px] uppercase tracking-[0.5em] text-rose-muted/90"
          style={{ opacity: nameReveal }}
        >
          Personal Archive
        </p>
        <h1 className="font-serif text-[clamp(3.5rem,16vw,12rem)] font-light leading-[0.92] tracking-[-0.015em] text-ivory drop-shadow-[0_2px_30px_rgba(0,0,0,0.45)]">
          <AnimatedName text={identity.name} reveal={nameReveal} />
        </h1>
      </div>

      {/* While the name is held, invite continued scrolling. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-12 flex flex-col items-center gap-3 text-ivory/70"
        style={{ opacity: keepScrolling }}
      >
        <span className="text-[11px] uppercase tracking-[0.42em]">
          keep scrolling
        </span>
        <span className="scroll-cue h-12 w-px bg-gradient-to-b from-ivory/70 to-transparent" />
      </div>

      {/* Closing: chapter links. */}
      <ChapterLinks reveal={chaptersReveal} />
    </ScrollScrubVideo>
  );
}
